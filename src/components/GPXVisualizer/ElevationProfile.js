import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { arrayHasItems, isDefined } from '../../utils/utils';
import { getEchartOptions } from './ElevationProfileEchartsOptions';

function ElevationProfile({ Track, RouteName, SlopeResolution, onTooltip }) {
    const [echartsOption, setEchartsOption] = useState(null);

    useEffect(() => {
        if (isDefined(Track)) {
            const seriesData = Track.points.map((p, i) => [parseInt(Track.distance.cumul[i]), p.ele, p.lat, p.lon]);
            //Create and array with distance and elevation information
            const distanceEleve = Track.points.map((p, i) => ({ Dist: parseInt(Track.distance.cumul[i]), Ele: parseInt(p.ele) }));

            //In order to represent the elevation of a segment we need to reduce the distance elevation information
            //to a intervals collection. Set the precision to 100m to get the slope. Short 
            //distance intervals can give unreal slopes.
            const simplifiedSlope = [];
            const slopeResolution = isDefined(SlopeResolution) ? SlopeResolution : 100;
            console.log('slope resolution: ', slopeResolution);
            let i = 0;
            while (i <= Track.distance.total) {
                const closest = distanceEleve.reduce((a, b) => {
                    return Math.abs(b.Dist - i) < Math.abs(a.Dist - i) ? b : a;
                });
                simplifiedSlope.push(closest);
                i += slopeResolution;
            }

            const visualMapPieces = [];
            for (let i = 0; i < simplifiedSlope.length; i++) {
                if (i > 0) {
                    const elevationGain = simplifiedSlope[i].Ele - simplifiedSlope[i - 1].Ele;
                    const distance = simplifiedSlope[i].Dist - simplifiedSlope[i - 1].Dist;
                    const minSeriesIndex = seriesData.findIndex(r => r[0] == simplifiedSlope[i - 1].Dist);
                    const maxSeriesIndex = seriesData.findIndex(r => r[0] == simplifiedSlope[i].Dist);
                    visualMapPieces.push({
                        min: minSeriesIndex,
                        max: maxSeriesIndex,
                        xMin:simplifiedSlope[i - 1].Dist,
                        xMax:simplifiedSlope[i].Dist,
                        slope: (elevationGain / distance) * 100
                    });
                }
            }
            const echartsOption = getEchartOptions(seriesData, visualMapPieces, RouteName, onTooltip);
            setEchartsOption(echartsOption);
        }
    }, [JSON.stringify(Track)]);

    return (
        isDefined(echartsOption) &&
                 <ReactECharts option={echartsOption} style={{height:'100%',width:'100%'}}/>
    )
}

export default ElevationProfile;