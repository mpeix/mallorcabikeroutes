import { useEffect, useState } from 'react';
import LeafletManager from './LeafletManager';
import ElevationProfile from './ElevationProfile';
import MapMetadata from './MapMetadata.js';
import axios from 'axios';
import gpxParser from 'gpxparser';
import RouteDTO from '../../model/RouteDTO.js';
import GradientLegend from './gradientLegend';
import { isDefined, isTrue } from '../../utils/utils';


function RouteCard({ GpxFile, Name, SlopeResolution, Category, Collection, Starred,
    SlowExpectedSpeed, MediumExpectedSpeed, HighExpectedSpeed }) {
    const [routeDTO, setRouteDTO] = useState(null);

    useEffect(() => {
        if (isDefined(GpxFile) && isDefined(Name))
            readRouteGpx();
        //TODO: Check dependencies.
    }, [GpxFile, Name]);

    const readRouteGpx = () => {
        axios.get(GpxFile, { "Content-Type": "application/xml; charset=utf-8" })
            .then(({ data }) => { buildRouteDTO(data, Name) })
            .catch((err) => { console.log(err); });
    }

    //xmlString --> gpx parsed as xml
    const buildRouteDTO = (xmlString, RouteName) => {
        let gpx = new gpxParser();
        gpx.parse(xmlString);
        const track = gpx.tracks[0];

        //Create the RouteDTO
        let _routeDTO = new RouteDTO();
        _routeDTO.Name = RouteName || track.name; //If config file not defined get from track object.
        _routeDTO.Xml = xmlString;
        _routeDTO.Track = track;
        _routeDTO.Elevation = track.elevation.pos;
        _routeDTO.Distance = track.distance.total;
        _routeDTO.SelectedPoint = [track.points[0].lat, track.points[0].lon];
        setRouteDTO(_routeDTO);
    }

    const setCurrentPoint = (lat, lon) => {
        //TODO: Timer?
        setRouteDTO(prev => ({ ...prev, SelectedPoint: [lat, lon] }))
    }

    return (

        <div className='py-4 bg-gray-200'>
            {/*TODO: Route Error loading component*/}
            <div className="bg-white rounded w-11/12 mx-auto rounded-2xl shadow-lg my-2.5">
                {isDefined(routeDTO) ?
                    <>
                        <div className="uppercase text-gray-800 font-black text-xl py-3 flex justify-center align-center">
                            <span>{routeDTO.Name}</span>
                            {isTrue(Starred) && <span className='ml-2 text-yellow-400'>&#9733;</span>}
                        </div>
                        <div className='w-11/12 mx-auto mb-3' style={{height:'50vh'}}>
                            <LeafletManager Track={routeDTO.Track} SelectedPoint={routeDTO.SelectedPoint} />
                        </div>
                        <div className='w-11/12 mx-auto' style={{height:'30vh'}}>
                            <ElevationProfile Track={routeDTO.Track} RouteName={routeDTO.Name}
                                SlopeResolution={SlopeResolution} onTooltip={setCurrentPoint} />
                        </div>
                        <div className='w-11/12 mx-auto mb-3'>
                            <GradientLegend />
                        </div>
                        <MapMetadata Distance={routeDTO.Distance} ElevationGain={routeDTO.Elevation}
                            SlowExpectedSpeed={SlowExpectedSpeed} MediumExpectedSpeed={MediumExpectedSpeed} 
                            HighExpectedSpeed={HighExpectedSpeed}/>
                        {/*TODO: Download GPX Button */}
                    </>

                    :
                    <div className="my-5 py-10 min-h-50 flex items-center justify-center ">
                        {/*TODO: Place spinner in common */}
                        <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                }
            </div>
        </div>


    )

}

export default RouteCard;