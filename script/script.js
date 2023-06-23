const typingText = document.querySelector(".typing-box p");
const inputField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let mistake = 0;
let charIndex = 0;
let isTyping = 0;


function randomParagraph(){

    // getting a random number that will less than the paragraph length
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    //getting random paragraph form the paragraphs array a splitting all characters
    //of it , adding each characters inside span and then adding this span in the p tag
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");    //focusing keyboard input on keydown
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}


function initTyping() {
    
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
     
    if(charIndex < characters.length -1 && timeLeft > 0){

        // once tmer start, it won't restart in every click
    if(!isTyping){
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }
    //if user has't entered any characters or pressed backspace
    if(typedChar == null){
        charIndex --;
        if(characters[charIndex].classList.contains("incorrect")){
            mistake--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
    } else{
        //if user typed character and shown character matched then add correct class
    //else add incorrect class
    if(characters[charIndex].innerText === typedChar){
        characters[charIndex].classList.add("correct");
    } else{
        characters[charIndex].classList.add("incorrect");
        mistake ++;
    }
    charIndex++; // increment charIndex either user typed correct or incorrect character
    }  
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");


    let wpm = Math.round((((charIndex - mistake) / 5) / (maxTime - timeLeft)) * 60);
    if(wpm < 0 || !wpm || wpm === Infinity){
        wpm = 0;
    }

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistake;
    cpmTag.innerText = charIndex - mistake;

    } else{
        clearInterval(timer);
        inputField.value = "";
    }
}


function initTimer(){
    if(timeLeft > 0){
        timeLeft --;
        timeTag.innerText = timeLeft;
    } else{
        clearInterval(timer);
    }
}


function resetGame(){
    randomParagraph();
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = 0;
    timeTag.innerText = timeLeft;
    mistake.innerText = maxTime;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    clearInterval(timer);
    inputField.value = "";
}


randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);