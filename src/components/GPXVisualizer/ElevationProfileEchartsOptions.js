const getEchartOptions = (seriesData, visualMapData, RouteName, onTooltip) => {
    console.log('SeriesData', seriesData);
    console.log('VisualMapData', visualMapData);

    return {
        grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        xAxis: {
            type: 'category',
            name: 'kms',
            axisLabel: {
                formatter: (value, index) => {
                    return parseFloat(value / 1000).toFixed(1);
                }
            }
        },
        yAxis: {
            type: 'value',
            name: 'm'
        },
        visualMap: {
            type: 'piecewise',
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: visualMapData.map((ed) => ({
                gt: ed.min,
                lt: ed.max,
                color: getSlopeColor(ed.slope),
                slope: ed.slope
            }))
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                //data has latitude in third dimenson and longitude in fourth
                onTooltip && onTooltip(params[0].data[2], params[0].data[3]);
                const dist = params[0].data[0];
                const dataSlice = visualMapData.find(vmd => dist >= vmd.xMin && dist < vmd.xMax);
                const elevation = parseInt(dataSlice.slope);
                return (`<div>
                        Slope: <strong>${elevation}%</strong>
                        </div>`);
            }
        },
        series: [
            {
                data: seriesData,
                type: 'line',
                symbol: 'none',
                smooth: true,
                areaStyle: {},
                lineStyle: {
                    color: 'black',
                    width: 1
                }
            }
        ]
    };

}

const getSlopeColor = (slope) => {
    const intSlope = parseInt(slope);
    let color = 'white';

    if (intSlope >= 3)
        color = '#FFBA08';

    if (intSlope >= 5)
        color = '#FAA307';

    if (intSlope >= 6)
        color = '#F48C06';

    if (intSlope >= 7)
        color = '#E85D04';

    if (intSlope >= 8)
        color = '#DC2F02';

    if (intSlope >= 9)
        color = '#D00000';

    if (intSlope >= 10)
        color = '#9D0208';

    if (intSlope >= 12)
        color = '#03071E';

    return color;
}

export {
    getEchartOptions
}