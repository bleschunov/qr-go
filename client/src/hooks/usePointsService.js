import useAxios from "./useAxios"

const usePointsService = () => {
    const axios = useAxios()

    const getPoints = async () => {
        try {
            const res = await axios.get('/points')
            return res.data
        } catch (error) {
            if (error.response) {
                throw error
            } else {
                console.log(error)
            }
        }
    }

    const createPoint = async (point) => {
        try {
            const res = await axios.post('/points', point)
            return res.data
        } catch (error) {
            if (error.response) {
                throw error
            } else {
                console.log(error)
            }
        }
    }

    const updatePoint = async (pointId, patch) => {
        try {
            const res = await axios.patch(`/points/${pointId}`, patch)
            return res.data
        } catch (error) {
            if (error.response) {
                throw error
            } else {
                console.log(error)
            }
        }
    }

    const deletePoint = async (pointId) => {
        try {
            const res = await axios.delete(`/points/${pointId}`)
            return res.data
        } catch (error) {
            if (error.response) {
                throw error
            } else {
                console.log(error)
            }
        }
    }

    const completePoint = async (code, pointId = null) => {
        try {
            const res = await axios.patch('/points/complete', { code, pointId })
            return res.data
        } catch (error) {
            if (error.response) {
                throw error
            } else {
                console.log(error)
            }
        }
    }

    return { 
        getPoints,
        updatePoint,
        completePoint,
        createPoint,
        deletePoint
    }
}

export default usePointsService