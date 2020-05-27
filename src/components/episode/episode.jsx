import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
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
import { Link, useHistory } from "react-router-dom";
import Store from "../../data/store";
import VideoScraper from "../../inc/videoScraper";
// import VideoPlayer from "../videoPlayer/videoPlayer";

let Episode = () => {
	const [video, setVideo] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [nextVideoLoaded, setNextVideoLoaded] = useState(false);
	const { show, episode } = useParams();
	let { nextEpisode } = video;

	let history = useHistory();

	useEffect(() => {
		if (!nextEpisode || nextEpisode.video) {
			setNextVideoLoaded(false);
		}
		if (!loaded) {
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
										setNextVideoLoaded(true);
										console.log("Next episode loaded...");
									})
									.catch((err) => {
										console.log("can't get next episode", err);
									});
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
								setNextVideoLoaded(true);
								console.log("Next episode loaded...");
							})
							.catch((err) => console.log("can't get next episode", err));
					}
				} else {
					setNextVideoLoaded(true);
				}
			}
		}
	});
	if (loaded) {
		let renderNextEpisode = () => {
			if (nextEpisode) {
				setLoaded(false);
				setVideo(nextEpisode);
			}
		};
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
							<video
								width="100%"
								height="auto"
								controls
								onEnded={() => {
									renderNextEpisode();
									history.push(`/e/${nextEpisode.name}/${nextEpisode.episode}`);
								}}
							>
								<source src={`${video.video}`}></source>
							</video>
							{/* <VideoPlayer episode={video} /> */}
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
					{(() => {
						if (nextEpisode) {
							return (
								<Card
									inverse
									style={{
										backgroundColor: "#333",
										border: "#333",
									}}
								>
									<CardHeader>
										<Link
											to={`/e/${nextEpisode.name}/${nextEpisode.episode}`}
											onClick={renderNextEpisode}
										>
											<CardTitle>{`${nextEpisode.name} ${nextEpisode.episode}`}</CardTitle>
										</Link>
									</CardHeader>
									<CardBody>
										<Link
											to={`/e/${nextEpisode.name}/${nextEpisode.episode}`}
											onClick={renderNextEpisode}
										>
											<CardImg
												top
												width="100%"
												src={`https:${nextEpisode.image}`}
											/>
										</Link>
									</CardBody>
									<CardFooter>
										<Button
											tag={Link}
											to={`/e/${nextEpisode.name}/${nextEpisode.episode}`}
											onClick={renderNextEpisode}
											block
										>
											{nextVideoLoaded ? "Watch Now!" : "Loading..."}
										</Button>
									</CardFooter>
								</Card>
							);
						} else {
							return "No Next Episode";
						}
					})()}
				</div>
			</div>
		);
	} else {
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
};
export default Episode;
