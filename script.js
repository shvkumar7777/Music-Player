const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const prevbtn = document.getElementById('prev');
const playbtn = document.getElementById('play');
const nextbtn = document.getElementById('next');
const music = document.querySelector('audio');

// list of songs
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
    console.log(songIndex);
    loadSongs(songs[songIndex]);
    playSong();
}

// next button: if we increase the songIndex then we can play the next song
function previousSong() {
    songIndex++;
    console.log(songIndex);
    loadSongs(songs[songIndex]);
    playSong();
}

// onload select first song
loadSongs(songs[songIndex]);

//Event listeners for prev and next buttons
prevbtn.addEventListener('click', previousSong);
nextbtn.addEventListener('click', nextSong);


