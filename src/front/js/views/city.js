import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Post } from "../component/post.js";

import { Context } from "../store/appContext";

import "../../styles/home.scss";
import "../../styles/city.scss";
import "../../styles/all.scss";

import { propTypes } from "react-bootstrap/esm/Image";

export const CityPage = () => {
	const { store, actions } = useContext(Context);

	const params = useParams();
	const [like, setLike] = useState("far fa-heart text-danger");
	const [detail, setDetail] = useState({});
	const [postText, setPostText] = useState();

	useEffect(() => {
		const foo = async () => {
			let currentCity = await actions.cityDetail(params.city_name);
			setDetail(currentCity);
			actions.postCity(currentCity.id);
		};
		foo();
	}, []);

	const postsList = store.posts.map((element, index) => {
		return <Post post={element} key={index} />;
	});

	function onSubmit() {
		const data = {
			cityId: detail.id,
			text: postText
		};
		actions.publishPost(data);
	}

	// const cityInfo = store.cities[params.appContext];

	// const handleClick = () => {
	// 	if (detail.city_name in store.favorites) {
	// 		console.log("ya lo tenemos");
	// 		setLike("fas fa-heart text-danger");
	// 	}
	// 	if (like == "far fa-heart text-danger") {
	// 		setLike("fas fa-heart text-danger");
	// 		actions.addFav(detail.city_name);
	// 	} else {
	// 		setLike("far fa-heart text-danger");
	// 		actions.deleteFav(detail.city_name);
	// 	}
	// };

	return (
		<div className="container p-0">
			<h1 className="text-light text-center col-8 lobster">{detail.city_name}</h1>
			<div className="row">
				<div className="col-8 text-center mb-3 p-0">
					<img className="img-thumbnail" src={detail.image} />
					{/* <button id="likeButton" className="card-img-overlay likeButtonCity ml-2" onClick={handleClick}>
						<i className={like} />
					</button> */}
				</div>
				<div className="col-3">
					<div className="text-light">
						<h5 className="lobster">Population</h5>
						<p>{detail.population}</p>
					</div>
					<div className="text-light">
						<h5 className="lobster">highest temperature</h5>
						<p>{detail.average_highest_temp}</p>
					</div>
					<div className="text-light">
						<h5 className="lobster">Lowest temperature</h5>
						<p>{detail.average_lowest_temp}</p>
					</div>
					<div className="text-light">
						<h5 className="lobster">Population density</h5>
						<p>{detail.population_density}</p>
					</div>
					<div className="text-light">
						<h5 className="lobster">Cost of living</h5>
						<p>{detail.cost_of_living}</p>
					</div>
				</div>
				<div className="container d-flex row">
					<div className="d-flex flex-column-reverse col-12 mb-4">
						<form>
							<div className="form-group">
								<textarea
									className="form-control"
									id="exampleFormControlTextarea1"
									rows="3"
									onChange={event => setPostText(event.target.value)}
								/>
							</div>
							<button type="button" className="btn btn-success" onClick={() => onSubmit()}>
								Submit
							</button>
						</form>
						{postsList}
						<div className="paraElTituloEnPost">Posts</div>
					</div>
					<div className="d-flex row" id="lobster">
						<h1>prueba</h1>
					</div>
				</div>
			</div>
		</div>
	);
};
