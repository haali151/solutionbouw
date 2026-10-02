import sharp from "sharp";
import { boundedBody, enterRequest, errorResponse, RequestError } from "../../lib/api-security";
import OpenAI, { toFile } from "openai";


export const runtime = "nodejs";

/* =========================================================
   WALLMADE AI IMAGE ENGINE
========================================================= */

function getField(
  formData: FormData,
  name: string,
  fallback = ""
) {
  const value = formData.get(name);

  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value !== "string" || value.length > 300) {
    throw new RequestError(400, "Ongeldige ontwerpoptie.");
  }
  return value.trim();
}

function isYes(value: string) {
  return /^(ja|yes|true|1|aan|enabled)$/i.test(
    value.trim()
  );
}

function isNo(value: string) {
  return /^(nee|geen|no|false|0|uit|disabled|none)$/i.test(
    value.trim()
  );
}

function parseNicheCount(value: string) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.max(0, Math.min(12, parsed));
}

/* =========================================================
   NICHE INSTRUCTIONS
========================================================= */

function makeNicheInstruction({
  count,
  position,
  shape,
  depth,
  type,
}: {
  count: number;
  position: string;
  shape: string;
  depth: string;
  type: string;
}) {
  if (count === 0) {
    return `
NICHE COUNT = 0.

Create NO decorative niches.
Create NO recessed display boxes.
Create NO decorative shelf openings.

The TV recess, fireplace opening, cabinet,
shadow gaps and construction gaps DO NOT count
as decorative niches.
`;
  }

  let placement = "";

  if (/^left$/i.test(position)) {
    placement = `
Place ALL ${count} decorative niches on the LEFT side
of the central TV composition.
`;
  } else if (/^right$/i.test(position)) {
    placement = `
Place ALL ${count} decorative niches on the RIGHT side
of the central TV composition.
`;
  } else if (/both/i.test(position)) {
    placement = `
Distribute the ${count} decorative niches across BOTH sides.

Keep the arrangement visually balanced.

If the number is even:
use an equal number on each side.

If the number is odd:
one side may contain one additional niche.
`;
  } else if (count === 2) {
    placement = `
Preferred arrangement:
ONE decorative niche on the left
and ONE decorative niche on the right.
`;
  } else if (count % 2 === 0) {
    placement = `
Preferred arrangement:
distribute the niches equally between
the left and right sides.
`;
  } else {
    placement = `
Arrange the niches in the most visually balanced
and physically buildable layout.
`;
  }

  const shapeInstruction = shape
    ? `
Requested niche shape:
${shape}

Respect this shape consistently unless the real wall
makes a small proportional adjustment necessary.
`
    : "";

  const depthInstruction = depth
    ? `
Requested niche depth:
${depth}

Represent the depth realistically with believable
shadowing and construction thickness.
`
    : "";

  const typeInstruction = type
    ? `
Requested niche type:
${type}
`
    : "";

  return `
NICHE COUNT = EXACTLY ${count}.

The final Cinewall MUST visibly contain exactly
${count} decorative niches.

${placement}

${shapeInstruction}

${depthInstruction}

${typeInstruction}

CRITICAL COUNTING RULE:

A decorative niche means ONE intentionally designed
recessed display opening.

The TV opening is NOT a decorative niche.
The fireplace is NOT a decorative niche.
The TV cabinet is NOT a decorative niche.
A shadow gap is NOT a decorative niche.

Do NOT create extra openings.

Do NOT divide one requested niche into several
visible compartments if that would visually increase
the niche count.

Before output, internally count the visible decorative
niches.

The visible total MUST equal exactly ${count}.
`;
}

/* =========================================================
   POST
========================================================= */

export async function POST(request: Request) {
  let release: (() => void) | undefined;
  try {
    release = enterRequest(request, "image");
    /* =====================================================
       API KEY
    ===================================================== */

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
      timeout: 120000,
    });

    /* =====================================================
       FORM DATA
    ===================================================== */

    const formData = await (await boundedBody(request, 16777216)).formData().catch(() => { throw new RequestError(400, "Ongeldig formulier."); });

    const image = formData.get("image") as File | null;

    /* =====================================================
       BASIC OPTIONS
    ===================================================== */

    const style = getField(
      formData,
      "style",
      "Modern"
    );

    const tvSize = getField(
      formData,
      "tvSize",
      "65"
    );

    const fireplace = getField(
      formData,
      "fireplace",
      "Ja"
    );

    const shelvesRaw = getField(
      formData,
      "shelves",
      "4"
    );

    /* =====================================================
       EXISTING CONFIGURATOR OPTIONS
    ===================================================== */

    const cinewallType = getField(
      formData,
      "cinewallType"
    );

    const cinewallWidth = getField(
      formData,
      "cinewallWidth"
    );

    const fireplaceModel = getField(
      formData,
      "fireplaceModel"
    );

    const cabinet = getField(
      formData,
      "cabinet"
    );

    const wood = getField(
      formData,
      "wood"
    );

    const price = getField(
      formData,
      "price"
    );

    /* =====================================================
       LAYOUT OPTIONS
    ===================================================== */

    const layoutAlignment = getField(
      formData,
      "layoutAlignment"
    );

    const symmetry = getField(
      formData,
      "symmetry"
    );

    const heightStyle = getField(
      formData,
      "heightStyle"
    );

    /* =====================================================
       TV OPTIONS
    ===================================================== */

    const tvStyle = getField(
      formData,
      "tvStyle"
    );

    const tvPosition = getField(
      formData,
      "tvPosition"
    );

    const tvEmphasis = getField(
      formData,
      "tvEmphasis"
    );

    /* =====================================================
       FIREPLACE OPTIONS
    ===================================================== */

    const fireplaceWidth = getField(
      formData,
      "fireplaceWidth"
    );

    const fireplacePosition = getField(
      formData,
      "fireplacePosition"
    );

    const fireplaceFinish = getField(
      formData,
      "fireplaceFinish"
    );

    /* =====================================================
       SHELF / NICHE OPTIONS
    ===================================================== */

    const shelfPosition = getField(
      formData,
      "shelfPosition"
    );

    const shelfShape = getField(
      formData,
      "shelfShape"
    );

    const shelfDepth = getField(
      formData,
      "shelfDepth"
    );

    const shelfType = getField(
      formData,
      "shelfType"
    );

    /* =====================================================
       WOOD OPTIONS
    ===================================================== */

    const woodEnabledRaw = getField(
      formData,
      "woodEnabled"
    );

    const woodType = getField(
      formData,
      "woodType"
    );

    const woodPosition = getField(
      formData,
      "woodPosition"
    );

    const woodStyle = getField(
      formData,
      "woodStyle"
    );

    /* =====================================================
       LIGHTING OPTIONS
    ===================================================== */

    const lightingEnabledRaw = getField(
      formData,
      "lightingEnabled"
    );

    const lightingColor = getField(
      formData,
      "lightingColor"
    );

    const lightingStrength = getField(
      formData,
      "lightingStrength"
    );

    const lightingPosition = getField(
      formData,
      "lightingPosition"
    );

    /* =====================================================
       CABINET OPTIONS
    ===================================================== */

    const cabinetType = getField(
      formData,
      "cabinetType"
    );

    const cabinetWidth = getField(
      formData,
      "cabinetWidth"
    );

    const cabinetColor = getField(
      formData,
      "cabinetColor"
    );

    const cabinetFinish = getField(
      formData,
      "cabinetFinish"
    );

    /* =====================================================
       COLOR / FINISH OPTIONS
    ===================================================== */

    const wallColor = getField(
      formData,
      "wallColor"
    );

    const finishStyle = getField(
      formData,
      "finishStyle"
    );

    const contrast = getField(
      formData,
      "contrast"
    );

    /* =====================================================
       IMAGE VALIDATION
    ===================================================== */

    if (!(image instanceof File) || image.size === 0) {
      return Response.json(
        {
          success: false,
          error: "Geen afbeelding ontvangen.",
        },
        {
          status: 400,
        }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(image.type)) {
      return Response.json(
        {
          success: false,
          error:
            "Gebruik een JPG-, PNG- of WebP-afbeelding.",
        },
        {
          status: 400,
        }
      );
    }

    if (image.size > 15 * 1024 * 1024) {
      return Response.json(
        {
          success: false,
          error:
            "De afbeelding mag maximaal 15 MB zijn.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       NORMALIZE IMAGE
    ===================================================== */


    let imageBytes: Buffer;
    try {
      const input = Buffer.from(await image.arrayBuffer());
      const metadata = await sharp(input, { limitInputPixels: 25_000_000 }).metadata();
      if (!["jpeg", "png", "webp"].includes(metadata.format || "") || (metadata.pages || 1) > 1) {
        throw new Error("Unsupported image");
      }
      // Decode and re-encode: strip EXIF/location and never send the original filename.
      imageBytes = await sharp(input, { limitInputPixels: 25_000_000 })
        .rotate().resize({ width: 2048, height: 2048, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 90 }).toBuffer();
    } catch {
      throw new RequestError(400, "Gebruik een geldige JPG-, PNG- of WebP-foto tot 25 megapixels.");
    }
    const uploadedImage = await toFile(imageBytes, "room.jpg", { type: "image/jpeg" });

    /* =====================================================
       DERIVED CONFIGURATION
    ===================================================== */

    const nicheCount =
      parseNicheCount(shelvesRaw);

    const hasFireplace =
      !isNo(fireplace);

    const hasExistingWood =
      Boolean(wood.trim()) &&
      !isNo(wood);

    const hasWood =
      woodEnabledRaw
        ? isYes(woodEnabledRaw)
        : hasExistingWood;

    const hasLighting =
      lightingEnabledRaw
        ? isYes(lightingEnabledRaw)
        : nicheCount > 0;

    const resolvedCabinetType =
      cabinetType || cabinet;

    const hasCabinet =
      Boolean(resolvedCabinetType.trim()) &&
      !isNo(resolvedCabinetType);

    const resolvedWood =
      woodType || wood;

    /* =====================================================
       NICHE INSTRUCTION
    ===================================================== */

    const nicheInstruction =
      makeNicheInstruction({
        count: nicheCount,
        position: shelfPosition,
        shape: shelfShape,
        depth: shelfDepth,
        type: shelfType,
      });

    /* =====================================================
       PROMPT
    ===================================================== */

    const prompt = `
You are editing a REAL CUSTOMER PHOTOGRAPH
for WALLMADE, a professional Dutch Cinewall
and interior construction company.

THIS IS AN IMAGE EDITING TASK.

DO NOT CREATE A NEW ROOM.

==================================================
TOP PRIORITIES
==================================================

1. Preserve the customer's real room.
2. Preserve the original camera position.
3. Follow ALL selected design settings.
4. Follow the exact decorative niche count.
5. Keep the design physically buildable.
6. Keep the result photorealistic.
7. Change ONLY the intended TV / Cinewall wall.

The uploaded photograph is the source of truth.

==================================================
PRESERVE THE ORIGINAL ROOM
==================================================

Keep unchanged as much as physically possible:

- camera position
- camera angle
- lens perspective
- room dimensions
- floor
- ceiling
- windows
- doors
- stairs
- radiators
- surrounding walls
- furniture outside the Cinewall area
- objects outside the Cinewall area
- natural lighting direction
- existing architecture

DO NOT:

- create a different house
- move windows
- move doors
- redesign unrelated walls
- change the floor
- change the ceiling
- enlarge the room
- shrink the room
- move unrelated furniture
- invent architectural openings
- change the camera viewpoint

ONLY redesign the intended main television wall.

==================================================
CUSTOMER DESIGN STATE
==================================================

STYLE:
${style}

CINEWALL MODEL:
${cinewallType || "No specific model supplied"}

CINEWALL WIDTH:
${cinewallWidth || "Determine realistically from the visible wall"}

LAYOUT ALIGNMENT:
${layoutAlignment || "Use the most natural centered layout"}

SYMMETRY:
${symmetry || "Balanced"}

HEIGHT STYLE:
${heightStyle || "Determine naturally from the room"}

TV SIZE:
${tvSize} inch

TV STYLE:
${tvStyle || "Standard premium television"}

TV POSITION:
${tvPosition || "Centered"}

TV EMPHASIS:
${tvEmphasis || "Balanced"}

FIREPLACE:
${hasFireplace ? "YES" : "NO"}

FIREPLACE MODEL:
${fireplaceModel || "No specific model supplied"}

FIREPLACE WIDTH:
${fireplaceWidth || "Proportional to the design"}

FIREPLACE POSITION:
${fireplacePosition || "Below the TV"}

FIREPLACE FINISH:
${fireplaceFinish || "Seamless architectural integration"}

DECORATIVE NICHE COUNT:
EXACTLY ${nicheCount}

NICHE POSITION:
${shelfPosition || "Balanced around the TV"}

NICHE SHAPE:
${shelfShape || "Architecturally appropriate"}

NICHE DEPTH:
${shelfDepth || "Medium realistic depth"}

NICHE TYPE:
${shelfType || "Open display niches"}

WOOD ENABLED:
${hasWood ? "YES" : "NO"}

WOOD TYPE:
${resolvedWood || "No wood type supplied"}

WOOD POSITION:
${woodPosition || "No specific position supplied"}

WOOD STYLE:
${woodStyle || "Smooth premium finish"}

LIGHTING ENABLED:
${hasLighting ? "YES" : "NO"}

LIGHTING COLOR:
${lightingColor || "Warm"}

LIGHTING STRENGTH:
${lightingStrength || "Soft"}

LIGHTING POSITION:
${lightingPosition || "Concealed inside niches"}

TV CABINET:
${hasCabinet ? "YES" : "NO"}

CABINET TYPE:
${resolvedCabinetType || "None"}

CABINET WIDTH:
${cabinetWidth || "Proportional"}

CABINET COLOR:
${cabinetColor || "Match the design"}

CABINET FINISH:
${cabinetFinish || "Minimal"}

WALL COLOR:
${wallColor || "Respect the selected style and existing room"}

SURFACE FINISH:
${finishStyle || "Smooth premium architectural finish"}

CONTRAST:
${contrast || "Balanced"}

PRICE REFERENCE:
${price || "No price supplied"}

==================================================
ABSOLUTE NICHE REQUIREMENT
==================================================

${nicheInstruction}

This niche requirement has higher priority
than decorative creativity.

==================================================
CINEWALL STRUCTURE
==================================================

Create a premium custom-built Cinewall that
WALLMADE could realistically construct.

The television should remain the visual center.

Use realistic proportions for a
${tvSize}-inch television.

The Cinewall must fit naturally inside the
existing wall dimensions.

Use:

- clean architectural lines
- professional plasterwork
- precise edges
- realistic construction depth
- concealed cables
- realistic shadow gaps
- believable material thickness
- premium finishes
- physically realistic structural support

Avoid:

- fantasy architecture
- futuristic impossible forms
- impossible floating elements
- random shelves
- random niches
- excessive decoration
- excessive lighting
- obvious CGI
- exaggerated luxury
- changing unrelated parts of the room

==================================================
LAYOUT
==================================================

${
  cinewallWidth
    ? `
The requested Cinewall width is:
${cinewallWidth}

Respect this visually relative to the real wall.
`
    : `
Determine a realistic Cinewall width from
the visible wall.
`
}

${
  layoutAlignment
    ? `
Requested alignment:
${layoutAlignment}

Follow this alignment while respecting
the real architecture.
`
    : ""
}

${
  symmetry
    ? `
Requested symmetry:
${symmetry}
`
    : ""
}

${
  heightStyle
    ? `
Requested height treatment:
${heightStyle}
`
    : ""
}

==================================================
TELEVISION
==================================================

Include ONE television.

Approximate television size:
${tvSize} inch.

TV style:
${tvStyle || "Premium modern television"}

TV position:
${tvPosition || "Centered"}

TV visual emphasis:
${tvEmphasis || "Balanced"}

Keep believable viewing height and proportions.

Do NOT create a second television.

==================================================
FIREPLACE
==================================================

${
  hasFireplace
    ? `
Include exactly ONE electric fireplace.

Requested model:
${fireplaceModel || "No exact model supplied"}

Requested width:
${fireplaceWidth || "Proportional"}

Requested position:
${fireplacePosition || "Directly below the television"}

Requested finish:
${fireplaceFinish || "Seamless"}

Integrate the fireplace naturally into
the Cinewall structure.

Use realistic spacing between the TV
and fireplace.

Do NOT add a second fireplace.

The fireplace opening DOES NOT count
as a decorative niche.
`
    : `
DO NOT include a fireplace.

No flames.
No fireplace opening.
No fireplace-shaped decoration.
`
}

==================================================
DECORATIVE NICHES / SHELVES
==================================================

${nicheInstruction}

Requested position:
${shelfPosition || "Balanced"}

Requested shape:
${shelfShape || "Suitable for the design"}

Requested depth:
${shelfDepth || "Medium"}

Requested type:
${shelfType || "Open"}

Decorative niches must look deliberately
designed and structurally possible.

Do not create accidental extra compartments.

==================================================
WOOD
==================================================

${
  hasWood
    ? `
WOOD IS REQUIRED.

Wood type / finish:
${resolvedWood || "Natural premium wood"}

Wood placement:
${woodPosition || "Use as a controlled architectural accent"}

Wood style:
${woodStyle || "Smooth"}

IMPORTANT:

Use wood ONLY where requested.

If wood placement is:
"Inside shelves only"

then apply wood only to the interior surfaces
or back panels of the decorative niches.

Do NOT cover the entire Cinewall in wood
unless explicitly requested.

Do NOT create additional niches just to
show more wood.
`
    : `
DO NOT add decorative wood.

Do NOT invent wood slats.
Do NOT invent wooden niche interiors.
Do NOT add random wooden panels.
`
}

==================================================
NICHE LIGHTING
==================================================

${
  hasLighting
    ? `
DECORATIVE LIGHTING IS REQUIRED.

Lighting color:
${lightingColor || "Warm"}

Lighting strength:
${lightingStrength || "Soft"}

Lighting position:
${lightingPosition || "Concealed inside decorative niches"}

Use realistic concealed LED lighting.

The physical LED strip itself should not
be visually dominant.

Create believable indirect illumination
and soft shadows.

Keep the lighting elegant and subtle.

Do NOT add random LED strips elsewhere
unless explicitly requested.
`
    : `
DO NOT add decorative LED lighting
inside the niches.

Keep only the room's natural / existing
lighting.
`
}

==================================================
TV CABINET
==================================================

${
  hasCabinet
    ? `
Include ONE TV cabinet / media unit.

Type:
${resolvedCabinetType}

Width:
${cabinetWidth || "Proportional"}

Color:
${cabinetColor || "Coordinate with the Cinewall"}

Finish:
${cabinetFinish || "Minimal"}

Integrate it naturally into the lower
part of the Cinewall.

Keep realistic dimensions and depth.

The cabinet DOES NOT count as a decorative niche.
`
    : `
Do NOT create a separate TV cabinet
unless structurally required by the
existing specified Cinewall model.
`
}

==================================================
COLOR & FINISH
==================================================

Wall / Cinewall color:
${wallColor || "Choose a restrained color appropriate to the selected style"}

Finish:
${finishStyle || "Smooth premium finish"}

Contrast:
${contrast || "Balanced"}

Do not recolor unrelated room elements.

==================================================
STYLE
==================================================

Selected style:
${style}

If MODERN:

- clean geometry
- contemporary materials
- calm composition
- restrained details

If LUXURY:

- richer premium finishes
- sophisticated detailing
- refined lighting
- expensive appearance
- still realistic and buildable

If MINIMAL:

- fewer visual elements
- clean surfaces
- subtle detailing
- calm architectural composition

==================================================
PHOTOREALISM
==================================================

Match the uploaded photograph:

- exposure
- color temperature
- perspective
- camera position
- lens appearance
- sharpness
- lighting direction
- shadows
- reflections
- material texture

The new Cinewall must connect naturally
to the existing:

- floor
- wall
- ceiling

Do not unnecessarily beautify or renovate
the rest of the room.

The result must look like a REAL photograph
taken after WALLMADE completed the installation.

==================================================
FINAL INTERNAL CHECK
==================================================

Before returning the image verify:

- Same room: YES
- Same camera position: YES
- Same floor: YES
- Same windows: YES
- Same doors: YES
- TV approximately ${tvSize} inch: YES
- Decorative niches exactly ${nicheCount}: YES
- Niche position followed: YES
- Niche shape followed: YES
- Wood requirement followed: YES
- Wood placement followed: YES
- Lighting requirement followed: YES
- Lighting color followed: YES
- Fireplace requirement followed: YES
- Cabinet requirement followed: YES
- Layout requirement followed: YES
- Physically buildable: YES
- Photorealistic: YES

The customer should think:

"This is my actual room with the exact Cinewall
configuration I asked Wallmade to build."
`;

    /* =====================================================
       OPENAI IMAGE EDIT
    ===================================================== */

    const result = await openai.images.edit({
      model: "gpt-image-2",
      image: uploadedImage,
      prompt,
      size: "1536x1024",
      quality: "medium",
    });

    const generatedImage =
      result.data?.[0]?.b64_json;

    if (!generatedImage) {
      throw new Error(
        "Geen afbeelding gegenereerd."
      );
    }

    return Response.json({
      success: true,
      image: `data:image/png;base64,${generatedImage}`,
      design: {
        style,
        cinewallWidth,
        layoutAlignment,
        symmetry,
        heightStyle,

        tvSize,
        tvStyle,
        tvPosition,
        tvEmphasis,

        fireplace:
          hasFireplace ? "Ja" : "Nee",
        fireplaceModel,
        fireplaceWidth,
        fireplacePosition,
        fireplaceFinish,

        shelves: String(nicheCount),
        shelfPosition,
        shelfShape,
        shelfDepth,
        shelfType,

        woodEnabled:
          hasWood ? "Ja" : "Nee",
        woodType: resolvedWood,
        woodPosition,
        woodStyle,

        lightingEnabled:
          hasLighting ? "Ja" : "Nee",
        lightingColor,
        lightingStrength,
        lightingPosition,

        cabinetType:
          hasCabinet
            ? resolvedCabinetType
            : "None",
        cabinetWidth,
        cabinetColor,
        cabinetFinish,

        wallColor,
        finishStyle,
        contrast,
      },
    });
  } catch (error: unknown) {
    return errorResponse(error);
  } finally {
    release?.();
  }
}
