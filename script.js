
// GET HTML ELEMENTS

const userInput = document.getElementById("userInput");
const checkButton = document.getElementById("checkButton");
const clearButton = document.getElementById("clearButton");

const originalString = document.getElementById("originalString");
const reversedString = document.getElementById("reversedString");
const resultMessage = document.getElementById("resultMessage");

const stackDisplay = document.getElementById("stackDisplay");
const stackStatus = document.getElementById("stackStatus");
const stackLog = document.getElementById("stackLog");


// CHECK PALINDROME FUNCTION

function checkPalindrome() {

    // Get the input from the user
    const input = userInput.value.trim();

    // Check if the input is empty
    if (input === "") {
        alert("Please enter a string first.");
        return;
    }

    // Accept only letters and numbers
    if (!/^[a-zA-Z0-9]+$/.test(input)) {
        alert("Please enter letters and numbers only.");
        return;
    }

    // Convert input to uppercase for case-insensitive checking
    const text = input.toUpperCase();

    // Display original and reversed strings
    const reverse = text.split("").reverse().join("");

    originalString.textContent = input;
    reversedString.textContent = reverse;

    // Create an empty PDA stack
    const stack = [];

    let logs = [];

    // Find the middle position
    const middle = Math.floor(text.length / 2);

    // STEP 1: PUSH THE FIRST HALF INTO THE STACK

    for (let i = 0; i < middle; i++) {

        stack.push(text[i]);

        logs.push(
            `Read ${text[i]}: Push ${text[i]} into the stack.`
        );
    }

    // STEP 2: HANDLE THE MIDDLE CHARACTER

    if (text.length % 2 !== 0) {

        logs.push(
            `Skip ${text[middle]} because it is the middle character.`
        );
    }

    // STEP 3: COMPARE THE SECOND HALF

    let isPalindrome = true;

    for (let i = middle + (text.length % 2); i < text.length; i++) {

        const currentCharacter = text[i];

        // Get the top character from the stack
        const stackTop = stack[stack.length - 1];

        if (currentCharacter === stackTop) {

            // Remove the matched character
            stack.pop();

            logs.push(
                `Read ${currentCharacter}: Match found! Pop ${stackTop} from the stack.`
            );

        } else {

            logs.push(
                `Read ${currentCharacter}: No match found.`
            );

            isPalindrome = false;
            break;
        }
    }

    // STEP 4: DISPLAY THE FINAL RESULT

    if (stack.length !== 0) {
        isPalindrome = false;
    }

    if (isPalindrome) {

        resultMessage.textContent = "ACCEPTED - This is a Palindrome!";
        resultMessage.className = "result-message accepted";

        stackStatus.textContent =
            "All characters matched. The stack is empty.";

    } else {

        resultMessage.textContent = "REJECTED - This is not a Palindrome!";
        resultMessage.className = "result-message rejected";

        stackStatus.textContent =
            "A mismatch was found during recognition.";
    }

    // DISPLAY STACK OPERATIONS

    stackDisplay.innerHTML = "";

    if (stack.length === 0) {

        stackDisplay.innerHTML = "<span>Empty Stack</span>";

    } else {

        stack.slice().reverse().forEach(character => {

            const item = document.createElement("div");

            item.className = "stack-item";
            item.textContent = character;

            stackDisplay.appendChild(item);

        });
    }

    // DISPLAY LOGS

    stackLog.innerHTML = "";

    logs.forEach(log => {

        const line = document.createElement("p");

        line.textContent = log;

        stackLog.appendChild(line);

    });
}


// CLEAR FUNCTION

function clearSystem() {

    userInput.value = "";

    originalString.textContent = "---";
    reversedString.textContent = "---";

    resultMessage.textContent = "Waiting for input...";
    resultMessage.className = "result-message";

    stackDisplay.innerHTML = "<span>Empty Stack</span>";

    stackStatus.textContent =
        "Stack operations will appear here.";

    stackLog.innerHTML = "";
}


// BUTTON EVENTS

checkButton.addEventListener("click", checkPalindrome);

clearButton.addEventListener("click", clearSystem);


// SAMPLE INPUT BUTTONS

document.querySelectorAll(".example-btn").forEach(button => {

    button.addEventListener("click", function() {

        userInput.value = this.dataset.value;

        checkPalindrome();

    });

});


// ALLOW ENTER KEY

userInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        checkPalindrome();
    }

});
