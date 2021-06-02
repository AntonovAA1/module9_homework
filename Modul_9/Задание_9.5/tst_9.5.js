
// Задание 9.5
/*Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:
Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, 
где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.
Если пользователь перезагрузил страницу, 
то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).*/


// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.button');
// Ищем кнопку, по нажатии на которую будет очищен запрос
const btnClearNode = document.querySelector('.buttonClear');
let myJSON = ""; // - объект JSON (строка)

// Вешаем обработчик на кнопку для очистки localStorage
btnClearNode.addEventListener('click', () => {
  localStorage.clear();
  console.log('Данные из localStorage удалены');
});

// Вешаем обработчик на кнопку для запроса и запускаем функцию валидации. 
	btnNode.addEventListener('click', () => {
        // Получаем данные по ключу myJSON в localStorage
        let myJSON = localStorage.getItem('myJSON');
        let limit_1 = document.querySelector('.input_1').value; /** поиск и получение данных из input. */
        let limit_2 = document.querySelector('.input_2').value; /** поиск и получение данных из input. */
        if ((limit_1 < 1 || limit_1 > 10) && (limit_2 < 1 || limit_2 > 10)) {
            alert('Номер страницы и лимит вне диапазона от 1 до 10');
            document.querySelector(".error").insertAdjacentHTML('beforebegin', "<span>Номер страницы и лимит вне диапазона от 1 до 10 !!!</span>"); /** Поиск элемента с классом "error" и вставка нового Элемента перед элементом с классом "error"*/ 
            return;
        } else if (limit_1 < 1 || limit_1 > 10) {
            alert('Номер страницы вне диапазона от 1 до 10');
            document.querySelector(".error").insertAdjacentHTML('beforebegin', "<span>Номер страницы вне диапазона от 1 до 10 !!!</span>"); /** Поиск элемента с классом "error" и вставка нового Элемента перед элементом с классом "error"*/ 
            return;
        } else if (limit_2 < 1 || limit_2 > 10) {
            alert('Лимит вне диапазона от 1 до 10');
            document.querySelector(".error").insertAdjacentHTML('beforebegin', "<span>Лимит вне диапазона от 1 до 10 !!!</span>"); /** Поиск элемента с классом "error" и вставка нового Элемента перед элементом с классом "error"*/ 
            return;
        } else {
            if (myJSON) {
                // Если данные в localStorage есть - выводим их, запуская функцию
                displayResult(JSON.parse(myJSON)); // аргумент - объект JS
              } else {
                // Если данных в localStorage нет - делаем запрос, запуская функцию
                useRequest(`https://picsum.photos/v2/list?page=${limit_1}&limit=${limit_2}`);
                }
        }
    });

    // Осуществляем запрос и обрабатываем его
function useRequest(url) {
        fetch(url)
        .then((response) => {
            return response.json(); // происходит приведение ответа к JSON виду
        })
        .then((data) => {
            let myJSON = localStorage.setItem("myJSON", JSON.stringify(data)); // запись данных (преобразованный объект JavaScript в строку JSON) по ключу "myKey"
            displayResult(data);
        }) 
        .catch(() => { console.log('Ошибка !!!') });
    };

 /* Функция формирования карты из элементов сформированного объекта
data - объект JS (массив) с результатом запроса */
function displayResult(data) {
            let cards = '';
            data.forEach(item => {
                const cardBlock = `
                <div class="card">
                    <p>${item.author}</p>
                    <img src="${item.download_url}" class="card-image">
                </div>
              `;
                cards = cards + cardBlock;
            });
            resultNode.innerHTML = cards; // вставляем элемент с заменой содержимого прежнего элемента
        }