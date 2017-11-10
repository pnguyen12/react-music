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
            })
        } else {
            console.log('******audio*********', audio)
            if(this.state.playingUrl === url) {
                this.state.audio.pause();
            } else {
                this.state.audio.pause();
                audio.play();

                this.setState({
                    playing: true,
                    playingUrl: url,
                    audio
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