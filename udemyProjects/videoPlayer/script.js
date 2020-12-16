const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestan = document.getElementById('timestan');


//PLay && Pause Video
function toggleVideoStatus(){
    if(video.paused){
         video.play();
    }
    else{
        video.pause();
    }
}
// update play pause icon
function updatePlayIcon(){
   if(video.paused){
       play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
   }
   else{
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
   }
}
// update timestamp and progress
function updateProgress(){
    progress.value = (video.currentTime / video.duration)*100;
    //get the minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins<10){
        mins = '0'+ String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if(secs<10){
        secs = '0'+ String(secs);
    }
    timestan.innerHTML = `${mins}:${secs}`;
}
// set video time to Progress
function setVideoProgress(){
    video.currentTime  = (+progress.value*video.duration)/100;
}

function stopVideo(){
    video.currentTime = 0;
    video.pause();
}




// event Listener
video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play',updatePlayIcon);
video.addEventListener('timeupdate',updateProgress);

play.addEventListener('click',toggleVideoStatus);
stop.addEventListener('click',stopVideo);
progress.addEventListener('change',setVideoProgress);
