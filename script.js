(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* bintang */
  var sky=document.getElementById('stars');
  for(var i=0;i<38;i++){
    var s=document.createElement('i');
    s.className='star';
    var size=1+Math.random()*2.2;
    s.style.width=s.style.height=size+'px';
    s.style.left=(Math.random()*100)+'%';
    s.style.top=(Math.random()*68)+'%';
    s.style.setProperty('--d',(2+Math.random()*3)+'s');
    s.style.setProperty('--l',(-Math.random()*4)+'s');
    sky.appendChild(s);
  }

  /* pesan */
  var pesan=[
    'Terima kasih sudah kuat sama aku. Kamu sudah melakukan yang terbaik.',
    'Kalau ada yang bikin kamu resah, ingat bahwa kamu tidak sendirian.',
    'Semoga tidurmu nyenyak dan mimpimu penuh hal yang bikin kamu tersenyum.',
  ];
  var msg=document.getElementById('msg'), btn=document.getElementById('next');
  var dots=[].slice.call(document.querySelectorAll('#dots i'));
  var idx=-1;
  var reply=document.getElementById('reply');

  function show(text){
    msg.classList.remove('show');
    setTimeout(function(){ msg.textContent=text; msg.classList.add('show'); }, reduce?0:260);
  }
  btn.addEventListener('click',function(){
    if(idx>=pesan.length-1){ idx=-1; }
    idx++;
    show(pesan[idx]);
    dots.forEach(function(d,k){ d.classList.toggle('on',k<=idx); });
    btn.textContent = idx>=pesan.length-1 ? 'Baca dari awal' : 'Satu pesan lagi';
    if(idx>=pesan.length-1){
      reply.hidden=false;
      setTimeout(function(){ reply.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'}); }, 450);
    }
  });

  /* balas lewat WhatsApp
     Isi NOMOR_WA dengan nomor tujuan format internasional tanpa + dan tanpa 0 di depan,
     contoh: '6281234567890'. Kalau dikosongkan, WhatsApp akan meminta memilih kontak. */
  var NOMOR_WA='6285166469917';
  var ta=document.getElementById('ta'), wa=document.getElementById('wa');
  function upd(){
    var t=(ta.value||'').trim()||'Selamat malam juga \uD83D\uDC97';
    wa.href=(NOMOR_WA?'https://wa.me/'+NOMOR_WA:'https://wa.me/')+'?text='+encodeURIComponent(t);
  }
  ta.addEventListener('input',upd);
  [].slice.call(document.querySelectorAll('.chip')).forEach(function(c){
    c.addEventListener('click',function(){ ta.value=c.textContent; upd(); });
  });
  upd();
})();