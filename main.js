const song=document.getElementById("song");
const playBtn=document.querySelector(".play-btn");
const nextBtn=document.querySelector(".play-foward");
const prevBtn=document.querySelector(".play-back");
const artistName=document.querySelector(".singer-name");
const songName=document.querySelector(".music-name");
const songImg=document.querySelector(".music-thumbnail img");
const repeatBtn=document.querySelector(".play-repeat");
const randomBtn=document.querySelector(".play-random");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
let isRepeat=false;
let indexSong=0;
let timer;
let repeatCount=0
let isPlaying=true;
let isRandom=false;
const musics=[
    {
        name: "I.F.L.Y",
        artist: "Bazzy",
        file:"ifly.mp3",
        image:"1.jpg"
    },
    {
        name: "I Do",
        artist: "911",
        file:"I Do.mp3",
        image:"2.jpg"
    },
    {
        name: "Night Changes",
        artist: "One Direction",
        file:"nightchanges.mp3",
        image:"3.jpg"

    },
    {
        name: "Heartbreak Anniversary",
        artist: "Giveon",
        file:"heartbreakanni.mp3",
        image:"4.jpg"
    },
]

nextBtn && nextBtn.addEventListener("click",function(){
    if (isRandom){
        playRandomSong();
    }
    else{
        changeSong(1);
    }
});
prevBtn && prevBtn.addEventListener("click",function(){
    if (isRandom){
        playRandomSong()
    }
    else{
        changeSong(0);
    }
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
    loadMusic(indexSong);
    playPause();
}
// phat random
randomBtn.onclick = function(e){
    if (isRandom){
        randomBtn.classList.remove("active");
        isRandom=false;
    }
    else{
        randomBtn.classList.add("active");
        isRandom=true;
    }
}
// lap lai bai hat
repeatBtn.onclick = function(e){
    if (isRepeat){
        repeatBtn.classList.remove("active");
        isRepeat=false;
    }
    else{
        repeatBtn.classList.add("active");
        isRepeat=true;
    }
}
song.addEventListener("ended", endSong);
function endSong(){
    if (isRepeat){
        song.play()
    }
    else{
        nextBtn.click()
    }
}
playBtn.addEventListener("click",playPause);
function playPause() {
    if (isPlaying){
        song.play();
        playBtn.innerHTML='<ion-icon name="pause-outline"></ion-icon>'
        isPlaying=false;
        timer = setInterval(displayTimer, 500);
    }
    else{
        song.pause();
        playBtn.innerHTML='<ion-icon name="play-outline""></ion-icon>'
        isPlaying= true;
        clearInterval(timer);
    }
}
function playRandomSong(){
    let randomIndex
    do {
        randomIndex=Math.floor(Math.random()*musics.length)
    }while (randomIndex===indexSong);
    indexSong=randomIndex;
    loadMusic();
    isPlaying=true;
    playPause()
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
      durationTime.textContent = "00:00";
    } else {
      durationTime.textContent = formatTimer(duration);
    }
  }
// thoi gian
  function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
//khi tua
  rangeBar.addEventListener("change", handleChangeBar);
  function handleChangeBar() {
    song.currentTime = rangeBar.value;
  }
function loadMusic(indexNum){
    song.setAttribute("src",`./assets/music/${musics[indexSong].file}`);
    songName.textContent=musics[indexSong].name;
    artistName.textContent=musics[indexSong].artist;
    songImg.setAttribute("src",`./assets/img/${musics[indexSong].image}`);

}
displayTimer();
loadMusic(indexSong);