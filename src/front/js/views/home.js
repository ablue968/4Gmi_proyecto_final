import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/home.scss";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";

import { Card } from "../component/card";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		actions.getAllCities();
	}, []);

	const info = () => {
		console.log("Soy el onMouseOver");
	};

	const allCities = store.cities.map((city, index) => {
		return <Card key={index} city={city} />;
	});
	return (
		<>
			<div>
				{["Warning"].map(variant => (
					<SplitButton
						key={variant}
						id={`dropdown-split-variants-"Warning"`}
						variant={variant.toLowerCase()}
						title="Filter">
						<Dropdown.Item eventKey="1">Más habitantes</Dropdown.Item>
						<Dropdown.Item eventKey="2">Menos habitantes</Dropdown.Item>
						<Dropdown.Item eventKey="3">Con playa</Dropdown.Item>
						<Dropdown.Item eventKey="4">Con Montaña</Dropdown.Item>
						<Dropdown.Item eventKey="5">Más frio</Dropdown.Item>
						<Dropdown.Item eventKey="6">Más caluroso</Dropdown.Item>
						<Dropdown.Item eventKey="7" active>
							{" "}
							Esto es un itme activado{" "}
						</Dropdown.Item>
					</SplitButton>
				))}
			</div>

			<div className="container-fluid d-flex justify-content-center row mb-3">
				<h2 className="col-12 text-center magic">Los más buscados</h2>

				{allCities}

				{/*
			
				<div className="card d-flex flex-column topCityCard">
					<Link to="/city" onMouseOver={info}>
						<img src="https://picsum.photos/id/267/200/200" className="card-img-top" alt="..." />
					</Link>
					<button id="likeButton" onClick={() => handleClick(event)}>
						<i className={like} title="ciudad 1" />
					</button>
				</div>*/}
			</div>
			<h2 className="text-center">Elige el próximo destino</h2>
			<div className="container row">{allCities}</div>
		</>
	);
};
