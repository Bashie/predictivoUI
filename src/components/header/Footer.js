import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div(({ }) => `
  overflow-y: auto;
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
 * Footer component
 *
 * @returns {component}           React component
 */
const Footer = () => {
  return (
    <FooterContainer>
      <div className="bottom">
        Universidad Siglo 21
     </div>
    </FooterContainer>
  )
}

export default Footer