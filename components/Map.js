import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({});

    //transfrom the search result object into the {latitude: 52.516272 longitude:13.377722} object

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    //the latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return <ReactMapGL
        mapStyle='mapbox://styles/einfach/cksbif09w2ixb17padj23jjye'
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
        {searchResults.map(result => (
            <div key={result.long}>
                <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <p 
                    role="img"
                    onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce"
                    aria-lable="push-pin"
                    >📍</p>
                </Marker>
                {/* this popup that should show if we click on a Marker */}
                {selectedLocation.long === result.long ? (
                    <Popup 
                        closeOnClick={true}
                        onClose={() => setSelectedLocation({})}
                        latitude={result.lat}
                        longitude={result.long}
                    >
                        {result.title}
                    </Popup>
                ): (false)}
            </div>
        ))}
    </ReactMapGL>
}

export default Map
