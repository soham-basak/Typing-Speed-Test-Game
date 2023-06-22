const typingText = document.querySelector(".typing-box p");
const inputField = document.querySelector(".wrapper .input-field");

let charIndex = 0;

function randomParagraph(){

    // getting a random number that will less than the paragraph length
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    
    //getting random paragraph form the paragraphs array a splitting all characters
    //of it , adding each characters inside span and then adding this span in the p tag
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag;
    });

    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}


function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    //if user typed character and shown character matched then add correct class
    //else add incorrect class
    if(characters[charIndex].innerText === typedChar){
        characters[charIndex].classList.add("correct");
    } else{
        characters[charIndex].classList.add("incorrect");
    }
    charIndex++; // increment charIndex either user typed correct or incorrect character
    characters[charIndex].classList.add("active");
}

randomParagraph();
inputField.addEventListener("input", initTyping);