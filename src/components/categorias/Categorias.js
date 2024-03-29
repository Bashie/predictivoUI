import React from "react";
import Collapsible from "react-collapsible";

function logear() {
	console.log("out")
}

const Categorias = (props) => {
	return (
		<div className="categoriasDiv">
			<Collapsible onOpening={() => props.nuevaFrase()} trigger="Nueva Frase">
			</Collapsible>
			<Collapsible onOpening={() => props.accion(0)} onClosing={() => props.accion(-1)} trigger="Verbo">
				{props.categoriasVerbos.map((cat) => (
					<p className="categoria" key={cat.id}><a role="button" aria-pressed="false" onClick={() => props.cargarPorCategoriasYTipo(0, cat.id)}> {cat.nombre}</a></p>
				))}
			</Collapsible>
			<Collapsible onOpening={() => props.accion(1)} onClosing={() => props.accion(-1)} trigger="Sustantivo">
				{props.categoriasSustantivos.map((cat) => (
					<p className="categoria" key={cat.id}><a role="button" aria-pressed="false" onClick={() => props.cargarPorCategoriasYTipo(1, cat.id)}>{cat.nombre}</a></p>
				))}
			</Collapsible>
			<Collapsible onOpening={() => props.accion(2)} onClosing={() => props.accion(-1)} trigger="Adjetivo">
				{props.categoriasAdjetivos.map((cat) => (
					<p className="categoria" key={cat.id}><a role="button" aria-pressed="false" onClick={() => props.cargarPorCategoriasYTipo(2, cat.id)}>{cat.nombre}</a></p>
				))}
			</Collapsible>
		</div>
	);
}

export default Categorias;

