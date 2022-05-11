import classNames from "classnames"
import useUsersService from "hooks/useUsersService"
import { useEffect, useState } from "react"
import useAuth from "hooks/useAuth"
import { Link } from "react-router-dom"

import Container from "components/Container"
import CardSkeleton from "components/card/CardSkeleton"
import SmallTitle from "components/SmallTitle"
import Card from "components/card/Card"
import Avatar from "components/Avatar"

const Place = ({ className }) => {
    const { auth } = useAuth()
    const { getUsers } = useUsersService()
    const [loading, setLoading] = useState(true)
    const [place, setPlace] = useState(null)

    useEffect(() => {
        const fn = async () => {
            try {
                const data = await getUsers()
                data.users.sort((a, b) => b.completedPoints.length - a.completedPoints.length)

                setLoading(false)
                setPlace(data.users.findIndex(item => item._id === auth.user._id) + 1)
            } catch (error) {
                console.log(error)
            }
        }

        fn()
    }, [])

    return (
        <div className={classNames(className)}>
            <Container>
                <SmallTitle className="mb-8" title="Твоё место в рейтинге" />
                {
                    loading
                        ? <CardSkeleton />
                        : (
                            <Link to="/rating">
                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <div className="flex items-center mb-6">
                                        <div className="text-gray-400 text-xl mr-3">#{place}</div>
                                        <Avatar 
                                            className="mr-3"
                                            src={auth.user.ava}
                                            width="40"
                                            height="40"
                                        />
                                        <div>
                                            <div className="text-sm font-medium">{auth.user.name}</div>
                                            <div className="text-sm text-gray-500">@{auth.user.login}</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-300 text-center">Нажми на карточку, чтобы посмотреть весь рейтинг</div>
                                </Card>
                            </Link>
                        )
                }
            </Container>
        </div>
    )
}

export default Place