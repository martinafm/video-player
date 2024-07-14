const videoPlayer = {
	player: document.querySelector(".player"),
	video: document.querySelector(".video"),
	progressRange: document.querySelector(".progress-range"),
	progressBar: document.querySelector(".progress-bar"),
	playBtn: document.getElementById("play-btn"),
	volumeIcon: document.getElementById("volume-icon"),
	volumeRange: document.querySelector(".volume-range"),
	volumeBar: document.querySelector(".volume-bar"),
	speed: document.querySelector(".player-speed"),
	currentTime: document.querySelector(".time-elapsed"),
	duration: document.querySelector(".time-duration"),
	fullscreenBtn: document.querySelector(".fullscreen"),
};

// Play & Pause ----------------------------------- //

function showPlayIcon() {
	videoPlayer.playBtn.classList.replace("fa-pause", "fa-play");
	videoPlayer.playBtn.setAttribute("title", "Play");
}
function togglePlay() {
	if (videoPlayer.video.paused) {
		videoPlayer.video.play();
		videoPlayer.playBtn.classList.replace("fa-play", "fa-pause");
		videoPlayer.playBtn.setAttribute("title", "Pause");
	} else {
		videoPlayer.video.pause();
		showPlayIcon();
	}
}

// Progress Bar ---------------------------------- //
function updateProgress() {
	videoPlayer.progressBar.style.width = `${
		(videoPlayer.video.currentTime / videoPlayer.video.duration) * 100
	}%`;
	videoPlayer.currentTime.textContent = `${displayTime(
		videoPlayer.video.currentTime
	)} /`;
	videoPlayer.duration.textContent = `${displayTime(
		videoPlayer.video.duration
	)}`;
}

//click to seek within the video
function setProgress(e) {
	const newTime = e.offsetX / videoPlayer.progressRange.offsetWidth;
	videoPlayer.progressBar.style.width = `${newTime * 100}%`;
	videoPlayer.video.currentTime = newTime * videoPlayer.video.duration;
}

//calculate display time format
function displayTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);
	seconds = seconds > 9 ? seconds : `0${seconds}`;
	return `${minutes}:${seconds}`;
}
// Volume Controls --------------------------- //

function changeVolume(e) {
	let volume = e.offsetX / videoPlayer.volumeRange.offsetWidth;
	//rounding volume
	if (volume < 0.1) {
		volume = 0;
	}
	if (volume > 0.9) {
		volume = 1;
	}

	videoPlayer.volumeBar.style.width = `${volume * 100}%`;
	videoPlayer.video.volume = volume;
	videoPlayer.volumeIcon.className = "";
	if (volume > 0.7) {
		videoPlayer.volumeIcon.classList.add("fas", "fa-volume-up");
	} else if (volume < 0.7 && volume > 0) {
		videoPlayer.volumeIcon.classList.add("fas", "fa-volume-down");
	} else if (volume === 0) {
		videoPlayer.volumeIcon.classList.add("fas", "fa-volume-off");
	}
}
function toggleSound() {
	if (videoPlayer.video.muted) {
		videoPlayer.video.play();
		videoPlayer.playBtn.classList.replace("fa-play", "fa-pause");
		videoPlayer.playBtn.setAttribute("title", "Pause");
	} else {
		videoPlayer.video.pause();
		showPlayIcon();
	}
}

// Change Playback Speed -------------------- //
function changeSpeed() {
	videoPlayer.video.playbackRate = videoPlayer.speed.value;
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) {
		/* Firefox */
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Chrome, Safari and Opera */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE/Edge */
		elem.msRequestFullscreen();
	}
	videoPlayer.video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		/* Firefox */
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		/* Chrome, Safari and Opera */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		/* IE/Edge */
		document.msExitFullscreen();
	}
	videoPlayer.video.classList.remove("video-fullscreen");
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
	if (!fullscreen) {
		openFullscreen(videoPlayer.player);
	} else {
		closeFullscreen();
	}
	fullscreen = !fullscreen;
}

//EventListeners
videoPlayer.playBtn.addEventListener("click", togglePlay);
videoPlayer.video.addEventListener("click", togglePlay);
videoPlayer.video.addEventListener("ended", showPlayIcon);
videoPlayer.video.addEventListener("timeupdate", updateProgress);
videoPlayer.video.addEventListener("canplay", updateProgress);
videoPlayer.progressRange.addEventListener("click", setProgress);
videoPlayer.volumeRange.addEventListener("click", changeVolume);
videoPlayer.speed.addEventListener("change", changeSpeed);
videoPlayer.fullscreenBtn.addEventListener("click", toggleFullscreen);
document.addEventListener("keydown", function (event) {
	console.log("heydown");
	if (event.key === "Escape") {
		closeFullscreen();
	}
});
