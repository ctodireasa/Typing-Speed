document.addEventListener("DOMContentLoaded", function() {
    const timerButton = document.getElementById("timerButton");
    const inputArea = document.getElementById("inputArea");
    const wordContainer = document.getElementById("wordContainer");
    const resultContainer = document.getElementById("result");

    let words = [];
    let currentIndex = 0;
    let correctWords = 0;
    let timer;

    const wordList = ["algorithm", "function", "statement", "inheritance","polymorphism", 
        "debugging", "boolean", "framework", "interface", "library", "encapsulation", "variable"];

    timerButton.addEventListener("click", function() { 
        if (timerButton.textContent === "Start Timer") {
            startTest();
            startTimer();
        } 
    });

    function startTimer() {
        let seconds = 60;
        timerButton.textContent = "Stop Timer";
        timerButton.disabled = true;
        timer = setInterval(function() {
            if (seconds > 0) {
                --seconds;
                timerButton.textContent = `Timer: ${seconds} s`;
            } else {
                clearInterval(timer);
                timerButton.textContent = "Start Timer";
                timerButton.disabled = false;
                stopTest();
            }
        }, 1000);
    }

    function startTest() {
        words = generateRandomWords(wordList, 20);
        currentIndex = 0;
        correctWords = 0;
        resultContainer.textContent = "";
        inputArea.value = "";
        renderWords();
        inputArea.disabled = false;
        inputArea.focus();
    }

    function stopTest() {
        inputArea.disabled = true;
        resultContainer.textContent = `Correct words typed: ${correctWords} out of ${words.length}`;
    }

    inputArea.addEventListener("input", function() {
        const inputText = inputArea.value.trim();
        const currentWord = words[currentIndex];
        inputArea.style.color = "green";
        for (let i = 0; i < inputText.length; ++i) {
            if (inputText[i] !== currentWord[i]) {
                inputArea.style.color = "red";
                break;
            }
        }
    
        if (inputText === currentWord) {
            ++currentIndex;
            ++correctWords;
            inputArea.value = "";
            renderWords();
        }
    });
    

    function generateRandomWords(wordList, count) {
        return Array.from({ length: count }, () => wordList[Math.floor(Math.random() * wordList.length)]);
    }

    function renderWords() { 
        wordContainer.textContent = words.join(" ");
    }
});