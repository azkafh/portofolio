// Kamera: zoom lurus ke sebuah elemen (tanpa rotasi) dengan transform pada .world
export function createCamera(world, board) {
  return {
    zoomTo(el, animate = true) {
      const nx = el.offsetLeft + el.offsetWidth / 2, ny = el.offsetTop + el.offsetHeight / 2;
      const W = board.clientWidth, H = board.clientHeight;
      const s = Math.max(W / el.offsetWidth, H / el.offsetHeight) * 1.2;   // cukup besar untuk memenuhi board
      world.classList.toggle('world--instant', !animate);
      // titik tengah note → tengah board, hanya geser + perbesar
      world.style.transform = `translate(${W / 2 - s * nx}px, ${H / 2 - s * ny}px) scale(${s})`;
    },
    reset() {
      world.classList.remove('world--instant');
      world.style.transform = '';
    },
  };
}