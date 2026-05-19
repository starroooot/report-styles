/* ── 분리 테이블 행 높이 동기화 ── */
function syncRowHeights() {
  document.querySelectorAll('.table-scroll').forEach(function(wrapper) {
    var fixedRows  = wrapper.querySelectorAll('.table-fixed-col tr');
    var scrollRows = wrapper.querySelectorAll('.table-scroll-body tr');
    var len = Math.min(fixedRows.length, scrollRows.length);
    for (var i = 0; i < len; i++) {
      fixedRows[i].style.height  = '';
      scrollRows[i].style.height = '';
    }
    for (var i = 0; i < len; i++) {
      var h = Math.max(fixedRows[i].offsetHeight, scrollRows[i].offsetHeight);
      fixedRows[i].style.height  = h + 'px';
      scrollRows[i].style.height = h + 'px';
    }
  });
}

/* ── 말줄임 툴팁 ── */
function initTooltips() {
  var tip = document.createElement('div');
  tip.style.cssText = [
    'position:fixed', 'z-index:9999', 'pointer-events:none',
    'background:#27241f', 'color:#fff',
    'padding:5px 10px', 'border-radius:4px',
    'font-size:12px', 'line-height:1.5',
    'white-space:nowrap', 'max-width:80vw', 'word-break:keep-all',
    'opacity:0', 'transition:opacity 0.15s'
  ].join(';');
  document.body.appendChild(tip);

  var activeTd = null;

  function show(td) {
    var r = td.getBoundingClientRect();
    tip.textContent = td.textContent.trim();
    tip.style.opacity = '1';
    tip.style.top  = (r.bottom + 6) + 'px';
    tip.style.left = r.left + 'px';
    var tw = tip.offsetWidth;
    if (r.left + tw > window.innerWidth - 8) {
      tip.style.left = Math.max(8, window.innerWidth - tw - 8) + 'px';
    }
    activeTd = td;
  }

  function hide() {
    tip.style.opacity = '0';
    activeTd = null;
  }

  var sel = '.table-fixed-col td, .truncate-first td:first-child';
  document.querySelectorAll(sel).forEach(function(td) {
    if (td.scrollWidth <= td.offsetWidth) return;
    td.classList.add('has-tooltip');
    td.addEventListener('mouseenter', function() { show(td); });
    td.addEventListener('mouseleave', hide);
    td.addEventListener('click', function(e) {
      activeTd === td ? hide() : show(td);
      e.stopPropagation();
    });
  });

  document.addEventListener('click', hide);
}

syncRowHeights();
initTooltips();
window.addEventListener('resize', function() {
  syncRowHeights();
  initTooltips();
});
