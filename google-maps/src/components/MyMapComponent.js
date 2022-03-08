import { compose, withProps } from "recompose";
import { GoogleMap, withGoogleMap, withScriptjs, Marker } from 'react-google-maps'
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';
import { useState, useEffect } from "react";

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=v3.31&key={key}&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {

    let [marker1, setMarker1] = useState(null);
    let [marker2, setMarker2] = useState(null);
    let [marker3, setMarker3] = useState(null);
    let [marker4, setMarker4] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (marker1 === null) {
                marker1 = { lat: 18.457533, lng: 73.867744 }
                marker2 = { lat: 18.457533, lng: 73.867744 }
                marker3 = { lat: 18.457533, lng: 73.867744 }
                marker4 = { lat: 18.457533, lng: 73.867744 }
            } else {
                marker1 = { lat: marker1.lat + 0.0001, lng: marker1.lng + 0.0001 }
                marker2 = { lat: marker2.lat - 0.0001, lng: marker2.lng - 0.0001 }
                marker3 = { lat: marker3.lat - 0.0001, lng: marker3.lng + 0.0001 }
                marker4 = { lat: marker4.lat + 0.0001, lng: marker4.lng - 0.0001 }
            }
            setMarker1(marker1)
            setMarker2(marker2)
            setMarker3(marker3)
            setMarker4(marker4)
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return <GoogleMap
        defaultZoom={12}
        defaultCenter={new window.google.maps.LatLng(18.520430, 73.856743)}
    >
        { marker1 && <Marker position={{ lat: marker1.lat, lng: marker1.lng }}></Marker>}
        { marker2 && <Marker position={{ lat: marker2.lat, lng: marker2.lng }}></Marker>}
        { marker3 && <Marker position={{ lat: marker3.lat, lng: marker3.lng }}></Marker>}
        { marker4 && <Marker position={{ lat: marker4.lat, lng: marker4.lng }}></Marker>}
        <DrawingManager
            defaultDrawingMode={window.google.maps.drawing.OverlayType.POLYGON}
            defaultOptions={{
                drawingControl: true,
                drawingControlOptions: {
                    position: window.google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]
                },
                polygonOptions: { editable: true }
            }}
            onPolygonComplete={(event) => {
                let polygonCreatedMessage = "polygon created with coordinates:";
                event.latLngs.Ed[0].Ed.forEach((latlng) => {
                    polygonCreatedMessage += ` lat ${latlng.lat()}`;
                    polygonCreatedMessage += ` lng ${latlng.lng()},`;
                });
                props.onNewPolygonCreated(polygonCreatedMessage);
            }} />
    </GoogleMap>;
}
)

export default MyMapComponent;

