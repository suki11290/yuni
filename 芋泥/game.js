// ======================
// 清明雅集 · 寻珍
// V1.2 记忆展示版
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


// 生成两组牌

let cards = [
    ...cardImages,
    ...cardImages
];


// 打乱

cards.sort(
    () => Math.random() - 0.5
);



const board =
document.getElementById("game-board");



const matchedText =
document.getElementById("matched-count");


const moveText =
document.getElementById("move-count");


const timeText =
document.getElementById("time-count");




let firstCard = null;

let secondCard = null;

let lockBoard = true;


let matched = 0;

let moves = 0;




// 创建卡牌

cards.forEach(image=>{


    const card =
    document.createElement("div");


    card.className="card";


    card.dataset.image=image;



    card.innerHTML = `

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



    // 开始全部翻开

    setTimeout(()=>{

        card.classList.add("flip");

    },300);



});





// ======================
// 8秒记忆倒计时
// ======================


let seconds = 8;


timeText.innerText = seconds;



let timer =
setInterval(()=>{


    seconds--;


    timeText.innerText =
    seconds;



    console.log(
        "剩余:",
        seconds
    );



    if(seconds <= 0){


        clearInterval(timer);



        // 全部盖回

        document
        .querySelectorAll(".card")
        .forEach(card=>{


            card.classList.remove(
                "flip"
            );


        });



        timeText.innerText =
        "开始";



        lockBoard=false;



        startGame();



    }



},1000);






// ======================
// 开始游戏
// ======================


function startGame(){


    document
    .querySelectorAll(".card")
    .forEach(card=>{


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


                return;

            }



            secondCard=this;


            moves++;


            moveText.innerText =
            moves;



            checkMatch();



        };


    });



}






// ======================
// 判断匹配
// ======================


function checkMatch(){



    let same =

    firstCard.dataset.image ===
    secondCard.dataset.image;



    if(same){


        matched++;


        matchedText.innerText =
        matched;



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