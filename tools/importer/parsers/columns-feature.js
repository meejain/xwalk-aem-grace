/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature. Base: columns. Source: https://grace.com/. Generated: 2026-02-27.
 * UE Model: columns block - NO field hints required (Columns exception)
 * Block library: 1 row, 2+ columns with default content in each cell
 * Source DOM: section with two .col-lg-6 divs, each containing .section > section.white-bkgd
 *   with image (.cmp-image img), text (.rich-text p), and button (a.btn-primary)
 */
export default function parse(element, { document }) {
  // Find the two column containers
  // Found in DOM: .col-lg-6 divs containing .section > section.white-bkgd > article
  const columns = element.querySelectorAll(':scope > article > .row > .col-lg-6');

  const row = [];

  columns.forEach((col) => {
    const cellContent = document.createDocumentFragment();

    // Image - found in DOM: .cmp-image img or .cmp-image__link > img
    const imgLink = col.querySelector('.cmp-image__link');
    const img = col.querySelector('.cmp-image__image, .cmp-image img, img');
    if (img) {
      const picture = document.createElement('p');
      picture.appendChild(img);
      cellContent.appendChild(picture);
    }

    // Text content - found in DOM: .rich-text p
    const textEl = col.querySelector('.rich-text p, .rich-text');
    if (textEl) {
      const p = document.createElement('p');
      p.innerHTML = textEl.innerHTML;
      cellContent.appendChild(p);
    }

    // CTA button - found in DOM: a.btn-primary
    const ctaLink = col.querySelector('a.btn-primary');
    if (ctaLink) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      p.appendChild(a);
      cellContent.appendChild(p);
    }

    row.push(cellContent);
  });

  const cells = row.length > 0 ? [row] : [];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
