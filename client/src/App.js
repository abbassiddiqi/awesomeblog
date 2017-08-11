import React, { Component } from 'react';

import 'bulma/css/bulma.css';

function FormattedDate(props) {
  return (
    <h2>It is { props.date.toLocaleTimeString() }</h2>
  );
}

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggle: true
    }

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("You clicked... Lo Dassooo...");
    this.setState( (prevState, props) => {
      return {
        isToggle: !prevState.isToggle
      }
    });
  }
  render() {
    return (
      <button onClick={this.handleClick}>Lo Dasso {this.state.isToggle ? 'ON' : 'OFF'}</button>
    );
  }
}

function WarningBanner(props) {
  if( !props.warn ) {
    return null;
  }

  return (
    <div className="warning">Warning!</div>
  );
}

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: true
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState( (prevState, props) => {
      return {
        showWarning: !prevState.showWarning
      }
    });
  }

  render() {
    return (
      <div className="Page">
        <button onClick={this.handleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
        <WarningBanner warn={this.state.showWarning} />
      </div>
    );
  }
}

function NumberList(props) {
  const listItems = props.numbers.map( (number) => <li key={number.toString()}>{number}</li>);
  return (
    <ul>{listItems}</ul>
  )
}

const numbers = [1, 2, 3, 4, 5];

class  App extends Component {
  render() {
    return (
      <div className="App">
        <Clock />
        <Button />
        <br />
        <Page />
        <br />
        <NumberList numbers={numbers}/>

      </div>
    );
  }
}

export default App;
