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
    var accessToken = 'BQDzW0edAzyeMyuaXae4-hz_D4q6OwDwEhZ_6Qp9q7gA80AWUTcM8GqCOFk9hpI1VkoGyREuj-E4N1MRFTBDz59b5YGkIX0DblBEoQFA4oF4SMj1ZbO3qHCB_eUssS-Fw2DOU-hvUE8yRaatSKSIHnOw_Jn676p0sZ586OLOqSFZHaNRn-4&refresh_token=AQCS38-Owk8B5N7AYxHtAE5uNEGuogvF1TGI1pZbSpWTUAujIiyzaLsqUtd42BvF599dvsbKZSdyMU4zYrHJd3ArOLHCvWaYzLm4_2GA6F5JLyQRyK7VBKaJZJvz2APzS2s'
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
