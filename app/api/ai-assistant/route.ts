import { boundedBody, enterRequest, errorResponse, RequestError } from "../../lib/api-security";
import OpenAI from "openai";

export const runtime = "nodejs";

/* =========================================================
   WALLMADE AI ASSISTANT
   Converts natural conversation into safe design changes.
========================================================= */

const DESIGN_FIELDS = [
  "style",
  "cinewallWidth",
  "layoutAlignment",
  "symmetry",
  "heightStyle",

  "tvSize",
  "tvStyle",
  "tvPosition",
  "tvEmphasis",

  "fireplace",
  "fireplaceModel",
  "fireplaceWidth",
  "fireplacePosition",
  "fireplaceFinish",

  "shelves",
  "shelfPosition",
  "shelfShape",
  "shelfDepth",
  "shelfType",

  "woodEnabled",
  "woodType",
  "woodPosition",
  "woodStyle",

  "lightingEnabled",
  "lightingColor",
  "lightingStrength",
  "lightingPosition",

  "cabinetType",
  "cabinetWidth",
  "cabinetColor",
  "cabinetFinish",

  "wallColor",
  "finishStyle",
  "contrast",
] as const;

type DesignField = (typeof DESIGN_FIELDS)[number];

type DesignState = Partial<Record<DesignField, string>>;

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

const patchProperties = Object.fromEntries(
  DESIGN_FIELDS.map((field) => [
    field,
    {
      type: ["string", "null"],
    },
  ])
);

/* =========================================================
   HELPERS
========================================================= */

function cleanString(value: unknown, maxLength = 300) {
  if (typeof value !== "string") return "";

  return value.trim().slice(0, maxLength);
}

function cleanDesign(value: unknown): DesignState {
  if (!value || typeof value !== "object") {
    return {};
  }

  const input = value as Record<string, unknown>;

  const result: DesignState = {};

  for (const field of DESIGN_FIELDS) {
    const value = cleanString(input[field], 120);

    if (value) {
      result[field] = value;
    }
  }

  return result;
}

function cleanHistory(value: unknown): HistoryMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .slice(-12)
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const candidate = item as Record<string, unknown>;

      const role =
        candidate.role === "assistant" ? "assistant" : "user";

      const content = cleanString(candidate.content, 1200);

      if (!content) return null;

      return {
        role,
        content,
      } satisfies HistoryMessage;
    })
    .filter((item): item is HistoryMessage => Boolean(item));
}

function applyPatch(
  design: DesignState,
  patch: Record<string, string | null>
) {
  const next: DesignState = {
    ...design,
  };

  for (const field of DESIGN_FIELDS) {
    const value = patch[field];

    if (typeof value === "string" && value.trim()) {
      next[field] = value.trim();
    }
  }

  return next;
}

/* =========================================================
   POST
========================================================= */

export async function POST(request: Request) {
  let release: (() => void) | undefined;
  try {
    release = enterRequest(request, "chat");
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          success: false,
          error: "De service is tijdelijk niet beschikbaar.",
        },
        {
          status: 500,
        }
      );
    }

    const openai = new OpenAI({
      apiKey,
      maxRetries: 0,
      timeout: 45000,
    });

    const body = await (await boundedBody(request, 32768)).json().catch(() => { throw new RequestError(400, "Ongeldige JSON."); });

    if (!body || typeof body !== "object") {
      return Response.json(
        {
          success: false,
          error: "Ongeldige aanvraag.",
        },
        {
          status: 400,
        }
      );
    }

    const input = body as Record<string, unknown>;

    const message = cleanString(input.message, 2000);

    if (!message) {
      return Response.json(
        {
          success: false,
          error: "Geen bericht ontvangen.",
        },
        {
          status: 400,
        }
      );
    }

    const currentDesign = cleanDesign(input.design);

    const history = cleanHistory(input.history);

    const requestedLanguage = cleanString(
      input.language,
      20
    ).toLowerCase();

    const language =
      ["auto", "nl", "en", "ar", "tr", "de"].includes(
        requestedLanguage
      )
        ? requestedLanguage
        : "auto";

    /* =====================================================
       WALLMADE ASSISTANT RULES
    ===================================================== */

    const instructions = `
You are WALLMADE AI, an expert Cinewall design assistant for a Dutch interior construction company.

Your job has TWO responsibilities:

1. Talk naturally with the customer.
2. Convert explicit customer design requests into structured Cinewall configuration changes.

==================================================
LANGUAGE
==================================================

Language preference:
${language}

If language preference is "auto":
detect the language of the customer's newest message and reply in that language.

Supported priority languages:
- Dutch
- English
- Arabic
- Turkish
- German

If the customer changes language, follow the customer's newest language.

Keep replies friendly, concise and professional.

==================================================
CRITICAL ACCURACY RULE
==================================================

NEVER change a design property unless the customer clearly requested that change.

Do not invent preferences.

Do not silently make extra design changes.

Do not change unrelated parts of the design.

If a request is ambiguous and executing it could create the wrong design:
set needsClarification=true.

Ask ONE short clarification question.

When clarification is required:
shouldRegenerate=false.

Example:

Customer:
"Move the shelf."

This is ambiguous if there are multiple shelves.

Ask which shelf or which side.

Customer:
"Move the shelves to the right."

This is clear.

shelfPosition = "Right"

==================================================
DESIGN FIELD MEANINGS
==================================================

style
General design atmosphere.
Examples:
Modern
Luxury
Minimal

cinewallWidth
Requested overall Cinewall width.
Examples:
2m
2.4m
2.8m
3m
full wall

layoutAlignment
Examples:
Centered
Full wall

symmetry
Examples:
Symmetrical
Asymmetrical

heightStyle
Examples:
Normal
Tall
Floor-to-ceiling

tvSize
Television size in inches.
Return only the number if possible.
Examples:
55
65
75
85
98

tvStyle
Examples:
Standard
Frameless
Premium thin

tvPosition
Examples:
Center
Slightly higher
Slightly lower

tvEmphasis
Examples:
Balanced
Bigger visual focus

fireplace
Use:
Ja
Nee

fireplaceModel
Specific fireplace name or model when explicitly supplied.

fireplaceWidth
Examples:
Narrow
Medium
Wide

fireplacePosition
Examples:
Under TV
Lower section

fireplaceFinish
Examples:
Minimal frame
Luxury frame
Seamless

shelves
This means the TOTAL NUMBER OF DECORATIVE NICHES / DISPLAY OPENINGS.

Preferred values:
0
2
4
6

If the customer explicitly requests another number,
preserve the customer's requested number.

shelfPosition
Examples:
Left
Right
Both sides

shelfShape
Examples:
Square
Rectangle
Vertical
Horizontal

shelfDepth
Examples:
Shallow
Medium
Deep

shelfType
Examples:
Open
Closed look
Mixed

woodEnabled
Use:
Ja
Nee

woodType
Examples:
Light Oak
Natural Oak
Walnut
Black Wood

woodPosition
Examples:
Back panel only
Inside shelves only
Side accents
Full niche finish

woodStyle
Examples:
Smooth
Slatted
Textured

lightingEnabled
Use:
Ja
Nee

lightingColor
Examples:
Warm
Neutral
Cool

lightingStrength
Examples:
Soft
Medium
Strong

lightingPosition
Examples:
Top only
Top + sides
Hidden glow

cabinetType
Examples:
None
Floating
Full width
Compact

cabinetWidth
Examples:
180 cm
240 cm
280 cm
Auto

cabinetColor
Examples:
Match wall
Wood
Dark
Light

cabinetFinish
Examples:
Minimal
Storage
Premium

wallColor
Examples:
Light
Warm beige
Taupe
Dark
or another explicitly requested color.

finishStyle
Examples:
Smooth plaster
Matte luxury
Soft stone look

contrast
Examples:
Soft
Balanced
Bold

==================================================
WOOD LOGIC
==================================================

If the customer says:

"wood inside the shelves"
"hout in de vakken"
"خشب داخل الرفوف"
"rafların içinde ahşap"

Then normally use:

woodEnabled = "Ja"
woodPosition = "Inside shelves only"

Do NOT select a wood type unless the customer specifies it.

If the customer says remove wood:

woodEnabled = "Nee"

==================================================
LIGHTING LOGIC
==================================================

If the customer requests LED or lighting inside shelves:

lightingEnabled = "Ja"

If they say warm lighting:

lightingColor = "Warm"

If they say remove lighting:

lightingEnabled = "Nee"

Do not invent another lighting option.

==================================================
TV LOGIC
==================================================

If the customer asks to make the TV larger or smaller
but does not provide a specific size:

Ask for clarification instead of guessing a television size.

If they provide a size:
update tvSize.

==================================================
SHELF / NICHE LOGIC
==================================================

The shelf/niche count is important.

If the customer asks:

"add two more niches"

calculate the new number using the CURRENT DESIGN.

Example:

Current shelves = 4.
Customer requests two more.
New shelves = 6.

If the current number is unknown:
ask for clarification.

Do not confuse:
- fireplace opening
- television recess
- cabinet
with decorative niches.

==================================================
FIREPLACE LOGIC
==================================================

If customer requests a fireplace:
fireplace = "Ja"

If customer requests no fireplace:
fireplace = "Nee"

Never invent a fireplace model.

==================================================
CABINET LOGIC
==================================================

If customer requests removal of the cabinet:
cabinetType = "None"

If they request a floating cabinet:
cabinetType = "Floating"

==================================================
QUESTIONS THAT DO NOT CHANGE THE DESIGN
==================================================

If the customer is merely asking:

- what is possible
- advice
- explanation
- which option exists
- how Wallmade works

answer the question normally.

Do NOT change the design.

shouldRegenerate=false.

==================================================
PRICE RULE
==================================================

NEVER invent a price.

Never provide an exact quote unless the application has explicitly supplied an official price.

If asked about pricing without supplied pricing data:
explain that Wallmade will confirm the price in the quotation.

==================================================
IMAGE REGENERATION
==================================================

shouldRegenerate=true ONLY when the customer has clearly requested
a visual design change.

Examples:

"Add wood inside the shelves."
true

"Make the lighting warm."
true

"Hello."
false

"How does this work?"
false

"How much does it cost?"
false

==================================================
PATCH RULE
==================================================

For every property the customer did NOT request changing:
return null.

The patch must contain every schema key,
but unchanged fields MUST be null.

Do NOT copy the whole current design into the patch.

Only explicit changes belong in the patch.

==================================================
CURRENT DESIGN
==================================================

${JSON.stringify(currentDesign, null, 2)}
`;

    /* =====================================================
       CONVERSATION CONTEXT
    ===================================================== */

    const historyText = history
      .map((item) => {
        return `${item.role.toUpperCase()}: ${item.content}`;
      })
      .join("\n");

    const customerInput = `
Conversation history:

${historyText || "(no previous conversation)"}

Newest customer message:

${message}
`;

    /* =====================================================
       STRUCTURED RESPONSE
    ===================================================== */

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      store: false,

      instructions,

      input: customerInput,

      text: {
        format: {
          type: "json_schema",

          name: "wallmade_ai_assistant",

          strict: true,

          schema: {
            type: "object",

            additionalProperties: false,

            properties: {
              reply: {
                type: "string",
              },

              detectedLanguage: {
                type: "string",
                enum: [
                  "nl",
                  "en",
                  "ar",
                  "tr",
                  "de",
                  "other",
                ],
              },

              needsClarification: {
                type: "boolean",
              },

              shouldRegenerate: {
                type: "boolean",
              },

              patch: {
                type: "object",

                additionalProperties: false,

                properties: patchProperties,

                required: [...DESIGN_FIELDS],
              },
            },

            required: [
              "reply",
              "detectedLanguage",
              "needsClarification",
              "shouldRegenerate",
              "patch",
            ],
          },
        },
      },
    });

    const raw = response.output_text;

    if (!raw) {
      throw new Error("Geen antwoord ontvangen van Wallmade AI.");
    }

    const result = JSON.parse(raw) as {
      reply: string;
      detectedLanguage:
        | "nl"
        | "en"
        | "ar"
        | "tr"
        | "de"
        | "other";
      needsClarification: boolean;
      shouldRegenerate: boolean;
      patch: Record<string, string | null>;
    };

    const nextDesign = applyPatch(
      currentDesign,
      result.patch
    );

    const changedFields = DESIGN_FIELDS.filter((field) => {
      return (
        typeof result.patch[field] === "string" &&
        result.patch[field]?.trim()
      );
    });

    return Response.json({
      success: true,

      reply: result.reply,

      detectedLanguage: result.detectedLanguage,

      needsClarification: result.needsClarification,

      shouldRegenerate:
        result.shouldRegenerate &&
        !result.needsClarification &&
        changedFields.length > 0,

      changedFields,

      patch: result.patch,

      design: nextDesign,
    });
  } catch (error: unknown) {
    return errorResponse(error);
  } finally {
    release?.();
  }
}
