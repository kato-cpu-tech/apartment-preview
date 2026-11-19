'use strict';
const data=JSON.parse(document.getElementById('gallery-data').textContent);
const roomSections=Array.from(document.querySelectorAll('.room'));
const filterButtons=Array.from(document.querySelectorAll('.filter'));
const count=document.getElementById('view-count');
let selectedRoom='all';
for(const button of filterButtons){button.addEventListener('click',()=>{
  selectedRoom=button.dataset.room;
  for(const other of filterButtons)other.setAttribute('aria-pressed',String(other===button));
  for(const section of roomSections)section.hidden=selectedRoom!=='all'&&section.dataset.room!==selectedRoom;
  const visible=data.filter(v=>selectedRoom==='all'||v.room_id===selectedRoom);
  count.textContent=selectedRoom==='all'?'16 uložených pohledů · 8 prostorů':'2 uložené pohledy · '+visible[0].room_label;
});}
const dialog=document.getElementById('photo-dialog'),modalImage=document.getElementById('modal-image'),modalTitle=document.getElementById('modal-title'),modalDownload=document.getElementById('modal-download');
let current=0;
function visibleViews(){return data.filter(v=>selectedRoom==='all'||v.room_id===selectedRoom);}
function showPhoto(id){const views=visibleViews();current=views.findIndex(v=>v.camera_id===id);if(current<0)current=0;updateModal();if(!dialog.open)dialog.showModal();}
function updateModal(){const views=visibleViews(),v=views[current];modalImage.src=v.jpg;modalImage.alt=v.label;modalTitle.textContent=v.label+' · '+(current+1)+' / '+views.length;modalDownload.href=v.png;modalDownload.download=v.camera_id+'.png';}
function advance(delta){const views=visibleViews();current=(current+delta+views.length)%views.length;updateModal();}
for(const button of document.querySelectorAll('[data-photo]'))button.addEventListener('click',()=>showPhoto(button.dataset.photo));
document.getElementById('modal-close').addEventListener('click',()=>dialog.close());
document.getElementById('modal-prev').addEventListener('click',()=>advance(-1));document.getElementById('modal-next').addEventListener('click',()=>advance(1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();advance(1);}if(e.key==='ArrowLeft'){e.preventDefault();advance(-1);}});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
const loadModel=document.getElementById('load-model'),frame=document.getElementById('model-frame');
loadModel.addEventListener('click',()=>{if(!frame.src)frame.src='viewer.html?v=77f25a52bd67';frame.hidden=false;loadModel.hidden=true;document.getElementById('model-helper').textContent='Tažením otáčíte. V seznamu lze vybrat stejné kamery jako v galerii. Strop lze skrýt.';});
