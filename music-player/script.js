const image = document.querySelector('img');
const title = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container')
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress')
const PrevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric chill Machine',
        artist: 'Jacinto Design'
    }, {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    }, {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    }, {
        name: 'Metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    },
]

// Check if Playing

let isPlaying = false;


// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play();

}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

// Play ofr pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// Update DOM
function loadsong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// next song 
function nextSong() {
    if (songIndex >= songs.length - 1) {
        songIndex = 0
    }
    songIndex++;
    loadsong(songs[(songIndex)])
    playSong();
}

//  previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length
    }
    loadsong(songs[(songIndex)])
    playSong();
}

// on Load - Select First Song
loadsong(songs[songIndex]);

// Update progress Bar & time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationseconds = Math.floor(duration % 60);
        if (durationseconds < 10) {
            durationseconds = `0${durationseconds}`;
        }
        if (durationseconds) {
            durationEl.textContent = `${durationMinutes}:${durationseconds}`
        }

        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentseconds = Math.floor(currentTime % 60);
        if (currentseconds < 10) {
            currentseconds = `0${currentseconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentseconds}`
        console.log(currentTimeEl)
    }
}

// set progress Bar 

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = ((clickX / width) * duration);
}



// Event Listeners 
PrevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar)
