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
	let renderNextEpisodeLink = () => {
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
				controls
				autoplay
				ref={videoRef}
				width="100%"
				height="auto"
				onTimeUpdate={showNextEpisode}
				onLoadedMetadata={() => videoRef.current.play()}
				onEnded={changeEpisode}
			>
				<source src={`${episode.video}`}></source>
			</video>
			{renderNextEpisodeLink()}
		</div>
	);
};

export default VideoPlayer;
