// ======================
// 清明雅集 · 寻珍
// V1.1 记忆翻牌版
// ======================


const cardImages = [

"peacock.png",
"jade_ring.png",
"maple_leaf.png",
"folding_fan.png",
"lingzhi.png",
"round_fan.png",
"spinning_top.png",
"black_bowl.png"

];



let cards=[

...cardImages,
...cardImages

];



cards.sort(()=>Math.random()-0.5);



const board =
document.getElementById(
"game-board"
);



let firstCard=null;

let secondCard=null;

let lockBoard=true;


let matched=0;

let moves=0;



let started=false;



// 创建卡牌

cards.forEach(image=>{


const card=document.createElement("div");


card.className="card";


card.dataset.image=image;



card.innerHTML=`

<div class="card-inner">


<div class="card-front">

<img src="assets/cards/${image}">

</div>


<div class="card-back">

<img src="assets/card-back.png">

</div>


</div>

`;



board.appendChild(card);



// 点击翻牌

card.onclick=function(){


if(!started)
return;


if(lockBoard)
return;



if(card.classList.contains("flip"))
return;



card.classList.add("flip");



if(!firstCard){


firstCard=card;


}

else{


secondCard=card;


moves++;

document.getElementById(
"move-count"
).innerText=moves;



checkMatch();


}



};



});




// 开始按钮

document
.getElementById("start-btn")
.onclick=function(){



started=true;


lockBoard=true;



let cardsAll=document.querySelectorAll(".card");



cardsAll.forEach(card=>{


card.classList.add("flip");


});



let time=8;



let timer=setInterval(()=>{


time--;


document.getElementById(
"time-count"
).innerText=time;



if(time<=0){


clearInterval(timer);



cardsAll.forEach(card=>{


card.classList.remove("flip");


});



lockBoard=false;



document.getElementById(
"time-count"
).innerText=0;



}


},1000);



};





// 判断匹配

function checkMatch(){


let match=
firstCard.dataset.image===
secondCard.dataset.image;



if(match){



matched++;


document.getElementById(
"matched-count"
).innerText=matched;



resetCards();



if(matched===8){


setTimeout(()=>{


alert(
"恭喜！你寻得了全部宋韵珍品！"
);


},500);


}



}

else{


lockBoard=true;



setTimeout(()=>{


firstCard.classList.remove("flip");


secondCard.classList.remove("flip");



resetCards();



},1000);



}


}





function resetCards(){


firstCard=null;

secondCard=null;

lockBoard=false;


}