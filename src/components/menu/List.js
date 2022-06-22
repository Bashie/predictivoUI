import React from 'react'
import styled from 'styled-components'
import Nav from 'react-bootstrap/Nav'
import { authenticationService } from '../_services';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  display: block;
  margin: 0;
  padding: 0;
`

const Div = styled.div`
  border-bottom: 1px solid #efefef;
  color: ${props => props.active ? '#69AAC1' : '#333'};
  display: block;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  margin-left: 18px;
  padding: 18px 18px 18px 5px;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 200ms ease-in-out;
  &:hover {
    color: #6995C1;
  }
`

const List = ({ onClick }) => (
	<Ul>
		<Li>
			<Div><Nav.Link eventKey='pictos' onClick={onClick}>Escribir</Nav.Link></Div>
		</Li>

		<Li>
			<Div><Nav.Link active eventKey='home' onClick={onClick}>Sobre Nosotros</Nav.Link></Div>
		</Li>
		<Li>
			<Div><Nav.Link eventKey='salir' onClick={authenticationService.logout}>Salir</Nav.Link></Div>
		</Li>
	</Ul>
)

export default List