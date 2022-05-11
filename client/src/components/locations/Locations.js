import { useEffect, useState } from "react"
import classNames from "classnames"
import useModal from "hooks/useModal"
import { AnimatePresence } from "framer-motion"

import LocationCard from "./LocationCard"
import Container from "components/Container"
import CardSkeleton from "components/card/CardSkeleton"
import SmallTitle from "components/SmallTitle"
import CompletePointModal from "components/modals/CompletePointModal"


const Locations = ({ className, locations }) => {
    const [loading, setLoading] = useState(true)
    const { showModal, hideModal, showing } = useModal()
    const [selectedPoint, setSelectedPoint] = useState(null)


    const handlePointClick = event => {
        setSelectedPoint(locations.notPassedLocations[event.currentTarget.dataset.pointindex])
    }

    const handleHideModal = () => {
        setSelectedPoint(null)
        hideModal()
    }

    useEffect(() => {
        if (locations) {
            setLoading(false)
        }
    }, [locations])

    useEffect(() => {
        selectedPoint && showModal()
    }, [selectedPoint])

    const createSkeletons = (count) => {
        return (
            new Array(count).fill('_').map((_, index) => {
                return (
                    <li className="mb-2 last:mb-0" key={index}>
                        <CardSkeleton />
                    </li>
                )
            })
        )
    }

    return (
       <div className={classNames(className)}>
           <Container>
                <ul className="mb-8">
                    {
                        loading ? createSkeletons(5) : (
                            locations.notPassedLocations.map((point, index) => {
                                return (
                                    <li 
                                        className="mb-8 last:mb-0" 
                                        key={index} 
                                        
                                    >
                                        <LocationCard
                                            className="hover:shadow-md transition-shadow cursor-pointer"
                                            tip="Нажмите на карточку, чтобы ввести код вручную" 
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
                <SmallTitle className="mb-8" title="Пройденные" />
                <ul>
                    {
                        loading ? createSkeletons(3) : (
                            locations.passedLocations.map((point, index) => {
                                return (
                                    <li 
                                        className="mb-8 last:mb-0" 
                                        key={index} 
                                        
                                    >
                                        <LocationCard 
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
                showing && (
                        <CompletePointModal 
                            selectedPoint={selectedPoint}
                            handleHideModal={handleHideModal}
                        />
                    )
            }
        </AnimatePresence>
       </div>
    )
}

export default Locations 