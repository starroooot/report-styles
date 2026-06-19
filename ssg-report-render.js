/* 신세계 매출/실적 리포트 공용 렌더러
 * window.REPORT 데이터 객체를 읽어 기존 sales-report-style.css 구조로 DOM 생성.
 * 리포트 HTML 은 데이터(JSON)만 담고 렌더링은 이 파일이 담당 → 파일 크기 최소화.
 */
(function () {
  var R = window.REPORT;
  if (!R) return;
  var E = function (s) { return s == null ? '' : String(s); };

  // 가로 스크롤 테이블(고정 컬럼 + 본문 컬럼)
  function scrollTable(fixedHead, fixedRows, bodyHead, bodyRows) {
    var fh = '<div class="table-fixed-col"><table><thead><tr><th>' + fixedHead + '</th></tr></thead><tbody>';
    fixedRows.forEach(function (r) {
      fh += '<tr' + (r.hi ? ' class="highlight-row"' : (r.div ? ' class="divider-row"' : '')) + '><td>' +
        (r.div ? '' : (r.hi ? '<strong>' + E(r.label) + '</strong>' : E(r.label))) + '</td></tr>';
    });
    fh += '</tbody></table></div>';
    var bh = '<div class="table-scroll-body"><table><thead><tr>';
    bodyHead.forEach(function (h) { bh += '<th>' + h + '</th>'; });
    bh += '</tr></thead><tbody>';
    bodyRows.forEach(function (r) {
      if (r.div) { bh += '<tr class="divider-row"><td colspan="' + bodyHead.length + '"></td></tr>'; return; }
      bh += '<tr' + (r.hi ? ' class="highlight-row"' : '') + '>';
      r.cells.forEach(function (c, i) {
        var cls = '', inner = E(c);
        if (i === r.icoIdx && r.ico) inner = '<span class="ico-' + r.ico + '">' + (r.ico === 'warn' ? '⚠' : '✓') + '</span> ' + inner;
        if (r.warnIdx != null && i === r.warnIdx) cls = ' class="warn"';
        if (r.badge && i === r.cells.length - 1 && c === '') inner = '<span class="badge-' + r.badge + '">주목</span>';
        bh += '<td' + cls + '>' + inner + '</td>';
      });
      bh += '</tr>';
    });
    bh += '</tbody></table></div>';
    return '<div class="table-scroll">' + fh + bh + '</div>';
  }

  function section(title, inner) { return '<div class="section"><h2>' + title + '</h2>' + inner + '</div>'; }

  var H = '';
  // 헤더
  H += '<h1>' + E(R.head.title) + '</h1>';
  H += '<p class="meta">' + E(R.head.meta) + '</p>';
  H += '<p class="disclaimer">' + E(R.head.disclaimer) + '</p>';

  // 요약 카드
  if (R.cards) {
    var cg = '<div class="summary-grid">';
    R.cards.forEach(function (c) {
      cg += '<div class="summary-card"><div class="label">' + E(c.label) + '</div>' +
        '<div class="value' + (c.warn ? ' warn' : '') + '">' + E(c.value) + '</div>' +
        '<div class="sub">' + E(c.sub) + '</div></div>';
    });
    cg += '</div>';
    var st = scrollTable(R.summary.fixedHead, R.summary.fixedRows, R.summary.bodyHead, R.summary.bodyRows);
    var note = R.summary.note ? '<p style="font-size:12px;color:#666;">' + E(R.summary.note) + '</p>' : '';
    H += section(R.summary.title || '1. 요약', cg + st + note);
  }

  // 팀별/점포별 실적 테이블
  if (R.table) {
    H += section(R.table.title, scrollTable(R.table.fixedHead, R.table.fixedRows, R.table.bodyHead, R.table.bodyRows) +
      (R.table.note ? '<p style="font-size:12px;color:#666;">' + E(R.table.note) + '</p>' : ''));
  }

  // 주요 상세분석 (store-section + 범용 details 토글)
  // item = {n: 굵은 이름, d: 설명, items?: [중첩 item]}  — 재귀 렌더
  function itemList(items) {
    var s = '<ul>';
    items.forEach(function (it) {
      s += '<li>' + (it.n != null && it.n !== '' ? '<strong>' + E(it.n) + '</strong> ' : '') + E(it.d);
      if (it.items && it.items.length) s += itemList(it.items).replace('<ul>', '<ul style="margin-top:4px;">');
      s += '</li>';
    });
    return s + '</ul>';
  }
  // 토글 1개 본문: lines(단순 불릿) · items(이름/설명, 중첩 가능) · note(보충) 조합
  function detailBody(d) {
    var s = '';
    if (d.lines && d.lines.length) {
      s += '<ul>';
      d.lines.forEach(function (l) { s += '<li>' + E(l) + '</li>'; });
      s += '</ul>';
    }
    if (d.items && d.items.length) s += itemList(d.items);
    if (d.note) s += '<p style="margin-top:8px;font-size:12px;color:#666;">' + E(d.note) + '</p>';
    return s;
  }
  if (R.notable) {
    var ns = '';
    R.notable.forEach(function (t) {
      ns += '<div class="store-section"><div class="store-title' + (t.down ? ' down' : '') + '">' +
        '<span class="ico-' + (t.down ? 'down' : 'up') + '">✓</span> ' + E(t.name) +
        (t.sub ? ' <span style="font-weight:400;font-size:13px;">(' + E(t.sub) + ')</span>' : '') + '</div>';
      // 범용 details[] 우선, 없으면 legacy pcs/promo 를 details 로 변환(하위호환)
      var dets = t.details;
      if (!dets) {
        dets = [];
        if (t.pcs) dets.push({ label: t.pcLabel || 'PC 실적', open: true,
          items: t.pcs.map(function (p) { return { n: p.name, d: p.rate, items: p.items }; }), note: t.note });
        if (t.promo) dets.push({ label: 'MKT행사 · MD행사', lines: t.promo });
      }
      dets.forEach(function (d) {
        ns += '<details' + (d.open ? ' open' : '') + '><summary>' + E(d.label) + '</summary>' +
          detailBody(d) + '</details>';
      });
      ns += '</div>';
    });
    H += section(R.notable_title || '주요 상세분석', ns);
  }

  // MKT / MD 행사 테이블
  function promoSection(p) {
    if (!p) return '';
    var head = '<p style="font-size:12px;color:#555;margin-bottom:10px;">' + E(p.summary) + '</p>';
    var fixedRows = p.rows.map(function (r) { return { label: r[0] }; });
    var bodyRows = p.rows.map(function (r) { return { cells: r.slice(1) }; });
    var tbl = scrollTable(p.fixedHead, fixedRows, p.bodyHead, bodyRows);
    var an = '';
    if (p.analysis) { an = '<ul>'; p.analysis.forEach(function (a) { an += '<li>' + E(a) + '</li>'; }); an += '</ul>'; }
    return head + tbl + an;
  }
  if (R.mkt) H += section(R.mkt.title || '4. MKT행사', promoSection(R.mkt));
  if (R.md) H += section(R.md.title || '5. MD행사', promoSection(R.md));

  // 날씨
  if (R.weather) {
    H += section(R.weather.title || '6. 날씨',
      '<p>' + E(R.weather.desc) + '</p><p style="font-size:12px;color:#666;margin-top:4px;">' + E(R.weather.note) + '</p>');
  }

  // 확인 권고 — 컬럼 수 데이터 주도. prioCol(우선순위 컬럼 인덱스) 지정 시 그 셀만 배지 스타일.
  // 점포 유형: head=[우선순위,항목,근거], prioCol=0 / 전사 유형: head=[점포,내용], prioCol 생략
  if (R.confirm) {
    var ct = '<table class="confirm-table"><thead><tr>';
    R.confirm.head.forEach(function (h) { ct += '<th>' + h + '</th>'; });
    ct += '</tr></thead><tbody>';
    var prioCol = R.confirm.prioCol;
    if (prioCol == null && R.confirm.head[0] === '우선순위') prioCol = 0; // 하위호환: 점포 유형 자동 인식
    R.confirm.rows.forEach(function (r) {
      ct += '<tr>';
      r.forEach(function (c, i) {
        if (prioCol != null && i === prioCol) {
          var pc = c === '높음' ? '<span class="badge-down">높음</span>' :
            '<span style="color:#e67e22;font-weight:700;">' + E(c) + '</span>';
          ct += '<td style="text-align:center;">' + pc + '</td>';
        } else {
          ct += '<td>' + E(c) + '</td>';
        }
      });
      ct += '</tr>';
    });
    ct += '</tbody></table>';
    H += section(R.confirm.title || '7. 확인 권고', ct);
  }

  document.body.innerHTML = H;
  // 외부 레이아웃 JS(행 높이 동기화·툴팁) 재실행
  if (window.syncRowHeights) try { window.syncRowHeights(); } catch (e) {}
  if (window.initTooltips) try { window.initTooltips(); } catch (e) {}
})();
