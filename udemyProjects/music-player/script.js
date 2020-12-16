const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer  = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const audio = document.getElementById('audio');

// song titles
const songs = ['sunflower','sabrina','sabrina2'];

// keep track of songs 
let songIndex = 2;


// innitially load song details into dom
loadSong(songs[songIndex]);

// update song details
function loadSong(song){
   title.innerText = song;
   audio.src = `music/${song}.mp3`;
   cover.src = `images/${song}.jpg`;

}

// play song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// previous Song
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
     
}
// next song
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
     
}
// update progress
function updateProgress(e){
  
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime/duration)*100;
  progress.style.width = `${progressPercent}%`;
}
// set progress
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
     
    audio.currentTime = (clickX / width)*duration;


}
// event listeners
playBtn.addEventListener('click',()=>{
    const isPLaying = musicContainer.classList.contains('play');
    if(isPLaying){
        pauseSong();
    }else{
        playSong(); 
    }
})


// changeSong
prevBtn.addEventListener('click',()=>{
    prevSong();
})
nextBtn.addEventListener('click', ()=>{
    nextSong();
})

audio.addEventListener('timeupdate',updateProgress);
progressContainer.addEventListener('click', setProgress);

//click on progress bar 

///song ends
audio.addEventListener('ended',nextSong);