const challenges = [
    "Lamber o abdômen de uma pessoa da roda ou beber um shot.",
    "Duas pessoas da roda devem se beijar de língua ou todos bebem um shot.",
    "Se declare para uma pessoa fora da roda, de joelhos. Se a pessoa recusar você bebe.",
    "Rebole até a próxima rodada. Se parar bebe dois shots.",
    "TODOS BEBEM!",
    "Falar um trava-língua sem errar ou beber um shot.",
    "Confesse algo íntimo na roda ou beba um shot.",
    "Imite seus pais transando ou escolha alguém para beber um shot com você.",
    "Escolha duas pessoas para beberem um shot de braços cruzados.",
    "Finja estar se masturbando por 30seg ou beba 2 shots.",
    "Ligue para a sua mãe e pergunte o que é gouinage ou beba 2 shots.",
    "Revele um personagem de desenho animado que te deixa excitado ou beba 1 shot.",
    "Faça um 'Eu nunca' pesado. Escolha alguém que já tenha feito a loucura para explicar como foi. Se ela não explicar, os dois bebem.",

];

const cardElement = document.getElementById('card');
const challengeElement = document.getElementById('challenge');
const instructionElement = document.getElementById('instruction');

let isDragging = false;
let startX, startY, offsetX, offsetY;
let inactivityTimer;

// Cores disponíveis
const colors = [
    'var(--rosa-vibrante)',
    'var(--azul-eletrico)',
    'var(--amarelo-brilhante)',
    'var(--roxo-neon)',
    'var(--verde-limao)'
];

// Função para sortear uma cor
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Função para sortear um novo desafio
function drawNewChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    challengeElement.textContent = challenges[randomIndex];
    cardElement.style.backgroundColor = getRandomColor(); // Sorteia uma cor para a carta
}

// Função para mostrar e piscar a frase
function showInstruction() {
    instructionElement.classList.add('visible', 'blink');
}

// Função para esconder a frase
function hideInstruction() {
    instructionElement.classList.remove('visible', 'blink');
}

// Reinicia o temporizador de inatividade
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    hideInstruction();
    inactivityTimer = setTimeout(() => {
        showInstruction();
    }, 10000);
}

// Inicia o arrasto
cardElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    cardElement.style.transition = 'none';
    resetInactivityTimer();
});

// Movimenta a carta
cardElement.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;

    cardElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    resetInactivityTimer();
});

// Finaliza o arrasto
cardElement.addEventListener('mouseup', () => {
    if (!isDragging) return;

    isDragging = false;

    if (Math.abs(offsetX) > 50 || Math.abs(offsetY) > 50) {
        cardElement.style.transition = 'transform 0.5s ease';
        const directionX = offsetX > 0 ? 200 : -200;
        const directionY = offsetY > 0 ? 200 : -200;
        cardElement.style.transform = `translate(${directionX}px, ${directionY}px) rotate(30deg)`;

        setTimeout(() => {
            drawNewChallenge();
            cardElement.style.transition = 'none';
            cardElement.style.transform = 'translate(0, 0) rotate(0)';
        }, 500);
    } else {
        cardElement.style.transform = 'translate(0, 0)';
    }

    resetInactivityTimer();
});

// Prevenir comportamento padrão de arrastar imagens, etc.
cardElement.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

// Reinicia o temporizador ao tocar na tela (para dispositivos móveis)
document.addEventListener('touchstart', resetInactivityTimer);

// Sorteia o primeiro desafio ao carregar a página
drawNewChallenge();

// Inicia o temporizador de inatividade ao carregar a página
resetInactivityTimer();

// DARK MODE 
// Seleciona o botão (checkbox) e o corpo da página
const toggleButton = document.getElementById("dark-mode-toggle");
const body = document.body;

// Verifica se o usuário já tem um tema salvo no LocalStorage
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggleButton.checked = true; // Mantém o switch ligado
}

// Função para alternar entre Dark Mode e Light Mode
toggleButton.addEventListener("change", () => {
    if (toggleButton.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
    }
});

function openFeedbackForm() {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSf9SQTgdGrMt79zPf2Bezhqf4TlgJEHGd3she2Q3jZ4vOSJ4Q/viewform?usp=header", "_blank");
}

// Adiciona eventos de toque para dispositivos móveis
cardElement.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    cardElement.style.transition = 'none';
    resetInactivityTimer();
});

cardElement.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    offsetX = e.touches[0].clientX - startX;
    offsetY = e.touches[0].clientY - startY;

    cardElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    resetInactivityTimer();
});

cardElement.addEventListener('touchend', () => {
    if (!isDragging) return;

    isDragging = false;

    if (Math.abs(offsetX) > 50 || Math.abs(offsetY) > 50) {
        cardElement.style.transition = 'transform 0.5s ease';
        const directionX = offsetX > 0 ? 200 : -200;
        const directionY = offsetY > 0 ? 200 : -200;
        cardElement.style.transform = `translate(${directionX}px, ${directionY}px) rotate(30deg)`;

        setTimeout(() => {
            drawNewChallenge();
            cardElement.style.transition = 'none';
            cardElement.style.transform = 'translate(0, 0) rotate(0)';
        }, 500);
    } else {
        cardElement.style.transform = 'translate(0, 0)';
    }

    resetInactivityTimer();
});