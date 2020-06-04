import React, { useState, useRef, useEffect } from "react";

let VideoPlayer = (props) => {
	let [videoState, setVideoState] = useState({
		paused: true,
	});
	let [displayNextEpisode, setDisplayNextEpisode] = useState(false);
	const videoRef = useRef(null);
	let { episode, nextEpisode, changeEpisode } = props;
	let showNextEpisode = () => {
		if (nextEpisode) {
			let { currentTime, duration } = videoRef.current;
			if (currentTime >= duration - 60 * 5 && displayNextEpisode === false) {
				setDisplayNextEpisode(true);
			}
		}
	};
	let handleTimeUpdate = () => {
		let player = document.querySelector("#video-player");
		let video = player.querySelector("video");
		let orangeBar = player.querySelector(".orange-bar");
		let orangeJuice = orangeBar.querySelector(".orange-juice");
		let juicePos = video.currentTime / video.duration;
		let progress = player.querySelector("#progress");
		progress.value = juicePos * 100;
		orangeJuice.style.width = juicePos * 100 + "%";

		showNextEpisode();
	};
	let handlePlayPause = () => {
		let player = document.querySelector("#video-player");
		let video = player.querySelector("video");
		return video.paused ? video.play() : video.pause();
	};
	let handleFullScreen = () => {
		let player = document.querySelector("#video-player");
		let fullscreenStatus = document.fullscreen;

		if (fullscreenStatus) {
			return document.exitFullscreen();
		}
		return player.requestFullscreen();
	};
	let handleProgressSelect = (e) => {
		let player = document.querySelector("#video-player");
		let video = player.querySelector("video");
		video.currentTime = (e.target.value / 100) * video.duration;
		console.log(e.target.value);
	};
	let NextEpisodeLink = () => {
		if (nextEpisode) {
			return (
				<span>
					<div className="vp-next">Next</div>
					<div
						className="nextEpisodePreview"
						onClick={changeEpisode}
						style={displayNextEpisode ? { right: ".5em" } : {}}
					>{`${nextEpisode.name} ${nextEpisode.episode}`}</div>
				</span>
			);
		}
	};
	return (
		<div id="video-player">
			<video
				// controls
				autoplay
				ref={videoRef}
				width="100%"
				height="auto"
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={() => videoRef.current.play()}
				onEnded={changeEpisode}
			>
				<source src={`${episode.video}`}></source>
			</video>
			<NextEpisodeLink />
			<div className="vp-controls">
				<input
					type="range"
					id="progress"
					min="0"
					max="100"
					onClick={handleProgressSelect}
				/>
				<div className="orange-bar">
					<div className="orange-juice"></div>
				</div>
				<div className="buttons">
					<button id="play-pause" onClick={handlePlayPause}>
						P
					</button>
					<button id="fullscreen" onClick={handleFullScreen}>
						F
					</button>
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;
