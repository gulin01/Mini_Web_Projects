const word  = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl  = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings  = document.getElementById('settings');
const settingsForm  = document.getElementById('settings-form');
const difficultySelect  = document.getElementById('difficulty');

//  list of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'computer',
    'pies',
    'bad',
    'bad',
    'silver',
    'golden',
    'dependent',
    'honey',
    'feeble',
    'quince',
    'eight',
    'admit',
    'drag',
    'loving',
    'superficial',
    'steer',
    'juice',
    'warlike'
];

//Init Word

let randomWord;

//Init score 

let score = 0;
 
//Init time 
let  time  = 10;
// set difficulty to value of local storage or medium 

let difficulty = localStorage.getItem('difficulty')!==null?
localStorage.getItem('difficulty') : 'medium';

// set difficulty selected value
difficultySelect.value = localStorage.getItem('difficulty')!==null?
localStorage.getItem('difficulty') : 'medium';

// focus on text on start
text.focus();

// start counting down 
const timeInterval = setInterval(updateTime,1000);
// Generate Random Word From Array
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom(){
     randomWord = getRandomWord();
     word.innerHTML = randomWord;
}

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

function updateTime(){
   time--;
   timeEl.innerHTML = time + 's';
   if(time===0){
       clearInterval(timeInterval);
    //    endgame
    gameOver();
   }
}
// game over show in the screen

function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran put</h1>
    <p>Your Final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}
addWordToDom();


// event listener

text.addEventListener('input',e=>{
    const insertedText  =  e.target.value;
   
    if(insertedText ===randomWord){
        addWordToDom();
         updateScore();
        e.target.value = '';
        if(difficulty==='hard'){
            time+=2;
        }
        else if(difficulty==='medium'){
            time+=3;
        }
        else{
            time+=5;
        }
       
        updateTime();
    }
})


// settings button click 
settingsBtn.addEventListener('click',()=>{
    settings.classList.toggle('hide');

})


// settings select
settingsForm.addEventListener('change',(e)=>{
    difficulty = e.target.value;
   localStorage.setItem('difficulty',difficulty);
})