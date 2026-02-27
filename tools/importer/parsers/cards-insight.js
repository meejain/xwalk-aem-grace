/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-insight. Base: cards. Source: https://grace.com/. Generated: 2026-02-27.
 * UE Model: container block with child "card" items. Card fields: image (reference), text (richtext)
 * Block library: N rows, 2 columns each: [image | text content]
 * Source DOM: section#blogs .media-callout, each with .media-image img, h5 (category), a (title+link), a>strong (read more)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all media-callout items in the blogs section
  // Found in DOM: .cmp-media-callout inside section#blogs
  const callouts = element.querySelectorAll('.cmp-media-callout');
  const calloutElements = callouts.length > 0 ? callouts : [element];

  calloutElements.forEach((callout) => {
    // Column 1: Image - found in DOM: .media-image .img img
    const img = callout.querySelector('.media-image .img img, .media-image img, .img img');
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    if (img) imgFrag.appendChild(img);

    // Column 2: Text content
    // Found in DOM: .subhead-small h5 (category), .subhead-small p>a (title link), .subhead-small p>a>strong (read more)
    const category = callout.querySelector('.subhead-small h5');
    const titleLink = callout.querySelector('.subhead-small p a');
    const readMoreLink = callout.querySelector('.subhead-small p a strong');

    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    if (category) {
      const h5 = document.createElement('h5');
      h5.textContent = category.textContent.trim();
      textFrag.appendChild(h5);
    }

    if (titleLink && !readMoreLink) {
      // This is the title link (not the read more)
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = titleLink.href;
      a.textContent = titleLink.textContent.trim();
      p.appendChild(a);
      textFrag.appendChild(p);
    } else if (titleLink) {
      // First link is title, find it specifically
      const links = callout.querySelectorAll('.subhead-small p a');
      if (links.length > 0) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = links[0].href;
        a.textContent = links[0].textContent.trim();
        p.appendChild(a);
        textFrag.appendChild(p);
      }
      // Add read more link
      if (links.length > 1) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = links[1].href;
        const strong = document.createElement('strong');
        strong.textContent = links[1].textContent.trim();
        a.appendChild(strong);
        p.appendChild(a);
        textFrag.appendChild(p);
      }
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-insight', cells });
  element.replaceWith(block);
}
