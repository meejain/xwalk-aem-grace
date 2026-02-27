/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product. Base: cards. Source: https://grace.com/. Generated: 2026-02-27.
 * UE Model: container block with child "card" items. Card fields: image (reference), text (richtext)
 * Block library: N rows, 2 columns each: [image | text content]
 * Source DOM: section:has(article.m-p-t-sm) .card elements, each with .image img and .text (h4.title + .spt-copy p)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all card items - found in DOM: .card-item inside the matched element
  const cards = element.querySelectorAll('.card-item');

  // If no .card-item found, try the element itself
  const cardElements = cards.length > 0 ? cards : [element];

  cardElements.forEach((card) => {
    // Column 1: Image - found in DOM: .image img
    const img = card.querySelector('.image img, .cmp-card .image img');
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    if (img) imgFrag.appendChild(img);

    // Column 2: Text content - found in DOM: .h4.title (heading), .spt-copy p (description)
    const title = card.querySelector('.h4.title, p.h4.title');
    const description = card.querySelector('.spt-copy p, .spt-copy');
    const link = card.closest('a') || card.querySelector('a.cmp-card');

    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    if (title) {
      const h = document.createElement('h4');
      h.textContent = title.textContent.trim();
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = title.textContent.trim();
        h.textContent = '';
        h.appendChild(a);
      }
      textFrag.appendChild(h);
    }

    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
