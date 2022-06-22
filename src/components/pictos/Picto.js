import React, { useEffect, useState } from 'react'



const Picto = (props) => {

	useEffect(() => {

	}, [])

	return (
		<div className="picto" onClick={props.accion}>
			<div className="polaroid">
				<img src={props.imgUrl} className="imgPicto"/>
				<div className="container">
					<p>{props.texto}</p>
				</div>
			</div>
		</div>
	);

}

export default Picto;