/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Grace section breaks and section-metadata.
 * Processes sections from payload.template.sections to insert <hr> breaks
 * and Section Metadata blocks for styled sections.
 * Selectors from captured DOM of grace.com.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid DOM position shifts
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section) => {
      // Find the first element matching the section selector
      let sectionEl = null;
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];

      for (const sel of selectors) {
        try {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        } catch (e) {
          // Invalid selector, try next
        }
      }

      if (!sectionEl) return;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        // Insert section-metadata after the section element
        sectionEl.after(sectionMetadataBlock);
      }

      // Add <hr> before the section (but not for the first section)
      if (section.id !== sections[0].id) {
        // Only insert hr if there is content before this section
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
