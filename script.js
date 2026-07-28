// Drives every .gallery on the page: prev/next buttons, wrap-around, and a
// caption that follows the visible photo (from its data-caption, else its alt).
document.querySelectorAll('.gallery').forEach(function (gallery) {
  var slides = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-frame img'));
  if (slides.length === 0) return;

  var caption = gallery.querySelector('.gallery-caption');
  var count = gallery.querySelector('.gallery-count');
  var prev = gallery.querySelector('.gallery-prev');
  var next = gallery.querySelector('.gallery-next');
  var controls = gallery.querySelector('.gallery-controls');
  var index = slides.findIndex(function (img) {
    return img.classList.contains('is-active');
  });
  if (index < 0) index = 0;

  function show(target) {
    index = (target + slides.length) % slides.length;
    slides.forEach(function (img, i) {
      img.classList.toggle('is-active', i === index);
    });
    if (caption) caption.textContent = slides[index].dataset.caption || slides[index].alt || '';
    if (count) count.textContent = (index + 1) + ' / ' + slides.length;
  }

  // A single photo needs no navigation.
  if (slides.length < 2 && controls) {
    controls.hidden = true;
  }

  if (prev) prev.addEventListener('click', function () { show(index - 1); });
  if (next) next.addEventListener('click', function () { show(index + 1); });

  gallery.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      show(index - 1);
    } else if (event.key === 'ArrowRight') {
      show(index + 1);
    } else {
      return;
    }
    event.preventDefault();
  });

  show(index);
});