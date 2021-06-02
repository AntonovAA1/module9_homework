
// Задание 9.2
/* (Вам дана заготовка и результат, который вы должны получить. 
    Ваша задача — написать код, который будет преобразовывать JSON в JS-объект 
    и выводить его в консоль.)*/

    /* Результат 
{
  list: [
    { name: 'Petr', age: 20, prof: 'mechanic' },
    { name: 'Vova', age: 60, prof: 'pilot' },
  ]
}
  */


/* Этап 1. Подготовка данных */

// JSON, который мы будем парсить
const jsonString = `
{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }
`;

/* Этап 2. Получение данных */
const data = JSON.parse(jsonString);
const list = data.list;

/* 3 Вывод данных в консоль */
console.log('list: ', list);
console.log(data)



