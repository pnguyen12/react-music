import React from 'react';

export default class Gallery extends React.Component {
    constructor() {
        super();

        this.state = {
            playingUrl: '',
            playing: false,
            audio: null
        }
        this.renderTracks = this.renderTracks.bind(this);
    }

    playSong(url) {
        let audio = new Audio(url);
        if (!this.state.playing) {
            console.log('audio', audio)
            audio.play();
            this.setState({
                playing: true,
                playingUrl: url,
                audio: audio
            }, () => {
                console.log('current play status', this.state.playing)
            })
        } else {
            console.log('******audio*********', audio)
            if(this.state.playingUrl === url) {
                this.state.audio.pause();
                this.setState({
                    playing: false
                },() => {
                    console.log('pause state' , this.state.playing);
                })
            } else {
                this.state.audio.pause();
                audio.play();

                this.setState({
                    playing: true,
                    playingUrl: url,
                    audio
                }, () => {
                    console.log('current playing last' , this.state.playing)
                })
            }
        }
    }
   
    renderTracks() {
        return this.props.tracks.map((track, index) => {
            const album = track.album.images[0].url
            console.log('track', track);
            return (

                <figure key={index} style={{ padding: 20 }} className="col-sm-4">
                    <img onClick={() => this.playSong(track.preview_url)} width={300} height={300} style={{ cursor: 'pointer' }} src={album} />
                    <div className="track-play">
                       <i style={{display: this.state.playing ? 'none' : ''}}className="fa fa-play" aria-hidden="true">Play</i>
                       <i style={{display: this.state.playing ? '': 'none'}}className="fa fa-play" aria-hidden="true">Pause</i>
                    </div>
                    <figcaption>{track.name}</figcaption>
                </figure>



            )
        })
    }
    render() {
        console.log('before component renders', this.props.tracks[0])
        return (
            <div>
                {this.renderTracks()}
            </div>
        )
    }
}