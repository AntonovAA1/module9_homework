
// Задание 9.2
/* (Напишите код приложения, интерфейс которого представляет собой input и кнопку. 
    В input можно ввести любое число. При клике на кнопку происходит следующее:
Если число не попадает в диапазон от 1 до 10 — выводить ниже текст 
«число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR 
по URL https://picsum.photos/v2/list?limit=10, где get-параметр 
limit — это введённое число.

Пример: если пользователь ввёл 5, то запрос будет вида 
https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.

Подсказка: получение данных из input.
const value = document.querySelector('input').value;)*/

let button = document.querySelector('.button') /* Поиск элемента с классом  "button" */
button.addEventListener('click', getInput) /* Обработчик события "click", запускает функцию getInput после совершения события */

function getInput () {
   const valueInput = document.querySelector('input').value; /** поиск и получение данных из input. */
   let numberInput = Number(valueInput)

if (numberInput < 1 || numberInput > 10 || numberInput != number) {
    console.log(numberInput + ' - число вне диапазона от 1 до 10');
    /* document.querySelector(".error").innerHTML = "<span>Число вне диапазона от 1 до 10 !!!</span>"; /** Поиск элемента с классом "error" и вставка нового Элемента */ 
    document.querySelector(".error").insertAdjacentHTML('beforebegin', "<span>Число вне диапазона от 1 до 10 !!!</span>"); /** Поиск элемента с классом "error" и вставка нового Элемента перед элементом с классом "error"*/ 
  } else { 
         // Создаем экзепляр класса XMLHttpRequest
      let xhr = new XMLHttpRequest();
         // Инициализируем запрос
      xhr.open('GET', `https://picsum.photos/v2/list/?limit=${numberInput}`, true);
         // Добавляем обрабочик ответа сервера
       xhr.onload = function()  {
       if (xhr.status != 200) { // HTTP ошибка?
         // Если статус не 200 (200 - указывает, что запрос выполнен успешно),
         // то обрабатываем отдельно
       console.log('Статус ответа: ', xhr.status);
         } else {
          // Ответ мы получаем в формате JSON, поэтому его надо распарсить
          // Парсим ответ сервера
         let apiData = JSON.parse(xhr.response);
         // Ищем ноду для вставки результата запроса
         const resultNode = document.querySelector('.result');

         /* Функция обработки полученного результата
         apiData - объект с результатом запроса */
         function displayResult(apiData) {
            let cards = '';
            apiData.forEach(item => {
                const cardBlock = `
                  <div class="card">
                  <img
                  src="${item.download_url}"
                  class="card-image"
                  />
                  <p>${item.author}</p>
                  </div>
                  `;
               cards = cards + cardBlock;
               });
            resultNode.innerHTML = cards;
            }
         }     
      }
 
      // Добавляем обрабочик ошибки
      xhr.onerror = function() {
      // обработаем ошибку, не связанную с HTTP (например, нет соединения)
      console.log('Ошибка! Статус ответа: ', xhr.status);
      }
      xhr.send();
   }
} 