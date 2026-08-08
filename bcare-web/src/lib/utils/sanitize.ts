import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content using DOMPurify.
 * Used for blog content and any user-generated HTML.
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: strip all HTML tags as a safe fallback
    return html.replace(/<[^>]*>/g, '');
  }
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'b', 'i',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span', 'pre', 'code', 'hr',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'width', 'height',
      'class', 'id', 'target', 'rel',
    ],
    ALLOW_DATA_ATTR: false,
  });
}
