(function () {
  var pageUrl = location.href.split('#')[0];
  var toastEl = document.getElementById('toast');
  var toastTimer;

  document.getElementById('year').textContent = new Date().getFullYear();

  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  function copyLink() {
    if (!navigator.clipboard) return toast(pageUrl);
    navigator.clipboard.writeText(pageUrl).then(
      function () { toast('Link copied'); },
      function () { toast(pageUrl); }
    );
  }

  // Share: native share sheet on phones, copy-link fallback elsewhere
  document.getElementById('share-btn').addEventListener('click', function () {
    var data = {
      title: 'Ferreti Wall Systems',
      text: 'Ferreti Wall Systems — drywall & metal framing. +1 (747) 799-5305',
      url: pageUrl
    };
    if (navigator.share) {
      navigator.share(data).catch(function (err) {
        if (err && err.name !== 'AbortError') copyLink();
      });
    } else {
      copyLink();
    }
  });

  // QR code of this page, so someone can scan it straight off your phone
  var dialog = document.getElementById('qr-dialog');
  var qrBox = document.getElementById('qr-code');

  function renderQr() {
    if (qrBox.firstChild || typeof qrcode !== 'function') return;
    var qr = qrcode(0, 'M');
    qr.addData(pageUrl);
    qr.make();
    var n = qr.getModuleCount();
    var d = '';
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (qr.isDark(r, c)) d += 'M' + c + ' ' + r + 'h1v1h-1z';
      }
    }
    qrBox.innerHTML =
      '<svg viewBox="0 0 ' + n + ' ' + n + '" shape-rendering="crispEdges" role="img" aria-label="QR code linking to this page">' +
      '<path fill="#18191d" d="' + d + '"/></svg>';
    document.getElementById('qr-url').textContent = pageUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  document.getElementById('qr-btn').addEventListener('click', function () {
    renderQr();
    if (dialog.showModal) dialog.showModal();
  });

  dialog.addEventListener('click', function (e) {
    // close on the close button or a click on the backdrop (outside the dialog box)
    var box = dialog.getBoundingClientRect();
    var outside = e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom;
    if (e.target.closest('[data-close]') || outside) dialog.close();
  });
})();
