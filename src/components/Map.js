import React, {Component} from 'react';
import '../App.css';




class Map extends Component{



    render(){

        return(
            <section id="map-container">
                <div id="map" ref='map' aria-label="Landmark locations" role="application" tabIndex="0"></div>
            </section>
        )
    }
}

export default Map;
