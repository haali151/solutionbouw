import sanitizeHtml from "sanitize-html";

// Imported descriptions retain basic formatting, never executable content or links.
export function safeProductHtml(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: ["p", "br", "div", "span", "h1", "h2", "h3", "h4", "ul", "ol", "li", "strong", "b", "em", "i", "table", "thead", "tbody", "tr", "th", "td"],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  });
}
