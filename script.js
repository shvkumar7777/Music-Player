const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prevbtn = document.getElementById('prev');
const playbtn = document.getElementById('play');
const nextbtn = document.getElementById('next');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Songs list array of objects
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Kodama Simham',
        artist: 'Chiranjeevai',
    },
    {
        name: 'jacinto-2',
        displayName: 'Choodalani Undi',
        artist: 'Chiranjeevai',
    },
    {
        name: 'jacinto-3',
        displayName: 'Aaradhana',
        artist: 'S. P. Balasubrahmanyam, S. Janaki',
    },
    {
        name: 'metric-1',
        displayName: 'Challenge',
        artist: 'Chiranjeevai',
    }
]
// check if playing
let isPlaying = false;

// play songs
function playSong() {
    isPlaying = true;
    playbtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    playbtn.setAttribute('title', 'pause');
    music.play();
}

//pause songs
function pauseSong() {
    isPlaying = false;
    playbtn.classList.replace('fa-pause-circle', 'fa-play-circle');
    playbtn.setAttribute('title', 'play');
    music.pause();
}

// event listeners
playbtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// update the DOM
function loadSongs(songs) {
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    image.src = `img/${songs.name}.jpg`;
}

// songs index ? this will help to change when clicked on the next or previous buttons
let songIndex = 0;

// previous button: if we decrease the songIndex then we can play the previous song
function previousSong() {
    songIndex--;
    if (songIndex<0) {
        songIndex = songs.length - 1;
    }
    // console.log(songIndex);
    loadSongs(songs[songIndex]);
    playSong();
}

// next button: if we increase the songIndex then we can play the next song
function nextSong() {
    songIndex++;
    if (songIndex>songs.length-1) {
        songIndex = 0;
    }
    // console.log(songIndex);
    loadSongs(songs[songIndex]);
    playSong();
}

// onload select first song
loadSongs(songs[songIndex]);

//Update the progressbar when some thing is playing right
function upadteProgressBar(e) {
    if (isPlaying) {
        // console.log(e);
        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime);
        // update the progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        //calculate duration in seonds and minutes
        let durationinMin = Math.floor(duration / 60);
        let durationinSec = Math.floor(duration % 60);
        if (durationinSec<10) {
            durationinSec = `0${durationinSec}`
        }
        //Delay switching duration to the element to avoid NaN 
        if (durationinSec) {
            durationEl.textContent = `${durationinMin}:${durationinSec}`;
        }

        //calculate currenttime in seconds and minute
        let currentTimeinMin = Math.floor(currentTime / 60);
        let currentTimeinsec = Math.floor(currentTime % 60);
        if (currentTimeinsec<10) {
            currentTimeinsec = `0${currentTimeinsec}`;
        }
        
        //Delay switching current time to the element to avoid NaN
        if (currentTimeinsec) {
            currentTimeEl.textContent = `${currentTimeinMin}:${currentTimeinsec}`;    
        }

         //is the song ended? 
        if (music.ended) {
            //if yes switch to the next song
            nextSong()
        }
    } 
}

//update the progress bar when clicked on it
function setProgressBar(e) {
    console.log(e);
    const width = e.srcElement.clientWidth;
    console.log("width"+width);
    const clickX = e.offsetX;
    console.log("clickX" + clickX);
    const { duration } = music;
    const clickProgress = (clickX / width) * duration;
    console.log(clickX / width);
    console.log(clickProgress);
    music.currentTime = clickProgress;
} 

function isSongEnded() {
    
}

//Event listeners for prev and next buttons
prevbtn.addEventListener('click', previousSong);
nextbtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', upadteProgressBar);
// using an ended event to move to the next song 
// music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

