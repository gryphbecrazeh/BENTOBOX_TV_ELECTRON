import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardHeader,
	Button,
	CardFooter,
} from "reactstrap";
import Store from "../../data/store";
import VideoScraper from "../../inc/videoScraper";

let Episode = () => {
	const [video, setVideo] = useState({});
	const [loaded, setLoaded] = useState(false);
	const { show, episode } = useParams();
	console.log("show", show, "episode", episode);
	useEffect(() => {
		if (!loaded) {
			let store = new Store({
				configName: "user-catalog",
			});
			let episodes = store.get("episodes");
			let currentEpisode = episodes.filter(
				(item) => item.episode == episode
			)[0];
			if (!episode.video) {
				let scraper = new VideoScraper();
				scraper.getVideo(currentEpisode.link);
			}
			setVideo(currentEpisode);
			setLoaded(true);
		}
	});
	console.log(video);
	return (
		<div className="episode-container">
			<div className="column-left"></div>
			<div className="column-center">
				<Card
					inverse
					style={{
						backgroundColor: "#333",
						border: "#333",
					}}
				>
					<CardBody>
						{(() => {
							if (video.video != null) {
								console.log(video.video);
								return (
									<video
										width="100%"
										height="auto"
										controls
										autoPlay
										// onEnded={() => {
										// 	if (nextEpisodeID) {
										// 		window.location = `/e/${nextEpisodeID}`;
										// 	}
										// }}
									>
										<source src={`${video.video}`}></source>
									</video>
								);
							} else {
								return <div>Loading...</div>;
							}
						})()}
					</CardBody>
					<CardFooter>
						<CardTitle>{`${video.name} ${video.episode}`}</CardTitle>
						<CardSubtitle>Subtitle</CardSubtitle>
					</CardFooter>
				</Card>
			</div>
			<div className="column-right"></div>
		</div>
	);
};
export default Episode;
