import { renderNote } from './note.js';
import { renderPhoto } from './photo.js';

const renderers = { note: renderNote, photo: renderPhoto };

export function createItem(it) {
  const el = document.createElement('div');
  el.className = `item item--${it.type}` + (it.color ? ` item--${it.color}` : '') + (it.href ? ' item--menu' : '');
  el.dataset.id = it.id;                                        // dipakai css/mobile.css untuk posisi di HP
  el.style.left = it.x + '%';
  el.style.top = it.y + '%';
  el.style.setProperty('--rot', it.rot + 'deg');
  if (it.w) el.style.width = it.w + 'px';                       // lebar item (px), opsional
  if (it.ratio) el.style.setProperty('--ratio', it.ratio);      // rasio foto, mis. '3/4', opsional
  if (it.href) { el.tabIndex = 0; el.setAttribute('role', 'link'); el.setAttribute('aria-label', 'Buka ' + it.title); }
  el.innerHTML = renderers[it.type](it);
  return el;
}