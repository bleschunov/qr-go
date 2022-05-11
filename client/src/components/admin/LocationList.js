import { useState, useEffect } from "react"
import useModal from "hooks/useModal"
import classNames from "classnames"
import { AnimatePresence } from "framer-motion"
import usePointsService from "hooks/usePointsService"

import Container from "components/Container"
import CardSkeleton from "components/card/CardSkeleton"
import LocationCard from "components/locations/LocationCard"
import Card from "components/card/Card"
import Icon from "components/Icon"
import EditModal from "components/modals/EditModal"
import CreateModal from "components/modals/CreateModal"

const LocationList = ({ className }) => {
    const [locations, setLocations] = useState(null)
    const [loading, setLoading] = useState(true)
    const editModal = useModal()
    const createModal = useModal()
    const [selectedPoint, setSelectedPoint] = useState(null)
    const { getPoints } = usePointsService()


    const handlePointClick = event => {
        setSelectedPoint(locations[event.currentTarget.dataset.pointindex])
    }

    const handleHideModal = () => {
        setSelectedPoint(null)
        editModal.hideModal()
        createModal.hideModal()
    }

    useEffect(() => {
        const fn = async () => {
            try {
                const data = await getPoints()
                setLocations(data.points)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fn()
    }, [])

    useEffect(() => {
        selectedPoint && editModal.showModal()
    }, [selectedPoint])

    return (
        <div className={classNames(className)}>
            <Container>
                <ul>
                    <li>
                        <Card 
                            className="group cursor-pointer hover:ring-4 ring-primary-100 transition-shadow mb-8"
                            onClick={createModal.showModal}
                        >
                            <div className="relative w-12 h-12 mx-auto mb-2 flex">
                                <div className="absolute rounded-full bg-gray-50 w-full h-full group-hover:animate-ping"></div>
                                <div className="absolute rounded-full bg-gray-50 w-full h-full"></div>
                                <div className="absolute rounded-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gray-100 w-9 h-9"></div>
                                <Icon 
                                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-gray-600" 
                                    name="plus"
                                    width="20" 
                                    height="20" 
                                />
                            </div>
                            <div className="text-sm text-gray-500 text-center">Нажми для добавления локации</div>
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
                                locations.map((point, index) => {
                                    return (
                                        <li 
                                            className="mb-8 last:mb-0" 
                                            key={index} 
                                            
                                        >
                                            <LocationCard
                                                className="hover:shadow-md transition-shadow cursor-pointer"
                                                tip="Для редактирования или удаления нажми на карточку" 
                                                point={point} 
                                                data-pointindex={index} 
                                                onClick={handlePointClick} 
                                            />
                                        </li>
                                    )
                                })
                            )
                        
                    }
                </ul>
            </Container>
            <AnimatePresence>
                {
                    editModal.showing && (
                            <EditModal
                                handleHideModal={handleHideModal}
                                setLocations={setLocations}
                                selectedPoint={selectedPoint} 
                            />
                        )
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    createModal.showing && (
                            <CreateModal
                                handleHideModal={handleHideModal}
                                setLocations={setLocations}
                            />
                        )
                }
            </AnimatePresence>
        </div>
    )
}

export default LocationList