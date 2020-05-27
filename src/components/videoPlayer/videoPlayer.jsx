import React, { useState, useRef, useEffect } from "react";

let VideoPlayer = (props) => {
	let [videoState, setVideoState] = useState({
		paused: true,
	});
	const videoRef = useRef(null);
	let { current } = videoRef;
	let { episode } = props;

	return (
		<div id="videoPlayer">
			<video ref={videoRef} width="100%" height="auto">
				<source src={`${episode.video}`}></source>
			</video>
			<ul id="video-controls" className="controls">
				<li>
					<div className="vp-button" id="play-button" onClick={playPauseVideo}>
						{videoState.paused ? "Play" : "Pause"}
					</div>
				</li>
				<li className="progress">
					<progress id="progress" value="0" min="0">
						<span id="progress-bar"></span>
					</progress>
				</li>
				<li>
					<div className="vp-button" id="fullscreen-button">
						Full
					</div>
				</li>
			</ul>
		</div>
	);
};

export default VideoPlayer;
