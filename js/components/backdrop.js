export function renderBackdrop(container, photos) {
  container.innerHTML = photos.map(p => `
    <figure class="bg-photo" style="left:${p.x}%;top:${p.y}%;width:${p.w}px;--rot:${p.rot}deg">
      <img src="${p.src}" alt="" draggable="false"><i class="bg-photo__tape"></i>
    </figure>`).join('');
}