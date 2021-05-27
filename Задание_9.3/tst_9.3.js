
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


/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
function useRequest(url, callback) {
	var xhr = new XMLHttpRequest(); // Создаем экзепляр класса XMLHttpRequest
	let limit = document.querySelector('input').value; /** поиск и получение данных из input. */
	 // Инициализируем запрос
   xhr.open('GET', url, true);
	if (limit < 1 || limit > 10 || limit == NaN) {
		alert(`${limit} - число вне диапазона от 1 до 10`);
     document.querySelector(".error").insertAdjacentHTML('beforebegin', "<span>Число вне диапазона от 1 до 10 !!!</span>"); /** Поиск элемента с классом "error" и вставка нового Элемента перед элементом с классом "error"*/ 
	} 
     // Добавляем обрабочик ответа сервера
	xhr.onload = function () {
		if (xhr.status != 200) {
         // Если статус не 200 (200 - указывает, что запрос выполнен успешно),
			console.log('Статус ответа: ', xhr.status);
		} else {
          // Парсим ответ сервера
			const result = JSON.parse(xhr.response);
			if (callback) {
				callback(result);
			}
		}
	};

	xhr.onerror = function () {
		console.log('Ошибка! Статус ответа: ', xhr.status);
	};
	xhr.send();  // Отправляем запрос
};

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.button');

  /* Функция обработки полученного результата
         result - объект с результатом запроса */
function displayResult(result) {
	let cards = '';
	result.forEach(item => {
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
// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
	let limit = document.querySelector('input').value;
	useRequest(`https://picsum.photos/v2/list/?limit=${limit}`, displayResult);
})






