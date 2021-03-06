import React, { Component } from 'react';
import landmarks from './data/landmarks';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import escapeRegExp from 'escape-string-regexp';

//create script tag and load the Map
function loadScripts(src){ 
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = src;
   script.async = true;
  script.defer = true;
  script.onerror = function() {
    document.write("The map can`t be loaded");
  }
  ref.parentNode.insertBefore(script, ref);
}

class App extends Component {

 state = {
    map:'',
    query:'',
    landmarks:landmarks,
    markers:[],
    info:'',
    filteredMarks:[],
    filterLands:[],
  }

/* init map with markers from Google Map API */ 
initMap=()=>{

  let options = {
    zoom: 14,
    center:{lat: 42.6977082, lng : 23.3218675},
    mapTypeId: 'roadmap'
  }

  let map = new window.google.maps.Map(document.getElementById('map'),{options});

  this.setState({
    map: map
  })

 this.createMarkers();
}

/*add markers with info to landmarks*/
createMarkers=()=>{
  let {map} = this.state;
  let initMarkers = [];

      landmarks.forEach((landmark)=>{

        let marker = new window.google.maps.Marker({
          position: landmark.position,
          title: landmark.title,
          id:landmark.id,
          map: map,
          animation: window.google.maps.Animation.DROP,
          active: false
        })
        initMarkers.push(marker);
  
        this.setState({
          markers:initMarkers,
          filteredMarks: initMarkers,
        })
        //console.log(`filterM ${this.state.filteredMarks}`)

        let infoWindow = new window.google.maps.InfoWindow()

        /* infoWindow will open/close on click and set on/off animation */
        marker.addListener('click', ()=>{
          if(marker.active !== false){
            infoWindow.close();
            marker.setAnimation(null);
            marker.active = false;
          }else{
            marker.active = true;
            let cl_Id = 'IXZZUQNGVQA0TQFLZRCP2XWQEPJJCL4QCW1HUP5DJQLYL54C';
            let cl_Secret = 'R5VSXRHY5GCLW0XW4MPRTSSMRKDAZTR5GG1M33KCD2NCSJZS';
            let v_Id = landmark.id;

              fetch(`https://api.foursquare.com/v2/venues/${v_Id}/likes?client_id=${cl_Id}&client_secret=${cl_Secret}&v=20180806`)
                .then(response=>{
                  if(response.status===200){
                    //console.log(response)
                    return response.json();
                  }
                })
                .then(data => {
                  this.setState({
                    info: data.response.likes.summary
                  })
                  //console.log(this.state.info)
                  infoWindow.setContent(
                    `<div class="info-content" tabindex="0">
                      <h3 class="info-title">${landmark.title}</h3>
                        <p class="info-details">${this.state.info}</p>
                    </div>`);
                })

                .catch(error =>{
                  console.log(error);
                  alert("We are unable to show you information for this landmark at thе moment")
                })

            infoWindow.open(map, marker);
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            //console.log(marker.active);
          }
        });
        map.addListener('click', function(){
          infoWindow.close(map, marker);
          marker.setAnimation(null);
        })

      })
}


/* landmarks and markers filtering */
filterLocation =  (query)=>{
  this.setState({
    query
  })

  let {markers, map}=this.state;

  if(query.length>0){

    const match = new RegExp(escapeRegExp(query), 'i');
    //console.log(query.length);
    this.setState({
      filterLands: landmarks.filter((landmark)=>match.test(landmark.title)),
      filteredMarks: markers.filter((marker)=>match.test(marker.title))
    })
    //console.log(`Correct: ${this.state.filteredMarks.length}`)

    /* in case of a match => add marker */
    setTimeout(() => {
      this.addMarker();
    }, 1500)

  }else{
    setTimeout(() => {
      this.resetMarker();

      this.setState({
        map,
        query:'',
        filterLands: landmarks,
        filteredMarks: markers,
      });
    }, 1500);
  }
}


addMarker=()=>{
  let {map, filteredMarks, markers} = this.state

  markers.forEach((marker)=>{
    marker.setMap(null);//clear markers

    filteredMarks.forEach((filteredMark)=>{
      if(filteredMark.id===marker.id){//compare markers' ids
        filteredMark.setMap(map);//in case of match show filtered marker(s)
        filteredMark.setAnimation(window.google.maps.Animation.BOUNCE);
      }
    })
  })
}

resetMarker=()=>{
  let {markers, map} = this.state
  markers.forEach((marker)=>{
    marker.setMap(map);
    marker.setAnimation(null);
  });
}


/* click on a location item to activate the corresponding marker */
linkMarkers=(event)=>{
  let {markers} = this.state;
  markers.forEach((marker)=>{
    if(marker.title===event.target.innerHTML){  
      //console.log(event.target.innerHTML) refers to the innerHTML of clicked element 
    window.google.maps.event.trigger(marker, 'click'); 
    
    }
  })
}

componentDidMount() {
  window.initMap = this.initMap; //connect initMap() with global window context and Google maps can invoke it
  loadScripts('https://maps.googleapis.com/maps/api/js?key=AIzaSyDGUWD_SkIAdfRuO175gFcY_VOpbhvvbJc&language=en&callback=initMap')
//this way the full list of locations is desplayed by default: 
  this.setState({
    filterLands:landmarks
  })
}

/* open/close sidebar according to viewport */
toggleMenu(){
  document.querySelector('#sidebar').classList.toggle('open')
}
  render() {


    let {query,
        filterLands}=this.state;

    return (

      <div className="App">
        
        <header className="App-header">
          
          <div className="menu-btn" tabIndex="0" role="button" aria-label="toggle menu" onClick={this.toggleMenu}>&#9776;</div> 
          
          <h1 className="App-title">Sofia Sightseeing Map</h1>
        </header>

        <main id="maincontent" tabIndex="0">

        <Sidebar
        query={query}
        filterLands = {filterLands}
        filterLocation={this.filterLocation}
        linkMarkers = {this.linkMarkers}
        />

        <Map />

        </main>

        <footer id="footer" tabIndex="0">
          <p id="footer-info">
            Used APIs: <a href= "https://cloud.google.com/maps-platform/" className="api-links">Google Maps API</a> and <a href="https://foursquare.com/developers/apps" className="api-links">Foursquare API</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;

//in case of authentication errors
window.gm_authFailure=()=>{
  alert("There is an error with Google Map. Check your network connection!");
}
