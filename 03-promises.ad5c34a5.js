!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){n[e]=o},e.parcelRequired7c6=t);var r=t("h6c0i");const i=document.querySelector('[name="delay"]'),l=document.querySelector('[name="step"]'),u=document.querySelector('[name="amount"]');function a(e,o){const n=Math.random()>.3;return new Promise(((t,r)=>{setTimeout((()=>{n?t({position:e,delay:o}):r({position:e,delay:o})}),o)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();for(let e=0;e<u.value;e+=1)a(e+1,e*l.value+Number(i.value)).then((({position:e,delay:o})=>{r.Notify.success(`✅ Fulfilled promise ${e} in ${o}ms`)})).catch((({position:e,delay:o})=>{r.Notify.failure(`❌ Rejected promise ${e} in ${o}ms`)}))}))}();
//# sourceMappingURL=03-promises.ad5c34a5.js.map