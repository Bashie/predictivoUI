import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pictos from '../pictos/Pictos'
import { authenticationService } from '../_services';

const AppTabs = () => {
	const [key, setKey] = useState('home');
    return (
       <Tab.Content className="fullTable">
        <Tab.Pane eventKey="home" title="Home" className="full">
          <div className="titlePage">Home</div>
			<div className="foto"><img src='img/jugar.jpg' /></div>
        </Tab.Pane>
        <Tab.Pane eventKey="pictos" title="Escribir">
			<Pictos />
        </Tab.Pane>
     </Tab.Content>
    )
}

export default AppTabs;

