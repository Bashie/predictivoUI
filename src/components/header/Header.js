import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div(({ }) => `
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 8;
  background-color: #95C8D8;
  align-items: flex-end;
`)

/**
 * Header component
 *
 * @returns {component}           React component
 */
const Header = () => {
  return (
    <HeaderContainer>
      <div className="title">
       PictoAI

     </div>
    </HeaderContainer>
  )
}

export default Header