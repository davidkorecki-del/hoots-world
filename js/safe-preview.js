('use strict');
/* Staging write guard for the Hoot's World layout preview.
   Does not change tutor, game or learning logic. Blocks writes to
   supabase and to the kids-homeschool production host. */
(function(){
  var PROD = /kids-homeschool\.pages\.dev|smqdfujuqovkaosssfte\.supabase\.co|supabase\.co|supabase\.in/i;
  function onStaging(){
    try{
      var h = String(location.hostname||'').toLowerCase();
      /* Public production is a github.io host. pages.dev and localhost are staging. */
      return !/\.github\.io$/i.test(h);
    }catch(e){ return true; }
  }
  function urlOf(input){
    try{
      var raw = (typeof Request!=='undefined' && input instanceof Request) ? input.url
        : (typeof URL!=='undefined' && input instanceof URL) ? input.href
        : String(input);
      return new URL(raw, location.href);
    }catch(e){ return null; }
  }
  function methodOf(input, opt){
    var method='GET';
    if(opt && opt.method) method=String(opt.method);
    else if(typeof Request!=='undefined' && input instanceof Request) method=input.method||'GET';
    else if(input && typeof input==='object' && input.method) method=String(input.method);
    return String(method).toUpperCase();
  }
  function isBlocked(input, opt){
    var method=methodOf(input, opt);
    var u=urlOf(input);
    if(!u) return false;
    var href=String(u.href);
    /* 3e40: the NEW family-account project is not the production family data.
       It is allowed, but only the exact host named in js/hoot-config.js, and
       never the old production project, whatever the config says. */
    try{
      var be=(window.HOOT_BACKEND&&window.HOOT_BACKEND.url)?new URL(window.HOOT_BACKEND.url):null;
      if(be && be.protocol==='https:' && u.host===be.host && !/smqdfujuqovkaosssfte/i.test(u.host) && !/kids-homeschool/i.test(u.host)) return false;
    }catch(e){}
    if(PROD.test(href) && method!=='GET' && method!=='HEAD') return true;
    if(PROD.test(href) && /auth|rest|sync|functions/i.test(u.pathname)) return true;
    return false;
  }
  function deny(){ return Promise.reject(Object.assign(new Error('Preview copy cannot change family data.'),{safeMode:true})); }
  var blocked=[];
  if(typeof window!=='undefined'){
    window.__hwBlockedWrites=blocked;
    window.HW_SAFE=onStaging();
    try{
      var root=document.documentElement;
      if(root){
        root.classList.toggle('hw-is-preview', !!window.HW_SAFE);
        root.classList.toggle('hw-is-live', !window.HW_SAFE);
      }
    }catch(e){}
  }
  if(onStaging() && typeof window!=='undefined' && !window.__hwSafeFetch){
    window.__hwSafeFetch=true;
    var origFetch=window.fetch.bind(window);
    window.fetch=function(input, init){
      if(isBlocked(input, init)){
        blocked.push({via:'fetch', method:methodOf(input, init), url:String((urlOf(input)||{}).href||input)});
        return deny();
      }
      return origFetch(input, init);
    };
    if(typeof XMLHttpRequest!=='undefined'){
      var xo=XMLHttpRequest.prototype.open, xs=XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.open=function(method, url){ this.__hwM=method; this.__hwU=url; return xo.apply(this, arguments); };
      XMLHttpRequest.prototype.send=function(){
        if(isBlocked(this.__hwU,{method:this.__hwM})){
          blocked.push({via:'xhr', method:String(this.__hwM||''), url:String(this.__hwU||'')});
          try{ this.abort(); }catch(e){}
          throw Object.assign(new Error('Preview copy cannot change family data.'),{safeMode:true});
        }
        return xs.apply(this, arguments);
      };
    }
  }
})();
/* 3e40: when a parent is signed in to the family account, saving IS real
   (to the account service only), so the preview banner must not say otherwise */
(function(){
  function fix(){
    var b=document.getElementById('preview-banner'); if(!b) return;
    if(!window.HW_SAFE){ b.hidden=true; return; }
    b.hidden=false;
    var A=window.HootAccount;
    if(A && A.active && A.active()) b.textContent='Test copy: saves only to your new family account, never to the old family data.';
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', fix); else fix();
  document.addEventListener('hoot-account-changed', fix);
})();
