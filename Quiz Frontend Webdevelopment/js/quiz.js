"use strict";

/**
 * Alle vragen en antwoorden met een array erbij wat de juistte antwoorden zijn
 */
 var juistenantwoorden = [1, 1, 2, 4, 3, 2, 4, 3, 3, 1];
 var huidigevraag = 0;
 var eindequiz = 9;
 var beantwoordenVragen = [];
 var count = 0;
 var display = document.getElementById('displayCount')
 var studentnummer;
 const mijnStudentnummer = 's1156752';
 var time = 0;
 var timer;

 var vragenlijst =
[
'1. Waar staat HTML voor?',
'2. Waar staat CSS voor?',
'3. Is het volgende, .documentatie{height: 100px}, geschreven in HTML, CSS of Java Script?',
'4. Waar gebruiken we Java Script?',
'5. In welke HTML element krijg je de inhoud niet te zien op je website als je er in schrijft?',
'6. Waar staat API voor?',
'7. Hoe maak je een array?',
'8. Hoe plaats je opmerkingen in HTML?',
'9. Welke teken(s) mist er hiernaast in de code? body {background-color: rgb(247, 174, 39)}',
'10. Wat is het eerst wat je typt als je een HTML bestand hebt aangemaakt?',
'11. Einde quiz'
];

var antwoordenlijst = [
    ['A. Hypertext Markup Language', 'B. Hipertext Markup Language', 'C. Hypertext Markdown Language', 'D. Hipertext Mardown Language'],
    ['A. Cascading Style Sheets', 'B. Cascading Sience Supply', 'C. Cascading Style Show', 'D. Cascading Sience Search'],
    ['A. HTML', 'B. CSS', 'C. Java Script', 'D. Geen van allen'],
    ['D. Zowel in de Frontend als Backend word het niet gebruikt', 'A. In de Frontend', 'B. In de Backend', 'C. In de Frontend en Backend', ],
    ['A. header', 'B. body', 'C. head', 'D. main'],
    ['A. Advice Programming Interface', 'B. Application Programming Interface', 'C.Advice Programming Intel', 'D. Application Programming Intel'],
    ['A. var array [tekst];', 'B. var array [‘tekst’];', 'C. var array : [‘tekst]’;', 'D. var array =[‘tekst’];' ],
    ['A. // opmerkingen', 'B. /** opmerking */', 'C. <!— opmerking  -->', 'D. >!—opmerking --<'],
    ['A. { }', 'B. :', 'C. ;', 'D. [ ]'],
    ['A. <!DOCTYPE html>', 'B. <!DOCTYPE>', 'C. <DOCTYPE html!>', 'D. <html DOCTYPE!>'],
    ['A. Einde Quiz', 'B. Einde Quiz', 'C. Einde Quiz', 'D. Einde Quiz']
]

/**
 * Add actions to page buttons 
 */
 function addButtonActions() {
    var startButton = document.getElementById('button-start');
    var questionsButton = document.getElementById('button-questions');
    var antwoord1Button = document.getElementById('antwoord1');
    var antwoord2Button = document.getElementById('antwoord2');
    var antwoord3Button = document.getElementById('antwoord3');
    var antwoord4Button = document.getElementById('antwoord4');
    var volgendeVraagButton= document.getElementById('volgende');
   
    // De 4 buttons voor de 4 antwoordmogelijkheden
    antwoord1Button.addEventListener("click", function () {
        console.log("antwoord 1 is geklikt");
        answerQuestions(1);
    });

    antwoord2Button.addEventListener("click", function () {
        console.log("antwoord 2 is geklikt");
        answerQuestions(2);
    });

    antwoord3Button.addEventListener("click", function () {
        console.log("antwoord 3 is geklikt");
        answerQuestions(3);
    });

    antwoord4Button.addEventListener("click", function () {
        console.log("antwoord 4 is geklikt");
        answerQuestions(4);
    });
    // De start button (die je niet ziet)
    startButton.addEventListener("click", function () {
        showStartPage();
    });
    // De button waarmee je terug naar start kan gaan (die heb ik laten verwdijnen)
    questionsButton.addEventListener("click", function () {
        showQuestionsPage();
        hideNavigatiePage();
        hideMainPage();
        // timer, hoe lang duurt de quiz
        timer = setInterval(function(){
            time+=1;
            document.getElementById('start-timer').innerText = time;
            if (timer >= 3600){
                clearTimeout(timer);
            }

            // var date = new Date();
            // var sec = date.getSeconds();
            // var min = date.getMinutes();
            // var hrs = date.getHours();
            // document.getElementById("start-timer").textContent = 
            // (hrs < 10 ? "0" + hrs : hrs)+ ":" +
            // (min < 10 ? "0" + min : min) + ":" + 
            // (sec < 10 ? "0" + sec : sec);
        }   
        , 1000)
       
    });
    // De button waarmee je naar de volgende vraag kan gaan 
    volgendeVraagButton.addEventListener("click", function () {
        console.log("volgende is geklikt");
        //controleer of huidige in de array staat array.includes(object)
        if (beantwoordenVragen.includes(huidigevraag)) {
            nieuweVraag();
            return;
        }
    });
}
/**
 * Het tonen van een niewe vraag en vier nieuwe antwoordmogelijkheden
*/
function nieuweVraag (){
    huidigevraag++;
    var vraag = document.getElementById ('vraagdisplay');
    vraag.innerText = vragenlijst[huidigevraag];
    nieuweAntwoord(1);
    nieuweAntwoord(2);
    nieuweAntwoord(3);
    nieuweAntwoord(4);
    if (huidigevraag == 10){
        HideQuestionsPage();
        showEindePage();
    }
}

function nieuweAntwoord(antwoord) {
    var button = document.getElementById('antwoord'+antwoord);
    var antwoorden = antwoordenlijst[huidigevraag];
    button.innerText = antwoorden[antwoord - 1];
    button.style.border = 'none';
    button.classList.remove('goed', 'fout');
}

/**
 * Vragen beantwoorden
*/
function answerQuestions(antwoord) {
    console.log (antwoord);
    console.log (!beantwoordenVragen.includes(huidigevraag));
    
    // beantwoordenVragen.push(huidigevraag)
    if (!beantwoordenVragen.includes(huidigevraag)){
        document.getElementById('antwoord'+antwoord).style.border = "2px solid white";
        antwoordControleren (antwoord)
        beantwoordenVragen.push(huidigevraag)
    }  
} 

/**
 * een negatief op positief respons krijgen en de counter
 * */
document.getElementById('displayCount').onclick = display
function antwoordControleren(antwoord) {
    var correct = juistenantwoorden[huidigevraag];
    var button = document.getElementsByClassName('button-vragen');
    for (let i = 0; i < button.length; i++) {
        const element = button[i];
        if (i+1==correct) {
            //antwoord is goed
            element.classList.add('goed');  
        } else {
            //antwoord is fout
            element.classList.add('fout');
        }
    }
    if (antwoord == correct){
        count++;
        display.innerText = count;
    }
    console.log (huidigevraag);
   
}

/**
 * Show verschillende pagina's 
 */
//main/start page
function showStartPage() {
    var page = document.getElementById('page-start');

    hideAllPages();

    page.style.display = 'block';

    console.info('Je bent nu op de startpagina');
}

//Show vragen pagina 
function showQuestionsPage() {
    var page = document.getElementById('page-questions');

    hideAllPages();

    page.style.display = 'block';

    console.info('Je bent nu op de vragenpagina');
}

//Show einde pagina
function showEindePage() {
    var page = document.getElementById('page-einde');

    hideAllPages();

    page.style.display = 'block';

    console.info('Je bent nu bij het einde van de quiz');
    sendScore(studentnummer, count, time)
    clearInterval(timer);
}

/**
 * hide verschillende pagina's 
 */
// hide navigatie en main page (de hoofdpagina)
function hideNavigatiePage() {

    document.getElementById('page-navigatie').style.display = "none";
}
function hideMainPage() {

    document.getElementById('main-navigatie').style.display = "none";
}

//hide questions page
function HideQuestionsPage(){

    document.getElementById('page-questions').style.display = "none";
}

//Hide all pages
function hideAllPages() {
    var startPage = document.getElementById('page-start');
    var questionsPage = document.getElementById('page-questions');
    var eindePage = document.getElementById('page-einde');

    startPage.style.display = 'none';
    questionsPage.style.display = 'none';
    eindePage.style.display = 'none';
}

/**
 * Jezelf aanmelden 
 */
var aanmeldButton = document.getElementById ("aanmelden");
aanmeldButton.addEventListener("click", function () {
    console.log("aanmeld-button is geklikt");
    juistStudentnummer();
    
});

function juistStudentnummer(){
    var invoerveld = document.getElementById("inlogveld").value;
    if ((/^(((s|S)|(\w{2}))[0-9]{7})$/.test(invoerveld))){
    checkStudent(invoerveld);
    }else{
        console.log('studentennummer is invalide');
        var foutenSn = document.getElementById("fout-studentnummer");
        foutenSn.classList.remove("hidden");
    }
    // (/^(((s|S)|(\w{2}))[1-9]{7})$/.test(test))
    // if ((/^(((s|S)|(\w{2}))[1-9]{7})$/.test(invoerveld))){
    //     checkStudent(invoerveld);
    //     var foutenSn = document.getElementById("fout-studentnummer");
    //     foutenSn.classList.add("hidden");
    // }else {
    //     var foutenSn = document.getElementById("fout-studentnummer");
    //     foutenSn.classList.remove("hidden");
        
    // }    
    // .test(invoerveld)
}

/**
 * Check student number using the API
 */
// var number = invoerveld;
// var invoerveld = document.getElementById("inlogveld").value;
function checkStudent(number) {
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            var response = JSON.parse(xHttp.response);
            if (xHttp.status == 200) {
                studentIdentificationSucces(response);
            } else {
                studentIdentificationFailed(response);
            }
        }
    };
    xHttp.onerror = function () {
        studentIdentificationFailed(xHttp.statusText);
    };
    xHttp.open("GET", "https://quiz.clow.nl/v1/student/" + number, true);
    xHttp.send();
}
//
/**
 * Student is successfully identified
 */
function studentIdentificationSucces(student) {
    console.info(student); // Een Javascript-object met studentnummer, voornaam en achternaam
    document.getElementById("naam").innerText = student.firstName + ' ' + student.lastName;
    document.getElementById("button-questions").classList.remove("hidden");
    studentnummer = student.number;
    var foutenSn = document.getElementById("fout-studentnummer");
    foutenSn.classList.add("hidden");
    // Schrijf hier de code die uitgevoerd moet worden als het studentnummer klopt
}

/**
 * Student number is incorrect
 */
function studentIdentificationFailed(errorMessage) {
    console.error(errorMessage);
    var foutenSn = document.getElementById("fout-studentnummer");
    foutenSn.classList.remove("hidden");
    // Schrijf hier de code die uitgevoerd moet worden als het studentnummer NIET klopt
}

/**
 * Sends score of the player to the Quiz-API.
 * @param student Student number of player
 * @param points Points of player
 * @param time Points of player
 */
function sendScore(student, points, time) {
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            if (xHttp.status == 200) {
                document.getElementById("wel-goed").classList.remove("hidden");
                console.info("Score succesvol opgeslagen");
            } else {
                document.getElementById("niet-goed").classList.remove("hidden");
                console.error("Score niet succesvol opgeslagen");
                
            }
        }
    };

    xHttp.onerror = function () {
        document.getElementById("niet-goed").classList.remove("hidden");
        console.error("Score niet succesvol opgeslagen");
    };

    xHttp.open("POST", "https://quiz.clow.nl/v1/score", true);
    xHttp.setRequestHeader('Content-Type', 'application/json');
    xHttp.send(JSON.stringify({
        quizMaster: mijnStudentnummer,
        student: student,
        points: points,
        time: time
    }));
}

/** hiede edd */


// Initialize
showStartPage();
addButtonActions();