/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-industry. Base: cards. Source: https://grace.com/. Generated: 2026-02-27.
 * UE Model: container block with child "card" items. Card fields: image (reference), text (richtext)
 * Block library: N rows, 2 columns each: [image | text content]
 * Source DOM: section.background-image .cmp-card-list .card, each with .image img and .cta (linked name)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all card items - found in DOM: .card-item inside matched .card elements
  const cards = element.querySelectorAll('.card-item');
  const cardElements = cards.length > 0 ? cards : [element];

  cardElements.forEach((card) => {
    // Column 1: Image - found in DOM: .image img
    const img = card.querySelector('.image img');
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    if (img) imgFrag.appendChild(img);

    // Column 2: Text - found in DOM: .cta.btn-track (industry name with link)
    const ctaEl = card.querySelector('.cta.btn-track, .cta');
    const link = card.closest('a') || card.querySelector('a.cmp-card');

    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    if (ctaEl && link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = ctaEl.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(a);
      textFrag.appendChild(p);
    } else if (ctaEl) {
      const p = document.createElement('p');
      p.textContent = ctaEl.textContent.trim();
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-industry', cells });
  element.replaceWith(block);
}
