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
    var accessToken = 'BQDtmMI4VDavMY6QaEGC23lr2bpMqI7-dLw6Qhv0Lz83tSoBLIeJUkyky5uUljTrLH8x6P0Fqksh8ycatH7vitgxBA5jcyh248P5bQn8ndprrM3g-3shFEVgFrzrThr1GXhiyQ5_2voTEy45h-hI5PvqZz-DtEMMk9c4XP02pk9KDxcZ31s&refresh_token=AQBrGjofzNTUeg8mIdZsaVO_7pu6CL-YaIpFk35H9BT6BBy67xYW-q-SMZFxDIMiklStH60Ue6on8DmmsqUwQouB9Oa--uC4nzItbpExJMtDA1O-lvRU4fDB9PPTGm94WfQ'
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
          <Gallery tracks={this.state.tracks}/>
        </div>
      </div>

    );
  }
}
