// Dependencies
import React, { useState, useEffect } from "react";
import { FaStar, FaDownload, FaPhotoVideo } from "react-icons/fa";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardHeader,
	Button,
	CardFooter,
	Spinner,
} from "reactstrap";

// Storage
import Store from "../../data/store";

// Router
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";

// Scripts
import VideoScraper from "../../inc/videoScraper";

// Components
import VideoPlayer from "../videoPlayer/videoPlayer";

let Episode = () => {
	const [video, setVideo] = useState({});
	// console.log(video);
	const [loaded, setLoaded] = useState(false);
	const [nextVideoLoaded, setNextVideoLoaded] = useState(false);
	const { show, episode } = useParams();
	let { nextEpisode } = video;

	let history = useHistory();

	let setDefaultState = (next) => {
		setLoaded(next.video ? true : false);
		setNextVideoLoaded(false);
		setVideo(next);
	};
	let changeToNextEpisode = () => {
		console.log("Navigating to next episode...");
		history.push(`/e/${nextEpisode.name}/${nextEpisode.episode}`);
		setDefaultState(nextEpisode);
	};

	// Run once
	useEffect(() => {
		// check if the next episode has been loaded
		if (nextEpisode && nextEpisode.video) {
			setNextVideoLoaded(true);
		}
		if (video.video) {
			setLoaded(true);
		}
		// If the video file hasn't been scraped, scrape it
		if (!loaded || !nextVideoLoaded) {
			console.log("loading episode...");
			let scraper = new VideoScraper();
			let store = new Store({
				configName: "user-catalog",
			});
			// Get EPISODES from Store
			const episodes = store
				.get("episodes")
				.sort((a, b) => a.episode - b.episode);
			// Instantiate UPDATED episodes list
			const updatedEpisodes = [...episodes];

			// Get Current Episode
			//
			// Episode index uses array numbering, so episode 1 is 0
			// reduce actual episode number to determine episode
			//
			let episodeIndex = Number(episode) - 1;
			let currentEpisode = updatedEpisodes[episodeIndex];
			let updatedEpisode = { ...currentEpisode };
			// Get Next Episode
			let nextEpisodeIndex = episodeIndex + 1;
			let nextEpisode = updatedEpisodes[nextEpisodeIndex];
			let updatedNextEpisode;

			if (nextEpisode) {
				updatedNextEpisode = { ...nextEpisode };
				// Update the current episodes next episode link
				updatedEpisode.nextEpisode = updatedNextEpisode;
			}

			// Load the video file for the current video
			if (!loaded) {
				scraper
					.getVideo(currentEpisode.link)
					.then((currentVideoLink) => {
						if (currentVideoLink) {
							console.log(currentVideoLink);
							// Update the current episodes video
							updatedEpisode = {
								...updatedEpisode,
								video: currentVideoLink,
							};
							console.log("updated episode", updatedEpisode);
							// update the current episodes array to update the current episode
							updatedEpisodes[episodeIndex] = updatedEpisode;
							// Update the state to play the video immediately
							// Store the updated Episodes in the store
							store.set("episodes", updatedEpisodes);
							setVideo(updatedEpisode);
							setLoaded(true);
						} else {
							console.log("error, video link not retrieved");
						}
					})
					.catch((err) => console.log(err));
			}

			// If the next episode video file hasn't been retrieved, retrieve it
			if (loaded && nextEpisode && !nextVideoLoaded) {
				// Check if the nextEpisode from the array is not null
				console.log("loading next episode...");

				scraper
					.getVideo(nextEpisode.link)
					.then((nextEpisodeLink) => {
						// Add the next episode link to the next episode
						updatedNextEpisode = {
							...updatedNextEpisode,
							nextEpisodeLink,
						};
						// Add the updated next episode to the current episodes next episode object
						updatedEpisode.nextEpisode = updatedNextEpisode;
						// update the updated episodes array with the updated episodes
						updatedEpisodes[episodeIndex] = updatedEpisode;
						updatedEpisodes[nextEpisodeIndex] = updatedNextEpisode;
						store.set("episodes", updatedEpisodes);
						setVideo(updatedEpisode);
						setNextVideoLoaded(true);
						console.log("Next episode loaded...");
					})
					.catch((err) => {
						console.log("can't get next episode", err);
					});
			}
		}
	});

	let renderNextEpisode = () => {
		if (!nextEpisode) {
			return <div>No Further Episodes...</div>;
		}

		return (
			<Card
				inverse
				style={{
					backgroundColor: "#333",
					border: "#333",
				}}
			>
				<CardHeader>
					<CardTitle
						onClick={changeToNextEpisode}
					>{`${nextEpisode.name} ${nextEpisode.episode}`}</CardTitle>
				</CardHeader>
				<CardBody>
					<CardImg
						top
						width="100%"
						src={`https:${nextEpisode.image}`}
						onClick={changeToNextEpisode}
					/>
				</CardBody>
				<CardFooter>
					<Button onClick={changeToNextEpisode} block>
						{nextVideoLoaded ? "Watch Now!" : "Loading..."}
					</Button>
				</CardFooter>
			</Card>
		);
	};

	if (!loaded) {
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
						<CardBody
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Spinner animation="border" variant="primary" />
						</CardBody>
					</Card>
				</div>

				<div className="column-right"></div>
			</div>
		);
	}
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
						<VideoPlayer
							episode={video}
							nextEpisode={video.nextEpisode}
							changeEpisode={changeToNextEpisode}
						/>
					</CardBody>
					<CardFooter>
						<CardTitle>{`${video.name} ${video.episode}`}</CardTitle>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<Button
								// block
								onClick={() => console.log("Download")}
								color="primary"
							>
								<FaDownload />
							</Button>
							<Button
								// block
								color="warning"
							>
								<FaStar />
							</Button>
							<Button
								//  block
								color="success"
							>
								<FaPhotoVideo />
							</Button>
						</div>
					</CardFooter>
				</Card>
			</div>
			<div className="column-right">
				{/* Render Next Episode */}
				{renderNextEpisode()}
			</div>
		</div>
	);
};

export default Episode;
