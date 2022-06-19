import React, { useEffect, useState } from 'react'
import { authenticationService } from '../_services';
import Picto from './Picto'
import { Carousel } from '@trendyol-js/react-carousel';
import Categorias from '../categorias/Categorias'

const Pictos = (props) => {

	const [pictos, setPictos] = useState([]);
	const [frase, setFrase] = useState([]);

	useEffect(() => {
		cargarCategorias(1);
	}, [])

	function cargarCategorias(tipo) {
		fetch(authenticationService.apiurl + '/pictogramas/' + tipo, authenticationService.getOptions())
			.then(res => res.json())
			.then((data) => {
				if (data.status === 403) {
					return;
				}
				setPictos(data)
			})
			.catch(console.log)
	}

	const agregarPicto = (picto) => {
		setFrase(
			frase.concat(picto)
		);
		gurdarFrase(frase, picto);

	}

	const gurdarFrase = (values, picto) => {
		console.log(JSON.stringify({ "fraseUsada": values.concat(picto), "usuarioId": authenticationService.usuarioId }));
		console.log(authenticationService.usuarioId);
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authenticationService.token,
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ "fraseUsada": values.concat(picto), "usuarioId": authenticationService.usuarioId })
		};
		console.log(options);
		return fetch(authenticationService.apiurl + "/prediccion", options)
	}

	return (
		<div className="vertical">
			<div className="redondeado categorias">
				<Categorias className="categorias" accion={cargarCategorias} />
			</div>
			<div className="carousels">
				<div className="redondeado">
					{frase && frase.length && (
						<Carousel swiping={true} show={4.5} slide={3} dynamic={true} infinite={false} className="exampleCarousel1">
							{frase.map((props) => (
								<Picto key={props.id} imgUrl={props.imagen} texto={props.nombre} picto={props} className="picto" accion={null} />
							))}
						</Carousel>
					)}
				</div>
				<br />
				<div className="redondeado">
					{pictos && pictos.length && (
						<Carousel swiping={true} show={4.5} slide={3} dynamic={true} className="exampleCarousel1">
							{pictos.map((props) => (
								<Picto key={props.id} imgUrl={props.imagen} texto={props.nombre} picto={props} className="picto" accion={event => agregarPicto(props)} />
							))}
						</Carousel>
					)}
				</div>
				<br />
				<div className="redondeado">
					{pictos && pictos.length && (
						<Carousel swiping={true} show={4.5} slide={3} dynamic={true} className="exampleCarousel1">
							{pictos.map((props) => (
								<Picto key={props.id} imgUrl={props.imagen} texto={props.nombre} className="picto" />
							))}
						</Carousel>
					)}
				</div>
			</div>
		</div>
	);

}

export default Pictos;