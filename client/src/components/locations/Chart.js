import useAuth from "hooks/useAuth"
import { useEffect, useState } from "react"
import classNames from "classnames"

import Container from "components/Container"

const Chart = ({ className, locationsCount }) => {
    const { auth } = useAuth()
    const [dasharray, setDasharray] = useState(null)
    const [dashoffset, setDashoffset] = useState(0)
    const r = 64

    useEffect(() => {
        if (locationsCount) {
            const c = 2 * r * Math.PI
            setDasharray(c)
            
            const p = auth.user?.completedPoints.length / locationsCount
            setDashoffset(c - c * p)
        }
    }, [auth, locationsCount])

    return (
        <div className={classNames(className)}>
            <Container>
                <div className="relative">
                    <svg 
                        className="block mx-auto -rotate-90"
                        width="160" 
                        height="160" 
                        viewport="0 0 100 100" 
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle 
                            className="text-primary-50"
                            r={r} 
                            cx="80" 
                            cy="80" 
                            fill="transparent" 
                            stroke="currentColor" 
                            strokeWidth="16" 
                        >
                        </circle>
                        <circle 
                            className="text-primary-600 transition-all"
                            r={r} 
                            cx="80" 
                            cy="80" 
                            fill="transparent" 
                            stroke="currentColor" 
                            strokeWidth="16" 
                            strokeLinecap="round"
                            strokeDasharray={dasharray}
                            strokeDashoffset={dashoffset}
                        >
                        </circle>
                        
                    </svg>
                    <div className="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="text-gray-500 text-xs">Пройдено</div>
                        <div className="text-2xl">{auth.user.completedPoints.length}/{locationsCount}</div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Chart