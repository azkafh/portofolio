// Foto berbingkai putih. title (opsional) = keterangan tulisan tangan di bawah foto.
export const renderPhoto = it => `<i class="pin"></i>
  <div class="photo__img">${it.image ? `<img src="${it.image}" alt="${it.alt ?? it.title ?? ''}" draggable="false">` : 'FOTO'}</div>
  ${it.title ? `<b>${it.title}</b>` : ''}`;