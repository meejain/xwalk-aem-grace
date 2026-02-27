/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner. Base: hero. Source: https://grace.com/. Generated: 2026-02-27.
 * UE Model fields: image (reference), imageAlt (collapsed), text (richtext)
 * Block library: 1 column, row 1 = background image, row 2 = text (heading + CTA)
 * Source DOM: div.generic-hero > .hero__section contains img (background), h1 (heading), a.btn-primary (CTA)
 */
export default function parse(element, { document }) {
  // Row 1: Background image - found in DOM: div.hero__section > img
  const bgImage = element.querySelector('.hero__section > img, img');

  // Row 2: Text content - heading and CTA
  // Found in DOM: .hero__heading h1, a.btn-primary
  const heading = element.querySelector('.hero__heading h1, .hero__content h1, h1');
  const ctaLink = element.querySelector('a.btn-primary, .hero__button a');

  // Build image row with field hint
  const imageCell = [];
  if (bgImage) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    imgFrag.appendChild(bgImage);
    imageCell.push(imgFrag);
  }

  // Build text row with field hint
  const textCell = [];
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (ctaLink) {
    const p = document.createElement('p');
    p.appendChild(ctaLink);
    textFrag.appendChild(p);
  }
  textCell.push(textFrag);

  const cells = [imageCell, textCell];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
