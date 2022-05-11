import Card from "./Card"

const CardSkeleton = () => {
    return (
        <Card className="">
            <div className="flex animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <div>
                    <div className="w-16 h-2 rounded-md bg-gray-200 mb-2"></div>
                    <div className="w-24 h-2 rounded-md bg-gray-200"></div>
                </div>
            </div>
        </Card>
    )
}

export default CardSkeleton