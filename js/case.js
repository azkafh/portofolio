// Dipakai semua halaman case file (script biasa, bukan module)
(function () {
  var d = document.documentElement, b = document.body;
  var css = function (n) { return getComputedStyle(d).getPropertyValue('--' + n).trim(); };
  var color = css('note-paper');

  // ARRIVAL: hanya terjadi kalau datang dari zoom-in board (tab antar halaman = tanpa efek)
  try { sessionStorage.removeItem('cb:arrive'); } catch (e) {}
  if (d.classList.contains('arriving')) {
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      d.classList.add('entering'); d.classList.remove('arriving');
      setTimeout(function () { d.style.background = ''; d.classList.remove('entering'); }, 900);
    }); });
  }

  // KEMBALI KE BOARD: pudar ke warna note + catat note mana yang harus di-zoom-out
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-leave="board"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    try { sessionStorage.setItem('cb:return', JSON.stringify({ id: b.dataset.note, color: color, t: Date.now() })); } catch (err) {}
    d.style.background = color; d.classList.add('leaving');
    setTimeout(function () { location.href = a.href; }, 450);
  });

  addEventListener('pageshow', function (e) { if (e.persisted) { d.classList.remove('leaving'); d.style.background = ''; } });
})();