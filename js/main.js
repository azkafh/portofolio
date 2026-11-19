import { items } from './data/items.js';
import { links } from './data/links.js';
import { backdropPhotos } from './data/backdrop.js';
import { createItem } from './components/item.js';
import { renderBackdrop } from './components/backdrop.js';
import { createStrings } from './components/strings.js';
import { makeDraggable } from './components/drag.js';
import { createCamera } from './components/camera.js';

const root = document.documentElement;
const board = document.getElementById('board');
const world = document.getElementById('world');
const curtain = document.getElementById('curtain');

renderBackdrop(document.getElementById('backdrop'), backdropPhotos);

const els = {};
for (const it of items) { els[it.id] = createItem(it); world.appendChild(els[it.id]); }

els.hero = document.querySelector('.hero');   // hero ikut jadi ujung benang

const strings = createStrings(document.getElementById('strings'), els, links);
const camera = createCamera(world, board);

// ---- Klik note: zoom in → tirai warna → pindah ke halaman (file HTML lain) ----
let leaving = false;
function openFile(it) {
  if (leaving || !it.href) return;
  leaving = true;
  const color = getComputedStyle(els[it.id]).backgroundColor;
  try { sessionStorage.setItem('cb:arrive', color); } catch (e) {}
  camera.zoomTo(els[it.id]);
  curtain.style.background = color;
  setTimeout(() => curtain.classList.add('is-on'), 600);
  setTimeout(() => { location.href = it.href; }, 900);
}

for (const it of items) {
  const el = els[it.id];
  el.addEventListener('pointerenter', () => strings.highlight(it.id, true));
  el.addEventListener('pointerleave', () => strings.highlight(it.id, false));
  el.addEventListener('keydown', e => { if (e.key === 'Enter') openFile(it); });
  makeDraggable(el, board, { onMove: strings.draw, onClick: () => openFile(it) });
}

// ---- Kembali dari halaman case file: mulai dalam keadaan zoom, lalu zoom-out ----
let ret = null;
try { ret = JSON.parse(sessionStorage.getItem('cb:return') || 'null'); sessionStorage.removeItem('cb:return'); } catch (e) {}
if (ret && Date.now() - ret.t < 5000 && els[ret.id]) {
  camera.zoomTo(els[ret.id], false);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.classList.remove('arriving');
    camera.reset();
    setTimeout(() => { root.style.background = ''; }, 800);
  }));
} else {
  root.classList.remove('arriving');
  root.style.background = '';
}

// Tombol back browser (bfcache): halaman dipulihkan dalam keadaan zoom
addEventListener('pageshow', e => {
  if (e.persisted) { leaving = false; curtain.classList.remove('is-on'); camera.reset(); }
});

addEventListener('resize', strings.draw);
document.fonts?.ready.then(strings.draw);
strings.draw();