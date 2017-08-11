import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './Calculator.css';

function BoilingVerdict(props) {
  return (
    <div className="BoilingVerdict">
      <strong> Will it Boil? </strong>
      { props.celsius >= 100 ? (
        <p>It will boil!!</p>
      ) : (
        <p>It will not boil</p>
      )}
    </div>
  );
}

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConverting(temperature, convert) {
  const input = parseFloat(temperature);
  if( Number.isNaN(input) ) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onTemperatureChange( event.target.value );
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <div className="TemperatureInput">
        <div className="field">
          <label className="label">Enter Temperature in {scaleNames[scale]}:</label>
          <input className="input" type="text" value={temperature} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

class Calculator extends Component {
  constructor(props) {
      super(props);

      this.state = {
        temperature: '',
        sclae: 'c'
      }

      this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
      this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({
      scale: 'c',
      temperature
    });
  }

  handleFahrenheitChange(temperature) {
    this.setState({
      scale: 'f',
      temperature
    });
  }


  render() {
    const temperature = this.state.temperature;
    const scale = this.state.scale;
    const celsius = scale === "f" ? tryConverting(temperature, toCelsius) : temperature;
    const fahrenheit = scale === "c" ? tryConverting(temperature, toFahrenheit): temperature;

    return (
        <div className="Calculator">
          <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
          <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
          <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
      );
  }
}

export default Calculator;
