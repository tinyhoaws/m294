const cantons = ['ag', 'ar', 'bl', 'fr', 'gl', 'ju', 'ne', 'ow', 'sh', 'sz', 'ti', 'vd', 'zg', 'ai', 'be', 'bs', 'ge', 'gr', 'lu', 'nw', 'sg', 'so', 'tg', 'ur', 'vs', 'zh'];
let revealedcards = [];
const getFlagPath = function(canton) {
  return `./img/${canton}.png`;
}
let sliced = (cantons.sort(() => 0.5 - Math.random())).slice(0,10);
let duped = sliced.concat(sliced);
let shuffled = duped.sort(() => 0.5 - Math.random())

document.addEventListener('DOMContentLoaded', function() {
  const title = document.getElementById('counterbox');
  const playground = document.getElementById('playground');
  let createcounter = document.createElement('span');
    createcounter.setAttribute("id", "counter");
    console.log(createcounter);
    title.appendChild(createcounter);
    const counter =  document.getElementById("counter");
  shuffled.forEach(function(value) {
    const tile = document.createElement('div');
    const button = document.createElement('button');
    const tileImage = document.createElement('img');
    tileImage.setAttribute('src', getFlagPath(value));
    button.appendChild(tileImage);
    tile.appendChild(button);
    playground.appendChild(tile);
  });
  let visibles = document.getElementsByClassName("visible");
document.addEventListener("click", function handleClick(event) {
switch (true)
{
  case (revealedcards.length<2 && event.target.nodeName == "IMG" && event.target.className !== "visible"):
    console.log(event.target.nodeName);
    event.target.classList.add("visible");
    revealedcards.push(event.target.src);
    break;
case (revealedcards.length==2 && event.target.nodeName == "IMG"):
  console.log(event.target.nodeName);
  if(revealedcards[0]===revealedcards[1]){
counter.innerText++;
document.querySelectorAll('.visible').forEach(function(event) {
  event.classList.remove("visible");
  event.classList.add("winner");
});  
revealedcards =[];
  } else {
    document.querySelectorAll('.visible').forEach(function(event) {
      event.classList.remove("visible");
  });   
   revealedcards =[];
  };
  break;
}
console.log(revealedcards);
console.log(counter.innerHTML)
if(counter.innerHTML == "10") {
  document.querySelectorAll('button').forEach(function(event) {
    event.classList.add("image_rotate");
  }); 
  let win = document.createElement('div');
    win.setAttribute("id", "win");
    win.innerText="You Win!";
    playground.appendChild(win);
}
});
});
