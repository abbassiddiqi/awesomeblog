import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import 'bulma/css/bulma.css';
import './App.css';

// import Calculator from './Calculator';

function FancyBorder(props) {
  return(
    <div className={"FancyBorder FancyBorder-" + props.color}>
      { props.children }
    </div>
  )
}

class Dialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isActive : true
    }

    this.handleCloseEvent = this.handleCloseEvent.bind(this);
  }

  handleCloseEvent(event) {
    this.setState({
      isActive: false
    })
  }


  render() {

    return (
      <div className={"Dialog modal" + (this.state.isActive ? " is-active" : "") }>
        <div className="modal-background"></div>
        <div className="modal-content" style={{
          background: 'white'
        }}>
          <h1 className="Dialog-title"> {this.props.title} </h1>
          <p className="Dialog-content"> {this.props.content} </p>
        </div>
        <button onClick={this.handleCloseEvent} className="modal-close is-large"></button>
      </div>
    );
  }
}

Dialog.defaultProps = {
  title: 'Default Title',
  content: 'Default content.'
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Dialog />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
