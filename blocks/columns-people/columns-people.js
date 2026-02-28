export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-people-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // Find standalone picture element (xwalk-compatible: picture NOT inside <a>)
      const pic = col.querySelector('picture');

      if (pic) {
        // Create image wrapper
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('columns-people-img-col');
        imgWrapper.appendChild(pic);

        // Wrap remaining text content
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('columns-people-text-col');
        while (col.firstChild) {
          textWrapper.appendChild(col.firstChild);
        }

        // Rebuild column: image on top, text below
        col.appendChild(imgWrapper);
        col.appendChild(textWrapper);
      }
    });
  });
}
