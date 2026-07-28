// ======================
// 清明雅集 · 寻珍
// V5.0 卷轴 + 提前生成卡牌版
// ======================


const cardImages=[

"peacock.png",
"jade_ring.png",
"maple_leaf.png",
"folding_fan.png",
"lingzhi.png",
"round_fan.png",
"spinning_top.png",
"black_bowl.png"

];



const enterBtn =
document.getElementById(
"enter-btn"
);



const startBtn =
document.getElementById(
"start-btn"
);



const startScreen =
document.getElementById(
"start-screen"
);



const gameContainer =
document.getElementById(
"game-container"
);



const board =
document.getElementById(
"game-board"
);



const matchedText =
document.getElementById(
"matched-count"
);



const moveText =
document.getElementById(
"move-count"
);



const timeText =
document.getElementById(
"memory-time"
);



let firstCard=null;

let secondCard=null;

let lockBoard=true;


let matched=0;

let moves=0;



// ======================
// 页面进入
// ======================


enterBtn.onclick=function(){


    startScreen.classList.add(
        "scroll-close"
    );


    setTimeout(()=>{


        startScreen.style.display="none";


        gameContainer.style.display="block";


        //进入后立即生成背面卡牌

        createCards();


    },800);


};





// ======================
// 开始游戏
// ======================


startBtn.onclick=function(){


    startBtn.disabled=true;


    memoryPhase();


};





// ======================
// 创建卡牌
// ======================


function createCards(){


let cards=[

...cardImages,

...cardImages

];


cards.sort(
()=>Math.random()-0.5
);



board.innerHTML="";



cards.forEach(image=>{


const card=
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


if(lockBoard)
return;



if(this===firstCard)
return;



this.classList.add(
"flip"
);



if(!firstCard){


firstCard=this;


}

else{


secondCard=this;


moves++;


moveText.innerText=moves;


checkMatch();


}



};



});



}





// ======================
// 八秒记忆阶段
// ======================


function memoryPhase(){



const allCards=
document.querySelectorAll(
".card"
);



lockBoard=true;



//全部翻开


allCards.forEach(card=>{


card.classList.add(
"flip"
);


});




let time=8;


timeText.innerText=time;



let timer=setInterval(()=>{


time--;


timeText.innerText=time;



if(time<=0){



clearInterval(timer);



//翻回背面


allCards.forEach(card=>{


card.classList.remove(
"flip"
);


});



timeText.innerText="开始";



lockBoard=false;



}



},1000);



}





// ======================
// 判断配对
// ======================


function checkMatch(){



let same =

firstCard.dataset.image ===
secondCard.dataset.image;



if(same){



matched++;


matchedText.innerText=matched;



reset();



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


firstCard.classList.remove(
"flip"
);


secondCard.classList.remove(
"flip"
);



reset();



},1000);



}




}





function reset(){


firstCard=null;


secondCard=null;


lockBoard=false;


}