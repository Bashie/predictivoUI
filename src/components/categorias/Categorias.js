import React from "react";
import Collapsible from "react-collapsible";

function logear() {
	console.log("out")
}

const Categorias = (props) => {
	return (
		<div >
			<Collapsible onOpening={() => props.nuevaFrase()} trigger="Nueva Frase">
			</Collapsible>
			<Collapsible onOpening={() => props.accion(0)} trigger="Verbo">
				<p className="categoria">Lorem ipsum dolor</p>
			</Collapsible>
			<Collapsible onOpening={() => props.accion(1)} trigger="Sustantivo">
				<p className="categoria">Lorem ipsum dolor</p>
			</Collapsible>
			<Collapsible onOpening={() => props.accion(2)} trigger="Adjetivo" >
				<p className="categoria">Lorem ipsum dolor</p>
			</Collapsible>
		</div>
	);
}

export default Categorias;

