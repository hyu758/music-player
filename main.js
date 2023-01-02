const song=document.getElementById("song");
const playBtn=document.querySelector(".play-btn");
const musics=["ifly.mp3","nightchanges.mp3","I Do.mp3","heartbreakanni.mp3"];
const nextBtn=document.querySelector(".play-foward");
const prevBtn=document.querySelector(".play-back");
let indexSong=0;
song.setAttribute("src",`./assets/music/${musics[indexSong]}`);
nextBtn && nextBtn.addEventListener("click",function(){
    changeSong(1)
});
prevBtn && prevBtn.addEventListener("click",function(){
    changeSong(0)
});
function changeSong(act){
    if (act==1){
        indexSong++;
        if (indexSong>=musics.length){
            indexSong=0;
        }
        isPlaying=true;
    }
    else if (act==0){
        indexSong--;
        if (indexSong<0){
            indexSong=musics.length-1;
        }
        isPlaying=true;
    }
    song.setAttribute("src",`./assets/music/${musics[indexSong]}`);
    playPause();
}
let isPlaying=true;
playBtn.addEventListener("click",playPause);
function playPause() {
    if (isPlaying){
        song.play();
        playBtn.innerHTML='<ion-icon name="pause-outline"></ion-icon>'
        isPlaying=false;
    }
    else{
        song.pause();
        playBtn.innerHTML='<ion-icon name="play-outline""></ion-icon>'
        isPlaying= true;
    }
}