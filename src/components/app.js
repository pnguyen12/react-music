import React, { Component } from 'react';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      query: ''
    }

    this.search = this.search.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
  }

  changeQuery(event) {
    this.setState({
      query: event.target.value
    })
  }

  search() {
    console.log(JSON.stringify(this.state))
  }

  checkKey(event) {
    if (event.key == 'Enter') {
      this.search();
    }
  }
  render() {
    return (
      <div className="app">
        <div className="input">
          <input onKeyPress={this.checkKey.bind(this)} onChange={this.changeQuery} className="form-control" type="text" placeholder="Enter in an artist name" />
          <button onClick={this.search}>Search</button>
        </div>
        <div className="profile">
          <div>Artist name</div>
          <div>Artist details</div>
        </div>
        <div className="gallery">
          <div>gallery</div>
        </div>
      </div>

    );
  }
}
