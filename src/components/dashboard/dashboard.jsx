import React from "react";
import VideoPlayer from "../videoPlayer/videoPlayer";
import Video from "../../inc/video.mp4";
let Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<VideoPlayer
				episode={{ video: Video }}
				nextEpisode={{ name: "test", episode: 1 }}
				changeEpisode={() => console.log("change")}
			/>
		</div>
	);
};

export default Dashboard;
