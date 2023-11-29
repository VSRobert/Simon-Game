var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false; //o meteoda de a afla daca jocul a inceput sau nu, si folosim nextSequence doar la prima apasare de key.

var level = 0;

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");  
    userClickedPattern.push(userChosenColour); //aducem un id(culoare) in lista de fiecare data cand userul face click pe o anume culoare
    
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1); //aducem ultimul raspuns dat de utilizator
                                              // "-1" pentru ca daca sunt,de exemplu, 7 culori in lista, noua ne trebuie nr 6 pt ca notatia e 0-6
});

function nextSequence() {
    userClickedPattern = []; //de indata ce am terminat ultima sequence trebuie resetata lista userClickedPattern pentru a nu se cumula cu urmatoarele sequences
    
    level++;

    $("h1").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);  //numere random 0-3

    var randomChosenColor = buttonColors[randomNumber]; //culoarea random aleasa in functie de randomNumber

    gamePattern.push(randomChosenColor); //adaugam in lista fiecare culoare aleasa random

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  //animatie 
    
    playSound(randomChosenColor);
    
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); //sunet
    audio.play();
}

function animatePress(currentColor) { 
    $("#" + currentColor).addClass("pressed");  

    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$("body").keydown(function() {
    if (!started) {
        $("h1").html("Level " + level); //cand incepe jocul se schimba de la Press a Key to Start la Level 0
        
        nextSequence();

        started = true;
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout (function() {
                nextSequence();
            }, 
            1000)};       
    
    } else {
        var wrongAnswer = new Audio("sounds/" + "wrong" + ".mp3"); //sunet pt raspuns gresit
        wrongAnswer.play();   //puteam sa pun si playSound("wrong")

        $("body").addClass("game-over");        
        setTimeout (function() {
            $("body").removeClass("game-over");
        }, 200)
        
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();

        
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}



