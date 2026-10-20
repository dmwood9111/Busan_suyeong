(function () {
  'use strict';
  const data = window.SUYEONG_CONTENT;
  const allowed = ['ko', 'en', 'zh', 'ja', 'cs'];
  const labels = [ ['ko','한국어'], ['en','English'], ['zh','中文'], ['ja','日本語'], ['cs','Čeština'] ];
  const params = new URLSearchParams(location.search);
  const storedLang = (() => { try { return localStorage.getItem('lineDesignSuyeongLang'); } catch (_) { return null; } })();
  let lang = params.get('lang') || storedLang || 'ko';
  if (!allowed.includes(lang)) lang = 'ko';
  const page = document.body.dataset.page || 'bench';
  const $ = (id) => document.getElementById(id);
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function urlTo(file) { return file + '?lang=' + encodeURIComponent(lang); }
  // Escapes normal text via textContent, with only *title* markers rendered as italics.
  function addProse(container, paragraphs) {
    const prose = element('div', 'prose');
    paragraphs.forEach((text) => {
      const p = element('p');
      text.split(/(\*[^*]+\*)/g).forEach((piece) => {
        if (piece.startsWith('*') && piece.endsWith('*')) p.append(element('em', '', piece.slice(1, -1)));
        else p.append(document.createTextNode(piece));
      });
      prose.append(p);
    });
    container.append(prose);
  }
  function render() {
    document.documentElement.lang = {ko:'ko',en:'en',zh:'zh-CN',ja:'ja',cs:'cs'}[lang];
    try { localStorage.setItem('lineDesignSuyeongLang',lang); } catch (_) {}
    const ui = data.ui[lang];
    document.title = (page === 'home' ? ui.site : ui[page]) + ' | LINE DESIGN';
    $('siteName').textContent = ui.site;
    $('siteSub').textContent = ui.siteSub;
    $('footer').textContent = ui.footer;
    $('brandCompany').textContent = 'LINE DESIGN';
    const homeLink = $('homeLink');
    if (homeLink) { homeLink.href = urlTo('01_havel_bench.html'); homeLink.textContent = ui.back; }
    $('pageTitle').textContent = page === 'home' ? ui.site : ui[page];
    $('pageTag').textContent = page === 'bench' ? ui.tag : page === 'timeline' ? ui.tag2 : ui.siteSub;
    const bar = $('langbar');
    bar.replaceChildren();
    labels.forEach(([code, label]) => {
      const button = element('button','',label);
      button.type = 'button';
      button.dataset.lang = code;
      button.classList.toggle('active',code===lang);
      button.setAttribute('aria-pressed',String(code===lang));
      button.setAttribute('aria-label',label);
      button.addEventListener('click', () => {
        lang = code;
        history.replaceState({},'',location.pathname + '?lang=' + code);
        render();
      });
      bar.append(button);
    });
    $('menuHeading').textContent = ui.list;
    const nav = $('navList');
    nav.replaceChildren();
    data.menu.forEach((item, i) => {
      const link = element('a', 'menu-item' + (page===item.key ? ' current' : ''));
      link.href = urlTo(item.href);
      if (page===item.key) link.setAttribute('aria-current','page');
      link.append(element('span','num',String(i+1).padStart(2,'0')),
        element('span','name',ui[item.key]), element('span','arrow','›'));
      nav.append(link);
    });
    const container = $('pageContent');
    container.replaceChildren();
    if (page === 'bench' || page === 'home') {
      // index.html and 01 display the front plaque; 00 is a separately kept, unlinked home page.
      if (page === 'home') {
        container.append(element('p','archive-note',ui.siteSub));
      } else {
        container.append(element('div','section-label',ui.frontLabel));
      }
      const highlight = element('div','feature');
      highlight.append(element('blockquote','',ui.quote));
      container.append(highlight);
      addProse(container,data.bench[lang]);
      // Retain the approved Czech inscription as a source text without repeating it in Czech mode.
      if (lang !== 'cs') {
        container.append(element('h2','muted-title',ui.czech));
        container.append(element('div','czech',data.czechFront));
      }
    } else if (page === 'timeline') {
      container.append(element('div','section-label',ui.backLabel));
      container.append(element('h2','biography-title',ui.biographyTitle));
      addProse(container,data.biography[lang]);
      // The 7 original chronology entries remain in content.js → timeline, intentionally not rendered.
    }
  }
  render();
})();
