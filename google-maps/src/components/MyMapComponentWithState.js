import { useState } from 'react';
import MyMapComponent from './MyMapComponent';

function MyMapComponentWithState() {
    const [polygonLatLngs, setPolygonLatLngs] = useState([]);

    const newPolygonCreatedHandler = (polygonDetails) => {
        polygonLatLngs.push(polygonDetails);
        setPolygonLatLngs(polygonLatLngs.slice());
    }

    return (
        <div>
            <MyMapComponent onNewPolygonCreated={newPolygonCreatedHandler} />
            {
                polygonLatLngs.length > 0 &&
                <ul>
                    {polygonLatLngs.map((polygonLatLng) => <li key={polygonLatLng}>{polygonLatLng}</li>)}
                </ul>
            }
        </div>
    )
}

export default MyMapComponentWithState;