/**
 * Build-time Rehype plugin that upgrades Markdown tables inside blog/review content:
 * 1. Wraps every <table> in <div class="prose-table-wrap"> for clean rounded framing & mobile horizontal scroll.
 * 2. Annotates column counts (data-cols) and detects Scorecard tables (data-table-kind="scorecard").
 * 3. Marks compact numeric columns (Weight, Score/Rating, Grade) and featured columns (Most Popular / Best Value)
 *    so column widths balance naturally without empty dead space.
 * 4. Enhances Score cells with star-pill badges and highlights Overall/Total summary rows.
 */

function getText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (Array.isArray(node.children)) {
    return node.children.map(getText).join('');
  }
  return '';
}

function getElementsByTag(parent, tagName) {
  if (!parent || !Array.isArray(parent.children)) return [];
  return parent.children.filter((child) => child.type === 'element' && child.tagName === tagName);
}

function enhanceTableNode(tableNode) {
  tableNode.properties = tableNode.properties || {};

  const theads = getElementsByTag(tableNode, 'thead');
  const tbodies = getElementsByTag(tableNode, 'tbody');

  const headerRows = theads.length > 0 ? getElementsByTag(theads[0], 'tr') : [];
  const thNodes = headerRows.length > 0 ? getElementsByTag(headerRows[0], 'th') : [];
  const headers = thNodes.map((th) => getText(th).trim());
  const colCount = headers.length;

  const hasScoreCol = headers.some((h) => /^(score|rating)\b/i.test(h));
  const hasWeightCol = headers.some((h) => /^weight\b/i.test(h));
  const isScorecard = hasScoreCol && (hasWeightCol || colCount === 4);

  const colTypes = headers.map((h) => {
    if (/^weight\b/i.test(h)) return 'weight';
    if (/^(score|rating)\b/i.test(h)) return 'score';
    if (/^(grade|rank)\b/i.test(h)) return 'metric';
    if (/most popular|best value|recommended/i.test(h)) return 'featured';
    return null;
  });

  thNodes.forEach((th, idx) => {
    th.properties = th.properties || {};
    if (colTypes[idx]) {
      th.properties['data-col'] = colTypes[idx];
    }
    // Strip hardcoded text-align:left from markdown `:---` on centered metric columns
    if (colTypes[idx] === 'weight' || colTypes[idx] === 'score' || colTypes[idx] === 'metric') {
      delete th.properties.align;
      if (typeof th.properties.style === 'string') {
        th.properties.style = th.properties.style.replace(/text-align\s*:\s*[^;]+;?/gi, '').trim() || undefined;
      }
    }
  });

  tbodies.forEach((tbody) => {
    const bodyRows = getElementsByTag(tbody, 'tr');
    bodyRows.forEach((tr, rowIdx) => {
      tr.properties = tr.properties || {};
      const tdNodes = getElementsByTag(tr, 'td');
      const firstCellText = tdNodes.length > 0 ? getText(tdNodes[0]).trim() : '';

      if (
        rowIdx === bodyRows.length - 1 &&
        bodyRows.length >= 3 &&
        /^(overall|total|final\s+score|weighted|average)\b/i.test(firstCellText)
      ) {
        tr.properties['data-row'] = 'summary';
      }

      tdNodes.forEach((td, colIdx) => {
        td.properties = td.properties || {};
        const colType = colTypes[colIdx];
        if (!colType) return;

        td.properties['data-col'] = colType;

        if (colType === 'weight' || colType === 'score' || colType === 'metric') {
          delete td.properties.align;
          if (typeof td.properties.style === 'string') {
            td.properties.style = td.properties.style.replace(/text-align\s*:\s*[^;]+;?/gi, '').trim() || undefined;
          }
        }

        const cellText = getText(td).trim();

        if (colType === 'weight' && /^\d+(?:\.\d+)?%$/.test(cellText)) {
          td.children = [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['table-weight-pill'] },
              children: td.children,
            },
          ];
        } else if (colType === 'score' && /^\d(?:\.\d+)?(?:\s*\/\s*(?:5|10)(?:\.0)?)?$/.test(cellText)) {
          td.children = [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['table-score-badge'] },
              children: [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['table-score-star'], 'aria-hidden': 'true' },
                  children: [{ type: 'text', value: '★' }],
                },
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['table-score-val'] },
                  children: td.children,
                },
              ],
            },
          ];
        }
      });
    });
  });

  if (colCount > 0) {
    tableNode.properties['data-cols'] = String(colCount);
  }
  if (isScorecard) {
    tableNode.properties['data-table-kind'] = 'scorecard';
  }

  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['prose-table-wrap'],
      ...(colCount > 0 ? { 'data-cols': String(colCount) } : {}),
      ...(isScorecard ? { 'data-table-kind': 'scorecard' } : {}),
    },
    children: [tableNode],
  };
}

function transformTree(node) {
  if (!node || !Array.isArray(node.children)) return;

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === 'element' && child.tagName === 'table') {
      const parentClasses = Array.isArray(node.properties?.className) ? node.properties.className : [];
      if (!parentClasses.includes('prose-table-wrap')) {
        node.children[i] = enhanceTableNode(child);
        continue;
      }
    }
    transformTree(child);
  }
}

export default function rehypeEnhanceTables() {
  return (tree) => {
    transformTree(tree);
  };
}

