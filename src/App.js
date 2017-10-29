import React, { Component } from 'react'
import 'whatwg-fetch'
import {pathOr} from 'ramda'
// eslint-disable-next-line
import logo from './logo.svg'
import './App.css'

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			fetchingBoobs: true,
			boobs_url: "https://media1.giphy.com/media/cwHQOWenYfnQA/giphy.gif"
		}
	}

	componentWillMount () {
		this.randomBoobs()
	}

	randomBoobs = () => {
		this.setState({fetchingBoobs: true})
		fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_GIPHY_KEY}&tag=boobs&rating=R`)
			.then(response => {
				return response.json()
			})
			.then(json => {
				const boobs_url = pathOr('http://via.placeholder.com/350x150', ['data', 'image_url'], json)
				console.log('%c boobs_url', 'background: red; color: white', boobs_url)
				this.setState({boobs_url})
			})
			.catch(error => {
				console.log('%c error', 'background: red; color: white', error)
				this.setState({
					fetchingBoobs: false
				})
			})
	}

	boobsLoaded = () => {
		this.setState({fetchingBoobs: false})
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Random (.)(.)</h1>
	        {this.state.fetchingBoobs && <img
		        src={require('./loading-balls.svg')}
	        />}
        </header>
        <p className="App-intro">
          We all know woman boobs make this world more interesting ;)
        </p>
	      
	      <img
		      src={this.state.boobs_url}
		      alt="Click to random new (.)(.)"
		      className='Boobs'
		      onLoad={this.boobsLoaded}
		      onClick={this.randomBoobs}
	      />
      </div>
    );
  }
}

export default App;
