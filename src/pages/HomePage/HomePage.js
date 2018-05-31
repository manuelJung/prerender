import React from 'react'
import styled from 'styled-components'

class HomePage extends React.Component {
  render(){
    return (
      <Wrapper>
        <h1>HOME PAGE</h1>
        <p>Here comes the content</p>
      </Wrapper>
    )
  }
}

export default HomePage

const Wrapper = styled.section`
  > h1 { color: steelblue; text-decoration: underline; }

`