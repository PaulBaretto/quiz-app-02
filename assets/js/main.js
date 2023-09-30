
let the_question2 = document.querySelector('.question-container p');
let options_wrapper = document.querySelector('.options-wrap')
let quiz_items = document.querySelector('.quiz-item')
let quiz_label = document.querySelectorAll('.quiz-label')
let options_text = document.querySelectorAll('.quiz-label p');
// console.log(options_wrapper) 





let theDeta = fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple');
theDeta.then((value1) => {
    console.log(value1.status)
    console.log(value1.ok)
    return value1.json();
}).then((value2) => {
    data = value2;
    console.log(data.results[0])
    incorrect__Answer = data.results[0].incorrect_answers;
    correct__Answer = data.results[0].correct_answer;
    the_question2.textContent = data.results[0].question;
    theOptions = incorrect__Answer.concat(correct__Answer);


    options_wrapper.addEventListener('change', (e) => {
        // Check if the clicked element has the class 'quiz-label'
        if (e.target.value !== correct__Answer) {
            let labelElement = e.target.closest('.quiz-label');
            if (labelElement) {
                labelElement.classList.add('not-correct');
                let icon = labelElement.querySelector('i');
                icon.className = 'fa-solid fa-xmark';

                // remove class from unActiveLabel 
                const allLabels = document.querySelectorAll('.quiz-label');
                allLabels.forEach(unActiveLabel => {
                    if (unActiveLabel !== labelElement) {
                        unActiveLabel.classList.remove('not-correct');
                    }
                });
            }

        } else {
            console.log('correct answer');
            // let p = options_wrapper;
            // console.log(p);
            // const icon_i = p.querySelectorAll('span i');
            // incorrect__Answer.forEach(test => {
            //     test.className = 'fa-solid fa-xmark';
            // })
        }
    });

    // foreach  options add textContent from api
    theOptions.forEach(allOption => {
        quiz_div = document.createElement("div");
        quiz_label = document.createElement('label');
        quiz_ptag = document.createElement('p');
        quiz_icon_holder = document.createElement('div');
        input_radio = document.createElement('input');
        icon_span = document.createElement('span');
        icon_i = document.createElement('i');

        quiz_div.className = 'quiz-item';
        quiz_label.className = 'quiz-label';
        input_radio.setAttribute('type', 'radio');
        input_radio.setAttribute('name', 'quiz');
        input_radio.setAttribute('value', allOption);
        icon_i.className = 'fa-solid fa-check';

        options_wrapper.appendChild(quiz_div);
        quiz_div.appendChild(quiz_label);
        quiz_label.appendChild(quiz_ptag);
        quiz_label.appendChild(quiz_icon_holder);
        quiz_icon_holder.appendChild(input_radio);
        quiz_icon_holder.appendChild(icon_span);
        icon_span.appendChild(icon_i);
        quiz_ptag.textContent = allOption;

    });


})



// addEventListener is not working if i add createelement from js 


