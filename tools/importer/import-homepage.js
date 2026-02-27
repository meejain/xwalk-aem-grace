/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS - Import all parsers needed for the homepage template
import heroBannerParser from './parsers/hero-banner.js';
import cardsProductParser from './parsers/cards-product.js';
import cardsIndustryParser from './parsers/cards-industry.js';
import cardsInsightParser from './parsers/cards-insight.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import embedVideoParser from './parsers/embed-video.js';

// TRANSFORMER IMPORTS - Import all transformers from tools/importer/transformers/
import graceCleanupTransformer from './transformers/grace-cleanup.js';
import graceSectionsTransformer from './transformers/grace-sections.js';

// PARSER REGISTRY - Map parser names to functions
const parsers = {
  'hero-banner': heroBannerParser,
  'cards-product': cardsProductParser,
  'cards-industry': cardsIndustryParser,
  'cards-insight': cardsInsightParser,
  'columns-feature': columnsFeatureParser,
  'embed-video': embedVideoParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Grace homepage — main landing page with company overview and key content areas',
  urls: [
    'https://grace.com/',
  ],
  blocks: [
    {
      name: 'hero-banner',
      instances: ['div.generic-hero'],
    },
    {
      name: 'cards-product',
      instances: ['section:has(article.m-p-t-sm) .card'],
    },
    {
      name: 'columns-feature',
      instances: ['section:has(> article > .row > .col-lg-6 > .section > section.white-bkgd)'],
    },
    {
      name: 'cards-industry',
      instances: ['section.background-image .cmp-card-list .card'],
    },
    {
      name: 'embed-video',
      instances: ['div.cmp-media-callout.slate-bkgd'],
    },
    {
      name: 'cards-insight',
      instances: ['section#blogs .media-callout'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'div.generic-hero',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'About Grace Promo',
      selector: 'section#aboutgrace',
      style: 'light-gray',
      blocks: [],
      defaultContent: [
        'section#aboutgrace .cmp-card-list .card .h2.title',
        'section#aboutgrace .cmp-card-list .card .cta',
      ],
    },
    {
      id: 'section-3',
      name: 'Products',
      selector: [
        'section:has(> article.m-p-t-md > .row > .col-lg-12 > .rich-text > h2)',
        'section:has(article.m-p-t-sm > .row > .col-lg-3 > .card)',
      ],
      style: null,
      blocks: ['cards-product'],
      defaultContent: ['div.rich-text h2'],
    },
    {
      id: 'section-4',
      name: 'People and Careers',
      selector: 'section:has(> article > .row > .col-lg-6 > .section > section.white-bkgd)',
      style: null,
      blocks: ['columns-feature'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Industries',
      selector: 'section.background-image:has(.card-list)',
      style: 'background-image',
      blocks: ['cards-industry'],
      defaultContent: ['div.rich-text h3'],
    },
    {
      id: 'section-6',
      name: 'Video Callout',
      selector: 'section:has(.cmp-media-callout.slate-bkgd)',
      style: 'dark',
      blocks: ['embed-video'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'Insights from Grace',
      selector: 'section#blogs',
      style: 'light-gray',
      blocks: ['cards-insight'],
      defaultContent: [
        'section#blogs > article > h2',
        'section#allblogs .button a',
      ],
    },
  ],
};

// TRANSFORMER REGISTRY - Array of transformer functions
// Section transformer runs after cleanup (in afterTransform hook)
const transformers = [
  graceCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [graceSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
          });
        });
      } catch (e) {
        console.warn(`Invalid selector for block "${blockDef.name}": ${selector}`, e);
      }
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  /**
   * Main transformation function (one input / multiple outputs pattern)
   */
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
