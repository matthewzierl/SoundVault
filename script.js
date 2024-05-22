const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const shuffleBtn = document.querySelector('#shuffle')
const repeatBtn = document.querySelector('#repeat')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Add variable to check whether prevSong has been pressed
let prevSongPressed = false;
let repeatSongPressed = false;

// Song titles
const songs = ['brown eyes', 'doesn\'t matter now']

// Keep track of index of songs
let songIndex = 0

// Initially load song info into document object module (DOM)
loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song
    audio.src = 'music/' + song + '.mp3'
    // cover.src = 'img/' + song + '.jpg'
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
    
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}

function songIsPlaying() {
    return !audio.paused
}

function prevSong() {

    // For repeating songs
    if (repeatSongPressed) {
        loadSong(songs[songIndex]);
        playSong();
        return;
    }

    prevSongPressed = true;
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()

}

function nextSong() {

    // For repeating songs
    if (repeatSongPressed) {
        loadSong(songs[songIndex]);
        playSong();
        return;
    }

    songIndex++

    if (songIndex >= songs.length) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()

}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = progressPercent + "%"

    if (currentTime == duration) {
        if (repeatSongPressed == true) {
            playSong();
        }
        nextSong()
    }
}


function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

function repeatSong() {
    if (repeatBtn.style.color == "red") {
        repeatSongPressed = false;
        repeatBtn.style.color = "black";
    } else {
        repeatSongPressed = true;
        repeatBtn.style.color = "red";
    }
}

// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Change song Events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
repeatBtn.addEventListener('click', repeatSong)
audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)
