import useAxios from "./useAxios"

const useImagesService = () => {
    const axios = useAxios()

    const getImage = async (image) => {
        try {
            const response = await axios.get(`/images/${image}`, { responseType: 'blob' })
            return URL.createObjectURL(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        try {
            const response = await axios.post('/images', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    return { getImage, uploadImage }
}

export default useImagesService