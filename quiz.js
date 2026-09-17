const question =[
    {
        question: "which is the largest animal in the world?",
        answer:[
            
             {   text:"shark",correct:false},
             {   text:"blue whale",correct:true},
             {   text:"elephant",correct:false},
             {   text:"giraffe",correct:false},
            
        ]
    },
    {

        question: "which is the smallest country in the world?",
        answer:[
            
             {   text:"Vatican",correct:true},
             {   text:"Bhutan",correct:false},
             {   text:"America",correct:false},
             {   text:"Japan",correct:false},
        ]

    },
    {
        question: "which is the largest desert in the world?",
        answer:[
            
             {   text:"Kalahari",correct:false},
             {   text:"Gobi",correct:false},
             {   text:"Shahara",correct:false},
             {   text:"Antarctica",correct:true},
        ]
    },
    {
        question: "which is the smallest content in the world?",
        answer:[
            
             {   text:"Aisa",correct:false},
             {   text:"Australia",correct:true},
             {   text:"Arctic",correct:false},
             {   text:"Africa",correct:false},
        ]
    }
];
  let questionElement = document.getElementById("question");
  let nextBtn = document.getElementById("next-btn");
  questionElement.innerText = question[0].question;
  let currentIndex = 0;
  let score = 0;

  let answerBtns = document.querySelectorAll(".btn");
  for (let i = 0; i < answerBtns.length; i++) {
      answerBtns[i].innerText = question[0].answer[i].text;
      answerBtns[i].addEventListener("click", function(){ 
         if (question[currentIndex].answer[i].correct) {
            answerBtns[i].classList.add("correct");
            score = score +1;
        } else {
            answerBtns[i].classList.add("wrong");
        }
        for (let j = 0; j < answerBtns.length; j++) {
            answerBtns[j].disabled = true;
        }
        nextBtn.style.display = "block";

      });
      
 }

  nextBtn.addEventListener("click", function(){ 
    currentIndex = currentIndex + 1;
     if (currentIndex >= question.length) {
        questionElement.innerText = "Quiz Over! Your score: " + score + " / " + question.length;
         for (let j = 0; j < answerBtns.length; j++) {
        answerBtns[j].style.display = "none";
    }
    nextBtn.style.display = "none";
    } else {
        questionElement.innerText = question[currentIndex].question;}
    console.log(currentIndex);
    questionElement.innerText =question[currentIndex].question;
    for (let k = 0; k < answerBtns.length; k++) {
    answerBtns[k].innerText = question[currentIndex].answer[k].text;
    
 }
   nextBtn.style.display = "none";

 for(let j = 0; j<answerBtns.length; j++){
    answerBtns[j].disabled = false;
    answerBtns[j].classList.remove("correct");
    answerBtns[j].classList.remove("wrong");
 }

});




      


