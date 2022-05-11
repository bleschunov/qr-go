import useAuth from "hooks/useAuth"

import Card from "components/card/Card"
import Avatar from "components/Avatar"

const RatingCard = ({ user, pointsNumber, index }) => {
    const { auth } = useAuth()

    return (
        <Card className={`flex items-center hover:shadow-md transition-shadow cursor-pointer hover:ring-0 ${user._id === auth.user._id ? 'ring-4 ring-primary-100' : ''}`}>
            <div className="text-gray-400 text-xl mr-5">#{index}</div>
            <Avatar 
                className="mr-3"
                src={user.ava}
                width="32"
                height="32"
            />
            <div className="mr-6">
                <div className="text-xs font-medium">{user.name}</div>
                <div className="text-xs text-gray-500">@{user.login}</div>
            </div>
            <div className="text-lg text-gray-500 ml-auto">{user.completedPoints.length} / {pointsNumber}</div>
        </Card>
    )
}

export default RatingCard