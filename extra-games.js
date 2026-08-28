(() => {
  let miniFartData = '';
  const miniActiveSounds = new Set();
  function findMiniFartData(d){
    if(miniFartData) return miniFartData;
    for(const script of d.scripts){
      const m = script.textContent.match(/fart:\"(data:audio\/[^\"]+)\"/);
      if(m){ miniFartData = m[1]; break; }
    }
    return miniFartData;
  }
  function playMiniFart(volume=.82){
    try {
      if(!miniFartData) return null;
      const a = new Audio(miniFartData);
      a.volume = volume;
      miniActiveSounds.add(a);
      const done = () => miniActiveSounds.delete(a);
      a.addEventListener('ended', done, {once:true});
      a.addEventListener('error', done, {once:true});
      a.play().catch(done);
      return a;
    } catch { return null; }
  }


  function fitVectorCosmetics(d){
    const hoodie = d.getElementById('cos-outfit-hoodie');
    if(hoodie){
      hoodie.innerHTML = `
        <path d="M151 113 C139 105 124 106 115 116 C106 126 109 142 118 151 C128 161 143 162 155 153 C163 145 164 130 158 120 C156 117 154 115 151 113Z" fill="url(#hoodieGrad)" stroke="#65c0ea" stroke-width="4" stroke-linejoin="round"/>
        <path d="M258 113 C270 104 286 105 296 115 C305 125 303 142 294 152 C284 162 269 163 256 153 C248 144 247 130 253 120 C254 117 256 115 258 113Z" fill="url(#hoodieGrad)" stroke="#65c0ea" stroke-width="4" stroke-linejoin="round"/>
        <path d="M151 113 Q171 103 187 112 Q195 118 205 118 Q216 118 225 112 Q243 103 260 114 Q269 127 268 145 L261 177 Q238 191 205 192 Q172 191 148 177 L141 145 Q140 127 151 113Z" fill="url(#hoodieGrad)" stroke="#65c0ea" stroke-width="4" stroke-linejoin="round"/>
        <path d="M181 113 Q193 132 205 135 Q218 132 230 113" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
        <path d="M190 139 Q205 129 220 139 Q205 151 190 139Z" fill="#fff" opacity=".96"/>
        <path d="M174 151 L171 177 M237 151 L240 177" fill="none" stroke="#b4dff7" stroke-width="4" stroke-linecap="round"/>
        <path d="M116 143 Q132 150 151 143 M259 143 Q277 151 296 143" fill="none" stroke="#eaf8ff" stroke-width="4" stroke-linecap="round" opacity=".9"/>`;
    }
    const vest = d.getElementById('cos-outfit-vest');
    if(vest) vest.setAttribute('transform','translate(205 148) scale(1.16 1.10) translate(-205 -148)');
    const bikini = d.getElementById('cos-outfit-bikini');
    if(bikini) bikini.setAttribute('transform','translate(205 147) scale(1.18 1.10) translate(-205 -147)');
  }

  function installExtraGames(d){
    if(d.getElementById('openFartJumper')) return;
    const ns='http://www.w3.org/2000/svg';
    const gamesScreen=d.getElementById('gamesScreen');
    const gamesHub=d.getElementById('gamesHub');
    const fartCard=d.getElementById('openFartGame');
    if(!gamesScreen||!gamesHub||!fartCard) return;

    const style=d.createElement('style');
    style.id='extraMiniGameStyle';
    style.textContent=`
      .jumpArt,.runArt{position:relative;overflow:hidden;background:linear-gradient(180deg,#dff6ff,#fff2f6)!important}
      .jumpArt:before,.jumpArt:after{content:"";position:absolute;height:7px;border-radius:999px;background:#fff;border:2px solid #65c0ea;box-shadow:0 5px 0 rgba(101,192,234,.12)}
      .jumpArt:before{width:58%;left:8%;bottom:24%}.jumpArt:after{width:44%;right:7%;top:25%}
      .runArt:before{content:"";position:absolute;inset:9px 18px;background:linear-gradient(90deg,transparent 31%,rgba(255,255,255,.9) 32% 34%,transparent 35% 65%,rgba(255,255,255,.9) 66% 68%,transparent 69%),linear-gradient(#c8e9f5,#9dd2e8);clip-path:polygon(35% 0,65% 0,95% 100%,5% 100%)}
      .runArt:after{content:"💨";position:absolute;font-size:32px;left:50%;bottom:13%;transform:translateX(-50%)}
      #fartJumpGame,#cinnaRunGame{display:none}
      .fjArena,.crArena{position:relative;height:min(57vh,470px);min-height:330px;overflow:hidden;border-radius:24px;border:3px solid rgba(101,192,234,.7);background:linear-gradient(#cbefff 0 58%,#fff4f7 100%);box-shadow:inset 0 0 0 4px rgba(255,255,255,.55);touch-action:none;user-select:none}
      .fjArena:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 18%,#fff 0 17px,transparent 18px),radial-gradient(circle at 76% 30%,#fff 0 22px,transparent 23px);opacity:.75}
      .fjPlatform{position:absolute;height:13px;border-radius:10px;background:linear-gradient(#fff,#dff5ff);border:3px solid #65c0ea;box-shadow:0 5px 0 rgba(91,153,188,.22)}
      .miniCinna{position:absolute;width:92px;height:55px;overflow:visible;filter:drop-shadow(0 7px 4px rgba(89,67,76,.2));z-index:5;pointer-events:none}
      .miniCinna svg{width:100%;height:100%;overflow:visible}
      .miniCinna.fartHit{animation:miniFartShake .34s ease}
      @keyframes miniFartShake{25%{transform:translateX(-6px) rotate(-3deg)}55%{transform:translateX(6px) rotate(3deg)}100%{transform:none}}
      .miniPuff{position:absolute;z-index:4;font-size:28px;pointer-events:none;animation:puffAway .65s ease-out forwards}
      @keyframes puffAway{from{transform:scale(.55);opacity:.95}to{transform:translate(-22px,22px) scale(1.35);opacity:0}}
      .fjControls,.crControls{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:9px}
      .fjControls button,.crControls button{border:0;border-radius:16px;padding:11px 8px;background:#dff5ff;color:#6d4024;font-weight:900;box-shadow:inset 0 0 0 2px rgba(101,192,234,.65)}
      .fjControls .wide{grid-column:1/-1;background:#ffdce7}
      .crArena{background:linear-gradient(#dff5ff 0 18%,#a8dae9 18% 100%)}
      .crRoad{position:absolute;inset:0;background:linear-gradient(90deg,transparent 31.8%,rgba(255,255,255,.75) 32% 33%,transparent 33.2% 66%,rgba(255,255,255,.75) 66.2% 67.2%,transparent 67.4%),linear-gradient(180deg,rgba(255,255,255,.14),rgba(64,116,137,.16));}
      .crRoad:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent 0 56px,rgba(255,255,255,.72) 57px 72px,transparent 73px 130px);opacity:.55;animation:roadMove .75s linear infinite}
      @keyframes roadMove{to{background-position-y:130px}}
      .crObstacle{position:absolute;width:54px;height:40px;border-radius:12px;background:linear-gradient(#ffcf7b,#e89d42);border:3px solid #8b5834;box-shadow:0 7px 0 rgba(74,35,12,.18);display:grid;place-items:center;font-size:22px;z-index:3}
      .crObstacle.trap2{background:linear-gradient(#ff91a9,#ef6688)}
      .crObstacle.trap3{background:linear-gradient(#b6d9ff,#73b8ee)}
      .crCoin{position:absolute;width:28px;height:28px;border-radius:50%;background:#ffd45a;border:3px solid #fff1a8;color:#8a5e19;display:grid;place-items:center;font-weight:1000;z-index:3;box-shadow:0 4px 0 rgba(130,89,28,.15)}
      .crJumping{transform:translateY(-62px) scale(.94)!important;transition:transform .18s ease-out}
      .crFlash{animation:crFlash .35s ease}@keyframes crFlash{50%{filter:brightness(1.35)}}
      .miniHint{font-size:12px;text-align:center;opacity:.72;margin:5px 0 0;font-weight:750}
    `;
    d.head.appendChild(style);

    const jumpCard=d.createElement('button');
    jumpCard.className='gameCard'; jumpCard.id='openFartJumper';
    jumpCard.innerHTML='<div class="gameCardArt jumpArt"></div><div class="gameCardText"><h3>Fart Jumper</h3><p>Doodle Jump style: bounce from platform to platform and climb as high as you can.</p><div class="rewardLine">Every single jump = one fart 💨</div></div>';
    fartCard.insertAdjacentElement('afterend',jumpCard);

    const runCard=d.createElement('button');
    runCard.className='gameCard'; runCard.id='openCinnaRun';
    runCard.innerHTML='<div class="gameCardArt runArt"></div><div class="gameCardText"><h3>Cinna Run</h3><p>Three-lane endless runner. Dodge traps, switch lanes and jump over obstacles.</p><div class="rewardLine">Hit a trap and Cinna farts from the shock 💨</div></div>';
    jumpCard.insertAdjacentElement('afterend',runCard);

    gamesScreen.insertAdjacentHTML('beforeend',`
      <div id="fartJumpGame"><div class="miniPanel"><div class="miniTop"><button class="miniBack" id="fjBack">‹ Games</button><div class="scorePill">Height: <span id="fjScore">0</span></div></div><div class="fjArena" id="fjArena"></div><div class="gameResult" id="fjResult">Land on the platforms. Every bounce is fart-powered.</div><div class="fjControls"><button id="fjLeft">◀ LEFT</button><button id="fjStart">START</button><button id="fjRight">RIGHT ▶</button></div><div class="miniHint">Drag on the arena or use LEFT / RIGHT.</div></div></div>
      <div id="cinnaRunGame"><div class="miniPanel"><div class="miniTop"><button class="miniBack" id="crBack">‹ Games</button><div class="scorePill">Distance: <span id="crScore">0</span> · Hits: <span id="crHits">0</span>/3</div></div><div class="crArena" id="crArena"><div class="crRoad"></div></div><div class="gameResult" id="crResult">Swipe left/right, swipe up to jump. Avoid the traps.</div><div class="crControls"><button id="crLeft">◀ LEFT</button><button id="crJump">JUMP ↑</button><button id="crRight">RIGHT ▶</button></div><button class="startGameBtn" id="crStart">START RUN</button></div></div>`);

    function cleanCloneIds(node){ node.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id')); return node; }
    function createMiniCinna(){
      const wrap=d.createElement('div'); wrap.className='miniCinna';
      const s=d.createElementNS(ns,'svg'); s.setAttribute('viewBox','0 0 436 215'); s.setAttribute('preserveAspectRatio','xMidYMid meet');
      const base=d.getElementById('vectorRigBase');
      if(base){ const c=cleanCloneIds(base.cloneNode(true)); s.appendChild(c); }
      const cosmetics=d.getElementById('cosmeticsLayer');
      if(cosmetics){
        const cg=d.createElementNS(ns,'g');
        [...cosmetics.children].forEach(el=>{ if(el.style.display==='inline'){ const c=cleanCloneIds(el.cloneNode(true)); c.style.display='inline'; cg.appendChild(c); }});
        s.appendChild(cg);
      }
      wrap.appendChild(s); return wrap;
    }
    function puff(arena,x,y){ const p=d.createElement('div');p.className='miniPuff';p.textContent='💨';p.style.left=x+'px';p.style.top=y+'px';arena.appendChild(p);setTimeout(()=>p.remove(),700); }
    function showExtra(which){
      stopJump(); stopRun();
      gamesHub.style.display='none';
      const cloud=d.getElementById('cloudGame'), fart=d.getElementById('fartGame'); if(cloud) cloud.style.display='none'; if(fart) fart.style.display='none';
      d.getElementById('fartJumpGame').style.display=which==='jump'?'block':'none';
      d.getElementById('cinnaRunGame').style.display=which==='run'?'block':'none';
    }
    function backHome(){ stopJump(); stopRun(); d.getElementById('fartJumpGame').style.display='none';d.getElementById('cinnaRunGame').style.display='none';gamesHub.style.display='block'; }
    jumpCard.addEventListener('click',()=>showExtra('jump'));
    runCard.addEventListener('click',()=>showExtra('run'));
    d.getElementById('fjBack').addEventListener('click',backHome); d.getElementById('crBack').addEventListener('click',backHome);
    const mainBack=d.getElementById('gamesBack'); if(mainBack) mainBack.addEventListener('click',()=>{stopJump();stopRun();},{capture:true});

    // ----- Fart Jumper -----
    let jRAF=0,jRunning=false,jPlayer=null,jPlatforms=[],jx=0,jy=0,jvy=0,jscore=0,jlast=0,jTargetX=null;
    const jArena=d.getElementById('fjArena');
    function buildPlatforms(){
      const w=jArena.clientWidth,h=jArena.clientHeight;
      const ys=[h-28,h-105,h-180,h-255,h-330,h-405];
      jPlatforms=ys.map((y,i)=>({x:i===0?w*.35:20+Math.random()*Math.max(20,w-120),y,w:i===0?110:76+Math.random()*42}));
      renderPlatforms();
    }
    function renderPlatforms(){ jArena.querySelectorAll('.fjPlatform').forEach(e=>e.remove()); jPlatforms.forEach(p=>{const el=d.createElement('div');el.className='fjPlatform';el.style.cssText=`left:${p.x}px;top:${p.y}px;width:${p.w}px`;jArena.appendChild(el);p.el=el;}); }
    function jumpFart(){ playMiniFart(.82); if(jPlayer) puff(jArena,jx+14,jy+34); }
    function stopJump(){jRunning=false;cancelAnimationFrame(jRAF);jRAF=0;jlast=0;}
    function endJump(){ if(!jRunning)return; stopJump(); d.getElementById('fjResult').textContent=`Game over · height ${jscore}`; d.getElementById('fjStart').textContent='PLAY AGAIN'; }
    function startJump(){
      stopJump();jArena.innerHTML='';buildPlatforms();jPlayer=createMiniCinna();jArena.appendChild(jPlayer);const h=jArena.clientHeight,w=jArena.clientWidth;jx=w*.5-46;jy=h-82;jvy=-430;jscore=0;jTargetX=jx;d.getElementById('fjScore').textContent='0';d.getElementById('fjResult').textContent='Fart-powered takeoff!';jRunning=true;jumpFart();jRAF=requestAnimationFrame(jLoop);
    }
    function jLoop(ts){
      if(!jRunning)return;if(!jlast)jlast=ts;const dt=Math.min(.035,(ts-jlast)/1000);jlast=ts;const w=jArena.clientWidth,h=jArena.clientHeight;
      if(jTargetX!=null) jx += (jTargetX-jx)*Math.min(1,dt*10);
      jx=Math.max(-6,Math.min(w-86,jx));const prevBottom=jy+50;jvy+=1030*dt;jy+=jvy*dt;
      if(jvy>0){for(const p of jPlatforms){const bottom=jy+50;if(prevBottom<=p.y+5&&bottom>=p.y&&jx+72>p.x&&jx+18<p.x+p.w){jy=p.y-50;jvy=-430;jscore++;d.getElementById('fjScore').textContent=jscore;jumpFart();break;}}}
      if(jy<h*.32&&jvy<0){const shift=(h*.32-jy);jy=h*.32;jPlatforms.forEach(p=>p.y+=shift);jscore+=Math.max(1,Math.floor(shift/18));d.getElementById('fjScore').textContent=jscore;let highest=Math.min(...jPlatforms.map(p=>p.y));while(highest>75){highest-=70+Math.random()*28;jPlatforms.push({x:12+Math.random()*Math.max(20,w-110),y:highest,w:74+Math.random()*42});if(jPlatforms.length>10)break;}jPlatforms=jPlatforms.filter(p=>p.y<h+30);renderPlatforms();}
      if(jy>h+28){endJump();return;}jPlayer.style.left=jx+'px';jPlayer.style.top=jy+'px';jRAF=requestAnimationFrame(jLoop);
    }
    d.getElementById('fjStart').addEventListener('click',startJump);
    const moveJ=dir=>{if(!jRunning)return;jTargetX=Math.max(-5,Math.min(jArena.clientWidth-86,(jTargetX??jx)+dir*48));};
    d.getElementById('fjLeft').addEventListener('pointerdown',()=>moveJ(-1));d.getElementById('fjRight').addEventListener('pointerdown',()=>moveJ(1));
    jArena.addEventListener('pointerdown',e=>{if(jRunning)jTargetX=e.offsetX-46;});jArena.addEventListener('pointermove',e=>{if(jRunning&&e.buttons)jTargetX=e.offsetX-46;});

    // ----- Cinna Run -----
    let rRAF=0,rRunning=false,rPlayer=null,rLane=1,rObstacles=[],rCoins=[],rLast=0,rSpawn=0,rDistance=0,rHits=0,rJump=false,rJumpTimer=0,rTouchX=0,rTouchY=0;
    const rArena=d.getElementById('crArena');
    function laneX(lane,width){return [width*.18,width*.5,width*.82][lane]-46;}
    function stopRun(){rRunning=false;cancelAnimationFrame(rRAF);rRAF=0;rLast=0;rSpawn=0;clearTimeout(rJumpTimer);}
    function resetRunnerArena(){rArena.querySelectorAll('.crObstacle,.crCoin,.miniCinna,.miniPuff').forEach(e=>e.remove());}
    function spawnRunThing(){
      const w=rArena.clientWidth;const lane=Math.floor(Math.random()*3);
      if(Math.random()<.72){const el=d.createElement('div');el.className='crObstacle trap'+(1+Math.floor(Math.random()*3));el.textContent=['⚠','📦','🪵'][Math.floor(Math.random()*3)];el.style.left=laneX(lane,w)+18+'px';el.style.top='-50px';rArena.appendChild(el);rObstacles.push({el,lane,y:-50});}
      else {const el=d.createElement('div');el.className='crCoin';el.textContent='★';el.style.left=laneX(lane,w)+33+'px';el.style.top='-35px';rArena.appendChild(el);rCoins.push({el,lane,y:-35});}
    }
    function runnerJump(){if(!rRunning||rJump)return;rJump=true;rPlayer.classList.add('crJumping');clearTimeout(rJumpTimer);rJumpTimer=setTimeout(()=>{rJump=false;if(rPlayer)rPlayer.classList.remove('crJumping');},520);}
    function shiftLane(dir){if(!rRunning)return;rLane=Math.max(0,Math.min(2,rLane+dir));}
    function runnerHit(){rHits++;d.getElementById('crHits').textContent=rHits;playMiniFart(.85);rPlayer.classList.remove('fartHit');void rPlayer.offsetWidth;rPlayer.classList.add('fartHit');puff(rArena,laneX(rLane,rArena.clientWidth)+16,rArena.clientHeight-75);rArena.classList.remove('crFlash');void rArena.offsetWidth;rArena.classList.add('crFlash');if(rHits>=3){stopRun();d.getElementById('crResult').textContent=`Run over · ${Math.floor(rDistance)}m · three shocking farts.`;d.getElementById('crStart').style.display='block';d.getElementById('crStart').textContent='RUN AGAIN';}}
    function startRun(){
      stopRun();resetRunnerArena();rLane=1;rObstacles=[];rCoins=[];rDistance=0;rHits=0;rJump=false;d.getElementById('crScore').textContent='0';d.getElementById('crHits').textContent='0';d.getElementById('crResult').textContent='Go! Dodge the traps.';d.getElementById('crStart').style.display='none';rPlayer=createMiniCinna();rArena.appendChild(rPlayer);rRunning=true;rRAF=requestAnimationFrame(rLoop);
    }
    function rLoop(ts){
      if(!rRunning)return;if(!rLast)rLast=ts;const dt=Math.min(.035,(ts-rLast)/1000);rLast=ts;const w=rArena.clientWidth,h=rArena.clientHeight;rDistance+=dt*10;d.getElementById('crScore').textContent=Math.floor(rDistance);rSpawn+=dt;if(rSpawn>.72){rSpawn=0;spawnRunThing();}
      const speed=190+Math.min(130,rDistance*1.7);const py=h-74;rPlayer.style.left=laneX(rLane,w)+'px';rPlayer.style.top=py+'px';
      for(const o of [...rObstacles]){o.y+=speed*dt;o.el.style.top=o.y+'px';if(o.y>h+55){o.el.remove();rObstacles.splice(rObstacles.indexOf(o),1);continue;}if(o.lane===rLane&&!rJump&&o.y+38>py+8&&o.y<py+48){o.el.remove();rObstacles.splice(rObstacles.indexOf(o),1);runnerHit();if(!rRunning)return;}}
      for(const c of [...rCoins]){c.y+=speed*dt;c.el.style.top=c.y+'px';if(c.y>h+40){c.el.remove();rCoins.splice(rCoins.indexOf(c),1);continue;}if(c.lane===rLane&&c.y+28>py+5&&c.y<py+50){c.el.remove();rCoins.splice(rCoins.indexOf(c),1);rDistance+=4;}}
      rRAF=requestAnimationFrame(rLoop);
    }
    d.getElementById('crStart').addEventListener('click',startRun);d.getElementById('crLeft').addEventListener('click',()=>shiftLane(-1));d.getElementById('crRight').addEventListener('click',()=>shiftLane(1));d.getElementById('crJump').addEventListener('click',runnerJump);
    rArena.addEventListener('pointerdown',e=>{rTouchX=e.clientX;rTouchY=e.clientY;});
    rArena.addEventListener('pointerup',e=>{const dx=e.clientX-rTouchX,dy=e.clientY-rTouchY;if(Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy))shiftLane(dx>0?1:-1);else if(dy<-28)runnerJump();});
  }


  function installExtraUpgrade() {
    const frame = document.getElementById('petiteMarieGame');
    if (!frame || !frame.contentDocument) return false;
    const d = frame.contentDocument;
    if (!d.getElementById('vectorRigBase')) return false;
    findMiniFartData(d);
    fitVectorCosmetics(d);
    installExtraGames(d);
    return true;
  }

  function waitInstall(attempt=0) {
    if (installExtraUpgrade()) return;
    if (attempt < 30) setTimeout(() => waitInstall(attempt+1), 100);
  }
  const frame = document.getElementById('petiteMarieGame');
  if (frame) frame.addEventListener('load', () => setTimeout(() => waitInstall(), 120));
  setTimeout(() => waitInstall(), 180);
})();
