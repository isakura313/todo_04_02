import ItemDeal from "./ItemDeal";

import anime from "./node_modules/animejs/lib/anime.min.js"
const json = require("./fixtures.json")

console.table(json)

const {motiv_arr,ImportantArr, backgroundColor, MonthArray } = json

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
    <span>${item.createAt.getDate()} ${MonthArray[item.createAt.getMonth()]} </span>

    </button>
    <button class="btn-delete button is-danger is-medium is-outlined">
        <span>Delete</span>
        <span class="icon is-small">
            <i class="fa fa-times"></i>
        </span>
    </button>
</div>`);
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
    setTimeout(()=>{

        localStorage.removeItem(deal.id)

        deal.remove();
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







