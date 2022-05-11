import { useState, useEffect } from 'react'
import usePointsService from 'hooks/usePointsService'
import useAuth from 'hooks/useAuth'

import Locations from 'components/locations/Locations'
import Qr from 'components/locations/Qr'
import Title from 'components/Title'
import Chart from 'components/locations/Chart'
import Place from 'components/locations/Place'

const Main = () => {
    const [locations, setLocations] = useState(null)
    const [locationsCount, setLocationsCount] = useState(null)
    const { auth } = useAuth()
    const { getPoints } = usePointsService()

    useEffect(() => {
        const fn = async () => {
            try {
                const data = await getPoints()
                const passedLocations = data.points.filter(point => {
                    return auth.user.completedPoints.find(item => item === point._id)
                })
                const notPassedLocations = data.points.filter(point => {
                    return !auth.user.completedPoints.find(item => item === point._id)
                })
                setLocations({ passedLocations, notPassedLocations })
                setLocationsCount(data.points.length)
            } catch (error) {
                console.log(error)
            }
        }

        fn()
    }, [auth])

    return (
        <div className="pb-6">
            <Title 
                className="mb-8"
                title="Статистика" 
                subtitle="Оцени свои успехи" 
            />
            <Chart className="mb-8" locationsCount={locationsCount} />
            <Place className="mb-6" />
            <Title 
                className="mb-8"
                title="Локации" 
                subtitle="Сможешь пройти все?" 
            />
            <Qr className="mb-8" />
            <Locations locations={locations} />
        </div>
    )
}

export default Main