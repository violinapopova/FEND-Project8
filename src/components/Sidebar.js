import React, { Component } from 'react';
import '../App.css';


class Sidebar extends Component{



    render(){

        let {query,
            filterLocation,
            filterLands,
            linkMarkers} = this.props;

        return(
            
                
                <nav id="sidebar" className="nav">

                    <div className="sidebar-content">
                        <h2 className="filter-title">Filter Results</h2>
                        <div className="input-wrapper">
                            <input
                                aria-label="Filter landmark by name"
                                role="search"
                                type="text"
                                placeholder = "Filter landmark by name..."
                                value = {query}
                                onChange={(e)=>filterLocation(e.target.value)}
                                />
                        </div>
                        <div id="locations">
                            <ul className="location-list" tabIndex="0" aria-label="List of Landmarks">

                                {filterLands.map((filterLand)=>(
                                    <li key={filterLand.id} className="location" >
                                        <button onClick={linkMarkers}>{filterLand.title}</button>
                                    </li>))
                                }

                            </ul>
                        </div>
                    </div>
                </nav>
            )
    }
}

export default Sidebar;
