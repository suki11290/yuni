// ======================
// 清明雅集 · 寻珍
// V1.0 翻牌配对版
// ======================


// 卡牌图片

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



// 每张牌复制一次

let cards = [

    ...cardImages,

    ...cardImages

];



// 随机排序

cards.sort(
    () => Math.random() - 0.5
);



// 游戏区域

const board =
document.getElementById(
    "game-board"
);



// 游戏状态

let firstCard = null;

let secondCard = null;

let lockBoard = false;

let matched = 0;



// 创建卡牌

cards.forEach(

    image => {


        const card =
        document.createElement(
            "div"
        );


        card.className =
        "card";



        // 保存图片信息

        card.dataset.image =
        image;



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



        // 点击事件

        card.onclick = function(){


            if(lockBoard)
                return;



            if(card === firstCard)
                return;



            card.classList.add(
                "flip"
            );



            if(!firstCard){


                firstCard = card;


                return;

            }



            secondCard = card;



            checkMatch();


        };


    }

);




// 判断是否相同

function checkMatch(){


    let isMatch =

    firstCard.dataset.image ===
    secondCard.dataset.image;



    if(isMatch){


        matched++;


        resetCards();



        if(matched === cardImages.length){


            setTimeout(()=>{


                alert(
                "恭喜！你寻得了全部宋韵珍品！"
                );


            },500);


        }



    }

    else{


        lockBoard = true;



        setTimeout(()=>{


            firstCard.classList.remove(
                "flip"
            );


            secondCard.classList.remove(
                "flip"
            );



            resetCards();



        },1000);


    }


}




// 重置选择状态

function resetCards(){


    firstCard = null;


    secondCard = null;


    lockBoard = false;


}