import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Menu as BurgerIcon } from '@styled-icons/remix-fill/Menu'
import Tab from 'react-bootstrap/Tab'

import Menu from '../menu/Menu'
import AppTabs from '../tabs/AppTabs'
import Header from '../header/Header'
import Footer from '../header/Footer'
import StyledOffCanvas from '../Provider'

import List from '../menu/List'
import Close from '../menu/Close'

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background: linear-gradient(150deg, #003152 50%, #6995C1 100%);
    margin: 0;
    min-height: 100%;
  }
`

const Container = styled.div`
	padding: 0px;
	display: flex;
	flex-direction: column;
	height: 100%;
`
const HomePage = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Container>
			<GlobalStyle />
			<StyledOffCanvas className="full"
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<Header />
				<Tab.Container id="app-tabs" defaultActiveKey="home" className="full">
					<BurgerIcon
						size={48}
						className="menu"
						css={{
							background: '#fff',
							borderRadius: '6px',
							padding: '5%',
							cursor: 'pointer'
						}}
						onClick={() => { setIsOpen((isOpen) => !isOpen) }}
					/>
					<AppTabs className="full" />
					<Menu>
						<>
							<Close onClose={() => setIsOpen(false)} />
							<List onClick={() => { setIsOpen((isOpen) => !isOpen) }} />
						</>
					</Menu>
				</Tab.Container>
				<Footer className="full" />
			</StyledOffCanvas>

		</Container>
	)
}

export { HomePage }; 
