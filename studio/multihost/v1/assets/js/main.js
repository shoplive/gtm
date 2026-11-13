(function(){
  /* 메뉴 활성화: 현재 스크롤 위치의 섹션을 헤더 메뉴에 표시 */
  var links=[].slice.call(document.querySelectorAll('.gnav a'));
  var targets=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1))});
  var nav=document.getElementById('gnav'), menuBtn=document.querySelector('.menu-btn');
  function update(){
    var line=window.innerHeight*0.35, idx=0;
    targets.forEach(function(t,i){ if(t && t.getBoundingClientRect().top<=line) idx=i; });
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-2) idx=targets.length-1;
    links.forEach(function(a,i){ if(i===idx) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); });
  }
  var ticking=false;
  window.addEventListener('scroll',function(){ if(!ticking){ticking=true;requestAnimationFrame(function(){update();ticking=false;});} },{passive:true});
  window.addEventListener('resize',update); update();


  /* 사용 방법: 단계를 누르면 오른쪽 화면 전환 */
  [].forEach.call(document.querySelectorAll('[data-steps]'),function(block){
    var btns=[].slice.call(block.querySelectorAll('.step-btn'));
    var slots=[].slice.call(block.querySelectorAll('.step-stage > .slot'));
    var cur=block.querySelector('.step-cur'), name=block.querySelector('.step-name');
    var dotsWrap=block.querySelector('.step-dots'), dots=[];
    if(dotsWrap){ btns.forEach(function(b){ var d=document.createElement('button'); d.type='button'; d.className='step-dot'; d.dataset.step=b.dataset.step; d.setAttribute('aria-label',b.dataset.step+'. '+b.querySelector('b').textContent); if(b.getAttribute('aria-pressed')==='true') d.setAttribute('aria-current','true'); d.addEventListener('click',function(){ go(d.dataset.step); }); dotsWrap.appendChild(d); dots.push(d); }); }
    function go(n){
      btns.forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.step===n ? 'true':'false'); });
      slots.forEach(function(sl){ sl.classList.toggle('is-active', sl.dataset.step===n); });
      var b=btns.filter(function(x){return x.dataset.step===n})[0];
      if(cur) cur.textContent=n; if(name&&b) name.textContent=b.querySelector('b').textContent;
      dots.forEach(function(d){ if(d.dataset.step===n) d.setAttribute('aria-current','true'); else d.removeAttribute('aria-current'); var bb=btns.filter(function(x){return x.dataset.step===d.dataset.step})[0]; if(bb) d.setAttribute('aria-label',d.dataset.step+'. '+bb.querySelector('b').textContent); });
    }
    btns.forEach(function(b,i){
      b.addEventListener('click',function(){ go(b.dataset.step); });
      b.addEventListener('keydown',function(e){
        var k=e.key, j=null;
        if(k==='ArrowDown'||k==='ArrowRight') j=Math.min(i+1,btns.length-1);
        if(k==='ArrowUp'||k==='ArrowLeft') j=Math.max(i-1,0);
        if(j!==null){ e.preventDefault(); btns[j].focus(); go(btns[j].dataset.step); }
      });
    });
  });

  /* 이메일 복사 */
  [].forEach.call(document.querySelectorAll('.btn-copy'),function(btn){
    var t;
    btn.addEventListener('click',function(){
      var text=btn.getAttribute('data-copy');
      function done(){ btn.style.minWidth=btn.offsetWidth+'px'; btn.classList.add('is-copied'); clearTimeout(t); t=setTimeout(function(){btn.classList.remove('is-copied'); btn.style.minWidth='';},2000); }
function fallback(){ var ta=document.createElement('textarea'); ta.value=text; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ if(document.execCommand('copy')) done(); }catch(e){} document.body.removeChild(ta); }
    });
  });
  /* 모바일 메뉴 */
  function setMenu(open){ nav.classList.toggle('open',open); menuBtn.setAttribute('aria-expanded',open); menuBtn.setAttribute('aria-label',open?(document.documentElement.getAttribute('data-menu-close')||'메뉴 닫기'):(document.documentElement.getAttribute('data-menu-open')||'메뉴 열기')); }
  menuBtn.addEventListener('click',function(){ setMenu(!nav.classList.contains('open')); });
  links.forEach(function(a){ a.addEventListener('click',function(){ setMenu(false); }); });

  /* 언어 선택 */
  var langBtn=document.querySelector('.lang-btn'), langMenu=document.getElementById('lang-menu');
  function setLangMenu(open){ langMenu.hidden=!open; langBtn.setAttribute('aria-expanded',open); }
  langBtn.addEventListener('click',function(e){ e.stopPropagation(); setLangMenu(langMenu.hidden); });
  document.addEventListener('click',function(e){ if(!e.target.closest('.lang')) setLangMenu(false); if(!e.target.closest('.top')) setMenu(false); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ setLangMenu(false); setMenu(false); } });
})();
