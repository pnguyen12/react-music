import React from 'react';

export default class Gallery extends React.Component {
   constructor() {
       super();

       this.renderTracks = this.renderTracks.bind(this);
   }

   playSong(url) {
        let audio = new Audio(url);
        audio.play();
   }
   renderTracks(){
       return this.props.tracks.map((track, index) => {
           const album = track.album.images[0].url
           console.log('track', track);
           return (
              
                <figure key={index} style={{padding: 20}} className="col-sm-4">
                <img onClick={() => this.playSong(track.preview_url)} width={300} height={300} style={{cursor: 'pointer'}} src={album} />
                <figcaption>{track.name}</figcaption>
                </figure>
           
                   
           
           )
       })
   }
    render() {
        console.log('before component renders' ,this.props.tracks[0])
        return (
            <div>
                {this.renderTracks()}
            </div>
        )
    }
}