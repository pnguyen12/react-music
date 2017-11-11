import React, { Component } from 'react';
import Profile from './Profile';
import Gallery from './Gallery';

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
    var accessToken = 'BQBQ5QoUenBoFcpNzrtR81n0HalDtHbbtGiqQIzVpTdF8q2OZbwGzokTrA8OzIdNhGH3NUChAub1E7k47jMH0fEOZ7BTly3se5FCesiFqxiRJregRl9DHwNjaV4tYOhrZCd6FxdGynfgY47SxrF6Em6MfCSDtb-OfZELPfQhCs7BG3wS08c&refresh_token=AQCsqRyVFMt-inaeYoEA79voaHn0907InIsoOQZYiS0XQygOugLp0CAJOf7Jxj24lHUJK18m-F63INd39xU5zGNFlJhT7rsCGhSTfxvXfZ8gPVf5BewEmNU4zFJ6wJ-5cB0';
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
    if (this.state.artist != null) {
      return (
        <div>
          <Profile artist={this.state.artist} />
        </div>
      )
    }

  }
  render() {
    return (
      <div>
        <div className="app">
         <div className="input-group">
          <input onKeyPress={this.checkKey.bind(this)} onChange={this.changeQuery} type="text" className="form-control" placeholder="Search for..." />
          <span className="input-group-btn">
            <button onClick={this.search} className="btn btn-secondary" type="button">Go!</button>
          </span>
        </div>
          {this.renderArtist()}
          <div className="gallery">
            <Gallery tracks={this.state.tracks} />
          </div>
        </div>
       
      </div>
    );
  }
}
