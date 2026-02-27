/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed-video. Base: embed. Source: https://grace.com/. Generated: 2026-02-27.
 * UE Model fields: embed_placeholder (reference), embed_placeholderAlt (collapsed), embed_uri (text)
 * Fields share prefix "embed" → 1 row with poster image + YouTube URL
 * Block library: 1 column, row 1 = optional poster image + video URL link
 * Source DOM: div.cmp-media-callout.slate-bkgd with .media-video .img img (poster)
 *   and iframe[src*="youtube"] or video[src*="youtube"] (YouTube URL)
 */
export default function parse(element, { document }) {
  // Extract poster/thumbnail image - found in DOM: .media-video .img img
  const posterImg = element.querySelector('.media-video .img img, .media-image .img img');

  // Extract YouTube URL - found in DOM: iframe[src*="youtube"], video[src*="youtube"]
  const iframe = element.querySelector('iframe[src*="youtube"]');
  const video = element.querySelector('video[src*="youtube"]');
  let youtubeUrl = '';

  if (iframe && iframe.src) {
    // Convert embed URL to watch URL: //www.youtube-nocookie.com/embed/ID → https://www.youtube.com/watch?v=ID
    const srcUrl = iframe.src.startsWith('//') ? 'https:' + iframe.src : iframe.src;
    const match = srcUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
    if (match) {
      youtubeUrl = 'https://www.youtube.com/watch?v=' + match[1];
    } else {
      youtubeUrl = srcUrl;
    }
  } else if (video && video.src) {
    const srcUrl = video.src.startsWith('//') ? 'https:' + video.src : video.src;
    const match = srcUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
    if (match) {
      youtubeUrl = 'https://www.youtube.com/watch?v=' + match[1];
    } else {
      youtubeUrl = srcUrl;
    }
  }

  // Build single cell: poster image + YouTube URL link
  // Fields embed_placeholder and embed_uri share "embed" prefix → same cell
  const cellContent = document.createDocumentFragment();

  if (posterImg) {
    cellContent.appendChild(document.createComment(' field:embed_placeholder '));
    cellContent.appendChild(posterImg);
  }

  if (youtubeUrl) {
    cellContent.appendChild(document.createComment(' field:embed_uri '));
    const a = document.createElement('a');
    a.href = youtubeUrl;
    a.textContent = youtubeUrl;
    const p = document.createElement('p');
    p.appendChild(a);
    cellContent.appendChild(p);
  }

  const cells = [[cellContent]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed-video', cells });
  element.replaceWith(block);
}
