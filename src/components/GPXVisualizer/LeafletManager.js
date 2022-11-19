import 'leaflet/dist/leaflet.css'
import React, { useState, useEffect } from 'react'
import { MapContainer, Polyline, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet';
import {isDefined, arrayHasItems} from '../../utils/utils';
import DefaultIcon from 'leaflet/dist/images/marker-icon.png';

function LeafletManager({ Track, SelectedPoint }) {
    const [mapCenter, setMapCenter] = useState(null);
    const [mapBounds, setMapBounds] = useState(null);
    const [trakPolyline, setTrackPolyline] = useState([]);

    useEffect(() => {
        if (arrayHasItems(Track.points)) {
            const polylinePoints = Track.points.map(p=> [p.lat,p.lon]);
            //Use a Leaflet polyline objet to get the bounds and center.
            const polylineBounds = L.polyline(polylinePoints, {}).getBounds();
            setMapBounds(polylineBounds);
            setMapCenter(polylineBounds.getCenter(SelectedPoint));
            setTrackPolyline(polylinePoints);
        }
    }, [JSON.stringify(Track)]);

    return (
         mapCenter != null ?
            <MapContainer center={[mapCenter.lat, mapCenter.lng]}
                bounds={mapBounds} boundsOptions={{padding: [15, 15]}}
                scrollWheelZoom={false}
                style={{height:'100%', width:'100%'}}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {arrayHasItems(trakPolyline) &&
                    <Polyline pathOptions={{ fillColor: 'red', color: 'blue' }}
                            positions={trakPolyline}
                    />
                }
                
                {isDefined(SelectedPoint) &&
                    <Marker position={SelectedPoint} 
                    icon={new L.Icon({iconUrl:DefaultIcon, iconSize:[25,41], iconAnchor:[12,41]})} />
                }
            </MapContainer>
            :
            <div> Building Map</div>
    )
}

export default LeafletManager;