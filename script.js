document.addEventListener('DOMContentLoaded', function() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const resultMessage = document.getElementById('resultMessage');
    const restartButton = document.getElementById('restartButton');
    const attemptCount = document.getElementById('attemptCount');
    const progress = document.getElementById('progress');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const finalMessage = document.getElementById('finalMessage');
    const shareButton = document.getElementById('shareButton');

    let attempts = 0;
    let score = 100;
    let timeLeft = 60;
    let timerInterval;

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            score -= 2;
            scoreElement.textContent = score;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame(false);
            }
        }, 1000);
    }

    function endGame(success) {
        guessButton.disabled = true;
        guessInput.disabled = true;
        restartButton.classList.remove('hidden');
        finalMessage.classList.remove('hidden');
        clearInterval(timerInterval);

        if (success) {
            resultMessage.textContent = `¡Felicidades! Adivinaste el número ${randomNumber}.`;
            resultMessage.classList.add('success');
            resultMessage.classList.remove('error');
        } else {
            resultMessage.textContent = `Lo siento, se acabó el tiempo. El número era ${randomNumber}.`;
            resultMessage.classList.add('error');
            resultMessage.classList.remove('success');
        }
    }

    guessButton.addEventListener('click', function() {
        if (!timerInterval) startTimer();

        const userGuess = parseInt(guessInput.value);
        attempts++;
        attemptCount.textContent = attempts;

        progress.style.width = (attempts / 10) * 100 + '%';

        if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
            resultMessage.textContent = 'Por favor, ingresa un número válido entre 1 y 100.';
            resultMessage.classList.add('error');
            resultMessage.classList.remove('success');
            return;
        }
        
        if (userGuess === randomNumber) {
            endGame(true);
        } else if (userGuess < randomNumber) {
            resultMessage.textContent = 'Demasiado bajo. ¡Inténtalo de nuevo!';
            resultMessage.classList.add('error');
            resultMessage.classList.remove('success');
        } else {
            resultMessage.textContent = 'Demasiado alto. ¡Inténtalo de nuevo!';
            resultMessage.classList.add('error');
            resultMessage.classList.remove('success');
        }
    });

    restartButton.addEventListener('click', function() {
        window.location.reload();
    });

    shareButton.addEventListener('click', function() {
        alert('¡Compartiendo tu puntuación! (Funcionalidad por implementar)');
    });
});
