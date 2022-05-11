import classNames from "classnames"
import Card from "components/card/Card"

const LocationCard = ({className, point, tip, ...props}) => {
    return (
        <Card 
            className={`${classNames(className)} text-center`}
            {...props}
        >
            <h2 className="font-semibold mb-2">{point.title}</h2>
            <div className="text-sm text-gray-500 mb-2">Широта: {point.location.lat} / Долгота: {point.location.lng}</div>
            <div className="text-xs text-gray-300">{tip}</div>
        </Card>
    )
}

export default LocationCard