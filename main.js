// mockowanie - tworzenie sztucznych danych po to, aby ulatwic sobie pisanie aplikacji. Tablica obiektow mockedTodos zostanie niedlugo usunieta

// const mockedTodos = [{
//         name: "pay taxes",
//         isDone: false,
//     },
//     {
//         name: "feed dog",
//         isDone: false,
//     }
// ];

const state = {
    todoInput: "",
    todos: [],
};

// HTML elements

const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const errorContainer = document.getElementById("error-container");
const emptyListInfoContainer = document.getElementById("empty-list-info-container");
const removeAllItemsBtn = document.getElementById("remove-all-button");


// listeners

// pmietaj, kazda funkcja wywolana jako eventListener dostaje obiekt Event jako argument. 

todoInput.addEventListener("input", (e) => {
    resetError();
    state.todoInput = e.target.value;
});

addBtn.addEventListener("click", () => {
    if (state.todoInput === "") {
        handleError();
        return;
    }

    state.todos.push({
        name: state.todoInput,
        isDone: false,
        id: state.todos.length + 1
    });
    todoInput.value = "";
    state.todoInput = "";
    renderList();
});

function onRemoveTodoItem(todo) {
    console.log(todo);
    const filteredTodos = state.todos.filter((oldTodo) => {
        return todo.id !== oldTodo.id;
    })
    state.todos = filteredTodos;
    renderList();
}

function onToggleIsDone(todo) {
    const mappedTodos = state.todos.map((doneTodo) => {
        return {
            name: doneTodo.name,
            id: doneTodo.id,
            isDone: doneTodo.id === todo.id ? !doneTodo.isDone : doneTodo.isDone
            // jesli id wybranego todo zgadza sie z aktualnym todo z metody map, 
            // to zmien isDone, a jesli nie to zostaw tak jak bylo.
        }

    });

    state.todos = mappedTodos;
    renderList();
}

removeAllItemsBtn.addEventListener("click", () => {
    state.todos = [];
    renderList();
});



// logic

function handleError() {
    errorContainer.innerHTML = null;
    const error = document.createElement("p");
    error.innerText = "Required.";
    errorContainer.appendChild(error);
    todoInput.classList.add("has-error");
}

function resetError() {
    errorContainer.innerHTML = null;
    todoInput.classList.remove("has-error");
}

function createTodoListItem(todo) {
    const liToDo = document.createElement("li");
    liToDo.innerText = todo.name;

    if (todo.isDone === true) {
        liToDo.classList.add("done");
    }

    const doneButton = document.createElement("button");
    doneButton.innerText = "Done";
    if (todo.isDone) {
        doneButton.innerText = "Undone";
    }
    doneButton.addEventListener("click", () => onToggleIsDone(todo));
    liToDo.appendChild(doneButton);

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.addEventListener("click", () => onRemoveTodoItem(todo));
    liToDo.appendChild(removeButton);
    todoList.appendChild(liToDo);

}

function renderList() {
    todoList.innerHTML = null;
    emptyListInfoContainer.innerHTML = null;

    if (state.todos.length === 0) {
        const emptyListInfo = document.createElement("p");
        emptyListInfo.innerText = "The list is empty";
        emptyListInfoContainer.appendChild(emptyListInfo);
        return;
    }
    // state.todos.forEach((todo) => {
    //     createTodoListItem(todo);
    // })
    state.todos.forEach(todo => createTodoListItem(todo)); // shortcut do funkcji strzalkowej

}

renderList();

// przyklad uzycia metody filter:

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const filteredNumbers = numbers.filter((number) => {
//     return number > 3;
// })
// console.log(filteredNumbers);

// zadanie domowe:
// dodac nowy przycisk do kazdego itemu. ten przycis bedzie oznaczal czy todos zostal zrobiony (bedzie przekreslal) 
// instrukcje beda bardzo analogiczne do dodawania przycisku remove
// zamiast filter uzywasz medody .map 
// bedziesz musiala zmodyfikowac funkcje render, bo bedziesz musiala sprawdzac, czy dany todo jest zrobiony. jesli jest to dodaj klase (np. przekreslenie) 

//  FUNCTION PLAYGROUND

// function sayHello(name, age) {
//     console.log(`Hi, my name is ${name}`);
//     console.log(`I am ${age} years old`);
// }

// sayHello();
// sayHello("stasio", 1)

// const shaki = "shaki"

// sayHello(shaki, 3);
// sayHello(2);

// const dog = "mika"
// sayHello(dog, 10);


// function invokeAnotherFunction(callback) {
//     callback();
// }

// invokeAnotherFunction(() => {
//     console.log("shaki")
// })

// function sayRyjek() {
//     console.log("Ryjek");
// }

// invokeAnotherFunction(sayRyjek);



// function mapOnEachItem(givenArray, callback) {
//     const newArray = [];
//     for (let i = 0; i < givenArray.length; i++) {
//         const newItem = callback(givenArray[i]);
//         newArray.push(newItem);
//     }
//     return newArray;
// }

// const someArray = [1, 2, 3, 4, 5];
// const createdArray = mapOnEachItem(someArray, (item) => {
//     return item * 2;
// });

// console.log(createdArray);

// const name = false ? "shaki" : "mika";
// console.log(name);

// napisz funkcje, ktora przyjmuje tablice roznych stringow jako argument i zwraca tablice stringow, ktorych dlugosc nie przekracza 3

// const strings = ["las", "shaki", "stasio", "ala", "gosia", "ela", "kasia", "ola"];
// const strings2 = ["anna", "luk", "ewa", "kasia"];
// const strings3 = ["shaki", "gosia", "ola", "ewa", "ala"];

// function filterStrings(givenStrings) {
//     const newStrings = givenStrings.filter((givenString) => {
//         return givenString.length <= 3;
//     })
//     return newStrings;
// }



// const filteredStrings = filterStrings(strings);
// const filteredStrings2 = filterStrings(strings2);
// const filteredStrings3 = filterStrings(strings3);

// console.log(filteredStrings);
// console.log(filteredStrings2);
// console.log(filteredStrings3);




// to teraz, na podobnej zasadzie
// napisz funkcje, ktora przyjmuje tablice stringow jako argument
// i zwraca nowa tablice stringow, ale do kazdego stringa
// doklejamy nowe slowko (jakiekolwiek)
// czyli bedzie:
// const stringi = ['luk', 'djp'];
// wynik funkcji
// ['luk-dupa', 'djp-dupa']
// analogicznie, ale korzystamy z metody map

// const strings = ["magda", "lukasz", "gosia", "ela", "rysio", "stasio"]

// function mapStrings(givenStrings, textToAdd) {
//     const newStrings = givenStrings.map((givenString) => {
//         return `${givenString} ${textToAdd}`
//     })
//     return newStrings
// }

// const mappedStrings = mapStrings(strings, "kocha Stasia");
// console.log(mappedStrings);

// const mappedStrings2 = mapStrings(strings, "kocha Shakusia");
// console.log(mappedStrings2);

/*
  tresc zadania:
  napisz funkcje, ktora przyjmuje trzy argumenty: Tablice stringow do przerobienia, tekst jaki ma byc doklejony
  i minimalna dlugosc akceptowalnego stringa z tablicy. 
  Funkcja powinna:
  1. Stworzyc nowa tablice, ktora ma stringi dluzsze niz minimalna dlugosc akceptowalnego stringa.
  2. Stworzyc nastepna nowa tablice na podstawie tej juz przefiltrowanej, gdzie do kazdego elementu doklejamy podany tekst.
*/



// const jakasTablicaStringow = ['luk', 'lukasz', 'mag'];

// function filterAndMapStrings = (danaTablica, doklejanyText, minimalnaDlugoscAkceptowalnychStringw) {
// logika
//  };

// przyklad uzycia
//  const nowaTablica = filterAndMapStrings(jakasTablicaStringow, 'kocha Slonke', 4);

//  console.log(nowaTablica);
// wynik powinien byc:
// ['lukasz kocha Slonke'];

// const someArrayOfStrings = ['magda', 'lukasz', 'mgd', 'sem', 'tzn', 'mamusia', 'tatus'];

// function filterAndMapStrings(givenArray, addedText, minimalLength) {
//     const filteredStrings = givenArray.filter((givenArrayString) => {
//         return givenArrayString.length > minimalLength;
//     })

//     const filteredAndMappedStrings = filteredStrings.map((givenArrayStringToMap) => {
//         return `${givenArrayStringToMap} ${addedText}`
//     })
//     return filteredAndMappedStrings;

// }

// const slonkiTablica = filterAndMapStrings(someArrayOfStrings, "kocha Staszka", 3);
// console.log(slonkiTablica);




// podstawy obiektow

// const user = {
//     name: 'Magda',
//     age: 27,
//     sayHello: function () {
//         console.log("hello");
//     },
//     animals: {
//         dog: "shaki",
//         guineaPig: "ryjson",
//     },
//     friends: [
//         "Ula",
//         "Paulinka"
//     ]
// }

// console.log(user);
// console.log(user.name);
// console.log(user["name"]);

// user.sayHello();
// console.log(user.animals.dog);

// user.friends.forEach((friend) => {
//     console.log(friend)
// })

// console.log(user.friends);

// Konstruktor to jest funkcja, która zwraca nowa instancję obiektu
// "nowa instancja " - to wazne stwierdzenie. Zapis ukazany ponizej nie tworzy nowej instancji obiektu, obie zmienne, zarowno user jak i userTwo
// wskazzuja na ten sam obiekt
// const userTwo = user;
// userTwo.name = "Łukasz"
// console.log(userTwo);
// console.log(user);

// Ponizej przedstawiony jest inny sposob - Tworzenie obiektu (nowej instancji) za pomoca konstruktora (konstrukktor jest funkcja)

// const friend = {
//     name: 'ulka',
//     age: 28,
// }

// function Friend(name, age) {
//     this.name = name;
//     this.age = age;
// }

// function User(name) {

//     this.name = name;
//     this.friends = [];
//     this.buttonsContainer = document.getElementById('buttons-container');
//     this.friendsList = document.getElementById('friends-list');


//     this.showMyself = function () { //function showMyself() {} - analogia
//         console.log(this);
//     }

//     this.sayHello = function () {
//         console.log(`Hi! My name is ${this.name}`);
//     }
//     this.addFriend = function (friendName, friendAge) {
//         const friend = new Friend(friendName, friendAge);
//         this.friends.push(friend);
//     }
//     this.renderFriends = function () {
//         this.friendsList.innerHTML = null;
//         const friendsList = this.friendsList
//         this.friends.forEach((eachFriend) => {
//             const oneListedFriend = document.createElement('li');
//             oneListedFriend.innerText = `${eachFriend.name} , ${eachFriend.age} lat`;
//             friendsList.appendChild(oneListedFriend);
//         })

//     }
//     this.renderFriends = this.renderFriends.bind(this);

//     this.renderUser = function () {
//         const userName = document.createElement('span');
//         userName.innerText = this.name;
//         const listFriendsButton = document.createElement('button');
//         listFriendsButton.innerText = 'list friends';
//         listFriendsButton.addEventListener("click", this.renderFriends);
//         this.buttonsContainer.appendChild(userName);
//         this.buttonsContainer.appendChild(listFriendsButton);

//     }
//     this.renderUser();
// }

// const magda = new User("Magda");
// // console.log(magda);

// magda.showMyself();

// const lukasz = new User("Łukasz")
// // console.log(lukasz);
// lukasz.showMyself();


// magda.sayHello();
// lukasz.sayHello();


// console.log(lukasz);
// console.log(magda);

// lukasz.lastName = "semik";

// magda.addFriend('ulka', 28);
// magda.addFriend('agata', 28);
// magda.addFriend('paulinka', 30);
// magda.addFriend('justyna', 29);
// magda.addFriend('kaska', 31);

// lukasz.addFriend('ryba', 31);

// console.log(lukasz);
// console.log(magda);

// // funkcja zagniezdzona w obiekcie to jest metoda

console.log("nie jestem w zadnej funkcji", this);

function someFunction() {
    console.log("jestem wewnatrz funckji", this);
}
someFunction();

const someObject = {
    someProperty: 'staszek',
}

const modifiedFunction = someFunction.bind(someObject);

// metoda bind zwraca zmodyfikowana funkcje, w ktorej this wskazuje na obiekt przekazany jako argument (do metody bind)

modifiedFunction();

function Dog(name, surname) {
    this.name = name;
    this.surname = surname;

    this.nestedMethod1 = function () {
        console.log("nested1", this);

        function nestedMethod2() {
            console.log("nested2", this);
        }
        nestedMethod2();
        const modifiedNestedMethod2 = nestedMethod2.bind(this);
        modifiedNestedMethod2();
    }

}

const shaki = new Dog("shaki", "semik");

shaki.nestedMethod1();