import OpenAI, { toFile } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image") as File | null;

    const style = String(formData.get("style") || "Modern");
    const tvSize = String(formData.get("tvSize") || "65");
    const fireplace = String(formData.get("fireplace") || "Ja");
    const shelves = String(formData.get("shelves") || "4");

    const cinewallType = String(formData.get("cinewallType") || "");
    const cinewallWidth = String(formData.get("cinewallWidth") || "");
    const fireplaceModel = String(formData.get("fireplaceModel") || "");
    const cabinet = String(formData.get("cabinet") || "");
    const wood = String(formData.get("wood") || "");
    const price = String(formData.get("price") || "");

    if (!image) {
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

    if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
      return Response.json(
        {
          success: false,
          error: "Gebruik een JPG-, PNG- of WebP-afbeelding.",
        },
        {
          status: 400,
        }
      );
    }

    if (image.size > 10 * 1024 * 1024) {
      return Response.json(
        {
          success: false,
          error: "De afbeelding mag maximaal 10 MB zijn.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await image.arrayBuffer();

    const uploadedImage = await toFile(
      Buffer.from(bytes),
      image.name || "woonkamer.png",
      {
        type: image.type || "image/png",
      }
    );

    const hasFireplace =
      fireplace.toLowerCase() === "ja" &&
      !/^(geen|nee)$/i.test(fireplaceModel.trim());

    const hasCabinet =
      Boolean(cabinet.trim()) &&
      !/^(geen|geen tv-meubel|nee)$/i.test(cabinet.trim());

    const hasWood =
      Boolean(wood.trim()) &&
      !/^(false|geen|nee|no|0)$/i.test(wood.trim());

    const nicheCount = ["0", "2", "4", "6"].includes(shelves)
      ? shelves
      : "0";

    const nicheInstruction =
      nicheCount === "0"
        ? `
NICHE COUNT = 0.

Create NO decorative niches.
Create NO recessed display boxes.
Create NO shelf openings on either side of the television.

The television and fireplace may have their own required recesses,
but these DO NOT count as decorative niches.
`
        : nicheCount === "2"
          ? `
NICHE COUNT = EXACTLY 2.

Create exactly TWO decorative niches in total.

Preferred layout:
- ONE tall decorative niche on the left side of the central TV/fireplace composition.
- ONE tall decorative niche on the right side.

IMPORTANT:
Each tall niche is ONE niche.

Do NOT divide either niche horizontally into multiple boxes.
Do NOT add a shelf across the middle that visually creates extra niches.
Do NOT create upper and lower niche compartments.
Do NOT create additional small recesses.

The finished Cinewall must visibly contain exactly:
LEFT NICHE + RIGHT NICHE = 2 decorative niches total.
`
          : nicheCount === "4"
            ? `
NICHE COUNT = EXACTLY 4.

Create exactly FOUR decorative niches in total.

Preferred layout:
- TWO clearly separate niches on the left.
- TWO clearly separate niches on the right.

The four niches should visually read as four intentional openings.

Do NOT add a fifth niche.
Do NOT add extra recessed boxes.
`
            : `
NICHE COUNT = EXACTLY 6.

Create exactly SIX decorative niches in total.

Preferred layout:
- THREE clearly separate niches on the left.
- THREE clearly separate niches on the right.

The six niches should visually read as six intentional openings.

Do NOT add a seventh niche.
Do NOT add extra recessed boxes.
`;

    const prompt = `
You are editing a real customer's living-room photograph for Solutionbouw,
a professional Dutch Cinewall and interior construction company.

THIS IS AN IMAGE EDITING TASK.
DO NOT CREATE A NEW ROOM.

==================================================
MOST IMPORTANT RULES
==================================================

1. Preserve the customer's real room.
2. Follow the requested decorative niche count EXACTLY.
3. Follow the customer's selected configuration.
4. Make the Cinewall physically buildable.
5. Keep the result photorealistic.

The uploaded photograph is the source of truth.

==================================================
PRESERVE THE ORIGINAL ROOM
==================================================

Keep unchanged as much as physically possible:

- camera position
- camera angle
- perspective
- room dimensions
- floor
- ceiling
- windows
- doors
- stairs
- radiators
- surrounding walls
- existing architecture
- furniture outside the Cinewall area
- objects outside the Cinewall area
- lighting direction

Do NOT redesign the entire room.

Do NOT create a different house.

Do NOT change the floor.

Do NOT change the ceiling.

Do NOT move windows or doors.

Do NOT enlarge or shrink the room.

Do NOT invent architectural openings.

Do NOT move unrelated furniture.

Do NOT change the camera viewpoint.

ONLY redesign the intended main TV wall.

==================================================
DEFINITION OF A NICHE
==================================================

For this task, a "niche" means:

ONE intentionally designed decorative recessed opening
used for decoration, display or architectural styling.

A fireplace opening is NOT a decorative niche.

The TV recess is NOT a decorative niche.

A TV cabinet opening is NOT a decorative niche.

A shadow gap is NOT a decorative niche.

A tiny construction gap is NOT a decorative niche.

If one large decorative niche contains internal decorative shelves that divide
it into separate visible compartments, those compartments may visually become
multiple niches.

Therefore, when EXACTLY 2 niches are requested, DO NOT divide the two niches
into upper and lower compartments.

==================================================
ABSOLUTE NICHE REQUIREMENT
==================================================

${nicheInstruction}

THIS REQUIREMENT HAS HIGHER PRIORITY THAN DECORATIVE CREATIVITY.

Before producing the final image, internally verify:

Requested decorative niches: ${nicheCount}

Visible decorative niches in final design MUST equal: ${nicheCount}

If your proposed design contains the wrong number,
simplify or restructure the Cinewall before producing the final image.

==================================================
CUSTOMER CONFIGURATION
==================================================

Cinewall model:
${cinewallType || "No specific model supplied"}

Cinewall width:
${cinewallWidth || "Determine from the available wall"}

Style:
${style}

TV:
${tvSize} inch

Decorative niches:
EXACTLY ${nicheCount}

Electric fireplace:
${fireplace}

Fireplace model:
${fireplaceModel || "No specific model supplied"}

TV cabinet:
${cabinet || "No TV cabinet specified"}

Wood / decorative finish:
${wood || "No specific finish supplied"}

Price reference:
${price || "No price supplied"}

==================================================
CINEWALL DESIGN
==================================================

Create a premium but realistic custom-built Dutch Cinewall.

The television should be the visual center.

Use realistic proportions for a ${tvSize}-inch television.

The Cinewall must fit naturally within the existing wall.

Use:
- clean architectural lines
- precise edges
- professional plasterwork or panel finishing
- realistic depth
- concealed cables
- subtle warm lighting
- realistic shadows
- premium but buildable materials

Avoid:
- futuristic shapes
- fantasy architecture
- excessive decoration
- random shelves
- random niches
- excessive LEDs
- impossible floating structures
- exaggerated luxury
- obvious CGI appearance

${
  cinewallWidth
    ? `
The requested Cinewall width is approximately ${cinewallWidth}.
Respect this dimension visually relative to the real wall.
`
    : `
Determine a realistic width from the visible wall.
`
}

==================================================
FIREPLACE
==================================================

${
  hasFireplace
    ? `
Include exactly ONE electric fireplace.

Requested model:
${fireplaceModel}

Integrate it naturally beneath the television.

Use realistic proportions and realistic spacing between
the television and fireplace.

The fireplace must be part of the Cinewall construction.

Do NOT add a second fireplace.

Remember:
THE FIREPLACE DOES NOT COUNT AS A DECORATIVE NICHE.
`
    : `
DO NOT include a fireplace.

No flames.
No fireplace opening.
No fireplace-shaped decorative feature.
`
}

==================================================
TV CABINET
==================================================

${
  hasCabinet
    ? `
Include the selected TV cabinet:

${cabinet}

Integrate it naturally into the lower section.

Keep realistic depth and construction dimensions.

THE TV CABINET DOES NOT COUNT AS A DECORATIVE NICHE.
`
    : `
Do not add a separate TV cabinet unless structurally required
by the specified Cinewall model.
`
}

==================================================
WOOD FINISH
==================================================

${
  hasWood
    ? `
Use the selected wood / decorative finish:

${wood}

Use it as a controlled architectural accent.

Prefer using the wood finish inside the requested decorative niches
or in clearly intentional accent areas.

Do NOT cover the entire room in wood.

Do NOT create additional niches simply to show more wood.
`
    : `
Do not invent decorative wood slats or wood panels unless
required by the selected Cinewall model.
`
}

==================================================
STYLE
==================================================

Selected style:
${style}

If Modern:
use calm contemporary materials,
clean geometry and restrained detailing.

If Luxury:
use richer premium finishes and refined lighting,
while remaining realistic and buildable.

If Minimal:
use fewer visual elements,
clean surfaces and very subtle detailing.

==================================================
PHOTOREALISM
==================================================

Match the original photograph:

- exposure
- color temperature
- perspective
- lens appearance
- sharpness
- light direction
- shadows
- reflections
- material texture

The new Cinewall must connect naturally to the existing
floor, wall and ceiling.

Do not renovate unrelated areas.

Do not beautify the rest of the room unnecessarily.

The final image must look like a photograph taken
after Solutionbouw completed the installation.

==================================================
FINAL CHECK BEFORE OUTPUT
==================================================

Verify all of these:

- Same room: YES
- Same camera position: YES
- Same floor: YES
- Same windows and doors: YES
- TV size approximately ${tvSize} inch: YES
- Decorative niche count exactly ${nicheCount}: YES
- Fireplace requirement followed: YES
- TV cabinet requirement followed: YES
- Physically buildable: YES
- Photorealistic: YES

The customer should think:

"This is my actual room, with a Cinewall that Solutionbouw could really build."
`;

    const result = await openai.images.edit({
      model: "gpt-image-2",
      image: uploadedImage,
      prompt,
      size: "1536x1024",
      quality: "medium",
    });

    const generatedImage = result.data?.[0]?.b64_json;

    if (!generatedImage) {
      throw new Error("Geen afbeelding gegenereerd.");
    }

    return Response.json({
      success: true,
      image: `data:image/png;base64,${generatedImage}`,
    });
  } catch (error) {
    console.error("Cinewall AI error:", error);

    return Response.json(
      {
        success: false,
        error: "Het AI-ontwerp kon niet worden gegenereerd.",
      },
      {
        status: 500,
      }
    );
  }
}