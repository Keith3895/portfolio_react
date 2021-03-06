import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar/navbar';
import Main from './components/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/footer/footer';
import ReactGA from 'react-ga';

class App extends Component {
  constructor(props) {
    super(props);
    this.navActive = this.navActive.bind(this);
    this.state = { margin: { "marginTop": 0 }, width: 0, height: 0 };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    ReactGA.initialize('UA-88824970-1',{ testMode: process.env.NODE_ENV === 'test' });
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  /**
   * 
   * @param {Boolean} active 
   */
  navActive(active) {
    let value;
    if (this.state.width > 360 && this.state.height > 640) {
      value = '10em';
    } else {
      value = 0;
    }
    this.setState({
      margin: { "marginTop": active ? '0' : value }
    });
    // console.log(active);
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar active={this.navActive} />
          <div style={this.state.margin}>
            <Main />
          </div>
          <Footer></Footer>
        </Router>
      </div >

    );
  }
}

export default App;