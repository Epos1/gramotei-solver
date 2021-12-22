// ==UserScript==
// @name         Gramotei Solver
// @version      1.0
// @description  try to take over the russian grammar!
// @author       SQDSH
// @match        https://gramotei.online/student/exercises/*/run
// @icon         https://gramotei.online/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    alert("Вы используете Gramotei Solver! Пожалуйста, будьте аккуратны в своих действиях, так как скрипт создан в ознакомительных целях. Всю ответственность вы берёте на себя!");
    document.getElementsByClassName('student-content')[0].innerHTML += `
        <button id="hack_autocompleteTask" class="btn btn-default">
            Включить авто-прохождение
        </button><button id="hack_completeTask" class="btn btn-default">
            Пройти задачу
        </button><button id="hack_failTask" class="btn btn-default">
            Ответить неверно
        </button>
    `;

    let auto = null;
    let autoCompleteButton = document.getElementById('hack_autocompleteTask');
    autoCompleteButton.onclick = () => {
        if (!auto) {
            let answer = confirm('Совсем руки устали?');
            if (answer) {
                auto = setInterval(() => trainer.check(trainer.currentTask.success.original), 1500);
                autoCompleteButton.innerText = "Остановить авто-прохождение";
            }
        } else {
            clearInterval(auto);
            auto = null;
            autoCompleteButton.innerText = "Включить авто-прохождение";
        }
    };

    let successButton = document.getElementById('hack_completeTask');
    successButton.onclick = () => trainer.check(trainer.currentTask.success.original);

    let failButton = document.getElementById('hack_failTask');
    failButton.onclick = () => {
        let answer = confirm('Уверен? Чёт ты какой-то странный.');
        if (answer) trainer.check(trainer.currentTask.wrong.original);
    };
})();
