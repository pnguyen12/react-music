import React from 'react';

export default class Gallery extends React.Component {
   constructor() {
       super();

       this.renderTracks = this.renderTracks.bind(this);
   }
   renderTracks(){
       return this.props.tracks.map((track, index) => {
           const album = track.album.images[0].url
           return (
              
                <figure key={index} style={{padding: 20}} className="col-sm-4">
                <img width={300} height={300} style={{cursor: 'pointer'}} src={album} />
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