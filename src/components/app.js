import React, { Component } from 'react';


export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="input">
        <input className="form-control" type="text" placeholder="Enter in an artist name" />
        <button>Search</button>
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
