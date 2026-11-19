export function createModal(dialog) {
  const $ = s => dialog.querySelector(s);
  $('[data-close]').onclick = () => dialog.close();
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  return it => {
    $('[data-tag]').textContent = it.tag ?? '';
    $('[data-title]').textContent = it.title;
    $('[data-body]').textContent = it.body ?? '';
    dialog.showModal();
  };
}
