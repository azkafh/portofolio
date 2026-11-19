const NS = 'http://www.w3.org/2000/svg';

// id biasa ('about')   → pin di tengah atas note.
// id berjangkar ('hero@tl') → pin [data-anchor="tl"] di dalam elemen tersebut.
function pinPos(els, id) {
  const [base, anchor] = id.split('@');
  const el = els[base];
  if (anchor) {
    const pin = el.querySelector(`[data-anchor="${anchor}"]`);
    if (pin) return {
      x: el.offsetLeft + pin.offsetLeft + pin.offsetWidth / 2,
      y: el.offsetTop + pin.offsetTop + pin.offsetHeight / 2,
    };
  }
  return { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + 9 };
}

export function createStrings(svg, els, links) {
  const baseId = id => id.split('@')[0];

  const path = (cls, d, a, b) => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('class', cls); p.setAttribute('d', d);
    if (a) { p.dataset.a = a; p.dataset.b = b; }
    svg.appendChild(p);
  };

  function draw() {
    svg.replaceChildren();
    for (const [a, b] of links) {
      if (!els[baseId(a)] || !els[baseId(b)]) continue;      // id salah ketik: lewati, jangan error
      const p = pinPos(els, a), q = pinPos(els, b);
      const sag = Math.min(60, Math.hypot(q.x - p.x, q.y - p.y) * 0.12);   // benang kendur
      const d = `M${p.x} ${p.y} Q${(p.x + q.x) / 2} ${(p.y + q.y) / 2 + sag} ${q.x} ${q.y}`;
      path('string-shadow', d);
      path('string', d, baseId(a), baseId(b));
    }
  }

  function highlight(id, on) {
    svg.querySelectorAll('.string').forEach(s =>
      s.classList.toggle('string--hot', on && (s.dataset.a === id || s.dataset.b === id)));
  }

  return { draw, highlight };
}