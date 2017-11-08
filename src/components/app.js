import React, { Component } from 'react';
import Profile from './Profile';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      artist: null,
      tracks: []
    }

    this.search = this.search.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
    this.renderArtist = this.renderArtist.bind(this);
  }

  changeQuery(event) {
    this.setState({
      query: event.target.value
    })
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
    var accessToken = 'BQC2XVRdT0YO6j-9OCFg0RPEUWHH4SVFEvyLgACGmKDn-CsnAioyHs_osysmDLfBq8itzqhgGsPAKgQYXolADscBV-rwKljrLgzRW0a9D8cDifDGdmdedxg0q85OYrXrYZOvDbziXPYfW8erL1sdsUJ4CUwN-bz8zjnwPzezy0Z_qQgUR00&refresh_token=AQDzQNg8Ey-lJBrdKpIMgttgkk8bYjwbGkgg20SFDFrio4JZnpX03vHwiHMtuzTVLBK4lY0PlosQ-ICytu9ZYHv_50jAurtCX5QZKpSZ071M8pNZQSQh8Xw2xkRFmGzj4oQ'
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

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
        fetch(FETCH_URL, options) 
        .then(response => response.json())
        .then(json => {
          console.log('json data', json);
          console.log('Json tracks', json.tracks);
          const tracks = json.tracks;
          this.setState({
            tracks: tracks
          })
        })
    });
  }

  checkKey(event) {
    if (event.key == 'Enter') {
      this.search();
    }
  }

  renderArtist() {
    if(this.state.artist != null) {
      return (
        <div>
             <Profile artist={this.state.artist}/>
        </div>
      )
    }

  }
   render() {
    return (
      <div className="app">
        <div className="input">
          <input onKeyPress={this.checkKey.bind(this)} onChange={this.changeQuery} className="form-control" type="text" placeholder="Enter in an artist name" />
          <button onClick={this.search}>Search</button>
        </div>
        {this.renderArtist()}
        <div className="gallery">
        </div>
      </div>

    );
  }
}
