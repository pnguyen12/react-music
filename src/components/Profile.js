import React from 'react';

export default class Profile extends React.Component {
 constructor() {
     super();

 }
    render() {
        let artist = {
            name: '',
            followers: {
                total: ''
            }, images: [{
                url: ''
            }], genres: ''
        }

        if(this.props.artist !== null) {
            artist = this.props.artist;
        }
        console.log('This.props', this.props)
        return (
            <div>
                <h2> Name: {artist.name}</h2>
                <h2> Followers: {artist.followers.total}</h2>
                <img src={artist.images[0].url}/>

            
            </div>
        )
    }
}