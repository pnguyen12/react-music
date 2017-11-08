import React, { Component } from 'react';
import Profile from './Profile';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      artist: null
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
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    var accessToken = 'BQDPgmjXtwmhM1dhjAYuX8uUz0c1qESr_J9UQXQO8em2KDS5LXIDpyYRbO86SqlqGc6BThPPJonAX57L-La3A6tcN7f7nZ1Ov6Lj6mZgtEO4oKpy94V_NhZTzTaNJy5JbU3AHp3zMp4favsKyPRhftIrDeCf1I4e3awfNmJrVQ2j-rAeIQ4&refresh_token=AQBRb0xdcfuT7cS72U8wb8iGiFFKlptbBidT2cb6oOSSrimQXa6ApGgr9jgj4RPg8cFMHLhRZ2kn4yi8LqQEH9FsOsl3HwIN-7PWiW1yKZBjQLbPqsGRYkmhZ4eFlB85044'
    console.log('access', accessToken)

     var options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, options)
    .then(response => response.json())
    .then(json => {
        console.log('JSON data', json.artists.items[0])
        let artist = json.artists.items[0]
        this.setState({
          artist: artist
        })
    });
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
        <Profile artist={this.state.artist}/>
        <div className="gallery">
          <div>gallery</div>
        </div>
      </div>

    );
  }
}
