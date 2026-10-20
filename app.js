(function(){
  const data=window.SUYEONG_CONTENT;
  const params=new URLSearchParams(location.search);
  const allowed=['ko','en','zh','ja'];
  let lang=params.get('lang')||localStorage.getItem('lineDesignSuyeongLang')||'ko';
  if(!allowed.includes(lang))lang='ko';
  const page=document.body.dataset.page||'home';
  const $=(id)=>document.getElementById(id);
  const el=(tag,className,text)=>{const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n};
  const pageUrl=(file)=>file+'?lang='+encodeURIComponent(lang);
  function render(){
    document.documentElement.lang=lang==='zh'?'zh-CN':lang;
    localStorage.setItem('lineDesignSuyeongLang',lang);
    const ui=data.ui[lang];
    document.title=(page==='home'?ui.site:ui[page])+' | LINE DESIGN';
    $('siteName').textContent=ui.site;$('siteSub').textContent=ui.siteSub;
    $('footer').textContent=ui.footer;
    $('brandCompany').textContent='LINE DESIGN';
    const homeLink=$('homeLink');if(homeLink){homeLink.href=pageUrl('01_havel_bench.html');homeLink.textContent=ui.back}
    $('pageTitle').textContent=page==='home'?ui.site:ui[page];
    $('pageTag').textContent=page==='bench'?ui.tag:page==='timeline'?ui.tag2:ui.siteSub;
    const bar=$('langbar');bar.replaceChildren();
    [['ko','한국어'],['en','English'],['zh','中文'],['ja','日本語']].forEach(([code,label])=>{let b=el('button','',label);b.type='button';b.dataset.lang=code;b.classList.toggle('active',code===lang);b.setAttribute('aria-pressed',String(code===lang));b.addEventListener('click',()=>{lang=code;history.replaceState({},'',location.pathname+'?lang='+code);render()});bar.append(b)});
    $('menuHeading').textContent=ui.list;
    const nav=$('navList');nav.replaceChildren();data.menu.forEach((item,i)=>{const link=el('a','menu-item'+(page===item.key?' current':''));link.href=pageUrl(item.href);if(page===item.key)link.setAttribute('aria-current','page');link.append(el('span','num',String(i+1).padStart(2,'0')),el('span','name',ui[item.key]),el('span','arrow','›'));nav.append(link)});
    const c=$('pageContent');c.replaceChildren();
    if(page==='bench'){
      const q=el('div','feature');q.append(el('blockquote','',ui.quote));c.append(q);
      const prose=el('div','prose');data.bench[lang].forEach(t=>prose.append(el('p','',t)));c.append(prose);
      c.append(el('h2','muted-title',ui.czech),el('div','czech',data.czech));
    }else if(page==='timeline'){
      c.append(el('div','notice',ui.pending));c.append(el('p','intro',ui.intro));
      const events=el('div','timeline');data.timeline.forEach(item=>{const box=el('article','event');box.append(el('div','year',item.year),el('p','',item.text[lang]));events.append(box)});c.append(events);
    }else{
      const q=el('div','feature');q.append(el('blockquote','',ui.quote));c.append(q);
      const prose=el('div','prose');data.bench[lang].forEach(t=>prose.append(el('p','',t)));c.append(prose);
    }
  }
  render();
})();