import React from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import './App.css';
import Splash from "./components/splash"

function App() {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">The drink tracker app</h1>
          <p className="lead">Now you know how much you've had to drink</p>
        </Container>
      </Jumbotron>
      <Splash />
    </div>
  );
}

export default App;
