//1. Создать декоратор метода addItemInfoDecorator он должен добавлять
//поле date в возвращаемом объекте с датой когда был вызван метод
//а также поле info в котором будет записан текст состоящий из названия товара
//и его цены например: ‘Apple iPhone - $100’;
//Для того что бы функция была вызвана в правильном контексте внутри декоратора
//ее нужно вызывать через apply let origResult =  originalFunc.apply(this);
function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
	let origFunc = descriptor.value;//сохранили оригинальный функционал метода

	//изменяем функционал метода
	descriptor.value = function () {    
        let resOrigFunc = origFunc.apply(this);
        // добавляем новые свойства в возвращаемый методом объект
        resOrigFunc.date = new Date();
        resOrigFunc.info = `${this.name} - ${'$' + this.price}`;
        return resOrigFunc;
	}
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo(): object {
        return {
            name: this.name, 
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());

//2. Создать декоратор класса User. Он должен добавлять в данном классе
//поле createDate с датой создания класса а также добавлять поле type в котором будет
//записана строка ‘admin’ или ‘user’. Данную строку нужно передать в декоратор при вызове.
//Сам класс и имя декоратора может быть произвольным.
function UserTypeDate(type: string): Function {
	return function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
		return class extends constructor {
			public name = this.name;
            public age = this.age;
	        public createDate = new Date();
	        public type = type;
	        print():void {
		        console.log(`${this.name} is ${this.age} years old`);
		    }
	    }
	}
}

@UserTypeDate('admin')
class User {
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
    print():void {
        console.log(`${this.name} is ${this.age} years old`);
    }
}

let vasya = new User("Vasya", 25);
console.log(vasya);


//3. Есть два апи для получения и работы с новостями одно для получения новостей из USA
//второе из Ukraine. Под эти апи создано по два интерфейса и по два класса.
//Переделайте это в namespaces.
namespace USA {
	export interface INewsUSA {
	    id: number;
	    title: string;
	    text: string;
	    author: string;
	}

	export class NewsServiceUSA {
	    protected _apiurl: string = 'https://news_api_usa_url'
	    public getNews() {} 
	}
}

namespace Ukraine {
	export interface INewsUkr {
	    uuid: string;
	    title: string;
	    body: string;
	    author: string;
	    date: string;
	    imgUrl: string;
	}

	export class NewsServiceUkr {
	    protected _apiurl: string = 'https://news_api_2_url'
	    public getNews() {} 
	    public addToFavorite() {} 
	}
}

//4. Есть два класса Junior и Middle создайте класс Senior который будет имплементировать
//этих два класса а также у него будет еще свой метод createArchitecture
// реализация данного метода может быть произвольной. 
class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}

class Middle {
    createApp() {
        console.log('Creating!!!');
    }
}

class Senior implements Junior, Middle {
	public doTasks(): void {}
    public createApp(): void {}
    public createArchitecture(): void {
    	console.log('Excellent!!!');
    }
}

function applyMixin(targetClass, baseClasses): void {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
            targetClass.prototype[propName] = baseClass.prototype[propName];
        });
    });
}

applyMixin(Senior, [Junior, Middle]);