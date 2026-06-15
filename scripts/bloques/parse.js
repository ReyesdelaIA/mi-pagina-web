// Parser de sesiones -> bloques. Divide el HTML por cards y extrae datos + imágenes base64.
const fs = require('fs');

function decodeEntities(s){
  return s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
          .replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ');
}
function stripTags(s){ return decodeEntities(s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()); }

function parseSession(file){
  const html = fs.readFileSync(file,'utf8');
  // Cortar por apertura de card de contenido (las que tienen onclick toggle)
  const marker = /<div class="card"[^>]*onclick="[^"]*"[^>]*>/g;
  const idxs=[]; let m;
  while((m=marker.exec(html))) idxs.push(m.index);
  const cards=[];
  for(let i=0;i<idxs.length;i++){
    const start=idxs[i];
    const end = i+1<idxs.length ? idxs[i+1] : html.indexOf('<script',start)>-1?html.indexOf('<script',start):html.length;
    const chunk = html.slice(start,end);
    const title = (chunk.match(/<div class="card-title">([\s\S]*?)<\/div>/)||[])[1];
    const desc  = (chunk.match(/<div class="card-desc">([\s\S]*?)<\/div>/)||[])[1];
    // pasos
    const steps=[];
    const stepRe=/<div class="step-text">([\s\S]*?)<\/div>/g; let sm;
    while((sm=stepRe.exec(chunk))) steps.push(stripTags(sm[1]));
    // pro tip
    const protip = (chunk.match(/idea-pro-text">([\s\S]*?)<\/div>/)||[])[1];
    // desafio (tip / hands-on)
    const desafio = (chunk.match(/<div class="tip"[^>]*>([\s\S]*?)<\/div>/)||[])[1];
    // imagenes base64 dentro del card
    const imgRe=/data:image\/([a-z]+);base64,([A-Za-z0-9+\/=]+)/g; let im; const imgs=[];
    while((im=imgRe.exec(chunk))) imgs.push({ext:im[1],len:im[2].length,b64:im[2]});
    cards.push({
      title: title?stripTags(title):null,
      desc: desc?stripTags(desc):null,
      steps, protip: protip?stripTags(protip):null,
      desafio: desafio?stripTags(desafio):null,
      imgCount: imgs.length,
      imgs
    });
  }
  return cards;
}

module.exports={parseSession,stripTags};

if(require.main===module){
  const file=process.argv[2];
  const cards=parseSession(file);
  cards.forEach((c,i)=>{
    console.log(`[${i}] "${c.title}" | imgs=${c.imgCount} | pasos=${c.steps.length} | protip=${c.protip?'Y':'-'} | desafio=${c.desafio?'Y':'-'}`);
  });
  console.log(`TOTAL cards=${cards.length}`);
}
