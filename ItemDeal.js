export default class ItemDeal {
	/*
	text это текст нашего дела
	color это у нас цифра, которая потом получает класс цвета из массива
	время у нас само по себе генерируется
	*/
	constructor(text, color){

		this.text = text;
		this.color = color;
		this.createAt = new Date;
	}

}