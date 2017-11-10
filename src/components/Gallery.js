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
               <div>
                <img style={{padding: 20, cursor: 'pointer'}}className="col-sm-4" src={album} />
                </div>
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