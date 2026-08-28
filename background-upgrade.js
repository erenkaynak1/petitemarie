(() => {
  async function loadB64(path){
    const r = await fetch(path, {cache:'no-store'});
    if(!r.ok) throw new Error(`Background load failed: ${path}`);
    return (await r.text()).trim();
  }

  async function install(){
    const frame = document.getElementById('petiteMarieGame');
    if(!frame || !frame.contentDocument) return;
    const d = frame.contentDocument;
    if(d.getElementById('premiumMiniBgStyle')) return;

    try{
      const [jumpB64, runB64] = await Promise.all([
        loadB64('./assets/fart-jumper-bg.webp.b64'),
        loadB64('./assets/cinna-run-bg.webp.b64')
      ]);

      const style = d.createElement('style');
      style.id = 'premiumMiniBgStyle';
      style.textContent = `
        .jumpArt{
          background-image:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,238,232,.08)),url("data:image/webp;base64,${jumpB64}")!important;
          background-size:cover!important;
          background-position:center 47%!important;
          box-shadow:inset 0 0 0 1px rgba(255,255,255,.45)!important;
        }
        .jumpArt:before,.jumpArt:after{display:none!important}

        .runArt{
          background-image:linear-gradient(180deg,rgba(255,255,255,.01),rgba(255,235,229,.06)),url("data:image/webp;base64,${runB64}")!important;
          background-size:cover!important;
          background-position:center 63%!important;
          box-shadow:inset 0 0 0 1px rgba(255,255,255,.45)!important;
        }
        .runArt:before{display:none!important}
        .runArt:after{font-size:34px!important;filter:drop-shadow(0 3px 2px rgba(70,35,20,.18))}

        .fjArena{
          background-image:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,241,233,.13)),url("data:image/webp;base64,${jumpB64}")!important;
          background-size:cover!important;
          background-position:center 47%!important;
          border:3px solid rgba(255,208,188,.92)!important;
          box-shadow:inset 0 0 0 3px rgba(255,255,255,.42),0 14px 34px rgba(113,61,39,.18)!important;
        }
        .fjArena:before{background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,226,213,.08))!important;opacity:1!important}
        .fjPlatform{
          background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(255,218,226,.96))!important;
          border:2px solid rgba(226,150,159,.92)!important;
          box-shadow:0 6px 12px rgba(125,70,61,.18),inset 0 2px 0 rgba(255,255,255,.82)!important;
        }

        .crArena{
          background-image:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,236,229,.05)),url("data:image/webp;base64,${runB64}")!important;
          background-size:cover!important;
          background-position:center 64%!important;
          border:3px solid rgba(255,208,188,.92)!important;
          box-shadow:inset 0 0 0 3px rgba(255,255,255,.42),0 14px 34px rgba(113,61,39,.18)!important;
        }
        .crRoad{
          background:linear-gradient(90deg,transparent 31.6%,rgba(255,255,255,.62) 32% 33%,transparent 33.4% 66%,rgba(255,255,255,.62) 66.4% 67.4%,transparent 67.8%)!important;
          filter:drop-shadow(0 2px 1px rgba(89,51,43,.06));
        }
        .crRoad:after{opacity:.26!important}
        .crObstacle{box-shadow:0 8px 18px rgba(86,45,34,.22)!important}
      `;
      d.head.appendChild(style);
    }catch(e){
      console.warn('Premium mini-game backgrounds could not be installed', e);
    }
  }

  const frame = document.getElementById('petiteMarieGame');
  if(frame){
    frame.addEventListener('load',()=>setTimeout(install,120));
    setTimeout(install,350);
  }
})();
