import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Donut from './Donut';

class App extends Component {
  constructor(props) {
    super(props);

    this.data = [
      [10, 20, 30, 40],
      [0, 1000, 0, 2000],
      [410, 320, 230, 140],
      [10, 10, 10, 10],
      [0, 0, 0, 0],
    ];

    this.state = {
      index: 0,
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            willChange: 'background',
          }}
        >
          <button
            onClick={() => {
              const nexIndex =
                this.data.length - 1 === this.state.index
                  ? 0
                  : this.state.index + 1;
              this.setState({ index: nexIndex });
            }}
          >
            switch
          </button>
          <Donut
            strokeWidth="0.1px"
            data={this.data[this.state.index]}
            colors={['red', 'orange', 'blue', 'yellow']}
          />
        </div>
      </div>
    );
  }
}

export default App;
