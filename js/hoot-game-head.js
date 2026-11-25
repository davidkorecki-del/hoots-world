/* Hoot's World — Shared Game Head Runtime (Wave 3 extraction)
   Loaded synchronously in <head> before each game's scripts.
   Order: NameFix -> GameFix -> Voice Governor -> Hoot Coach. */
window.__hwNameFix=function(f,k){var m=/^call-(letter|color|shape|number)-([a-z0-9]+)\.mp3$/.exec(String(f||""));if(!m)return f;if(/^(callout|songcall|hint)$/.test(String(k||"")))return f;var N=null;try{N=window.parent&&window.parent.HOOT_NAMES;}catch(e){}var key=m[1]+"-"+m[2];return N&&N[key]?"name-"+key+".mp3":null;};
(function(){
  if(window.__hootFix) return; window.__hootFix=1;
  /* 1. Wave 5B Voice Discipline (Device Reports #2 & #3):
        - Rotate praise & try-again clips across small variant decks so the exact same
          Hoot line NEVER repeats back-to-back in a session.
        - Cap win/recap voice to ONE short cheer line (drop stacked 2nd/3rd recap clips).
        - Keep 15s dedup for repeated identical non-teaching lines; skipped lines still
          fire "ended" so game voice queues never stall. */
  var recent={}, P=HTMLMediaElement.prototype, LINE=new RegExp("(?:^|/)(hoot-[a-z0-9-]+|owl-[a-z0-9-]+|lily-[a-z0-9-]+|coach/[a-z]+-(?:intro|idle|praise|wrong))[.]mp3(?:$|\\?)","i");
  /* Device Report #4 (Blocker fix): per-round teaching / target callouts & prompts MUST NEVER be
     deduped, rotated, or suppressed — every round speaks its target callout cleanly. */
  var PROMPT_ALLOW=/^(?:call-|fish-|name-|ask-|teach-|peek-|homes-|feed-|food-|sound-|word-|phonics-|song-|lib-|story-|sayit-|tut-|kidc-|m7-|e7-|s7-|ss7-|hoot-(?:disp|fire|doc|pol|bus|r3d|piz|twk|feed)-)/i;
  /* Wave 5C (Muse): full 8-clip praise deck, 5-clip try-again deck, 6-clip 1s win cheer deck
     — all gated through window.parent.HOOT_HAVE so only verified clips ever play. */
  var PRAISE_DECK=["hoot-great-job.mp3","hoot-amazing.mp3","hoot-star.mp3","hoot-great-thinking.mp3","hoot-yay-2.mp3","hoot-nice-2.mp3","hoot-got-it.mp3","hoot-super.mp3"];
  var WRONG_DECK=["hoot-try-again.mp3","hoot-look-closely.mp3","hoot-keep-going.mp3","hoot-almost.mp3","hoot-close.mp3"];
  var WIN_DECK=["hoot-win-yay.mp3","hoot-win-star.mp3","hoot-yay-2.mp3","hoot-super.mp3","hoot-amazing.mp3","hoot-great-job.mp3"];
  var lastPraise="", lastWrong="", lastWin="", winCheerAt=0;
  var rotIdx={p:0, w:0, win:0};
  function hasVoice(base){
    try{ return !!(window.parent && window.parent.HOOT_HAVE && window.parent.HOOT_HAVE[base]); }catch(e){ return false; }
  }
  function swapBase(url, nextFile){ return String(url||"").replace(/[^\/]+$/, nextFile); }
  function skipCleanly(el){
    /* Clear game's <400ms stale-Safari-ended retry guard so vNext() ALWAYS advances and never stalls vPlaying */
    el.__hwT=0; el.__hwRetry=1;
    setTimeout(function(){ try{ el.dispatchEvent(new Event("ended")); }catch(e){} },30);
    return Promise.resolve();
  }
  function pickRot(deck, curFile, lastFile, slot){
    var avail=deck;
    try{
      var H=window.parent&&window.parent.HOOT_HAVE;
      if(H){
        var f=deck.filter(function(x){ return !!H[x.replace(/\.mp3$/,"")]; });
        if(f.length) avail=f;
      }
    }catch(e){}
    if(avail.length<=1) return avail[0]||curFile;
    /* Advance cleanly through the ENTIRE deck so games that hardcode one clip (e.g. hoot-try-again
       or hoot-amazing) hear all 8 praise / 5 try-again / 6 win variants instead of ping-ponging 2 clips! */
    var k=slot||"p";
    var pick=avail[(rotIdx[k]++)%avail.length];
    if(pick===lastFile && avail.length>1) pick=avail[(rotIdx[k]++)%avail.length];
    return pick;
  }
  var mine=null;
  function install(){
    if(P.play===mine) return;
    var op=P.play;
    mine=function(){
      /* already decided for this exact play call by an outer copy of this guard */
      if(this.__hfT && Date.now()-this.__hfT<200) return op.apply(this,arguments);
      this.__hfT=Date.now();
      /* CRITICAL (Device Report #4): ALWAYS read the freshly assigned getAttribute("src") / this.src
         BEFORE this.currentSrc! On a reused Audio element, currentSrc still holds the PREVIOUS round's
         clip (e.g. hoot-amazing.mp3) synchronously during play(), which caused Round 2+ call-letter-*
         prompts to be mistaken for repeated praise and clobbered. */
      var s=String((this.getAttribute&&this.getAttribute("src"))||this.src||this.currentSrc||"");
      var baseFn=s.replace(/.*\//,"").split("?")[0].toLowerCase();
      var isPrompt=PROMPT_ALLOW.test(baseFn) || /\/coach\/phonics-/i.test(s);
      var m=isPrompt ? null : s.match(LINE);
      if(m && s.indexOf("giggle")<0){
        var k=m[1].toLowerCase(), fn=k+".mp3", now=Date.now();
        /* Win/recap anti-stacking: allow ONE short cheer on win, drop stacked 2nd/3rd clips within 4.5s */
        var winEl=document.getElementById("winOverlay");
        var onWin=!!(winEl && winVisible(winEl)) || k==="hoot-you-learned";
        if(onWin && (k==="hoot-you-learned" || PRAISE_DECK.indexOf(fn)>=0 || WIN_DECK.indexOf(fn)>=0)){
          if(winCheerAt && now-winCheerAt<4500){
            return skipCleanly(this);
          }
          winCheerAt=now;
          /* On win, pick a snappy 1s cheer from WIN_DECK (hoot-win-yay / hoot-win-star / hoot-yay-2 / hoot-super...) */
          var rotW=pickRot(WIN_DECK, WIN_DECK[0], lastWin, "win");
          lastWin=rotW; lastPraise=rotW;
          if(rotW!==fn){
            this.setAttribute("src", swapBase(s, rotW));
            s=this.getAttribute("src")||s;
            k=rotW.replace(/\.mp3$/,"");
            fn=rotW;
          }
        } else if(PRAISE_DECK.indexOf(fn)>=0){
          /* Rotate 8-clip praise deck so identical praise never repeats back-to-back */
          var rotP=pickRot(PRAISE_DECK, fn, lastPraise, "p");
          lastPraise=rotP;
          if(rotP!==fn){
            this.setAttribute("src", swapBase(s, rotP));
            s=this.getAttribute("src")||s;
            k=rotP.replace(/\.mp3$/,"");
          }
        } else if(WRONG_DECK.indexOf(fn)>=0){
          /* Rotate 5-clip gentle try-again deck (try-again / look-closely / keep-going / almost / close) */
          var rotN=pickRot(WRONG_DECK, fn, lastWrong, "w");
          lastWrong=rotN;
          if(rotN!==fn){
            this.setAttribute("src", swapBase(s, rotN));
            s=this.getAttribute("src")||s;
            k=rotN.replace(/\.mp3$/,"");
          }
        } else if(recent[k] && now-recent[k]<15000){
          return skipCleanly(this);
        }
        recent[k]=now;
      }
      /* 3e56: a voice clip that stalls (never starts, stops loading, or never fires ended)
         is stopped and reported as ended, so the game never waits on it forever. */
      var el=this; if((s.indexOf('voice/')>-1||s.indexOf('.mp3')>-1) && !el.loop){
        var gen=(el.__hfG=(el.__hfG||0)+1), t0=Date.now(), lt=-1, lp=Date.now();
        var iv2=setInterval(function(){
          if(el.__hfG!==gen||el.ended){ clearInterval(iv2); return; }
          if(el.paused && Date.now()-t0>1500){ clearInterval(iv2); return; }
          var ct=el.currentTime||0; if(ct!==lt){ lt=ct; lp=Date.now(); }
          var d=(isFinite(el.duration)&&el.duration>0)?el.duration:15;
          if(Date.now()-lp>6000 || Date.now()-t0>(d+5)*1000){ clearInterval(iv2); el.__hfStall=(el.__hfStall||0)+1; try{ el.pause(); }catch(e){} try{ el.dispatchEvent(new Event('ended')); }catch(e){} }
        },1000);
      }
      return op.apply(this,arguments);
    };
    P.play=mine;
  }
  install();
  /* 2. Tickle only on the actual belly: when Hoot is drawn small, the 44 px
        minimum made the belly zone cover all of him, so any tap tickled. */
  function bellies(){
    var bs=document.querySelectorAll('[aria-label*="belly"]');
    for(var i=0;i<bs.length;i++){
      var host=bs[i].parentElement; if(!host) continue;
      var h=host.getBoundingClientRect().height;
      if(h>0 && h<130){ bs[i].style.pointerEvents="none"; bs[i].setAttribute("aria-hidden","true"); bs[i].tabIndex=-1; }
    }
  }
  /* 3. One big pulsing obvious next-action button (Riley age-2 floor):
        - Win screen: ALWAYS #againBtn (never #winHomeBtn / "Start Screen"!).
        - Start screen: ALWAYS #playBtn / .big-play.
        - Active play: single required action (#playTuneBtn, #reelInBtn.ready,
          #nextFishBtn, #wandBtn.ready, #hatBtn.glow, #nextBtn.show, #celebrateBtn.on). */
  function vis(el){
    if(!el||el.hidden||el.disabled) return false;
    var r=el.getBoundingClientRect(); if(!r.width||!r.height) return false;
    var cs=getComputedStyle(el); if(cs.visibility==="hidden"||cs.display==="none"||cs.pointerEvents==="none") return false;
    var p=el.parentElement;
    while(p&&p.nodeType===1){
      if(p.hidden) return false;
      var pcs=getComputedStyle(p); if(pcs.display==="none"||pcs.visibility==="hidden") return false;
      p=p.parentElement;
    }
    return true;
  }
  function bigPlay(){
    var best=null;
    var win=document.getElementById("winOverlay");
    if(win&&vis(win)){
      var ag=document.getElementById("againBtn");
      if(vis(ag)) best=ag;
    }
    if(!best){
      var stp=document.getElementById("startPanel")||document.getElementById("startOverlay");
      if(stp&&vis(stp)){
        var pb=document.getElementById("playBtn")||stp.querySelector(".big-play,.play-btn");
        if(vis(pb)) best=pb;
      }
    }
    if(!best){
      var cands=["#playTuneBtn","#reelInBtn.ready","#nextFishBtn","#wandBtn.ready","#hatBtn.glow","#nextBtn.show","#celebrateBtn.on"];
      for(var c=0;c<cands.length;c++){
        var el=document.querySelector(cands[c]);
        if(vis(el)){ best=el; break; }
      }
    }
    if(!best){
      var bs=document.querySelectorAll("button,[role=button]"), area=0;
      for(var i=0;i<bs.length;i++){
        var b=bs[i];
        if(b.id==="winHomeBtn"||b.id==="homeBtn"||!vis(b)) continue;
        if(!/(▶|play again|dance again|find again|fly again|let.?s go|start the|start dressing|start adventuring)/i.test(b.textContent||"")) continue;
        var r=b.getBoundingClientRect();
        if(r.width*r.height>area){ area=r.width*r.height; best=b; }
      }
    }
    var old=document.querySelectorAll(".hoot-go");
    for(var j=0;j<old.length;j++) if(old[j]!==best) old[j].classList.remove("hoot-go");
    if(best) best.classList.add("hoot-go");
  }
  var st=document.createElement("style");
  st.textContent=".hoot-go{animation:hootGo 1.35s ease-in-out infinite!important;min-height:64px!important;font-size:max(1.15em,20px)!important;box-shadow:0 0 0 6px #ffd93b,0 0 22px rgba(255,217,59,.75)!important}@keyframes hootGo{50%{transform:scale(1.06)}}.hoot-nudge{animation:hootNudge 1.1s ease-in-out 3!important;box-shadow:0 0 0 5px #ffd93b!important}.balloon.hoot-nudge,.fall-star.hoot-nudge,.fishwrap.hoot-nudge,.food.hoot-nudge,.animal-choice.hoot-nudge,.find-friend.hoot-nudge{box-shadow:none!important;filter:drop-shadow(0 0 12px #ffd93b) drop-shadow(0 0 6px #ffd93b)!important}@keyframes hootNudge{50%{transform:scale(1.08)}}#hwWinExitBtn{background:#1c7ed6!important;color:#fff!important;border:3px solid #fff!important;box-shadow:0 5px 0 #145ea0,0 10px 20px rgba(28,126,214,.3)!important}#hwWinExitBtn.hw-next{background:#40c057!important;box-shadow:0 5px 0 #2b8a3e,0 10px 20px rgba(64,192,87,.35)!important}#hwAutoExitNote{margin:10px 0 0;font-weight:800;font-size:14.5px;color:#3d5a78}";
  function cancelAutoExit(){
    if(window.__hwAutoExitT){ clearTimeout(window.__hwAutoExitT); window.__hwAutoExitT=null; }
    var note=document.getElementById("hwAutoExitNote");
    if(note) note.hidden=true;
  }
  function exitGameToShell(){
    cancelAutoExit();
    winCheerAt=0;
    try{ if(window.__govStopAll) window.__govStopAll(); }catch(e){}
    try{ if(window.__hootStopCoach) window.__hootStopCoach(); }catch(e){}
    try{
      if(window.parent && window.parent.__hwFromTodayPath && typeof window.parent.__llAdvanceTodayPath==="function"){
        window.parent.__llAdvanceTodayPath();
        return;
      }
    }catch(e){}
    try{ if(window.parent && window.parent!==window) window.parent.postMessage({hootGameNav:"homeschooling-app-mockup"},"*"); }catch(e){}
  }
  /* Device Report #9 (Dawid ruling): for little-kid profiles (Zane/Riley), after a brief celebration
     the game returns on its own to the games chooser (or Today's Path next stop) instead of parking
     on a decision screen. Tapping Play Again / Start Screen cancels auto-exit immediately.
     Kaitlyn (older/teen band) keeps her normal end screens with zero auto-exit. */
  function armLittleAutoExit(win){
    cancelAutoExit();
    try{
      if(!window.parent || window.parent===window) return;
      var isLittle=!!(window.parent.__llIsLittleKid && window.parent.__llIsLittleKid());
      if(!isLittle) return;
      var fromToday=!!(window.parent.__hwFromTodayPath && typeof window.parent.__llAdvanceTodayPath==="function");
      var card=win.querySelector("#winCard") || win.firstElementChild;
      if(card){
        var note=document.getElementById("hwAutoExitNote");
        if(!note){
          note=document.createElement("p");
          note.id="hwAutoExitNote";
          card.appendChild(note);
        }
        note.hidden=false;
        note.textContent=fromToday ? "✨ Moving to Next up — or tap Play Again!" : "✨ Back to games in a moment — or tap Play Again!";
      }
      window.__hwAutoExitT=setTimeout(function(){
        window.__hwAutoExitT=null;
        if(win && winVisible(win)) exitGameToShell();
      }, 3200);
    }catch(e){}
  }
  /* Device Report #7: ensure every iframe game win screen also has a clear one-tap Exit / Next Up
     button right beside Play Again (so children & parents never feel trapped on a win overlay). */
  function ensureWinExit(){
    try{
      if(!window.parent || window.parent===window) return;
      var win=document.getElementById("winOverlay"); if(!win) return;
      var row=win.querySelector(".win-btns"); if(!row) return;
      var fromToday=false;
      try{ fromToday=!!(window.parent.__hwFromTodayPath && typeof window.parent.__llAdvanceTodayPath==="function"); }catch(e){}
      var btn=document.getElementById("hwWinExitBtn");
      if(!btn){
        btn=document.createElement("button");
        btn.id="hwWinExitBtn"; btn.type="button"; btn.className="win-btn";
        btn.addEventListener("click", exitGameToShell);
        row.appendChild(btn);
      }
      btn.textContent=fromToday ? "Next up ▶" : "✓ Done";
      btn.classList.toggle("hw-next", fromToday);
    }catch(e){}
  }
  /* Wave 5B (Device Report #2): keep a tiny 220ms stray-tap debounce on win popup
     (down from 800ms) so Play Again is tappable immediately, AND stop celebration voice
     instantly when the child taps Play Again / Home. Also support tap-to-skip celebration. */
  function winVisible(el){ return !el.hidden && getComputedStyle(el).display!=='none' && getComputedStyle(el).visibility!=='hidden'; }
  function watchWins(){ if(!window.MutationObserver||!document.body||window.__hfWinObs) return; window.__hfWinObs=1;
    new MutationObserver(function(list){ list.forEach(function(m){ var el=m.target; if(el.nodeType===1&&/^win/i.test(el.id||'')){ var v=winVisible(el); if(v&&!el.__hfVis){ el.__hfShown=Date.now(); window.__hwWinSkipFn=null; ensureWinExit(); armLittleAutoExit(el); } else if(!v&&el.__hfVis){ cancelAutoExit(); } el.__hfVis=v; } }); })
      .observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden','class','style']}); }
  function guardWin(e){ var w=e.target, hit=false; while(w&&w.nodeType===1){ if(w.__hfShown&&Date.now()-w.__hfShown<220){ hit=true; break; } w=w.parentElement; } if(hit){ e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation(); } }
  ['pointerdown','pointerup','mousedown','mouseup','touchstart','touchend','click'].forEach(function(ev){ window.addEventListener(ev,guardWin,true); });
  window.addEventListener('pointerdown', function(e){
    if(typeof window.__hwWinSkipFn==='function'){
      var fn=window.__hwWinSkipFn; window.__hwWinSkipFn=null;
      try{ fn(); }catch(err){}
      return;
    }
    var b=e.target&&e.target.closest?e.target.closest('#againBtn,#winHomeBtn,#hwWinExitBtn'):null;
    if(b){
      cancelAutoExit();
      winCheerAt=0;
      try{ if(window.__govStopAll) window.__govStopAll(); }catch(err){}
      if(b.id==='againBtn' && hasVoice('hoot-ready-go')){
        try{ var rg=new Audio('assets/voice/hoot-ready-go.mp3'); var pr=rg.play(); if(pr&&pr.catch) pr.catch(function(){}); }catch(err){}
      }
    }
  }, true);
  window.__hwFastWin=function(fn, ms){
    var done=false;
    var run=function(){ if(done) return; done=true; window.__hwWinSkipFn=null; try{ fn(); }catch(err){} };
    window.__hwWinSkipFn=run;
    return setTimeout(run, ms);
  };
  document.addEventListener('DOMContentLoaded', watchWins); setTimeout(watchWins,0);
  function tick(){ try{ install(); bellies(); ensureWinExit(); bigPlay(); }catch(e){} }
  document.addEventListener("DOMContentLoaded", function(){ (document.head||document.documentElement).appendChild(st); tick(); });
  var n=0, iv=setInterval(function(){ tick(); if(++n>600) clearInterval(iv); }, 500);
  document.addEventListener("click", function(){ setTimeout(tick,250); }, true);
})();
(function(){if(window.__voiceGov)return;window.__voiceGov=1;try{var proto=window.HTMLMediaElement&&HTMLMediaElement.prototype;if(!proto)return;var desc=Object.getOwnPropertyDescriptor(proto,"src");if(!desc||!desc.set||!desc.get)return;var origSet=desc.set,origGet=desc.get,origPlay=proto.play;var cur=null,waiters=[];function isV(s){return !!s&&(s.indexOf("voice/")>-1||s.indexOf(".mp3")>-1);}function hook(el){if(el.__govHook)return;el.__govHook=1;el.addEventListener("ended",function(){onEnd(el);});el.addEventListener("error",function(){onEnd(el);});}function onEnd(el){var nxt=el.__govNext;if(nxt){if(el.__govFor===el.currentSrc){el.__govNext=null;origSet.call(el,nxt);cur=el;var p=origPlay.call(el);if(p&&p.catch)p.catch(function(){});return;}el.__govFor=el.currentSrc;if(!el.paused&&!el.ended){cur=el;return;}}if(cur===el&&(el.paused||el.ended)){cur=null;flush();}}window.__govStopAll=function(){if(cur){cur.__govNext=null;cur.__govWait=false;try{cur.pause();}catch(e){}cur=null;}for(var i=0;i<waiters.length;i++){waiters[i].__govWait=false;waiters[i].__govNext=null;try{waiters[i].pause();}catch(e){}}waiters.length=0;};function flush(){if(cur&&!cur.paused&&!cur.ended)return;cur=null;while(waiters.length){var w=waiters.shift();if(w.__govWait){w.__govWait=false;cur=w;var p=origPlay.call(w);if(p&&p.catch)p.catch(function(){if(cur===w&&(w.paused||w.ended)){cur=null;flush();}});return;}}}Object.defineProperty(proto,"src",{configurable:true,enumerable:desc.enumerable,get:function(){return origGet.call(this);},set:function(v){var el=this;if(isV(v)&&!el.paused&&!el.ended&&isV(el.currentSrc)){el.__govVoice=1;el.__govNext=v;el.__govFor=el.currentSrc;hook(el);if(!cur)cur=el;return;}origSet.call(el,v);}});proto.play=function(){var el=this;var s=(el.getAttribute&&el.getAttribute("src"))||el.src||el.currentSrc||"";if(!(el.__govVoice||isV(s)))return origPlay.apply(el,arguments);el.__govVoice=1;hook(el);if(cur&&cur!==el&&!cur.paused&&!cur.ended){if(!el.__govWait){el.__govWait=true;waiters.push(el);setTimeout(flush,1100);}return Promise.resolve();}cur=el;var r=origPlay.apply(el,arguments);if(r&&r.catch)r.catch(function(){if(cur===el&&(el.paused||el.ended)){cur=null;flush();}});return r;};}catch(e){}})();
(function(){
  if(window.__hootCoach) return; window.__hootCoach=1;
  var KEY=String(window.__HOOT_GAME_KEY__||"");
  var PHONICS={"A":{s:"a",w:"apple"},"B":{s:"buh",w:"balloon"},"C":{s:"kuh",w:"cat"},"D":{s:"duh",w:"dog"},"E":{s:"eh",w:"egg"},"F":{s:"fff",w:"fish"},"G":{s:"guh",w:"goat"},"H":{s:"huh",w:"hat"},"I":{s:"ih",w:"igloo"},"J":{s:"juh",w:"juice"},"K":{s:"kuh",w:"kite"},"L":{s:"lll",w:"lion"},"M":{s:"mmm",w:"monkey"},"N":{s:"nnn",w:"nest"},"O":{s:"ah",w:"octopus"},"P":{s:"puh",w:"penguin"},"Q":{s:"kwuh",w:"queen"},"R":{s:"rrr",w:"rainbow"},"S":{s:"sss",w:"sun"},"T":{s:"tuh",w:"turtle"},"U":{s:"uh",w:"umbrella"},"V":{s:"vvv",w:"violin"},"W":{s:"wuh",w:"whale"},"X":{s:"ks",w:"fox"},"Y":{s:"yuh",w:"yo-yo"},"Z":{s:"zzz",w:"zebra"}};
  var LINES={"balloon":{intro:"Pop the balloon with the letter I call! Listen, then tap that letter.",idle:"Listen for the letter, then pop that balloon!",wrong:"That was a different letter. Listen again and pop the one I called!",praise:"Yes! You popped the right letter!"},"dress":{intro:"Tap clothes, hats, and shoes to dress a friend. In Hoot Says, find what I call.",idle:"Tap a hat, shirt, or shoes to dress a friend!",wrong:"That is not the one I called. Look again!",praise:"Yes! That is what I asked for!"},"real":{intro:"Welcome to Town Rescue Patrol. Pick the Firefighter, Doctor, Police Officer, or Teacher to help our animal friends.",idle:"Tap a glowing rescue spot, or pick a rescue truck at the bottom.",wrong:"Try tapping a glowing rescue spot.",praise:"Great rescue! You helped save the town."},"rocket":{intro:"Tap the glowing golden stars to fuel your 3D rocket ship!",idle:"Tap a glowing golden star or press a bright button!",wrong:"Try tapping the matching number pod!",praise:"Awesome! Look at your 3D rocket fly!"},"pizza":{intro:"Welcome to Hoot's 3D Pizza Shop! Toss the dough, add yummy toppings, bake, slice, and serve!",idle:"Tap the glowing ingredient or button to keep making your pizza!",wrong:"Check the order picture at the window and try another topping!",praise:"Delicious! Our hungry friend loved your pizza!"},"twinkle":{intro:"Catch the twinkle stars I call! Watch the sky and tap the right stars.",idle:"Look up and tap a twinkling star!",wrong:"That was not the star I meant. Try another!",praise:"Yes! You caught the right star!"},"magic":{intro:"Tap the wand so the hat glows, then tap the hat. A surprise pops out — we will say its name and its first letter!",idle:"Tap the sparkly wand, then tap the hat!",wrong:"Not that one. Listen to the clue again, then pick a new picture!",praise:"Yes! We named the surprise and its first letter!"},"paint":{intro:"Pick a colour and a tool, then paint on the page! You can also colour in a picture or trace a letter.",idle:"Dip a colour and paint on the page!",wrong:"Try a different tool or colour, then paint again!",praise:"What a lovely picture! Keep painting!"},"dance":{intro:"Dance with me! Watch the move, then copy it. Freeze when I say freeze!",idle:"Watch the dance and copy the move!",wrong:"Almost! Watch again and copy the move.",praise:"Yes! You copied the dance!"},"animals":{intro:"Every animal has a home! Listen, then take the animal to the right home.",idle:"Tap an animal, then tap the home it belongs in!",wrong:"That is not this animal's home. Try a different home!",praise:"Yes! That is the right home!"},"piano":{intro:"Tap the colourful keys to play a tune! You can play freely or follow my notes.",idle:"Tap a key to hear a note!",wrong:"That was a different note. Listen and try again!",praise:"Yes! That was the right note!"},"splash":{intro:"Pull a lever on the Thunder Weather Machine to make storms, snow, wind, or sunshine over the town.",idle:"Slide a weather lever up or down, or tap the sky.",wrong:"Try another weather lever.",praise:"Great job! Look at the weather over the town."},"shapes":{intro:"Tap the night sky to launch animal fireworks, or hold your finger down for a big finale.",idle:"Tap the sky or an animal button to launch fireworks.",wrong:"Tap the sky to launch another firework.",praise:"Great job! Look at those animal fireworks."},"feed":{intro:"Hoot is hungry! Pick a snack and feed it to me. Some foods are yummy for an owl!",idle:"Tap a snack, then feed it to Hoot!",wrong:"Hoot does not want that one. Try a different snack!",praise:"Yum! Thank you for the snack!"},"peek":{intro:"Friends are hiding in the trees and bushes! I will say who to find. Tap a hiding spot — they sit on the picnic blanket!",idle:"Tap a tree, a bush, or a log to peek!",wrong:"Keep looking! Tap another hiding spot.",praise:"Peekaboo! They sit on the picnic blanket!"},"find":{intro:"Find what I call! Look at the picture, then tap the colour, letter, or thing I named.",idle:"Look carefully and tap the one I called!",wrong:"That is not the one I called. Look again!",praise:"Yes! You found it!"},"friends":{intro:"Meet the animal friends! Listen to the sound, then tap the friend who says it.",idle:"Listen, then tap the animal friend!",wrong:"That friend makes a different sound. Listen again!",praise:"Yes! That is the friend who says it!"},"memory":{intro:"Turn two cards to find a match! Remember what you see, then find its pair.",idle:"Tap a card, then tap another card to find a match!",wrong:"Those two do not match. Turn them over and try again!",praise:"Yes! That's a match!"},"bubblepop":{intro:"Pop the bubble with the number I call! Listen, then tap that number.",idle:"Listen for the number, then pop that bubble!",wrong:"That was a different number. Listen again!",praise:"Yes! You popped the right number!"},"fishing":{intro:"Catch the fish with the letter I call! Tap that fish when it swims by, then reel it in.",idle:"Watch the water and tap the fish with the letter I called!",wrong:"That was a different letter fish. Look for the one I called!",praise:"Yes! You caught the right letter!"},"band":{intro:"Copy the beat! Listen to my drum, then tap the same instruments in order.",idle:"Listen to the beat, then copy it on the instruments!",wrong:"That was a different beat. Listen again, then copy me!",praise:"Yes! You copied the beat!"}};
  window.__PHONICS=PHONICS;
  window.__HOOT_LINES=LINES;
  var lastTickleAt=0, lastSpeakAt=0, lastSpeakText="", lastKind="", introDone=false, lastByKind={}, lastByText={};
  var lastLetter="", lastCoachLogAt=0, lastCoachLogSrc="";
  var COOLDOWN_TICKLE=20000, COOLDOWN_SPEAK=15000;
  function strip(html){ return String(html||"").replace(/<[^>]+>/g," ").replace(/&rsquo;/g,"'").replace(/&mdash;/g,"—").replace(/&amp;/g,"&").replace(/\s+/g," ").trim(); }
  function logVoice(typ, src, kind){
    if(typ==="coach"){
      var nowLog=Date.now();
      if(String(src||"")===lastCoachLogSrc && nowLog-lastCoachLogAt<500) return;
      lastCoachLogAt=nowLog; lastCoachLogSrc=String(src||"");
    }
    window.__hootVoiceLog=window.__hootVoiceLog||[];
    window.__hootVoiceLog.push({t:Date.now(), typ:typ, src:String(src||""), kind:kind||""});
  }
  function phonicsLine(letter){
    var L=String(letter||"").toUpperCase();
    var p=PHONICS[L]; if(!p) return "";
    return L+" says "+p.s+", like "+p.w+"!";
  }
  window.__phonicsLine=phonicsLine;
  function showBubble(text){
    if(typeof say==="function"){ try{ say(text); return; }catch(e){} }
    var b=document.getElementById("bubble")||document.getElementById("hoot-text")||document.querySelector("[aria-live='polite']");
    if(b){ b.innerHTML=text; }
  }
  /* Muse recorded these lines in Hoot's own voice. Play the clip and keep the bubble.
     Never play the robotic or generic fallback voice. */
  var coachQueue=[], coachBusy=false, coachEl=null;
  window.__hootStopCoach=function(){
    coachQueue.length=0; coachBusy=false;
    if(coachEl){
      coachEl.__govWait=false; coachEl.__govNext=null;
      try{ coachEl.pause(); }catch(e){}
    }
  };
  window.__hootCoachBusy=function(){
    return !!(coachBusy || coachQueue.length || (coachEl && !coachEl.paused && !coachEl.ended));
  };
  function phonicsSrc(letter){ return "assets/voice/coach/phonics-"+String(letter||"").toLowerCase()+".mp3"; }
  function playCoachFiles(files, kind, plain){
    if(!files||!files.length) return;
    for(var i=0;i<files.length;i++){
      var k=(files.length>1 && i===files.length-1 && kind==="praise")?"phonics":kind;
      coachQueue.push({src:files[i], kind:k, plain:plain||""});
    }
    pumpCoach();
  }
  function pumpCoach(){
    if(coachBusy) return;
    var item=coachQueue.shift();
    if(!item) return;
    if(item.kind==="intro"){ try{ var PP=window.parent; if(PP!==window && PP.__hwIntroKey===KEY && Date.now()-PP.__hwIntroAt<15000){ logVoice("coach-intro-by-app", item.src, item.kind); pumpCoach(); return; } }catch(x){} }
    coachBusy=true;
    if(!coachEl){
      coachEl=new Audio();
      coachEl.addEventListener("ended", function(){ if(coachEl.__hwT && Date.now()-coachEl.__hwT<400 && !coachEl.paused && !coachEl.ended) return; /* 3e44: stale Safari ended event */ coachBusy=false; pumpCoach(); });
      coachEl.addEventListener("error", function(){
        logVoice("coach-error", coachEl.getAttribute("src")||coachEl.src||"", "error");
        coachBusy=false; pumpCoach();
      });
    }
    logVoice("coach", item.src, item.kind);
    try{
      var nowPlay=Date.now();
      if(item.kind && item.kind!=="phonics"){
        lastSpeakAt=nowPlay; lastKind=item.kind; lastByKind[item.kind]=nowPlay;
        if(item.plain){ lastSpeakText=item.plain; lastByText[item.plain]=nowPlay; }
      }
      coachEl.__hwT=Date.now(); coachEl.src=item.src;
      var p=coachEl.play();
      if(p&&p.catch) p.catch(function(err){ var name=(err&&err.name)||""; if(name==="NotAllowedError"){ logVoice("coach-autoplay", item.src, item.kind); /* 3e44: Safari blocks sound until the child touches the game. Keep the intro and play it on the first touch instead of retrying (and failing) straight away. */ if(item.kind==="intro" && !item._gest){ item._gest=1; var t0=Date.now(); var go=function(){ ["pointerup","touchend","click"].forEach(function(n){ document.removeEventListener(n,go,true); }); if(Date.now()-t0<30000){ try{ if(coachEl) coachEl.pause(); }catch(x){} coachEl=null; coachBusy=false; coachQueue.unshift(item); pumpCoach(); } }; ["pointerup","touchend","click"].forEach(function(n){ document.addEventListener(n,go,true); }); } } else { logVoice("coach-error", item.src, item.kind); } coachBusy=false; pumpCoach(); });
    }catch(e){
      logVoice("coach-error", String(e), item.kind);
      coachBusy=false; pumpCoach();
    }
  }
  function speakFallback(plain){
    logVoice("bubble-only", plain, "no-clip");
  }
  function speak(kind, extras){ if(kind==="praise"||kind==="wrong") return false; /* 3e43: the game already praises and corrects; the coach saying it too doubled every reaction and pushed back the next question */
    if(window.__HOOT_SELF_COACH__) return false; /* Self-voiced flagship games own their studio Hoot prompts & idle reminders */
    if(kind==="intro" && lastByKind.intro) return false; /* Wave 5B: instructions spoken ONCE per game start, never repeated */
    var pack=LINES[KEY]||{};
    var text=(pack[kind]||"");
    var letter="";
    if(extras){
      text=text.replace(/\{(\w+)\}/g,function(_,k){ return extras[k]!=null?String(extras[k]):""; });
      if(kind==="praise" && extras.letter){
        letter=String(extras.letter).toUpperCase();
        var pl=phonicsLine(letter);
        if(pl) text=text+" "+pl;
      }
    }
    if(!text) return false;
    var now=Date.now();
    var plain=strip(text);
    /* Autoplay/gesture retries a few ms apart are the same line, not a 15s violation. */
    if(plain===lastSpeakText && now-lastSpeakAt<500) return false;
    if((lastByText[plain]||0) && now-lastByText[plain]<500) return false;
    if(lastByText[plain] && now-lastByText[plain]<COOLDOWN_SPEAK) return false;
    if(kind!=="intro" && lastByKind[kind] && now-lastByKind[kind]<COOLDOWN_SPEAK) return false;
    lastSpeakAt=now; lastSpeakText=plain; lastKind=kind; lastByKind[kind]=now; lastByText[plain]=now;
    showBubble(text);
    var NEW_COACH={splash:"hoot-weather-",shapes:"hoot-fireworks-",real:"hoot-rescue-",rocket:"hoot-r3d-",pizza:"hoot-piz-"};
    var ncPrefix=NEW_COACH[KEY]||"";
    var ncId=ncPrefix?(KEY==="rocket"?"hoot-r3d-tap-stars":KEY==="pizza"?"hoot-piz-welcome":(ncPrefix+kind)):"";
    var hasNc=false;
    try{ hasNc=!!(ncId&&window.parent&&window.parent.HOOT_HAVE&&window.parent.HOOT_HAVE[ncId]); }catch(e){}
    var files=ncPrefix
      ?(hasNc?["assets/voice/"+ncId+".mp3"]:[kind==="praise"?"assets/voice/hoot-amazing.mp3":kind==="idle"?"assets/voice/hoot-idle-tap.mp3":"assets/voice/hoot-ready-go.mp3"])
      :["assets/voice/coach/"+KEY+"-"+kind+".mp3"];
    if(kind==="praise" && letter) files.push(phonicsSrc(letter));
    playCoachFiles(files, kind, plain);
    logVoice("speak", plain, kind);
    return true;
  }
  window.__hootSpeak=speak;

  /* Tickle ONLY from a belly tap, 20s cooldown. */
  function allowTickle(){
    var now=Date.now();
    if(now-lastTickleAt<COOLDOWN_TICKLE) return false;
    lastTickleAt=now;
    window.__bellyArmed=true;
    setTimeout(function(){ window.__bellyArmed=false; }, 400);
    return true;
  }
  window.__hootTickleBelly=function(){
    if(!allowTickle()) return false;
    logVoice("tickle","hoot-giggle.mp3","belly");
    if(typeof enqueue==="function"){
      try{ enqueue("hoot-giggle.mp3","giggle"); }catch(e){}
    } else {
      try{
        var a=new Audio("assets/voice/hoot-giggle.mp3");
        var p=a.play(); if(p&&p.catch) p.catch(function(){});
      }catch(e){}
    }
    return true;
  };

  function isGiggleSrc(s){ return /hoot-giggle/i.test(String(s||"")); }
  function blockGiggle(){ return !window.__bellyArmed; }

  function wrapEnqueue(){
    if(typeof enqueue!=="function" || enqueue.__hootWrapped) return;
    var orig=enqueue;
    enqueue=function(file,kind){
      if(isGiggleSrc(file) && blockGiggle()){
        logVoice("blocked-giggle", file, kind||"");
        return;
      }
      var ret=orig.apply(this, arguments);
      try{
        var f=String(file||"");
        var k=String(kind||"");
        var target=arguments.length>2?arguments[2]:"";
        if(f.indexOf("coach/")!==-1) return ret;
        if(/hoot-try-again/i.test(f) || k==="wrong"){
          speak("wrong");
        } else if(k==="praise"){
          var L=String(target||"").toUpperCase();
          if(/^[A-Z]$/.test(L)) speak("praise", {letter:L});
          else speak("praise");
        }
      }catch(err){}
      return ret;
    };
    enqueue.__hootWrapped=true;
  }
  function letterFromName(s){
    var fn=String(s||"").replace(/.*\//,"").split("?")[0].toLowerCase();
    var m=fn.match(/^(?:call-letter|fish-teach|phonics)-([a-z])\.mp3$/);
    return m?m[1].toUpperCase():"";
  }
  function letterFromDom(){
    if(lastLetter) return lastLetter;
    var el=document.getElementById("targetLetter");
    var t=((el&&el.textContent)||"").trim().toUpperCase();
    if(/^[A-Z]$/.test(t)) return t;
    try{
      for(var k in window){
        if(!/^__/.test(k) || !window[k] || typeof window[k].snapshot!=="function") continue;
        var st=window[k].snapshot();
        if(!st) continue;
        var cand=st.targetLetter||((typeof st.target==="string")?st.target:"");
        cand=String(cand||"").toUpperCase();
        if(/^[A-Z]$/.test(cand)) return cand;
      }
    }catch(e){}
    return "";
  }
  function onGameVoice(s){
    s=String(s||"");
    if(!s) return;
    if(/voice\/coach\//i.test(s) || /\/coach\//i.test(s)) return;
    var L=letterFromName(s);
    if(L) lastLetter=L;
    var fn=s.replace(/.*\//,"").split("?")[0].toLowerCase();
    if(/hoot-try-again/i.test(fn)){ speak("wrong"); return; }
    if(/^(hoot-amazing|hoot-star|hoot-great-job|hoot-you-learned|hoot-great-thinking)\.mp3$/.test(fn)){
      var letter=letterFromDom();
      if(letter) speak("praise",{letter:letter});
      else speak("praise");
    }
  }
  function wrapMedia(){
    try{
      var proto=HTMLMediaElement.prototype;
      var origPlay=proto.play;
      proto.play=function(){
        var s=this.getAttribute("src")||this.src||this.currentSrc||"";
        if(isGiggleSrc(s) && blockGiggle()){
          logVoice("blocked-giggle-play", s, "play");
          try{ this.pause(); }catch(e){}
          return Promise.resolve();
        }
        if(s){ logVoice("play", s, "media"); window.__hootLastVoice=Date.now(); }
        var pr=origPlay.apply(this, arguments); var me=this; /* 3e44: once the game itself is really talking, the intro the app started on the card tap stops */ if(pr&&pr.then&&String(s).indexOf("/coach/")<0) pr.then(function(){ try{ if(window.parent!==window && window.parent.__hwStopIntro) window.parent.__hwStopIntro(); }catch(err){} },function(){}); return pr;
      };
      var desc=Object.getOwnPropertyDescriptor(proto,"src");
      if(desc && desc.set && desc.get){
        var origSet=desc.set, origGet=desc.get;
        Object.defineProperty(proto,"src",{
          configurable:true,
          enumerable:desc.enumerable,
          get:function(){ return origGet.call(this); },
          set:function(v){
            try{ onGameVoice(v); }catch(err){}
            return origSet.call(this, v);
          }
        });
      }
    }catch(e){}
  }

  function installBelly(){
    var hosts=[
      document.getElementById("hootFig"),
      document.getElementById("hootWrap"),
      document.getElementById("guideHoot"),
      document.querySelector("[data-hoot-char]"),
      document.querySelector(".world-hoot"),
      document.getElementById("hoot-host"),
      document.querySelector("#hootDock button, #hootZone button")
    ].filter(Boolean);
    hosts.forEach(function(host){
      if(host.querySelector(".hoot-belly-hit")) return;
      var st=window.getComputedStyle(host);
      if(st.position==="static") host.style.position="relative";
      var belly=document.createElement("button");
      belly.type="button";
      belly.className="hoot-belly-hit";
      belly.setAttribute("aria-label","Tickle Hoot's belly");
      belly.style.cssText="position:absolute;left:50%;bottom:12%;transform:translateX(-50%);width:max(44px,42%);height:max(44px,30%);min-width:44px;min-height:44px;border:0;padding:0;background:transparent;cursor:pointer;z-index:8;";
      belly.addEventListener("click", function(e){
        e.preventDefault(); e.stopPropagation();
        if(typeof audio==="function") try{ audio(); }catch(err){}
        window.__hootTickleBelly();
      });
      host.appendChild(belly);
    });
  }

  function clearNudge(){
    document.querySelectorAll(".hoot-nudge").forEach(function(el){ el.classList.remove("hoot-nudge"); });
  }
  function nudgeVisual(){
    clearNudge();
    var target=document.querySelector(".hoot-go")||document.getElementById("hearBtn")||document.querySelector(".balloon,.bub,.fall-star,.food,.pot,.pad,.tile,.choice-btn,.shape-btn,.num-btn,.card:not(.matched),.spot:not(.revealed),.animal-choice,.find-friend,.pod,.quest");
    if(target){
      var r=target.getBoundingClientRect();
      if(r.width>0&&r.height>0){
        target.classList.add("hoot-nudge");
        setTimeout(function(){ target.classList.remove("hoot-nudge"); }, 3500);
      }
    }
  }
  /* Wave 5B (Device Report #3): Idle nudges rotate through variants and STOP after 2
     (silence is better than a 3rd repeat). Visual glow stays gentle without nagging audio. */
  var idleSpokenCount=0, idleVarIdx=0;
  function speakIdleVariant(step){
    if(window.__HOOT_SELF_COACH__) return;
    if(step===1){
      var cands=[];
      try{
        var H=window.parent&&window.parent.HOOT_HAVE;
        if(H&&H["hoot-idle-tap"]) cands.push(["assets/voice/hoot-idle-tap.mp3","Your turn! Tap one!"]);
        if(H&&H["hoot-try-this-one"]) cands.push(["assets/voice/hoot-try-this-one.mp3","Try this one!"]);
      }catch(e){}
      if(cands.length){
        var pick=cands[(idleVarIdx++)%cands.length];
        playCoachFiles([pick[0]], "idle", pick[1]);
        return;
      }
    }
    speak("idle");
  }
  function scheduleIdleStep(delayMs){
    if(window.__hootIdleTimer) clearTimeout(window.__hootIdleTimer);
    window.__hootIdleTimer=setTimeout(function idleTry(){
      var winEl=document.getElementById("winOverlay");
      if(winEl && !winEl.hidden && getComputedStyle(winEl).display!=="none") return;
      /* Never interrupt an active caught-letter teach card or mid-reel interaction with an idle prompt */
      var tc=document.getElementById("teachCard");
      var rl=document.getElementById("reelInBtn");
      if((tc && !tc.hidden && getComputedStyle(tc).display!=="none") || (rl && rl.classList.contains("ready"))){
        window.__hootIdleTimer=setTimeout(idleTry,2500);
        return;
      }
      if(Date.now()-(window.__hootLastVoice||0)<7000){ window.__hootIdleTimer=setTimeout(idleTry,2000); return; }
      nudgeVisual();
      if(idleSpokenCount<2){
        speakIdleVariant(idleSpokenCount);
        idleSpokenCount++;
        if(idleSpokenCount<2) scheduleIdleStep(12000);
      }
    }, delayMs);
  }
  function bumpIdle(){
    clearNudge();
    idleSpokenCount=0;
    scheduleIdleStep(10000);
  }

  wrapMedia();
  function boot(){
    wrapEnqueue();
    installBelly();
    if(!introDone){ introDone=true; setTimeout(function(){ speak("intro"); }, 350); }
    bumpIdle();
    document.addEventListener("pointerdown", bumpIdle, true);
    document.addEventListener("pointerdown", function(){ pumpCoach(); }, true);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  setTimeout(wrapEnqueue, 0);
  setTimeout(wrapEnqueue, 400);
})();
