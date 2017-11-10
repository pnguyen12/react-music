import React from 'react';

export default class Profile extends React.Component {
    constructor() {
        super();


    }

    playAudio(previewUrl) {
        let audio = new Audio(previewUrl);
        audio.play();
    }

    render() {
        let artist = {
            name: '',
            followers: {
                total: ''
            }, images: [{
                url: ''
            }], genres: []
        }

        if (this.props.artist !== null) {
            artist = this.props.artist;
        }
        console.log('This.props', this.props)
        return (
            <div className="profile">
                <div className="artist-name"> Name: {artist.name}</div>
                <div className="artist-followers"> Followers: {artist.followers.total}</div>
                <div><a href={artist.images[0].url}><img className="artist-image" src={artist.images[0].url} /></a></div>
                <div className="artist-genre">
                    {artist.genres.map((genre, index) => {
                        genre = genre !== artist.genres[artist.genres.length - 1] ? `${genre}, ` : `& ${genre}`
                        return (
                            <div key={index}>
                                {genre}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}