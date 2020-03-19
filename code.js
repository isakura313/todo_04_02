const motiv_arr = ["все победы начинаются с победы над самим собой", "just do it", "делу время, потехе час"];

const add_button = document.querySelector(".button-plus");
const input = document.querySelector("input");
const root = document.getElementById("root");


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
    root.insertAdjacentHTML('afterBegin', `<div class="field is-grouped">
    <button class="button is-medium is-fullwidth">${text}</button>
    <button class="button is-danger is-medium is-outlined">
        <span>Delete</span>
        <span class="icon is-small">
            <i class="fa fa-times"></i>
        </span>
    </button>
</div>`);
    input.value = '';
}
add_button.addEventListener("click", createItem);