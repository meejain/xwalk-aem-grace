var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".hero__section > img, img");
    const heading = element.querySelector(".hero__heading h1, .hero__content h1, h1");
    const ctaLink = element.querySelector("a.btn-primary, .hero__button a");
    const imageCell = [];
    if (bgImage) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      imgFrag.appendChild(bgImage);
      imageCell.push(imgFrag);
    }
    const textCell = [];
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    if (ctaLink) {
      const p = document.createElement("p");
      p.appendChild(ctaLink);
      textFrag.appendChild(p);
    }
    textCell.push(textFrag);
    const cells = [imageCell, textCell];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse2(element, { document }) {
    const cells = [];
    const cards = element.querySelectorAll(".card-item");
    const cardElements = cards.length > 0 ? cards : [element];
    cardElements.forEach((card) => {
      const img = card.querySelector(".image img, .cmp-card .image img");
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      if (img) imgFrag.appendChild(img);
      const title = card.querySelector(".h4.title, p.h4.title");
      const description = card.querySelector(".spt-copy p, .spt-copy");
      const link = card.closest("a") || card.querySelector("a.cmp-card");
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (title) {
        const h = document.createElement("h4");
        h.textContent = title.textContent.trim();
        if (link) {
          const a = document.createElement("a");
          a.href = link.href;
          a.textContent = title.textContent.trim();
          h.textContent = "";
          h.appendChild(a);
        }
        textFrag.appendChild(h);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-industry.js
  function parse3(element, { document }) {
    const cells = [];
    const cards = element.querySelectorAll(".card-item");
    const cardElements = cards.length > 0 ? cards : [element];
    cardElements.forEach((card) => {
      const img = card.querySelector(".image img");
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      if (img) imgFrag.appendChild(img);
      const ctaEl = card.querySelector(".cta.btn-track, .cta");
      const link = card.closest("a") || card.querySelector("a.cmp-card");
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (ctaEl && link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = ctaEl.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(a);
        textFrag.appendChild(p);
      } else if (ctaEl) {
        const p = document.createElement("p");
        p.textContent = ctaEl.textContent.trim();
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-industry", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-insight.js
  function parse4(element, { document }) {
    const cells = [];
    const callouts = element.querySelectorAll(".cmp-media-callout");
    const calloutElements = callouts.length > 0 ? callouts : [element];
    calloutElements.forEach((callout) => {
      const img = callout.querySelector(".media-image .img img, .media-image img, .img img");
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      if (img) imgFrag.appendChild(img);
      const category = callout.querySelector(".subhead-small h5");
      const titleLink = callout.querySelector(".subhead-small p a");
      const readMoreLink = callout.querySelector(".subhead-small p a strong");
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (category) {
        const h5 = document.createElement("h5");
        h5.textContent = category.textContent.trim();
        textFrag.appendChild(h5);
      }
      if (titleLink && !readMoreLink) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = titleLink.href;
        a.textContent = titleLink.textContent.trim();
        p.appendChild(a);
        textFrag.appendChild(p);
      } else if (titleLink) {
        const links = callout.querySelectorAll(".subhead-small p a");
        if (links.length > 0) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = links[0].href;
          a.textContent = links[0].textContent.trim();
          p.appendChild(a);
          textFrag.appendChild(p);
        }
        if (links.length > 1) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = links[1].href;
          const strong = document.createElement("strong");
          strong.textContent = links[1].textContent.trim();
          a.appendChild(strong);
          p.appendChild(a);
          textFrag.appendChild(p);
        }
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-insight", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse5(element, { document }) {
    const columns = element.querySelectorAll(":scope > article > .row > .col-lg-6");
    const row = [];
    columns.forEach((col) => {
      const cellContent = document.createDocumentFragment();
      const imgLink = col.querySelector(".cmp-image__link");
      const img = col.querySelector(".cmp-image__image, .cmp-image img, img");
      if (img) {
        const picture = document.createElement("p");
        picture.appendChild(img);
        cellContent.appendChild(picture);
      }
      const textEl = col.querySelector(".rich-text p, .rich-text");
      if (textEl) {
        const p = document.createElement("p");
        p.innerHTML = textEl.innerHTML;
        cellContent.appendChild(p);
      }
      const ctaLink = col.querySelector("a.btn-primary");
      if (ctaLink) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = ctaLink.href;
        a.textContent = ctaLink.textContent.trim();
        p.appendChild(a);
        cellContent.appendChild(p);
      }
      row.push(cellContent);
    });
    const cells = row.length > 0 ? [row] : [];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/embed-video.js
  function parse6(element, { document }) {
    const posterImg = element.querySelector(".media-video .img img, .media-image .img img");
    const iframe = element.querySelector('iframe[src*="youtube"]');
    const video = element.querySelector('video[src*="youtube"]');
    let youtubeUrl = "";
    if (iframe && iframe.src) {
      const srcUrl = iframe.src.startsWith("//") ? "https:" + iframe.src : iframe.src;
      const match = srcUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
      if (match) {
        youtubeUrl = "https://www.youtube.com/watch?v=" + match[1];
      } else {
        youtubeUrl = srcUrl;
      }
    } else if (video && video.src) {
      const srcUrl = video.src.startsWith("//") ? "https:" + video.src : video.src;
      const match = srcUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
      if (match) {
        youtubeUrl = "https://www.youtube.com/watch?v=" + match[1];
      } else {
        youtubeUrl = srcUrl;
      }
    }
    const cellContent = document.createDocumentFragment();
    if (posterImg) {
      cellContent.appendChild(document.createComment(" field:embed_placeholder "));
      cellContent.appendChild(posterImg);
    }
    if (youtubeUrl) {
      cellContent.appendChild(document.createComment(" field:embed_uri "));
      const a = document.createElement("a");
      a.href = youtubeUrl;
      a.textContent = youtubeUrl;
      const p = document.createElement("p");
      p.appendChild(a);
      cellContent.appendChild(p);
    }
    const cells = [[cellContent]];
    const block = WebImporter.Blocks.createBlock(document, { name: "embed-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/grace-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        'iframe[src*="demdex.net"]',
        ".grecaptcha-badge"
      ]);
      WebImporter.DOMUtils.remove(element, [
        'link[href*="clientlibs"]',
        'link[href*="/etc.clientlibs/"]'
      ]);
      WebImporter.DOMUtils.remove(element, [".media-modal"]);
      const icons = element.querySelectorAll("i.fas");
      icons.forEach((icon) => icon.remove());
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--header",
        "#header",
        ".main-navigation",
        ".search-bar-cmp"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--footer",
        "footer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".skip-content",
        ".alert-banner",
        ".contact-us-sticky"
      ]);
      WebImporter.DOMUtils.remove(element, ["iframe", "noscript"]);
    }
  }

  // tools/importer/transformers/grace-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section) => {
        let sectionEl = null;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        for (const sel of selectors) {
          try {
            sectionEl = element.querySelector(sel);
            if (sectionEl) break;
          } catch (e) {
          }
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadataBlock);
        }
        if (section.id !== sections[0].id) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-banner": parse,
    "cards-product": parse2,
    "cards-industry": parse3,
    "cards-insight": parse4,
    "columns-feature": parse5,
    "embed-video": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Grace homepage \u2014 main landing page with company overview and key content areas",
    urls: [
      "https://grace.com/"
    ],
    blocks: [
      {
        name: "hero-banner",
        instances: ["div.generic-hero"]
      },
      {
        name: "cards-product",
        instances: ["section:has(article.m-p-t-sm) .card"]
      },
      {
        name: "columns-feature",
        instances: ["section:has(> article > .row > .col-lg-6 > .section > section.white-bkgd)"]
      },
      {
        name: "cards-industry",
        instances: ["section.background-image .cmp-card-list .card"]
      },
      {
        name: "embed-video",
        instances: ["div.cmp-media-callout.slate-bkgd"]
      },
      {
        name: "cards-insight",
        instances: ["section#blogs .media-callout"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "div.generic-hero",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "About Grace Promo",
        selector: "section#aboutgrace",
        style: "light-gray",
        blocks: [],
        defaultContent: [
          "section#aboutgrace .cmp-card-list .card .h2.title",
          "section#aboutgrace .cmp-card-list .card .cta"
        ]
      },
      {
        id: "section-3",
        name: "Products",
        selector: [
          "section:has(> article.m-p-t-md > .row > .col-lg-12 > .rich-text > h2)",
          "section:has(article.m-p-t-sm > .row > .col-lg-3 > .card)"
        ],
        style: null,
        blocks: ["cards-product"],
        defaultContent: ["div.rich-text h2"]
      },
      {
        id: "section-4",
        name: "People and Careers",
        selector: "section:has(> article > .row > .col-lg-6 > .section > section.white-bkgd)",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Industries",
        selector: "section.background-image:has(.card-list)",
        style: "background-image",
        blocks: ["cards-industry"],
        defaultContent: ["div.rich-text h3"]
      },
      {
        id: "section-6",
        name: "Video Callout",
        selector: "section:has(.cmp-media-callout.slate-bkgd)",
        style: "dark",
        blocks: ["embed-video"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Insights from Grace",
        selector: "section#blogs",
        style: "light-gray",
        blocks: ["cards-insight"],
        defaultContent: [
          "section#blogs > article > h2",
          "section#allblogs .button a"
        ]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
              section: blockDef.section || null
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
  var import_homepage_default = {
    /**
     * Main transformation function (one input / multiple outputs pattern)
     */
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
