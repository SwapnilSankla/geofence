import { compose, withProps } from "recompose";
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=v3.31&key=AIzaSyBuYUAXSUR9LPuRjJ2GQkBnFO--FREAIC4&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={new window.google.maps.LatLng(18.520430, 73.856743)}
    >
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
                let polygonCreatedMessage = "polygon created with coordinates:"
                event.latLngs.Ed[0].Ed.forEach((latlng) => {
                    polygonCreatedMessage += ` lat ${latlng.lat()}`
                    polygonCreatedMessage += ` lng ${latlng.lng()},`
                })
                props.onNewPolygonCreated(polygonCreatedMessage);
            }}
        />
    </GoogleMap>
)

export default MyMapComponent;

