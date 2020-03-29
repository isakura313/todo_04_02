import ItemDeal from "./ItemDeal";
import anime from "./node_modules/animejs/lib/anime.min";
const json = require("./fixtures.json");

// console.table(json);

const {motiv_arr, ImportantArr, backgroundColor, MonthArray, MonsterArray} = json;


const add_button = document.querySelector(".button-plus");
const input = document.querySelector("input");
const root = document.getElementById("root");
const select = document.querySelector('select');
const monster = document.querySelector(".monster");


function getRand(arr){
    // хорошо бы модифицировать в уникальный рандом
    //for uniq random should create 2 more variable (for phrase and monster): pre_monster and pre_phrase
    /*
        while(pre_rand === rand_num) {
            rand_num = Math.floor(Math.random() * arr.length);
        };
        return rand_num;
     */
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
    rotate: 360,
});

function changePhrase(){
    let phrase = document.querySelector("q");
    //выцветание цитаты не удалось, т.к. оно начинается после изменение текста на новый(даже при использование setTimeout)
    phrase.innerHTML = motiv_arr[getRand(motiv_arr)];
    anime({
    targets: phrase,
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 2000,
    });
}

setInterval(changePhrase, 4000);

function createItem(){
    let text = input.value;
    if(text === ''){
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
    anime({
        targets: document.getElementById(+item.createdAt),
        opacity: [0, 1],
        easing: 'easeInOutSine',
        duration: 1000,
    });
}

function DrawOnLoad(){
    for(let i = 0; i < localStorage.length; i++){
        let lk_key = localStorage.key(i);  // получить ключ по номеру
        let content = localStorage.getItem(lk_key);
        let item = JSON.parse(content);
        let tempo_date = Date.parse(item.createdAt);
        item.createdAt = new Date(tempo_date);
        DrawItem(item);
    }
}

DrawOnLoad();


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
            anime({
                targets: document.getElementById(deal.id),
                opacity: [1, 0],
                easing: 'easeInOutSine',
                duration: 1000,
            });
            localStorage.removeItem(deal.id);
            setTimeout(()=>{ deal.remove(); } , 1000);
        }, 200);
    }
    // //need to change className !!!
    // if(e.target.className === 'button is-dark is-medium is-fullwidth button-clear'
    //     || e.target.closest('.button-clear') !== null){
    //     console.log(e.target);
    //     localStorage.clear();
    //     DrawOnLoad();
    // }
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
};

select.onchange = () => {
    ChangeColorEl(select);
};
