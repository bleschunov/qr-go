import classNames from "classnames"
import useUsersService from "hooks/useUsersService"
import usePointsService from "hooks/usePointsService"
import useImagesService from "hooks/useImagesService"
import { useEffect, useState } from "react"

import Card from "components/card/Card"
import Container from "components/Container"
import RatingCard from "./RatingCard"
import CardSkeleton from "components/card/CardSkeleton"

import defaultImage from 'images/default.png'

const RatingList = ({ className }) => {
    const { getUsers } = useUsersService()
    const { getPoints } = usePointsService()
    const { getImage } = useImagesService()
    const [users, setUsers] = useState([])
    const [pointsNumber, setPointsNumber] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fn = async () => {
            try {
                const usersData = await getUsers()
                usersData.users.sort((a, b) => b.completedPoints.length - a.completedPoints.length)
            
                const promises = usersData.users.map(user => getImage(user.thumbnail))
                const results = await Promise.allSettled(promises)
                const usersWithAvatars = usersData.users.map((user, index) => ({
                        ...user,
                        ava: results[index]?.value || defaultImage
                }))
                setUsers(usersWithAvatars)
                setLoading(false)

                const pointsData = await getPoints()
                setPointsNumber(pointsData.count)
            } catch (error) {
                console.log(error)
            }
        }

        fn()
    }, [])

    return (
        <div className={classNames(className)}>
            <Container>
                <ul>
                    <li className="mb-2">
                        <Card className="bg-gray-50 font-medium text-xs text-gray-500 flex justify-between">
                            <div>Место в рейтинге</div>
                            <div>Пройдено</div>
                        </Card>
                    </li>
                    {
                        loading
                            ? (
                                new Array(5).fill('_').map((_, index) => {
                                    return (
                                        <li className="mb-2 last:mb-0" key={index}>
                                            <CardSkeleton />
                                        </li>
                                    )
                                })
                            )
                            : (
                                users.map((user, index) => {
                                    return (
                                        <li className="mb-2 last:mb-0" key={index}>
                                            <RatingCard 
                                                user={user} 
                                                pointsNumber={pointsNumber} 
                                                index={index + 1} 
                                            />
                                        </li>
                                    )
                                })
                            )
                    }
                </ul>
            </Container>
        </div>
    )
}

export default RatingList