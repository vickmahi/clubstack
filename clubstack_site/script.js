const slides = [
  {img:'01_campus_strip_v1.jpg', word:'music'},
  {img:'08_discover_voice.jpg', word:'music'},
  {img:'05_discover_team_basketball.jpg', word:'sports'},
  {img:'09_discover_team_v2.jpg', word:'sports'},
  {img:'03_discover_campus_bw_vertical.jpg', word:'art'},
  {img:'10_discover_roommate.jpg', word:'roommates'},
  {img:'04_discover_campus_poolhall.jpg', word:'people'},
  {img:'02_campus_strip_v2.jpg', word:'career'},
  {img:'13_hero_doorway_skyline.jpg', word:'honors'},
  {img:'06_app_showcase_trending_clubs.jpg', word:'campus'},
  {img:'11_subway_poster_wall.jpg', word:'people'},
  {img:'12_stat_card_400000.jpg', word:'campus'},
  {img:'07_wordcycle_orange_mockup.jpg', word:'campus'},
  {img:'14_logo_orange_on_white.jpg', word:'campus'},
  {img:'15_logo_white_on_orange.jpg', word:'campus'}
];

const discover = document.querySelector('.discover');
const shell = document.querySelector('.media-shell');
const cue = document.querySelector('.scroll-cue');
const wordEls = [...document.querySelectorAll('.word-list [data-word]')];
const countEl = document.querySelector('#mediaCount');
const imgs = [document.querySelector('#mediaA'), document.querySelector('#mediaB')];
let activeIndex = -1;
let front = 0;

slides.forEach(s=>{ const im = new Image(); im.src = `assets/${s.img}`; });

function setSlide(i){
  if(i === activeIndex || i < 0 || i >= slides.length) return;
  activeIndex = i;
  const next = 1-front;
  imgs[next].src = `assets/${slides[i].img}`;
  imgs[next].onload = ()=>{
    imgs[next].classList.add('show');
    imgs[front].classList.remove('show');
    front = next;
  };
  wordEls.forEach(el=>el.classList.toggle('active', el.dataset.word===slides[i].word));
  countEl.textContent = `${String(i+1).padStart(2,'0')} / ${slides.length}`;
}

function update(){
  const r = discover.getBoundingClientRect();
  const scrollable = discover.offsetHeight - innerHeight;
  const moved = Math.min(scrollable, Math.max(0, -r.top));
  const p = scrollable ? moved/scrollable : 0;
  const reveal = Math.min(1, p*22);
  shell.classList.toggle('visible', reveal > .15);
  cue.style.opacity = String(Math.max(0,1-p*16));
  if(p < .018){
    wordEls.forEach(el=>el.classList.toggle('active', el.dataset.word==='campus'));
    return;
  }
  const normalized = Math.min(.999, (p-.018)/.982);
  const idx = Math.floor(normalized*slides.length);
  setSlide(idx);
}

addEventListener('scroll',update,{passive:true});
addEventListener('resize',update);
update();
