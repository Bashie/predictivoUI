import React, { Component } from 'react'
import { authenticationService } from '../_services';



class Pictos extends Component {
	state = {
	    datos: []
	 }
	
	componentDidMount() {
//	    fetch(authenticationService.apiurl + '/users/misdatos', authenticationService.getOptions())
//	      .then(res => res.json())
//	      .then((data) => {
//	        this.setState({ datos: data })
//	      })
//	      .catch(console.log)
	  }
	render() {
		return(
			<div className="full">
				
			</div>
		);
	}
	
}

export default  Pictos ;