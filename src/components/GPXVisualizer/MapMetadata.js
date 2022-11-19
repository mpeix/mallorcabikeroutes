import { useEffect, useState } from 'react';
import { isDefined } from '../../utils/utils';
import TimeDTO from '../../model/TimeDTO';
import './MapMetadata.css';

function MapMetadata({ Distance, ElevationGain, SlowExpectedSpeed, MediumExpectedSpeed, HighExpectedSpeed }) {
    const [distanceKms, setDistanceKms] = useState('');
    const [slowExpectedTime, setSlowExpectedTime] = useState(null);
    const [expectedTime, setExpectedTime] = useState(null);
    const [fastExpectedTime, setFastExpectedTime] = useState(null);
    const [dificultyScore, setDificultyScore] = useState(null);
    
    useEffect(() => {
        isDefined(Distance) && setDistanceKms((Distance / 1000).toFixed(2));
        setSlowExpectedTime(getTime(SlowExpectedSpeed || 22));
        setExpectedTime(getTime(MediumExpectedSpeed || 25));
        setFastExpectedTime(getTime(HighExpectedSpeed || 27));
        setDificultyScore(getDificultyScore());
    }, []);

    //Speed in km/h
    const getTime = (speed) => {
        const Kms = Distance / 1000;
        let time = new TimeDTO();
        const hours = Kms / speed;
        time.Hours = parseInt(hours.toString().split('.')[0]);
        time.Minutes = parseInt((parseFloat('0.' + hours.toString().split('.')[1])) * 60);
        return time;
    }

    const getDificultyScore = () =>{
        //Give 1 point for each 5 kms
        //Give 1 points for each 250m of elevation gain
        if(isDefined(Distance) && isDefined(ElevationGain)){
            const distanceScore = (Distance/1000)/5;
            const elevationScore = ElevationGain/250;
            console.log('Distance Score: ', distanceScore, ' Elevation Score: ', elevationScore);
            return (distanceScore + elevationScore).toFixed(2);
        }else
            return null;
    }

    const renderListItem = (label, value, unit) =>{
        if(isDefined(value)){
            return(
                <div className='bg-gray-50 px-4 py-1 sm:grid sm:grid-cols-5 sm:gap-1 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500 sm:col-span-2'>{label}:</dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3'>{value}{unit}</dd>
                </div>
            )
        }else
            return<></>;
    }

    return (
        <div class="py-5 mx-auto max-w-md">
            <div className='text-base font-medium text-gray-900 pb-3'>
                Fitxa Tècnica
            </div>
            {/*https://www.tailwind-kit.com/components/list*/}
            <dl className='border-2 border-gray-300 sm:rounded-lg'>
                {renderListItem('Distància',distanceKms, "Km's")}
                {renderListItem('Desnivell',ElevationGain.toFixed(2), "m")}
                {renderListItem('Coeficient dificultat',dificultyScore, "")}
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-2 sm:px-6'>
                    <div className='text-sm font-medium text-gray-900'>
                        Temps previst
                    </div>
                    <dl className='px-5'>
                        {renderListItem(`Lent (${SlowExpectedSpeed || '22'}Km/h)`, slowExpectedTime?.print(), "")}
                        {renderListItem(`Mitjà (${MediumExpectedSpeed ||'25'}Km/h)`, expectedTime?.print(), "")}
                        {renderListItem(`Ràpid (${HighExpectedSpeed || '27'}Km/h)`, fastExpectedTime?.print(), "")}
                    </dl>
                </div>
            </dl>
        </div>
    )

}

export default MapMetadata;