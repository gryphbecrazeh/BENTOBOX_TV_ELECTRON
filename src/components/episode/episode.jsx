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
	const [loaded, setLoaded] = useState(false);
	const [nextVideoLoaded, setNextVideoLoaded] = useState(false);
	const { show, episode } = useParams();
	let { nextEpisode } = video;

	let history = useHistory();

	let setDefaultState = (next) => {
		setVideo(next);
		setNextVideoLoaded(false);
		return setLoaded(false);
	};
	let changeToNextEpisode = () => {
		console.log("Navigating to next episode...");
		history.push(`/e/${nextEpisode.name}/${nextEpisode.episode}`);
		return setDefaultState(nextEpisode);
	};

	// Run once
	useEffect(() => {
		// Innitialize Varaibles
		let scraper = new VideoScraper();
		let store = new Store({
			configName: "user-catalog",
		});
		// Get EPISODES from Store
		let episodes = store.get("episodes").sort((a, b) => a.episode - b.episode);
		// Instantiate UPDATED episodes list
		let updatedEpisodes = [...episodes];

		// Get Current Episode
		//
		// Episode index uses array numbering, so episode 1 is 0
		// reduce actual episode number to determine episode
		//
		let episodeIndex = Number(episode) - 1;
		const currentEpisode = updatedEpisodes[episodeIndex];
		// Get Next Episode
		const nextEpisodeIndex = episodeIndex + 1;
		const nextEpisode = updatedEpisodes[nextEpisodeIndex];

		// Create mutable copies of the original variables, these will be what is used and referenced in the rest of this effect
		let updatedEpisode = { ...currentEpisode };
		let updatedNextEpisode;

		// If next episode exists in the array, duplicate it, this will be the working variable from here on
		if (nextEpisode) {
			updatedNextEpisode = { ...nextEpisode };
			// Update the current episodes next episode link
			updatedEpisode.nextEpisode = updatedNextEpisode;
		}
		// Check if there is a next episode and the current episode has the next episode property
		if (nextEpisode && !updatedEpisode.nextEpisode) {
			console.log("Next episode exists...");
			updatedEpisode = {
				...updatedEpisode,
				nextEpisode: {
					...nextEpisode,
				},
			};
			return setVideo(updatedEpisode);
		}
		// Check if the episodes videos have been loaded
		if (!loaded && updatedEpisode.video) {
			console.log("Video is already loaded...");
			return setLoaded(true);
		}

		// check if the next episode has been loaded
		if (!nextVideoLoaded && updatedNextEpisode && updatedNextEpisode.video) {
			console.log("Next Episode is already loaded...");
			return setNextVideoLoaded(true);
		}

		// If the video file hasn't been scraped, scrape it
		if (!loaded || !nextVideoLoaded) {
			// Load the video file for the current video
			if (!loaded) {
				scraper
					.getVideo(updatedEpisode.link)
					.then((currentVideoLink) => {
						if (currentVideoLink) {
							// Add the video property to the current episode
							updatedEpisode = {
								...updatedEpisode,
								video: currentVideoLink,
							};
							// update the current episodes array to update the current episode
							updatedEpisodes[episodeIndex] = updatedEpisode;
							// Update the state to play the video immediately
							// Store the updated Episodes in the store
							store.set("episodes", updatedEpisodes);
							setVideo(updatedEpisode);
							return setLoaded(true);
						} else {
							console.log("error, video link not retrieved");
							// If it fails to load, set the default state to trigger a reload, and use the original state of the video
							return setDefaultState(currentEpisode);
						}
					})
					.catch((err) => console.log(err));
			}

			// If the next episode video file hasn't been retrieved, retrieve it, load this AFTER the video has been loaded
			if (loaded && updatedNextEpisode && !nextVideoLoaded) {
				// Check if the nextEpisode from the array is not null
				console.log("loading next episode...");

				scraper
					.getVideo(updatedNextEpisode.link)
					.then((nextEpisodeLink) => {
						// Add the next episode link to the next episode
						updatedNextEpisode = {
							...updatedNextEpisode,
							video: nextEpisodeLink,
						};
						// Add the updated next episode to the current episodes next episode object
						updatedEpisode = {
							...updatedEpisode,
							nextEpisode: { ...updatedNextEpisode },
						};

						// update the updated episodes array with the updated episodes
						updatedEpisodes[episodeIndex] = updatedEpisode;
						updatedEpisodes[nextEpisodeIndex] = updatedNextEpisode;
						store.set("episodes", updatedEpisodes);
						console.log("Next episode loaded...");
						setNextVideoLoaded(true);
						return setVideo(updatedEpisode);
					})
					.catch((err) => {
						console.log("can't get next episode", err);
					});
			}
		}
	});

	let renderNextEpisode = () => {
		if (!nextVideoLoaded) {
			return <div>Loading...</div>;
		}
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
							nextEpisode={nextEpisode ? nextEpisode : 0}
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
