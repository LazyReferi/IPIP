document.addEventListener('DOMContentLoaded', () => {
    const userName = getUserName();
    if (!userName) {
        const name = prompt('Как вас зовут?');
        if (name) {
            localStorage.setItem('userName', name);
        }
    }

    showWelcomeScreen();
});

function getUserName() {
    return localStorage.getItem('userName');
}

function showWelcomeScreen() {
    const overlay = document.getElementById('welcome-screen');
    const message = document.getElementById('welcome-message');
    const dateElement = document.getElementById('current-date');

    const userName = getUserName();
    const currentDate = new Date().toLocaleDateString();

    message.textContent = `Добро пожаловать, ${userName}!`;
    dateElement.textContent = `Сегодня: ${currentDate}`;

    overlay.style.display = 'flex';

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
}

function showDateAndName() {
    const overlay = document.getElementById('welcome-screen');
    const message = document.getElementById('welcome-message');
    const dateElement = document.getElementById('current-date');

    const userName = getUserName();
    const currentDate = new Date().toLocaleDateString();

    message.textContent = `Привет, ${userName}!`;
    dateElement.textContent = `Сегодня: ${currentDate}`;

    overlay.style.display = 'flex';

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
}

function showTask(taskId) {
    document.getElementById('tasks').classList.remove('hidden');
    document.querySelectorAll('.task').forEach(task => {
        task.classList.add('hidden');
    });
    document.getElementById(taskId).classList.remove('hidden');
}

function printEvenNumbers() {
    let output = document.getElementById('output');
    let evenNumbers = 'Четные числа от 8 до 20: ';
    for (let i = 8; i <= 20; i += 2) {
        evenNumbers += i + ' ';
    }
    output.innerHTML = evenNumbers;
}

function displayFormattedDate() {
    let today = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = today.toLocaleDateString('ru-RU', options);
    let output = document.getElementById('output2');
    output.innerHTML = 'Сегодняшняя дата: ' + formattedDate;
}

function startQuiz() {
    const quizSection = document.getElementById('quiz');
    const quizForm = document.getElementById('quiz-form');
    quizSection.classList.remove('hidden');
    quizForm.innerHTML = '';

    const questions = [
        { question: 'Что такое JavaScript?', answers: ['Язык разметки', 'Язык программирования', 'Текстовый редактор'], correct: 1 },
        { question: 'Где выполняется JavaScript?', answers: ['На сервере', 'В браузере', 'На обоих'], correct: 2 },
        { question: 'Как объявить переменную в JavaScript?', answers: ['let', 'var', 'const', 'Все вышеперечисленное'], correct: 3 },
        { question: 'Как создать функцию в JavaScript?', answers: ['function myFunc() {}', 'def myFunc() {}', 'func myFunc() {}'], correct: 0 },
        { question: 'Что такое массив?', answers: ['Объект', 'Коллекция элементов', 'Строка'], correct: 1 },
        { question: 'Как добавить элемент в конец массива?', answers: ['push', 'pop', 'shift'], correct: 0 },
        { question: 'Как удалить последний элемент из массива?', answers: ['push', 'pop', 'unshift'], correct: 1 },
        { question: 'Что вернет выражение "5" + 3?', answers: ['8', '53', 'NaN'], correct: 1 },
        { question: 'Как проверить тип переменной?', answers: ['typeof', 'instanceof', 'isType'], correct: 0 },
        { question: 'Какой метод используется для перебора элементов массива?', answers: ['forEach', 'loop', 'iterate'], correct: 0 },
    ];

    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.classList.add('quiz-question');
        div.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.answers.map((answer, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}">
                    ${answer}
                </label>
            `).join('')}
        `;
        quizForm.appendChild(div);
    });
}

function submitQuiz() {
    console.log('Функция submitQuiz вызвана');
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');
    quizResult.innerHTML = '';

    const questions = [
        { question: 'Что такое JavaScript?', correct: 1 },
        { question: 'Где выполняется JavaScript?', correct: 2 },
        { question: 'Как объявить переменную в JavaScript?', correct: 3 },
        { question: 'Как создать функцию в JavaScript?', correct: 0 },
        { question: 'Что такое массив?', correct: 1 },
        { question: 'Как добавить элемент в конец массива?', correct: 0 },
        { question: 'Как удалить последний элемент из массива?', correct: 1 },
        { question: 'Что вернет выражение "5" + 3?', correct: 1 },
        { question: 'Как проверить тип переменной?', correct: 0 },
        { question: 'Какой метод используется для перебора элементов массива?', correct: 0 },
    ];

    let score = 0;
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        const answer = selected ? parseInt(selected.value) : -1;
        const isCorrect = answer === q.correct;
        if (isCorrect) score++;

        const userAnswerText = selected && selected.nextElementSibling ? selected.nextElementSibling.textContent : '';
        quizResult.innerHTML += `
            <p>${index + 1}. ${q.question}<br>
            Ваш ответ: ${userAnswerText} - ${isCorrect ? 'верно' : 'неверно'}
            </p>
        `;
    });

    quizResult.innerHTML += `<h3>Ваш результат: ${score} из ${questions.length}</h3>`;
}
