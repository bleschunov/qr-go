import useAxios from "./useAxios"

const useUsersService = () => {
    const axios = useAxios()
    
    const getUsers = async (params) => {
        try {
            const response = await axios.get('users', params)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (patch) => {
        try {
            const response = await axios.patch(`users`, patch)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`users`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const changePassword = async (oldPassword, newPassword) => {
        try {
            await axios.patch(
                'users/changepassword', 
                { oldPassword, newPassword }, 
                { retry: true}
            )
            return true
        } catch (error) {
            if (error.response) {
                throw error
            } else {
                console.log(error)
            }
        }
    }

    return { 
        getUsers,
        updateUser,
        changePassword,
        deleteUser
    }
}

export default useUsersService