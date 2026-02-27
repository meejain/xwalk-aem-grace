/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Grace cleanup. Selectors from captured DOM of grace.com.
 * Removes non-authorable content: header, footer, navigation, search,
 * cookie banners, sticky elements, and other site chrome.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie/tracking elements that may block parsing
    // Found in DOM: iframe with demdex.net, .grecaptcha-badge
    WebImporter.DOMUtils.remove(element, [
      'iframe[src*="demdex.net"]',
      '.grecaptcha-badge',
    ]);

    // Remove link elements (CSS clientlib includes) - found in DOM: link[href*="clientlibs"]
    WebImporter.DOMUtils.remove(element, [
      'link[href*="clientlibs"]',
      'link[href*="/etc.clientlibs/"]',
    ]);

    // Remove media modals (video overlay popups) - found in DOM: div.media-modal
    WebImporter.DOMUtils.remove(element, ['.media-modal']);

    // Remove font awesome icons - found in DOM: i.fas
    const icons = element.querySelectorAll('i.fas');
    icons.forEach((icon) => icon.remove());
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header/navigation - found in DOM: .cmp-experiencefragment--header, #header
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--header',
      '#header',
      '.main-navigation',
      '.search-bar-cmp',
    ]);

    // Remove footer - found in DOM: .cmp-experiencefragment--footer, footer
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--footer',
      'footer',
    ]);

    // Remove skip link, alert banner, sticky contact - found in DOM
    WebImporter.DOMUtils.remove(element, [
      '.skip-content',
      '.alert-banner',
      '.contact-us-sticky',
    ]);

    // Remove iframes and noscript elements
    WebImporter.DOMUtils.remove(element, ['iframe', 'noscript']);
  }
}
