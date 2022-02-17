import * as flsFunctions from './modules/functions.js';
import i18Obj from './modules/translation.js';

flsFunctions.isWebp();

const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
const shadow = document.querySelector('.shadow');
const menuList = document.querySelector('.menu__list');

iconMenu.addEventListener('click', () => {
	iconMenu.classList.toggle('_active');
	menuBody.classList.toggle('_active');
	shadow.classList.toggle('shadow-on');
});


menuList.addEventListener('click', (e) => {
	if (e.target.classList.contains('menu__link')) {
		iconMenu.classList.remove('_active');
		menuBody.classList.remove('_active');
		shadow.classList.remove("shadow-on");
	}
})


const portfolioTabs = document.querySelector('.portfolio__tabs');
const portfolioImages = document.querySelectorAll('.portfolio__image');
const portfolioBtns = document.querySelectorAll('.portfolio__btn');

portfolioTabs.addEventListener('click', (e) => {
	if (e.target.classList.contains('portfolio__btn')) {
		if (e.target.dataset.season === "winter") {
			portfolioImages.forEach((img, index) => img.src = `./img/portfolio/winter/${index + 1}.jpg`);
		} else if ((e.target.dataset.season === "spring")) {
			portfolioImages.forEach((img, index) => img.src = `./img/portfolio/spring/${index + 1}.jpg`);
		} else if ((e.target.dataset.season === "summer")) {
			portfolioImages.forEach((img, index) => img.src = `./img/portfolio/summer/${index + 1}.jpg`);
		} else {
			portfolioImages.forEach((img, index) => img.src = `./img/portfolio/autumn/${index + 1}.jpg`);
		}
	}
})


const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadSummerImages() {
	seasons.forEach(season => {
		for (let i = 1; i <= 6; i++) {
			const img = new Image();
			img.src = `./img/portfolio/${season}/${i}.jpg`;
		}
	})
}
preloadSummerImages();


function changeClassActive(e) {
	portfolioBtns.forEach(button => button.classList.remove('active'));
	e.target.classList.add('active');
}

portfolioBtns.forEach(item => item.addEventListener('click', changeClassActive));


const language = document.querySelector('.header-top__languages');
const languages = document.querySelectorAll('.header-top__language');

function getTranslate(lang) {
	languages.forEach(button => button.classList.remove('active-language'));
	lang.target.classList.add('active-language');
	const data = document.querySelectorAll('[data-i18]');
	if (lang.target.textContent === 'ru') {
		data.forEach(item => item.textContent = i18Obj.ru[item.dataset.i18]);
	} else {
		data.forEach(item => item.textContent = i18Obj.en[item.dataset.i18]);
	}
}

language.addEventListener('click', getTranslate);



const LIGHT_THEME = ['.menu__body', '.menu__link', '.icon-menu', '.title', '.skills', '.skills__name', '.skills__about', '.skills__pseudotitle', '.portfolio', '.portfolio__pseudotitle', '.portfolio__btn', '.video', '.video__pseudotitle', '.price', '.price__pseudotitle', '.price__name', '.price__description'];
const LIGHT = document.querySelector('.header-top__light-theme');
const NIGHT = document.querySelector('.header-top__night-theme');
const THEME = document.querySelectorAll('.theme');

function changeTheme() {
	LIGHT_THEME.forEach(item => document.querySelectorAll(`${item}`).forEach(item => item.classList.toggle('_light-theme')))
	LIGHT.classList.toggle('change');
	NIGHT.classList.toggle('change');
}

THEME.forEach(item => item.addEventListener('click', changeTheme));



//get DOM-elements
const player = document.querySelector('.video-player');
const video = document.querySelector('.video-player__video');
const controlButtons = document.querySelector('.video-player__control-buttons');
const startButton = document.querySelector('.video-player__start-button');
const playButton = document.querySelector('.video-player__play-button');
const pauseButton = document.querySelector('.video-player__pause-button');
const progressBar = document.querySelector('.video-player__progress-bar');
const progressBarFilled = document.querySelector('.video-player__progress-bar-filled');
const volumeBar = document.querySelector('.video-player__volume-bar');
const volumeButton = document.querySelector('.video-player__volume-button');
const muteButton = document.querySelector('.video-player__mute-button');
const volumeBarVertical = document.querySelector('.video-player__volume-bar-vertical');
const volumeButtonVertical = document.querySelector('.video-player__volume-icon-vertical');
const fullscreenButton = document.querySelector('.video-player__fullscreen-button');
const fullscreenOffButton = document.querySelector('.video-player__fullscreen-button-off');



//video play-pause
function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
		controlButtons.style.opacity = "1";
	}
	playButton.classList.toggle('hide');
	pauseButton.classList.toggle('hide');
	startButton.classList.toggle('hide');
}

video.addEventListener('click', togglePlay);
startButton.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
pauseButton.addEventListener('click', togglePlay);


//video progressbar handle
function handleProgressBar() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.value = percent;
	let value = (progressBar.value - progressBar.min) / (progressBar.max - progressBar.min) * 100;
	progressBar.style.background = 'linear-gradient(to right, #bdae82 ' + value + '%, #fff ' + value + '%, white 100%)';
	if (progressBar.value === "100") {
		playButton.classList.toggle('hide');
		pauseButton.classList.toggle('hide');
		startButton.classList.remove('hide');
	}
}

video.addEventListener('timeupdate', handleProgressBar);

function handleProgress(e) {
	const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

progressBar.addEventListener('click', handleProgress);


//video volume on/off handle
function switchVolume() {
	if (video.volume !== 0) {
		video.volume = 0;
		volumeBar.value = "0";
		let value = (volumeBar.value - volumeBar.min) / (volumeBar.max - volumeBar.min) * 100;
		volumeBar.style.background = 'linear-gradient(to right, #bdae82 ' + value + '%, #fff ' + value + '%, white 100%)';
	} else {
		video.volume = 0.5;
		volumeBar.value = `${video.volume}`;
		volumeBar.style.background = 'linear-gradient(to right, #bdae82 ' + 50 + '%, #fff ' + 50 + '%, white 100%)'
	}
	volumeButton.classList.toggle('hide');
	muteButton.classList.toggle('hide');
}

volumeButton.addEventListener('click', switchVolume);
muteButton.addEventListener('click', switchVolume);


//video volume progress handle
function volumeProgress() {
	let value = (this.value - this.min) / (this.max - this.min) * 100
	this.style.background = 'linear-gradient(to right, #bdae82 0%, #bdae82 ' + value + '%, #fff ' + value + '%, white 100%)'
}

volumeBar.addEventListener('input', volumeProgress);


//video volumebar handle
function handleVolume() {
	video.volume = volumeBar.value;
	if (video.volume === 0) {
		volumeButton.classList.remove('hide');
		muteButton.classList.add('hide');
	}
}

volumeBar.addEventListener('change', handleVolume);


function handleVolumeIcon() {
	if (video.volume === 0) {
		volumeButton.classList.add('hide');
		muteButton.classList.remove('hide');
	} else {
		volumeButton.classList.remove('hide');
		muteButton.classList.add('hide');
	}
}

volumeBar.addEventListener('change', handleVolumeIcon);


//video volumebar vertical handle
function handleVolumeVertical() {
	video.volume = volumeBarVertical.value;
}

volumeBarVertical.addEventListener('change', handleVolumeVertical);
volumeBarVertical.addEventListener('mousemove', handleVolumeVertical);


//video volume vertical on/off handle
function openVolumeBar() {
	if (volumeBarVertical.style.display === "none") {
		volumeBarVertical.style.display = "block";
	} else {
		volumeBarVertical.style.display = "none";
	}
}

volumeButtonVertical.addEventListener('click', openVolumeBar);


//video volume progress vertical handle
function volumeProgressVertical() {
	let value = (this.value - this.min) / (this.max - this.min) * 100
	this.style.background = 'linear-gradient(to right, #bdae82 0%, #bdae82 ' + value + '%, #fff ' + value + '%, white 100%)'
}

volumeBarVertical.addEventListener('input', volumeProgressVertical);


//video fullscreen on/off
function switchFullscreen() {
	if (!document.fullscreenElement) {
		player.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
	fullscreenButton.classList.toggle('hide');
	fullscreenOffButton.classList.toggle('hide');
}

video.addEventListener('dblclick', switchFullscreen);
fullscreenButton.addEventListener('click', switchFullscreen);
fullscreenOffButton.addEventListener('click', switchFullscreen);


//video controlbar opacity handle
player.addEventListener('mouseover', () => {
	if (!document.fullscreenElement) {
		controlButtons.style.opacity = "1";
	}
});

player.addEventListener('mouseleave', () => {
	if (!document.fullscreenElement) {
		setTimeout(() => controlButtons.style.opacity = "0", 2000);
	}
});

controlButtons.addEventListener('mouseover', () => {
	if (document.fullscreenElement) {
		controlButtons.style.opacity = "1";
	}
});

controlButtons.addEventListener('mouseleave', () => {
	setTimeout(() => controlButtons.style.opacity = "0", 2000);
});