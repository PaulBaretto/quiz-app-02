
let data;
let lis = document.querySelectorAll('.li');







let theDeta = fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple');
theDeta.then((value1) => {
    console.log(value1.status)
    console.log(value1.ok)
    return value1.json();
}).then((value2) => {
    console.log(value2.results[0].question)
    data = value2;
    console.log(value2.results)
    data.results;
    lis.forEach(li => {
        li.innerHTML = data.question;
        console.log('test')
    })
})


// test = value2.results

 
// div.innerHTML = test.category;



