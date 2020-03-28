export default class ItemDeal {
    /*
    name - это текст нашего
    color - это цифра, которая получает класс цвета из массива
    now - время само генерится
    */
    constructor(text, color) {
        this.text = text;
        this.color = color;
        this.createdAt = new Date;
    }



}