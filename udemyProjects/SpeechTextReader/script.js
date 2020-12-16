const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './img/drink.jpg',
        text: "I'm thirsty"
    },
    {
        image: './img/angry.jpg',
        text: "I am angry"
    },
    {
        image: './img/food.jpg',
        text: "I'm hungry"
    },
    {
        image: './img/grandma.jpg',
        text: "I miss my Grandmother"
    },
    {
        image: './img/happy.jpg',
        text: "I'm very Happy"
    },
    {
        image: './img/home.jpg',
        text: "I want to go Home"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm hurt"
    },
    {
        image: './img/outside.jpg',
        text: "I want to go outside"
    },
    {
        image: './img/sad.jpg',
        text: "I'm sad"
    },
    {
        image: './img/scared.jpg',
        text: "I am very scared"
    },
    {
        image: './img/school.jpg',
        text: "I don't want to go to school"
    },
    {
        image: './img/tired.jpg',
        text: "I am so tired"
    }
    
]

data.forEach(createBox);

// create box

function createBox(item){
   const box = document.createElement('div');
   const { image,text } = item;

   box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info">${text}</p>
    `;
    // @todo speak event
    box.addEventListener('click',()=>{
        setTextMessage(text);
        speakText(text);
        //add active effect
        box.classList.add('active');
        setTimeout(()=>{
            box.classList.remove(active);
        },800);
    })

    main.appendChild(box);

}
// init speech synth
const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices(){

  voices = speechSynthesis.getVoices();
  voices.forEach(voice=>{
      const option = document.createElement('option');
      option.value = voice.name;
      option.innerText = `${voice.name}${voice.lang}`;
      voiceSelect.appendChild(option);
  });
}
// set text 
function setTextMessage(text){
message.text = text;
}
//Speak Text
function speakText(text){
    speechSynthesis.speak(message);
}
//set Voice 
function setVoice(e){
message.voice = voices.find(voice=>voice.name  === e.target.value);
}
// Voices Changed 
speechSynthesis.addEventListener('voiceschanged',getVoices);


// add the toggle text box
toggleBtn.addEventListener('click', ()=>{
    document.getElementById('text-box').classList.toggle('show');
})
//close  button
closeBtn.addEventListener('click', ()=>{
    document.getElementById('text-box').classList.remove('show');
})
//Change Voice
voiceSelect.addEventListener('change',setVoice);
//read text button
readBtn.addEventListener('click',()=>{
    setTextMessage(textarea.value);
    speakText()
})
getVoices();