
// Задание 9.1
/* (Вам дана заготовка и результат, который вы должны получить. 
    Ваша задача — написать код, который будет преобразовывать XML в JS-объект 
    и выводить его в консоль.)*/

    /* Результат 
{
    list: [
      { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
      { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
    ]
  }
  */


/* Этап 1. Подготовка данных */

// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;


/* Этап 2. Получение данных */

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение всех DOM-нод
const listNode = xmlDOM.querySelector("list");
const studentNode_1 = listNode.firstElementChild;
const studentNode_2 = listNode.lastElementChild;

const studentNode_1_name = studentNode_1.querySelector("name");
const studentNode_1_first = studentNode_1.querySelector("first");
const studentNode_1_second = studentNode_1.querySelector("second");
const studentNode_1_prof = studentNode_1.querySelector("prof");
const studentNode_1_age = studentNode_1.querySelector("age");
const studentNode_1_lang = studentNode_1_name.getAttribute('lang'); /* Получение данных из атрибутов */

const studentNode_2_name = studentNode_2.querySelector("name");
const studentNode_2_first = studentNode_2.querySelector("first");
const studentNode_2_second = studentNode_2.querySelector("second");
const studentNode_2_prof = studentNode_2.querySelector("prof");
const studentNode_2_age = studentNode_2.querySelector("age");
const studentNode_2_lang = studentNode_2_name.getAttribute('lang'); /* Получение данных из атрибутов */

/* Этап 3. Запись данных в результирующий объект */

let name_1 = `${studentNode_1_first.textContent} ${studentNode_1_second.textContent}`;
  const result_1 = {
  name: name_1,
  age: Number(studentNode_1_age.textContent),
  prof: studentNode_1_prof.textContent,
  lang: studentNode_1_lang,
};
let name_2 = `${studentNode_2_first.textContent} ${studentNode_2_second.textContent}`;
  const result_2 = {
  name: name_2,
  age: Number(studentNode_2_age.textContent),
  prof: studentNode_2_prof.textContent,
  lang: studentNode_2_lang,
};
const result_3 = [
  result_1, result_2
]
console.log("list:", result_3);
console.log("list: [", result_1);
console.log(result_2, " ]");
