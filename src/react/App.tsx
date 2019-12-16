import React from 'react';
import './App.css';
import transformer from './transformer'

declare let window:any


class App extends React.Component {

	state = {result:"Wait for it!",
						renderLayers: []}

	render() {

  function printClick(e:any) {
    e.preventDefault()
    window.postMessage('nativeLog', 'Phalu is calling')
  }

	window.setRandomNumber = (randomNumber:string) => {
		this.setState({result: randomNumber})
	}

	window.getLayerInfo = (info:any) => {
		console.log(info)
		console.log(transformer(info))
		this.setState({renderLayers: transformer(info)})
	}

  return (
    <div className="App">
      <header className="App-header">
        <p>
           <code id="answer">{this.state.result}</code>
					 {this.state.renderLayers}
        </p>
        <a
          className="App-link"
          href="#"
          onClick={printClick}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

}

export default App;
