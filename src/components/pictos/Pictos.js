import React, { useEffect, useState } from 'react'
import { authenticationService } from '../_services';
import Picto from './Picto'
import { Carousel } from '@trendyol-js/react-carousel';
import Categorias from '../categorias/Categorias'

const Pictos = (props) => {

	const [pictos, setPictos] = useState([]);
	const [predicciones, setPredicciones] = useState([]);
	const [frase, setFrase] = useState([]);
	const [categoriasVerbos, setCategoriasVerbos] = useState([]);
	const [categoriasSustantivos, setCategoriasSustantivos] = useState([]);
	const [categoriasAdjetivos, setCategoriasAdjetivos] = useState([]);

	useEffect(() => {
		cargarPorCategorias(1);
		cargarCategorias(0);
		cargarCategorias(1);
		cargarCategorias(2);
	}, [])

	function cargarPorCategorias(tipo) {
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

	function cargarPorCategoriasYTipo(tipo, categoria) {
		fetch(authenticationService.apiurl + '/pictogramas/' + tipo + "/" + categoria, authenticationService.getOptions())
			.then(res => res.json())
			.then((data) => {
				if (data.status === 403) {
					return;
				}
				setPictos(data)
			})
			.catch(console.log)
	}

	function cargarCategorias(tipo) {
		fetch(authenticationService.apiurl + '/categorias/' + tipo, authenticationService.getOptions())
			.then(res => res.json())
			.then((data) => {
				if (data.status === 403) {
					return;
				}
				if (tipo == 0) {
					setCategoriasVerbos(data);
				}
				if (tipo == 1) {
					setCategoriasSustantivos(data);
				}
				if (tipo == 2) {
					setCategoriasAdjetivos(data);
				}
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
		let options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authenticationService.token,
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ "fraseUsada": values.concat(picto), "usuarioId": authenticationService.getUsuarioId() })
		};
		fetch(authenticationService.apiurl + "/prediccion", options).then(res => res.json())
			.then((data) => {
				if (data.status === 403) {
					return;
				}
				setPredicciones(data)
			})
			.catch(console.log)
	}

	const nuevaFrase = () => {
		setFrase([]);
	}

	return (
		<div className="vertical">
			<div className="redondeadoCategoria categorias">
				<Categorias className="categorias" cargarPorCategoriasYTipo={cargarPorCategoriasYTipo} accion={cargarPorCategorias} nuevaFrase={nuevaFrase} categoriasVerbos={categoriasVerbos} categoriasSustantivos={categoriasSustantivos} categoriasAdjetivos={categoriasAdjetivos} />
			</div>
			<div className="carousels">
				<div className="redondeado">
					{frase && (frase != "0") && frase.length && (
						<Carousel swiping={true} show={4.5} slide={3} dynamic={true} infinite={false} className="exampleCarousel1">
							{frase.map((props) => (
								<Picto key={props.id} imgUrl={props.imagen} texto={props.nombre} picto={props} className="picto" accion={null} />
							))}
						</Carousel>
					)}
					{(!frase || (frase == "0") || frase.length == 0) && (
						<div className="imgPicto"></div>
					)}
				</div>
				<br />
				<div className="redondeado">
					{predicciones && (predicciones != "0") && predicciones.length > 0 && (
						<Carousel swiping={true} show={4.5} slide={3} dynamic={true} className="exampleCarousel1">
							{predicciones.map((props) => (
								<Picto key={props.id} imgUrl={props.imagen} texto={props.nombre} picto={props} className="picto" accion={event => agregarPicto(props)} />
							))}
						</Carousel>
					)}
					{(!predicciones || (predicciones == "0") || predicciones.length == 0) && (
						<div className="imgPicto"></div>
					)}
				</div>
				<br />
				<div className="redondeado">
					{pictos && (pictos != "0") && pictos.length > 0 && (
						<Carousel swiping={true} show={4.5} slide={3} dynamic={true} className="exampleCarousel1">
							{pictos.map((props) => (
								<Picto key={props.id} imgUrl={props.imagen} texto={props.nombre} className="picto" accion={event => agregarPicto(props)} />
							))}
						</Carousel>
					)}
					{(!pictos || (pictos == "0") || pictos.length == 0) && (
						<div className="imgPicto"></div>
					)}
				</div>
			</div>
		</div>
	);

}

export default Pictos;