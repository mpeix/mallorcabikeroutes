

function GradientLegend() {
    const legendColorStyle = { width: '15px', height: '15px' };

    const printItem = (color, text) => {
        return (
            <div className="flex-row items-center">
                <div className="rounded-full border border-black h-4 w-4" 
                    style={{ backgroundColor: color }} />
                <div>&nbsp;{text}</div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-4 md:grid-cols-9 gap-2 w-9/10">
            {printItem('white','< 3%')}
            {printItem('#FFBA08','3 - 4%')}
            {printItem('#FAA307','5%')}
            {printItem('#F48C06','6%')}
            {printItem('#E85D04','7%')}
            {printItem('#DC2F02','8%')}
            {printItem('#D00000','9%')}
            {printItem('#9D0208','10-12%')}
            {printItem('#03071E','> 12%')}
        </div>
    )

}

export default GradientLegend;