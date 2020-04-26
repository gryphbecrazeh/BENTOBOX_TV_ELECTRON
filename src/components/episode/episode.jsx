import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
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
import { Link, Redirect } from "react-router-dom";
import Store from "../../data/store";
import VideoScraper from "../../inc/videoScraper";

let Episode = () => {
	const [video, setVideo] = useState({});
	const [loaded, setLoaded] = useState(false);
	const { show, episode } = useParams();
	useEffect(() => {
		if (!loaded) {
			console.log("not loaded");
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
			console.log("episodes", updatedEpisodes);
			console.log("episode", episode);
			let episodeIndex = Number(episode) - 1;
			let currentEpisode = updatedEpisodes[episodeIndex];
			let updatedEpisode = { ...currentEpisode };

			// Get Next Episode
			let nextEpisodeIndex = episodeIndex + 1;
			let nextEpisode = updatedEpisodes[nextEpisodeIndex];
			let updatedNextEpisode = { ...nextEpisode };

			// Update the current episodes next episode link
			updatedEpisode.nextEpisode = updatedNextEpisode;

			// Load the video file for the current video
			if (!currentEpisode.video) {
				let scraper = new VideoScraper();
				scraper
					.getVideo(currentEpisode.link)
					.then((currentVideoLink) => {
						// Update the current episodes video
						updatedEpisode.video = currentVideoLink;
						// update the current episodes array to update the current episode
						updatedEpisodes[episodeIndex] = updatedEpisode;
						// Update the state to play the video immediately
						setVideo(updatedEpisode);
						setLoaded(true);
						// If the next episode video file hasn't been retrieved, retrieve it
						if (!currentEpisode.nextEpisode || !nextEpisode.video) {
							// Check if the nextEpisode from the array is not null
							if (nextEpisode) {
								let scraper = new VideoScraper();

								scraper
									.getVideo(nextEpisode.link)
									.then((nextEpisodeLink) => {
										// Add the next episode link to the next episode
										updatedNextEpisode.video = nextEpisodeLink;
										// Add the updated next episode to the current episodes next episode object
										updatedEpisode.nextEpisode = updatedNextEpisode;
										// update the updated episodes array with the updated episodes
										updatedEpisodes[episodeIndex] = updatedEpisode;
										updatedEpisodes[nextEpisodeIndex] = updatedNextEpisode;
										// Store the updated episodes array in the store
										store.set("episodes", updatedEpisodes);
										console.log("Next episode loaded...");
									})
									.catch((err) => console.log("can't get next episode", err));
							}
						} else {
							// Store the updated Episodes in the store
							store.set("episodes", updatedEpisodes);
						}
					})
					.catch((err) => console.log(err));
			} else {
				// If video file is already loaded, return the current episode and stop loading
				setVideo(updatedEpisode);
				setLoaded(true);
				// If the next episode video file hasn't been retrieved, retrieve it
				if (!currentEpisode.nextEpisode || !nextEpisode.video) {
					// Check if the nextEpisode from the array is not null
					if (nextEpisode) {
						let scraper = new VideoScraper();

						scraper
							.getVideo(nextEpisode.link)
							.then((nextEpisodeLink) => {
								// Add the next episode link to the next episode
								updatedNextEpisode.video = nextEpisodeLink;
								// Add the updated next episode to the current episodes next episode object
								updatedEpisode.nextEpisode = updatedNextEpisode;
								// update the updated episodes array with the updated episodes
								updatedEpisodes[episodeIndex] = updatedEpisode;
								updatedEpisodes[nextEpisodeIndex] = updatedNextEpisode;
								// Store the updated episodes array in the store
								store.set("episodes", updatedEpisodes);
								console.log("Next episode loaded...");
							})
							.catch((err) => console.log("can't get next episode", err));
					}
				}
			}
		}
	});
	if (loaded) {
		let { nextEpisode } = video;
		return (
			<div className="episode-container">
				{/* <Redirect to="/" /> */}
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
							<video
								width="100%"
								height="auto"
								controls
								autoPlay
								onEnded={() => {
									console.log("video ended", nextEpisode);
									if (nextEpisode) {
										window.location = `/e/${nextEpisode.name}/${nextEpisode.episode}`;
									}
								}}
							>
								<source src={`${video.video}`}></source>
							</video>
						</CardBody>
						<CardFooter>
							<CardTitle>{`${video.name} ${video.episode}`}</CardTitle>
							<CardSubtitle>Subtitle</CardSubtitle>
						</CardFooter>
					</Card>
				</div>
				<div className="column-right">
					{(() => {
						if (loaded && nextEpisode) {
							return (
								<Card
									inverse
									style={{
										backgroundColor: "#333",
										border: "#333",
									}}
								>
									<CardHeader>
										<Link to={`/e/${nextEpisode.name}/${nextEpisode.episode}`}>
											<CardTitle>{`${nextEpisode.name} ${nextEpisode.episode}`}</CardTitle>
										</Link>
									</CardHeader>
									<CardBody>
										<Link to={`/e/${nextEpisode.name}/${nextEpisode.episode}`}>
											<CardImg top width="100%" src={nextEpisode.image} />
										</Link>
									</CardBody>
									<CardFooter>
										<Button
											tag={Link}
											to={`/e/${nextEpisode.name}/${nextEpisode.episode}`}
										>
											Watch Now!
										</Button>
									</CardFooter>
								</Card>
							);
						}
					})()}
				</div>
			</div>
		);
	} else {
		return <div>Loading</div>;
	}
};
export default Episode;
