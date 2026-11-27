/**
 * Build-time Rehype plugin that ensures all affiliate / partner outbound links
 * (e.g., `/go/...`, `link.waalaxy.com`, `waal.ink`) inside Markdown & MDX content
 * always carry `rel="sponsored nofollow noopener noreferrer"` and open in a new tab.
 */

const AFFILIATE_HREF_RE = /^(?:\/go\/|https?:\/\/(?:www\.)?(?:link\.waalaxy\.com|waal\.ink)\b)/i;
const REQUIRED_REL = ['sponsored', 'nofollow', 'noopener', 'noreferrer'];

function ensureSponsoredRel(existingRel) {
  const tokens = Array.isArray(existingRel)
    ? existingRel.flatMap((v) => String(v).split(/\s+/))
    : typeof existingRel === 'string'
      ? existingRel.split(/\s+/)
      : [];
  const merged = new Set(tokens.filter(Boolean));
  for (const token of REQUIRED_REL) {
    merged.add(token);
  }
  return Array.from(merged).join(' ');
}

function transformTree(node) {
  if (!node || !Array.isArray(node.children)) return;

  for (const child of node.children) {
    if (child.type === 'element' && child.tagName === 'a') {
      const href = typeof child.properties?.href === 'string' ? child.properties.href.trim() : '';
      if (AFFILIATE_HREF_RE.test(href)) {
        child.properties = child.properties || {};
        child.properties.rel = ensureSponsoredRel(child.properties.rel);
        child.properties.target = '_blank';
        child.properties['data-sponsored'] = 'true';
      }
    }
    transformTree(child);
  }
}

export default function rehypeSponsoredLinks() {
  return (tree) => {
    transformTree(tree);
  };
}

