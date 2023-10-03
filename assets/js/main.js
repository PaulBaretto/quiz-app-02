let current_question = document.querySelector(".current-question p");
let remain_question = document.querySelector(".question-outof-holder p span");
let the_question2 = document.querySelector(".question-container p");
let options_wrapper = document.querySelector(".options-wrap");
let quiz_items = document.querySelector(".quiz-item");
let quiz_label = document.querySelectorAll(".quiz-label");
let options_text = document.querySelectorAll(".quiz-label p");
let nextBtn = document.querySelector(".nextBtn");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

let theData = fetch(
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple"
);
theData
  .then((value1) => {
    // console.log(value1.status);
    // console.log(value1.ok);
    return value1.json();
  })
  .then((value2) => {
    data = value2;
    // console.log(data.results);
    let currentQuestion = 0;
    let totalQuestion = data.results.length;
    let currentData = data.results[currentQuestion];
    let incorrect__Answer = currentData.incorrect_answers;
    let correct__Answer = currentData.correct_answer;
    the_question2.textContent = currentData.question;
    let theOptions = incorrect__Answer.concat(correct__Answer);
    let shuffledOptions = shuffle(theOptions);
    // checking for incorrect answer
    // options_wrapper.addEventListener("change", optionsCheck);

    // Call optionsCheck initially with the first question and options
    optionsCheck(currentQuestion);

    // foreach  options add textContent from api
    shuffledOptions.forEach((allOption) => {
      quiz_div = document.createElement("div");
      quiz_label = document.createElement("label");
      quiz_ptag = document.createElement("p");
      quiz_icon_holder = document.createElement("div");
      input_radio = document.createElement("input");
      icon_span = document.createElement("span");
      icon_i = document.createElement("i");

      quiz_div.className = "quiz-item";
      quiz_label.className = "quiz-label";
      input_radio.setAttribute("type", "radio");
      input_radio.setAttribute("name", "quiz");
      input_radio.setAttribute("value", allOption);
      icon_i.className = "fa-solid fa-check";

      options_wrapper.appendChild(quiz_div);
      quiz_div.appendChild(quiz_label);
      quiz_label.appendChild(quiz_ptag);
      quiz_label.appendChild(quiz_icon_holder);
      quiz_icon_holder.appendChild(input_radio);
      quiz_icon_holder.appendChild(icon_span);
      icon_span.appendChild(icon_i);
      quiz_ptag.textContent = allOption;
    });

    current_question.textContent = `${currentQuestion}`;
    let newSpan = document.createElement("span");
    current_question.appendChild(newSpan);
    remain_question.textContent = `${currentQuestion}/${totalQuestion}`;

    nextBtn.addEventListener("click", nextQuestion);

    // show nextBtn
    function nextQuestion() {
      if (currentQuestion < totalQuestion - 1) {
        currentQuestion += 1;
        currentData = data.results[currentQuestion];
        incorrect__Answer = currentData.incorrect_answers;
        correct__Answer = currentData.correct_answer;
        the_question2.textContent = currentData.question;
        theOptions = incorrect__Answer.concat(correct__Answer);
        shuffledOptions = shuffle(theOptions);
        // options_wrapper.addEventListener("change", optionsCheck);

        // Update the content of current_question and remain_question
        current_question.textContent = `${currentQuestion}`;
        remain_question.textContent = `${currentQuestion}/${totalQuestion}`;

        // Clear any previous selections (if needed)
        options_wrapper
          .querySelectorAll('input[type="radio"]')
          .forEach((input) => {
            input.checked = false;
          });
        const optionElements = options_wrapper.querySelectorAll(".quiz-item");
        optionElements.forEach((optionElement, index) => {
          const ptag = optionElement.querySelector("p");
          ptag.textContent = shuffledOptions[index];
        });

        // Call optionsCheck with the updated question
        optionsCheck(currentQuestion);
      } else {
        console.log("You've reached the end of the quiz."); // Handle the end of the quiz as needed
      }
    }

    // input background function
    function optionsCheck(currentQuestion) {
      options_wrapper.removeEventListener("change", optionsCheck); // Remove the previous event listener

      options_wrapper.addEventListener("change", function (e) {
        const currentData = data.results[currentQuestion];

        console.log(e.target.value, "<<", currentData.correct_answer, ">>");

        if (e.target.value !== currentData.correct_answer) {
          let labelElement = e.target.closest(".quiz-label");
          if (labelElement) {
            labelElement.classList.add("not-correct");
            let icon = labelElement.querySelector("i");
            icon.className = "fa-solid fa-xmark";

            // remove class from unActiveLabel
            let allLabels = document.querySelectorAll(".quiz-label");
            allLabels.forEach((unActiveLabel) => {
              if (unActiveLabel !== labelElement) {
                unActiveLabel.classList.remove("not-correct");
              }
            });
          }
        } else {
          console.log("correct answer");
          let labelElement = e.target.closest(".quiz-label");
          if (labelElement) {
            labelElement.classList.remove("not-correct");
            let icon = labelElement.querySelector("i");
            icon.className = "fa-solid fa-check";
          }
          //     let quiz_labels = document.querySelectorAll(".quiz-label");
          //         console.log(labelElement);

          //     if (quiz_labels) {
          //     }
          //   quiz_labels.forEach((allLabels) => {
          //     // allLabels.style.pointerEvents = 'none';
          //   });
        }
      });

      // Update the options' values in the input elements
      const optionElements = options_wrapper.querySelectorAll(".quiz-item");
      optionElements.forEach((optionElement, index) => {
        const input = optionElement.querySelector("input");
        input.value = shuffledOptions[index];
      });
    }
  });
