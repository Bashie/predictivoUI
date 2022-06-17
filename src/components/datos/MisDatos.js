import React, { Component } from 'react'
import { authenticationService } from '../_services';



class MisDatos extends Component {
	state = {
	    datos: []
	 }
	
	componentDidMount() {
	    fetch(authenticationService.apiurl + '/users/misdatos', authenticationService.getOptions())
	      .then(res => res.json())
	      .then((data) => {
	        this.setState({ datos: data })
	      })
	      .catch(console.log)
	  }
	render() {
		return(
			<div className="full">
				<div className="titlePage">Mis Datos</div>
				<div  className="fullLogin">
					<div>Nombre: {this.state.datos['nombre']} </div>
					<div>Apellido: {this.state.datos['apellido']} </div>
					<div>DNI: {this.state.datos['dni']} </div>
					<div>Email: {this.state.datos['email']} </div>
				</div>
			</div>
		);
	}
	
}

export default  MisDatos ;