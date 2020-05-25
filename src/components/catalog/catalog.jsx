import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardHeader,
	Button,
} from "reactstrap";
import Store from "../../data/store";

class Catalog extends Component {
	state = {
		episodes: [],
		loaded: false,
		sort: true,
		query: "",
	};
	componentDidMount() {
		let store = new Store({
			configName: "user-catalog",
		});
		if (!this.state.loaded) {
			let episodes = store.get("episodes");
			this.setState({
				episodes: episodes,
				loaded: true,
			});
		}
	}

	render() {
		let sortVideos = (array, sort) => {
			return array.sort((a, b) => {
				if (sort) {
					return a.episode - b.episode;
				} else {
					return b.episode - a.episode;
				}
			});
		};
		let renderVideos = (array) => {
			return sortVideos(array, this.state.sort).map(
				(episode, index, episodes) => {
					let nextEpisode = episodes[(index += 1)];
					return (
						<Card
							key={episode._id}
							inverse
							style={{ backgroundColor: "#333", borderColor: "#333" }}
						>
							<CardHeader>
								<Link to={`/e/${episode.name}/${episode.episode}`}>
									<CardTitle>{`${episode.name} ${episode.episode}`}</CardTitle>
								</Link>
							</CardHeader>
							<Link to={`/e/${episode.name}/${episode.episode}`}>
								<CardImg top width="100%" src={`https:${episode.image}`} />
							</Link>
							<CardBody>
								<Button tag={Link} to={`/e/${episode.name}/${episode.episode}`}>
									Watch Now!
								</Button>
							</CardBody>
						</Card>
					);
				}
			);
		};
		let searchEpisode = (val) => {
			this.setState({ query: val }, () => console.log(this.state));
		};
		return (
			<div className="catalog-container">
				<div className="catalog-interaction-menu">
					<div className="catalog-interaction">
						<input
							className="episode-search"
							type="text"
							placeholder="Search for the episode number here"
							onChange={(e) => searchEpisode(e.target.value)}
						/>
					</div>
				</div>
				<div className="catalog">
					{this.state.loaded
						? renderVideos(
								this.state.episodes.filter((ep) => {
									let episode = ep.episode;
									return episode.toString().match(this.state.query);
								})
						  )
						: ""}
				</div>
			</div>
		);
	}
}

export default Catalog;
