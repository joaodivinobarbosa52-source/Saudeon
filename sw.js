const V='caminhada-v2',T='caminhada-tiles';
const SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V&&n!==T).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 if(u.hostname==='server.arcgisonline.com'){
  e.respondWith(caches.open(T).then(async c=>{const m=await c.match(r,{ignoreVary:true});if(m)return m;
   try{const n=await fetch(r);if(n.ok)c.put(r,n.clone());return n}catch{return Response.error()}}));return}
 if(u.origin!==location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>{
  const n=fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x}).catch(()=>m);
  return m||n}));
});
