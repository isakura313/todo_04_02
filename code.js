import ItemDeal from "./ItemDeal";

import {motiv_arr, ImportantArr, backgroundColor, MonthArray } from "./data.js"

import anime from 'animejs/lib/anime.es.js';



const add_button = document.querySelector(".button-plus")
const input = document.querySelector("input")
const root = document.getElementById("root")
const select = document.querySelector("select");


function getRand(arr){
    // хорошо бы модифицировать в уникальный рандом
    let rand_num = Math.round(Math.random() * arr.length-1);
    let mod_num = Math.abs(rand_num);
    return mod_num;
}


function changePhrase(){
    document.querySelector("q").innerHTML = motiv_arr[getRand(motiv_arr)];
    // добавить сда анимации, с которой эта цитата появляется
}
anime({
    targets: '.motiv',
    translateX: anime.stagger(10, {grid: [14, 5], from: 'center', axis: 'x'}),
    translateY: anime.stagger(10, {grid: [14, 5], from: 'center', axis: 'y'}),
    rotateZ: anime.stagger([0, 90], {grid: [14, 5], from: 'center', axis: 'x'}),
    delay: anime.stagger(200, {grid: [14, 5], from: 'center'}),
    easing: 'easeInOutQuad'
  });
setInterval(changePhrase, 2000);


function createItem(){
    let text = input.value;
    if(text == ''){
        return; // return обрывает всю работу нашей функции
    }
    let item = new ItemDeal(text, select.value - 1)
    let item_to_JSON = JSON.stringify(item)

    localStorage.setItem(+item.createAt, item_to_JSON)

    DrawItem(item)// отдельная функция, которая делает отрисовку
    // сохранение информации в localStorage
    // упаковка информации
    input.value = '';
}






function DrawItem(item){
       root.insertAdjacentHTML('afterBegin', `<div class="wrap-task field is-grouped" id='${+item.createAt}'>
    <button class="has-text-white button is-medium is-fullwidth ${backgroundColor[item.color]}">  ${item.text}
    <span style='margin-left: 5vh;'>${item.createAt.getDate()} ${MonthArray[item.createAt.getMonth()]} </span>

    </button>
    <button class="btn-delete button is-danger is-medium is-outlined">
        <span>Delete</span>
        <span class="icon is-small">
            <i class="fa fa-times"></i>
        </span>
    </button>
</div>`);
  anime({
    targets: '.wrap-task',
    translateY: 30,
    scale: 1,
    rotate: '1turn'
  });
}


(function DrawOnLoad(){
    for (let i = 0; i < localStorage.length; i++) {
        let lk_key = localStorage.key(i) // получить ключ по номеру
        let content = localStorage.getItem(lk_key);
        let item = JSON.parse(content)
   
        let tempo_dat = Date.parse(item.createAt)
     
        item.createAt = new Date(tempo_dat)

        DrawItem(item)
    }
})();







add_button.addEventListener("click", createItem);

input.addEventListener("keypress", (e)=>{
    if(e.keyCode == 13){
        createItem()
    }
})


root.addEventListener("click", (e)=>{
    if(e.target.className == "fa fa-times"){
        var btn = e.target;
        
    }
    let deal = btn.parentNode.parentNode.parentNode;
    anime({
        targets: (deal),
        translateY: 1000
    });
    setTimeout(()=>{
        deal.remove();
        localStorage.removeItem(deal.id)
        
    }, 300)
})


function ChangeColorEl(el){
    //это можно аккуратно зарефакторить
    switch(el.value){
        case '1':
            el.className=backgroundColor[el.value-1];
            break;
        case '2':
             el.className=backgroundColor[el.value-1];
            break;
        case '3':
             el.className=backgroundColor[el.value-1];
            break;
        default:
            break;
    }
    el.classList.add("has-text-white");
}

window.onload = () =>{
    ChangeColorEl(select);
}


select.onchange = () =>{
    ChangeColorEl(select);
}

document.querySelector('.start').onclick = function (){
    function del(){
        let elem = document.querySelector(".del");
       elem.remove();
    }setInterval(del, 10000);
        root.insertAdjacentHTML('afterBegin', `<div class="del" style="display: grid; grid-template-columns: 200px 200px 200px; margin: 30px;">
        <button class="is-dark " style="width:200px">JS 100+30 = :</button>
        <input class="is-dark clown" style="width:50px"></input>
        

 
        </div>`)

        anime({
            targets: '.clown',
            value: [0, 10030],
            round: 1,
            easing: 'easeInOutExpo'
          });

          anime({
            targets: '.is-dark',
            delay: anime.stagger(200, {grid: [14, 5], from: 'center'}),
            
            translateX: [
              { value: 250, duration: 1000, delay: 500 },
              { value: 0, duration: 1000, delay: 500 }
            ],
            translateY: 
            [
              { value: -40, duration: 500 },
              { value: 40, duration: 500, delay: 1000 },
              { value: 0, duration: 500, delay: 1000 }
            ],
            scaleX: [
              { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
              { value: 1, duration: 900 },
              { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
              { value: 1, duration: 900 }
            ],
            scaleY: [
              { value: [1.75, 1], duration: 500 },
              { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
              { value: 1, duration: 450 },
              { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
              { value: 1, duration: 450 }
            ],
            easing: 'easeOutElastic(1, .8)',
            loop: true
          });
          
        }
        

        




