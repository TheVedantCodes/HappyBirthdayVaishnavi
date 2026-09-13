/* =========================================================
   🌸 EDITABLE CONTENT — EDIT THIS SECTION
   ========================================================= */
const CONFIG = {
  name: "Vaishnavi Shukla",
  firstName: "Vaishnavi",

  // Password format: DD-MM-YYYY. Example: "12-09-2026"
  password: "13092026",

  // Birthday/date shown on the intro page
  specialDate: "13 • 09 • 2026",

  // Easy text customization
  texts: {
    unlockButton: "Unlock ✨",
    photoButton: "Show More →",
    finishCakeButton: "Reveal The Birthday Message 🎁",
    cakeInstruction: "Drag the knife across the cake to cut it!",
    cakeSuccess: "CAKE CUT! LET'S CELEBRATE! 🎉",
    replayButton: "Replay 🔄"
  },

  intro: "A tiny birthday surprise filled with memories, cuteness, flowers and a little bit of chaos. 🌸🦋",

  // =======================================================
  // BACKGROUND IMAGE
  // Put your JPG/PNG inside the assets folder and change this path.
  // Example: "assets/background.jpg"
  // The website automatically fits it for BOTH phone and PC.
  // Leave "" if you want the normal background.
  // =======================================================
  backgroundImage: "Assets/Background.jpg",

  // =======================================================
  // BACKGROUND MUSIC
  // Put your MP3/WAV file inside assets and enter its path here.
  // Example: "assets/birthday.mp3"
  // Browsers usually block SOUND autoplay until the visitor interacts.
  // This website starts the music after the first tap/click.
  // =======================================================
  music: {
    src: "Assets/Happy Birthday Soft Instrumental - Happy Birthday background Music.mp3",
    volume: 0.45,
    autoplayAfterFirstInteraction: true
  },

  // Replace the path below with your own cake-cut celebration sound.
  cakeSound: {
    src: "Assets/Yayyy.mp3",
    volume: 0.78,
    useGeneratedFallback: true
  },

  // EXACTLY 11 PHOTO SLOTS — shown ONE BY ONE
  photos: [
    {src:"Assets/Photo1.png",caption:"11:11 • Memory 01"},
    {src:"Assets/Photo2.jpg",caption:"11:11 • Memory 02"},
    {src:"Assets/Photo3.png",caption:"11:11 • Memory 03"},
    {src:"Assets/Photo4.jpg",caption:"11:11 • Memory 04"},
    {src:"Assets/Photo5.jpg",caption:"11:11 • Memory 05"},
    {src:"Assets/Photo6.jpg",caption:"11:11 • Memory 06"},
    {src:"Assets/Photo7.jpg",caption:"11:11 • Memory 07"},
    {src:"Assets/Photo8.jpg",caption:"11:11 • Memory 08"},
    {src:"Assets/Photo9.jpg",caption:"11:11 • Memory 09"},
    {src:"Assets/Photo10.jpg",caption:"11:11 • Memory 10"},
    {src:"Assets/Photo11.jpg",caption:"11:11 • Memory 11"}
  ],

  // 🐱 PASTE DIRECT GIF URLS HERE
  gifLinks: {
    no1:"Assets/Alone Mochi Cat.gif",
    no2:"Assets/Sleepy Mochi Cat.gif",
    no3:"Assets/Crying Mochi Cat.gif",
    no4:"Assets/Sad Mochi Cat.gif",
    happy:"Assets/Flowering Mochi Cat.gif",
    mainCat:"Assets/Main Birthday sticker.gif"
  },

  catCaption:"This cat has been promoted to Chief Birthday Officer. 🫡🎉",

  // 💌 FINAL MESSAGE
  finalMessage:`Dear Vaishnavi,

Happy Birthday! 🎂🌸✨

I hope your day is filled with happiness, laughter, great memories and an unreasonable amount of cake.

This little website is just a small birthday surprise, because a normal birthday message would have been too easy and you deserve it. 😊👏

Keep smiling, keep being awesome, and have an amazing birthday!

— Vedant 🌷`
};
/* =========================================================
   ENGINE — normally don't edit below
   ========================================================= */
const $ = id => document.getElementById(id);
const screens = document.querySelectorAll(".screen");

function show(id){
  screens.forEach(x => x.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll("[data-name]").forEach(x=>x.textContent=CONFIG.name);
document.querySelector("[data-date]").textContent=CONFIG.specialDate;
document.querySelector("[data-intro]").textContent=CONFIG.intro;
document.querySelector("[data-cat]").textContent=CONFIG.catCaption;
document.querySelector("[data-letter]").textContent=CONFIG.finalMessage;
$("unlockBtn").textContent=CONFIG.texts.unlockButton;
$("finishCake").textContent=CONFIG.texts.finishCakeButton;
$("cakeText").textContent=CONFIG.texts.cakeInstruction;
$("replay").textContent=CONFIG.texts.replayButton;

// Background image — responsive on phone and PC.
if(CONFIG.backgroundImage){
  document.body.classList.add("customBackground");
  document.body.style.setProperty("--custom-bg", `url("${CONFIG.backgroundImage}")`);
}

// =======================================================
// MUSIC
// =======================================================
const music = $("bgMusic");
let musicStarted = false;
if(CONFIG.music.src){
  music.src = CONFIG.music.src;
  music.volume = Math.min(1, Math.max(0, CONFIG.music.volume));
  $("musicControl").classList.remove("hidden");
}

async function startMusic(){
  if(!CONFIG.music.src || musicStarted || !CONFIG.music.autoplayAfterFirstInteraction) return;
  try{
    await music.play();
    musicStarted = true;
    $("musicButton").textContent = "♫ Music On";
  }catch(e){
    // Browser may still require an explicit music-button tap.
  }
}

document.addEventListener("pointerdown", startMusic, {once:true});
$("musicButton").onclick = async () => {
  if(!music.paused){
    music.pause();
    $("musicButton").textContent = "♫ Music Off";
  }else{
    try{
      await music.play();
      musicStarted = true;
      $("musicButton").textContent = "♫ Music On";
    }catch(e){}
  }
};

// =======================================================
// PASSWORD
// =======================================================
$("unlockBtn").onclick=()=>{
  const v=$("passwordInput").value.trim().toLowerCase();
  const p=CONFIG.password.trim().toLowerCase();
  if(p && v===p){
    $("passwordError").textContent="";
    show("questionScreen");
    loadQuestion();
  }else{
    $("passwordError").textContent="Nope 😭 Try the birthday password again!";
  }
};
$("passwordInput").onkeydown=e=>{if(e.key==="Enter")$("unlockBtn").click()};

// =======================================================
// QUESTIONS
// =======================================================
const questions=[
  {
    title:"Hey!! We have a cute birthday gift for you! 🎁",
    text:"Would you like to see it?",
    yes:"YES! ✨",
    no:"No 😶",
    reactions:[
      ["Are you sure you want to leave? 🥺","no1"],
      ["Pleeeeease don't go! 🌸","no2"],
      ["Think once more... 👀","no3"],
      ["The birthday cat strongly disagrees. 😭","no4"]
    ]
  },
  {
    title:"One more very important question. 🦋",
    text:"Are you ready for some completely unnecessary birthday chaos?",
    yes:"Absolutely 🫰",
    no:"Not yet...",
    reactions:[
      ["The cat would like you to reconsider. 🐱","no2"],
      ["The cat has filed an official complaint. 😭","no3"]
    ]
  }
];
let qi=0,ni=0;

// =======================================================
// RUNAWAY "NOT YET" BUTTON
// =======================================================
function placeRunawayButton(initial=false){
  const btn=$("noBtn");
  const area=$("questionActions");
  if(!btn || !area || qi!==1) return;

  const pad=8;
  const maxX=Math.max(pad, area.clientWidth-btn.offsetWidth-pad);
  const maxY=Math.max(pad, 96-btn.offsetHeight);
  let x=pad+Math.random()*Math.max(0,maxX-pad);
  let y=initial ? 0 : pad+Math.random()*Math.max(0,maxY-pad);

  // Avoid leaving it too close to the YES button.
  const yes=$("yesBtn");
  const yesRect=yes.getBoundingClientRect();
  const areaRect=area.getBoundingClientRect();
  const yesX=yesRect.left-areaRect.left;
  if(!initial && Math.abs(x-yesX)<yes.offsetWidth+24) x=Math.min(maxX, yesX+yes.offsetWidth+28);

  btn.style.left=`${Math.min(x,maxX)}px`;
  btn.style.top=`${Math.min(y,maxY)}px`;
}

function escapeRunawayButton(e){
  if(qi!==1) return;
  e.preventDefault();
  e.stopPropagation();
  placeRunawayButton();
}

$("noBtn").addEventListener("pointerenter", escapeRunawayButton);
$("noBtn").addEventListener("pointerdown", escapeRunawayButton);
$("noBtn").addEventListener("touchstart", escapeRunawayButton, {passive:false});

// Extra mobile protection: if a finger/cursor gets very close, run away.
document.addEventListener("pointermove", e=>{
  if(qi!==1) return;
  const btn=$("noBtn");
  const r=btn.getBoundingClientRect();
  const cx=Math.max(r.left,Math.min(e.clientX,r.right));
  const cy=Math.max(r.top,Math.min(e.clientY,r.bottom));
  if(Math.hypot(e.clientX-cx,e.clientY-cy)<38) placeRunawayButton();
});


function loadQuestion(){
  const q=questions[qi];
  ni=0;
  $("qNum").textContent=`QUESTION ${String(qi+1).padStart(2,"0")}`;
  $("qTitle").textContent=q.title;
  $("qText").textContent=q.text;
  $("yesBtn").textContent=q.yes;
  $("noBtn").textContent=q.no;
  $("reaction").classList.add("hidden");
  $("leaveConfirm").classList.add("hidden");
  $("noBtn").classList.toggle("runaway", qi===1);
  if(qi===1) placeRunawayButton(true);
}

// Normal YES means continue.
$("yesBtn").onclick=()=>{
  if(qi<questions.length-1){
    qi++;
    loadQuestion();
  }else{
    show("introScreen");
  }
};

// First NO = ask if she is REALLY sure.
$("noBtn").onclick=()=>{
  if(qi===0){
    $("leaveConfirm").classList.remove("hidden");
    $("reaction").classList.add("hidden");
    return;
  }
  const q=questions[qi];
  const r=q.reactions[Math.min(ni,q.reactions.length-1)];
  $("reaction").classList.remove("hidden");
  $("reactionText").textContent=r[0];
  setGif(r[1]);
  ni++;
};

// On "Are you sure?", YES means she is sure to leave.
// We show the "please don't leave" message instead of advancing.
$("leaveYes").onclick=()=>{
  $("leaveConfirm").classList.add("hidden");
  $("reaction").classList.remove("hidden");
  $("reactionText").textContent="PLEASE DON'T LEAVE 😭🌸 The birthday cat worked very hard on this!";
  setGif("no4");
};

// NO means she is NOT sure — exactly the meaning you wanted.
$("leaveNo").onclick=()=>{
  $("leaveConfirm").classList.add("hidden");
  $("reaction").classList.remove("hidden");
  $("reactionText").textContent="YESSS! You changed your mind! 🥹🌸 Let's continue!";
  setGif("happy");
};

function setGif(key){
  const u=CONFIG.gifLinks[key],img=$("reactionGif");
  if(u&&!u.includes("ENTER GIF")){
    img.src=u;
    img.classList.remove("hidden");
    $("catFallback").classList.add("hidden");
  }else{
    img.classList.add("hidden");
    $("catFallback").classList.remove("hidden");
  }
}

document.querySelectorAll("[data-next]").forEach(b=>b.onclick=()=>show(b.dataset.next));

// =======================================================
// ONE-BY-ONE PHOTO BANK
// =======================================================
let photoIndex=0;
function renderPhoto(){
  const p=CONFIG.photos[photoIndex];
  $("photoCount").textContent=`${photoIndex+1} / ${CONFIG.photos.length}`;
  document.querySelector(".photoProgress").style.setProperty("--photo-progress", `${((photoIndex+1)/CONFIG.photos.length)*100}%`);
  $("photoCaption").textContent=p.caption;
  const frame=$("singlePhoto");
  frame.innerHTML="";
  if(p.src){
    const im=document.createElement("img");
    im.src=p.src;
    im.alt=p.caption;
    frame.appendChild(im);
  }else{
    frame.innerHTML=`<div class="placeholder">📸<br><br>PHOTO ${String(photoIndex+1).padStart(2,"0")}<br>Add path in script.js</div>`;
  }
  $("backPhoto").classList.toggle("hidden",photoIndex===0);
  $("nextPhoto").textContent=photoIndex===CONFIG.photos.length-1 ? "Finish The Memories ✨" : "Show More →";
}

$("nextPhoto").onclick=()=>{
  if(photoIndex<CONFIG.photos.length-1){
    photoIndex++;
    renderPhoto();
  }else{
    show("catScreen");
  }
};
$("backPhoto").onclick=()=>{
  if(photoIndex>0){photoIndex--;renderPhoto();}
};
renderPhoto();

if(CONFIG.gifLinks.mainCat&&!CONFIG.gifLinks.mainCat.includes("ENTER GIF")){
  $("mainCat").src=CONFIG.gifLinks.mainCat;
  $("mainCat").classList.remove("hidden");
  $("mainCatFallback").classList.add("hidden");
}

// =======================================================
// REALISTIC CAKE CUTTING
// =======================================================
let cut=false,start=null;
const cakeStage=$("cakeStage");

cakeStage.onpointerdown=e=>{
  if(!cut){ start={x:e.clientX,y:e.clientY}; cakeStage.setPointerCapture?.(e.pointerId); }
};
cakeStage.onpointermove=e=>{
  if(start&&!cut&&Math.hypot(e.clientX-start.x,e.clientY-start.y)>75) cutCake();
};
cakeStage.onpointerup=()=>{start=null};
cakeStage.onclick=()=>{if(!cut)cutCake()};

function playCakeSound(){
  const cfg=CONFIG.cakeSound||{};
  if(cfg.src){
    try{
      const audio=new Audio(cfg.src);
      audio.volume=Math.max(0,Math.min(1,Number(cfg.volume ?? 0.78)));
      audio.currentTime=0;
      audio.play().catch(()=>{});
      return;
    }catch(e){}
  }

  if(cfg.useGeneratedFallback===false) return;

  // More lively fallback: a short knife "swish" + pop + rising celebration notes.
  try{
    const C=window.AudioContext||window.webkitAudioContext; if(!C)return;
    const ctx=new C();
    const master=ctx.createGain();
    master.gain.value=Math.max(0,Math.min(1,Number(cfg.volume ?? 0.78)));
    master.connect(ctx.destination);
    const now=ctx.currentTime;

    // Knife swish.
    const buffer=ctx.createBuffer(1,ctx.sampleRate*.28,ctx.sampleRate);
    const data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*(1-i/data.length);
    const noise=ctx.createBufferSource(); noise.buffer=buffer;
    const filter=ctx.createBiquadFilter(); filter.type='bandpass'; filter.frequency.setValueAtTime(1800,now); filter.frequency.exponentialRampToValueAtTime(700,now+.28); filter.Q.value=.8;
    const ng=ctx.createGain(); ng.gain.setValueAtTime(.0001,now); ng.gain.exponentialRampToValueAtTime(.22,now+.035); ng.gain.exponentialRampToValueAtTime(.0001,now+.28);
    noise.connect(filter).connect(ng).connect(master); noise.start(now);

    // Celebration notes.
    [523.25,659.25,783.99,1046.5,1318.5].forEach((f,i)=>{
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type=i%2?'triangle':'sine'; o.frequency.value=f;
      const t=now+.16+i*.075;
      g.gain.setValueAtTime(.0001,t);
      g.gain.exponentialRampToValueAtTime(.13,t+.02);
      g.gain.exponentialRampToValueAtTime(.0001,t+.26);
      o.connect(g).connect(master); o.start(t); o.stop(t+.28);
    });
    setTimeout(()=>ctx.close(),1200);
  }catch(e){}
}
function cutCake(){
  cut=true; start=null;
  cakeStage.classList.add("cutting");
  $("cakeText").textContent=CONFIG.texts.cakeSuccess;
  playCakeSound();
  partyBurst();
  setTimeout(()=>$("finishCake").classList.remove("hidden"),1200);
}

function partyBurst(){
  const shapes=["●","■","▲","✦"];
  for(let i=0;i<42;i++){
    const p=document.createElement("div"); p.className="partyPiece";
    p.textContent=shapes[Math.floor(Math.random()*shapes.length)];
    p.style.left=(5+Math.random()*90)+"vw";
    p.style.setProperty("--x",((Math.random()-.5)*240)+"px");
    p.style.setProperty("--r",((Math.random()-.5)*900)+"deg");
    p.style.animationDelay=(Math.random()*.35)+"s";
    $("confetti").appendChild(p); setTimeout(()=>p.remove(),3800);
  }
}

$("finishCake").onclick=()=>show("letterScreen");
$("replay").onclick=()=>{
  qi=0;cut=false;photoIndex=0;
  cakeStage.classList.remove("cutting");
  $("finishCake").classList.add("hidden");
  $("passwordInput").value="";
  renderPhoto();
  show("passwordScreen");
};

// =======================================================
// FLOWER SHOWER — ONLY FLOWERS, SPARSE, NOT FULL-SCREEN
// =======================================================
function flowerShower(){
  const p=document.createElement("div");
  p.className="flowerDrop";
  p.textContent=["🌸","🌷","🌼"][Math.floor(Math.random()*3)];
  p.style.left=(8+Math.random()*84)+"vw";
  p.style.setProperty("--x",(Math.random()-.5)*90+"px");
  p.style.animationDuration=(9+Math.random()*6)+"s";
  p.style.opacity=(0.55+Math.random()*0.3).toFixed(2);
  $("decor").appendChild(p);
  setTimeout(()=>p.remove(),16000);
}
setInterval(flowerShower,2200);

function confetti(){
  for(let i=0;i<32;i++){
    const p=document.createElement("div");
    p.className="piece";
    p.textContent=["🌸","🌷","🌼"][Math.floor(Math.random()*3)];
    p.style.left=Math.random()*100+"vw";
    p.style.setProperty("--x",(Math.random()-.5)*220+"px");
    p.style.animationDelay=Math.random()*.5+"s";
    $("confetti").appendChild(p);
    setTimeout(()=>p.remove(),3500);
  }
}
