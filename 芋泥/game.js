// ======================
// 清明雅集 · 寻珍
// V5.0 开始按钮控制版
// ======================



let cardImages=[

"peacock.png",
"jade_ring.png",
"maple_leaf.png",
"folding_fan.png",
"lingzhi.png",
"round_fan.png",
"spinning_top.png",
"black_bowl.png"

];



let cards=[];


let firstCard=null;

let secondCard=null;


let lockBoard=false;


let matched=0;

let moves=0;





window.onload=function(){



const enterBtn=
document.getElementById(
"enter-btn"
);



const startBtn=
document.getElementById(
"start-game"
);



const homePage=
document.getElementById(
"home-page"
);



const gamePage=
document.getElementById(
"game-page"
);





// 进入雅集

enterBtn.onclick=function(){


homePage.style.display="none";


gamePage.style.display="block";


createGame();


};





// 开始游戏

startBtn.onclick=function(){


startBtn.style.display="none";


memoryStart();


};



};








// ======================
// 创建棋盘
// ======================


function createGame(){



const board=
document.getElementById(
"game-board"
);



board.innerHTML="";



cards=[

...cardImages,

...cardImages

];



cards.sort(
()=>Math.random()-0.5
);



matched=0;

moves=0;



document.getElementById(
"matched-count"
).innerText=0;


document.getElementById(
"move-count"
).innerText=0;



cards.forEach(image=>{



let card=
document.createElement(
"div"
);



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



card.onclick=function(){

flipCard(card);

};



});


}







// ======================
// 记忆开始
// ======================


function memoryStart(){



let allCards=
document.querySelectorAll(
".card"
);



lockBoard=true;



allCards.forEach(card=>{


card.classList.add(
"flip"
);


});



let time=8;



let timer=setInterval(()=>{



time--;



document.getElementById(
"time-count"
).innerText=time;




if(time<=0){


clearInterval(timer);



allCards.forEach(card=>{


card.classList.remove(
"flip"
);


});



lockBoard=false;



}


},1000);



}









// ======================
// 翻牌
// ======================


function flipCard(card){



if(lockBoard)
return;



if(card===firstCard)
return;



if(card.classList.contains("flip"))
return;



card.classList.add(
"flip"
);



if(!firstCard){


firstCard=card;


return;


}



secondCard=card;


moves++;


document.getElementById(
"move-count"
).innerText=moves;



checkMatch();



}









// ======================
// 配对判断
// ======================


function checkMatch(){



if(

firstCard.dataset.image===
secondCard.dataset.image

){



matched++;



document.getElementById(
"matched-count"
).innerText=matched;



reset();



if(matched===8){


setTimeout(()=>{


alert(
"恭喜！寻得全部宋韵珍品！"
);


},500);


}



}

else{


lockBoard=true;



setTimeout(()=>{


firstCard.classList.remove(
"flip"
);



secondCard.classList.remove(
"flip"
);



reset();



},900);



}



}







function reset(){


firstCard=null;


secondCard=null;


lockBoard=false;


}