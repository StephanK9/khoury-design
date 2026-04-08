(function () {
  const emailLink = document.getElementById('eml');
  if (emailLink) {
    emailLink.setAttribute('href', ['mai', 'lto:', 'hello', '@', 'khoury', '.design'].join(''));
  }
})();

(function () {
  const box = document.getElementById('cs');
  const overlay = document.getElementById('cs-b');
  const line = document.getElementById('cs-line');
  const knob = document.getElementById('cs-btn');
  const range = document.getElementById('cs-range');

  if (!box || !overlay || !line || !knob || !range) return;

  let isDragging = false;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setPosition(percent) {
    const safe = clamp(percent, 1, 99);
    overlay.style.clipPath = `inset(0 ${100 - safe}% 0 0)`;
    line.style.left = `${safe}%`;
    knob.style.left = `${safe}%`;
    range.value = String(Math.round(safe));
  }

  function getPercentFromClientX(clientX) {
    const rect = box.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  function startDrag(clientX) {
    isDragging = true;
    setPosition(getPercentFromClientX(clientX));
  }

  function moveDrag(clientX) {
    if (!isDragging) return;
    setPosition(getPercentFromClientX(clientX));
  }

  function endDrag() {
    isDragging = false;
  }

  range.addEventListener('input', function (event) {
    setPosition(Number(event.target.value));
  });

  box.addEventListener('pointerdown', function (event) {
    box.setPointerCapture(event.pointerId);
    startDrag(event.clientX);
  });

  box.addEventListener('pointermove', function (event) {
    moveDrag(event.clientX);
  });

  box.addEventListener('pointerup', endDrag);
  box.addEventListener('pointercancel', endDrag);
  box.addEventListener('pointerleave', endDrag);

  setPosition(50);
})();
