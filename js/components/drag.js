// Drag dengan pointer events. Klik tanpa geser dianggap onClick.
const MOBILE = matchMedia('(max-width: 900px)');

export function makeDraggable(el, board, { onMove, onClick }) {
  let sx, sy, ox, oy, moved;
  el.addEventListener('pointerdown', e => {
    el.setPointerCapture(e.pointerId);
    sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop; moved = false;
  });
  el.addEventListener('pointermove', e => {
    if (!el.hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    if (!moved) return;
    if (MOBILE.matches) return;   // mobile: note tidak digeser (hanya diketuk); geser = bukan klik
    el.style.left = Math.max(0, Math.min(board.clientWidth - el.offsetWidth, ox + dx)) + 'px';
    el.style.top  = Math.max(0, Math.min(board.clientHeight - el.offsetHeight, oy + dy)) + 'px';
    onMove();
  });
  el.addEventListener('pointerup', () => { if (!moved) onClick(); });
}