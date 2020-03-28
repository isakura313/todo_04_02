import ItemDeal from "./ItemDeal";
import anime from "./node_modules/animejs/lib/anime.min";
const json = require("./fixtures.json");

console.table(json);

const {motiv_arr, ImportantArr, backgroundColor, MonthArray, MonsterArray} = json;


const add_button = document.querySelector(".button-plus");
const input = document.querySelector("input");
const root = document.getElementById("root");
const select = document.querySelector('select');
const monster = document.querySelector(".monster");


function getRand(arr){
    // хорошо бы модифицировать в уникальный рандом
    let rand_num = Math.floor(Math.random() * arr.length);
    return rand_num;
}

function changeMonster() {
    monster.src = `${MonsterArray[[getRand(MonsterArray)]]}`;
}

setInterval(changeMonster, 2000);

anime({
    targets: monster,
    translateY: 100,
    easing: 'easeInOutSine',
    duration: 1000,
    direction: 'alternate',
    loop: true,
    scale: 1.5,
    rotate: 360
});

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

    let item = new ItemDeal(text, select.value - 1);
    let item_to_JSON = JSON.stringify(item);
    localStorage.setItem(+item.createdAt, item_to_JSON);
    DrawItem(item);

    input.value = '';
}

function DrawItem(item){
    root.insertAdjacentHTML('afterBegin', `<div class="wrap-task field is-grouped"
    id="${+item.createdAt}">
    <button class="button has-text-white is-medium is-fullwidth ${backgroundColor[item.color]}">${item.text}
    <span> ${item.createdAt.getDate()} ${MonthArray[item.createdAt.getMonth()]} </span>
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
    for(let i = 0; i < localStorage.length; i++){
        let lk_key = localStorage.key(i);  // получить ключ по номеру
        let content = localStorage.getItem(lk_key);
        let item = JSON.parse(content);
        let tempo_date = Date.parse(item.createdAt);
        item.createdAt = new Date(tempo_date);
        DrawItem(item);
    }
})();



add_button.addEventListener("click", createItem);

input.addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        createItem();
    }
});

root.addEventListener('click', (e) => {
    if (e.target.className === 'btn-delete button is-danger is-medium is-outlined' || e.target.closest('.btn-delete') !== null) {

        let deal = e.target.closest('.wrap-task');

        setTimeout(() => {
            localStorage.removeItem(deal.id);
            deal.remove();
        }, 200);
    }
});

function ChangeColorEl(el) {
    switch (el.value) {
        case '1':
            el.className = backgroundColor[el.value - 1];
            break;
        case '2':
            el.className = backgroundColor[el.value - 1];
            break;
        case '3':
            el.className = backgroundColor[el.value - 1];
            break;
        default:
            break;
    }
    el.classList.add("has-text-white");
}

window.onload = () => {
    ChangeColorEl(select);
}

select.onchange = () => {
    ChangeColorEl(select);
}