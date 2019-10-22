let intervalID;
let index1 = 0;
let tableImages = [
    'fa-snowflake-o',
    'fa-bell',
    'fa-bicycle',
    'fa-briefcase',
    'fa-cube',
    'fa-diamond',
    'fa-envelope',
    'fa-eye',
    'fa-bolt',
    'fa-heart-o',
    'fa-life-ring ',
    'fa-lightbulb-o',
    'fa-mobile',
    'fa-graduation-cap',
    'fa-phone',
    'fa-sun-o',
    'fa-truck',
    'fa-car',
    'fa-binoculars',
    'fa-flag',
    'fa-glass',
    'fa-plane',
    'fa-futbol-o',
    'fa-anchor',
    'fa-magnet',
    'fa-rocket',
    'fa-trophy',
    'fa-thumbs-up',
    'fa-bus',
    'fa-motorcycle'
];
let tableRandomImages = [];
// let getImage = tableImages[0];
let count = 0; // nombre d'images trouvées
let error = 0; // nombre d'erreurs
let turn = 0; // nombre de choix d'images

document.querySelector(".button_restart").style.display = 'none';
document.querySelector(".container-game-2-end").style.display = 'none';
// Bouton commencer
document.querySelector(".button_start").addEventListener("click", () => {
    startGame();
});

document.querySelector(".button_restart").addEventListener("click", () => {
    document.querySelector(".container-game-2-end").style.display = 'none';
    document.querySelector(".gameOver").innerHTML = '';
    document.querySelector(".result").innerHTML = '';
    document.querySelector(".error").innerHTML = '';
    document.querySelector(".button_restart").innerHTML = '';
    tableRandomImages = [];
// let getImage = tableImages[0];
count = 0; // nombre d'images trouvées
error = 0; // nombre d'erreurs
turn = 0; // nombre de choix d'images
index1 = 0;

    startGame();
});

// Fonction Melange le tableau des images
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Melange images
function startGame() {
    for (let i = 0; i < 30; i++) {
        tableRandomImages.push(tableImages[i]);
    }
    shuffle(tableRandomImages);
    tableRandomImages.splice(10, 30);
    document.querySelector(".container-game-2").style.display = 'flex';
    intervalID = setInterval(changeImage, 1000);
}

// Avoir l'image et l'afficher
function changeImage() {
    if (tableRandomImages[index1] != null) {
        document.querySelector(".container-game-2").innerHTML = '<i class="fa '+ tableRandomImages[index1]+ ' fa-5x" aria-hidden="true"></i>';
    } else {
        document.querySelector(".container-game-2").innerHTML = '';
    }
    if (index1 <= 10) {
        index1++;
    } else {
        stopChange();
    }
}


function reply_click(id) {
    let number = 0;
    for (let i = 0; i < 10; i++) {
        if (tableImages[id] == tableRandomImages[i]) {
            number++;
        }
    }
    turn++;
    if (number == 1) {

        count++;
        document.querySelector(".result").innerHTML = '<p>You found ' + count + ' images</p>';
        document.getElementById(id).className = document.getElementById(id).className + " border_green"; 
    } else {
        error++;
        document.querySelector(".error").innerHTML = '<p>You made ' + error + ' mistakes</p>';
        document.getElementById(id).className = document.getElementById(id).className + " border_red"; 
    }
    //Fin du jeu
    if (turn >= 10) {
        document.querySelector(".container-game-2-end").style.display = 'flex';
        document.querySelector(".button_restart").style.display = 'block';
        document.querySelector(".container-game-2").innerHTML = '';
        document.querySelector(".gameOver").innerHTML = '<p>Your score : ' + count + ' / ' + turn + '</p>';
        document.querySelector(".container-game-2").style.display = 'none';
        document.querySelector(".button_restart").innerHTML = '<button class="button_start">Restart</button>';
        
    }

}


function stopChange() {
    clearInterval(intervalID);
    for (let i = 0; i < 30; i++) {
        document.querySelector(".container-game-2").innerHTML += '<button class="no_button" id="' + i + '" onClick="reply_click(this.id)"><i class="fa '+ tableImages[i] + ' fa-5x" aria-hidden="true"></i></button>';
    }
}