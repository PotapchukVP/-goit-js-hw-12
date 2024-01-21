import{i as u,a as b,S as w}from"./assets/vendor-ad00ede7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))p(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&p(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function p(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const L="/goit-js-hw-12/assets/bi_x-octagon-2-17638c89.svg",i=document.querySelector(".gallery-wrapper"),S=document.querySelector(".search-button"),c=document.querySelector(".load-more-button"),q=document.querySelector(".loader-position"),g=document.querySelector(".loading-label");u.settings({timeout:5e3,theme:"light",message:"Sorry, there are no images matching your search query. Please, try again!",messageColor:"rgba(250, 250, 250, 1)",maxWidth:"392px",messageSize:"322px",position:"topRight",color:"#EF4040",progressBar:!0,progressBarColor:"#B51B1B",icon:"",iconText:"",iconColor:"",iconUrl:L,image:"",imageWidth:50,zindex:null,layout:1,balloon:!1,close:!0,closeOnEscape:!1,closeOnClick:!0,displayMode:0,target:"",targetFirst:!0,animateInside:!1,progressBarEasing:"linear",overlayClose:!0,transitionIn:"fadeInUp",transitionOut:"fadeOut",transitionInMobile:"fadeInUp",transitionOutMobile:"fadeOutDown",buttons:{},inputs:{},onOpening:function(){},onOpened:function(){},onClosing:function(){},onClosed:function(){}});const x="https://pixabay.com/api/",I="41858556-aa96e57fcb7c92b306b25a0e4",v=b.create({baseURL:x});let a=0,l={key:I,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:40};const B=new w(".gallery-item a",{close:!0,captions:!0,captionsData:"alt",captionDelay:250});S.addEventListener("click",t=>{t.preventDefault(),l.q=document.querySelector("#input-field").value.trim(),y(),d()});window.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),l.q=document.querySelector("#input-field").value.trim(),y(),d(),h())});c.addEventListener("click",t=>{t.preventDefault(),l.page+=1,d(),h()});function y(){i.innerHTML="",l.page=1,g.style.display="none"}function d(){if(l.q==="")return u.show();const e=`?${new URLSearchParams(l).toString()}`;E(e).then(n=>O(n)).catch(n=>console.error(n))}async function E(t){try{const e=await v.get(t);return(!a||e.data.totalHits!==a*l.per_page)&&(a=Math.ceil(e.data.totalHits/l.per_page)),e.data}catch(e){console.error(e)}}function O(t){if(q.style.display="none",t.totalHits===0)return i.innerHTML="",f(),u.show();const e=t.hits.map(n=>`<li class="gallery-item"> 
      <a class="gallery-link" href="${n.largeImageURL}">
        <img
          class="gallery-image"
          data-src="${n.webformatURL}"
          alt="${n.tags}">
      </a>
      <div class="image-info">
        <label class="label-text">Likes
          <p>${n.likes}</p>
        </label>
        <label class="label-text">Views
          <p>${n.views}</p>
        </label>
        <label class="label-text">Comments
          <p>${n.comments}</p>
        </label>
        <label class="label-text">Downloads
          <p>${n.downloads}</p>
        </label>
      </div>
    </li>`);i.insertAdjacentHTML("beforeend",e.join("")),m(),B.refresh(),f()}function f(){if(c.style.display=document.querySelector(".gallery-item")?"flex":"none",l.page>=a&&a!==0){c.style.display="none",g.style.display="flex";return}}window.addEventListener("scroll",m);function m(){document.querySelectorAll(".gallery-image").forEach(e=>{H(e)&&(e.src=e.dataset.src)})}function H(t){const e=t.getBoundingClientRect();return e.bottom>=0&&e.right>=0&&e.top<=(window.innerHeight||document.documentElement.clientHeight)&&e.left<=(window.innerWidth||document.documentElement.clientWidth)}function h(){const t=document.querySelector(".gallery-item");if(t){const e=t.offsetHeight;window.scrollBy(0,e*2)}}
//# sourceMappingURL=commonHelpers.js.map
