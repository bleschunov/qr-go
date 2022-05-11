import useAuthService from "hooks/useAuthService"
import useUsersService from "hooks/useUsersService"
import classNames from "classnames"
import { useNavigate } from "react-router-dom"

import Button from "components/Button"
import Container from "components/Container"

const BadButtons = ({ className }) => {
    const { deleteUser } = useUsersService()
    const { logout } = useAuthService()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            navigate('/login')
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteUser = async () => {
        try {
            navigate('/login')
            await deleteUser()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classNames(className)}>
            <Container>
                <Button 
                    className="w-full mb-6" 
                    hierarchy="error-fill"
                    onClick={handleLogout}>Выйти</Button>
                <Button 
                    className="w-full" 
                    hierarchy="error-stroke"
                    onClick={handleDeleteUser}
                >
                    Удалить аккаунт
                </Button>
            </Container>
        </div>
    )
}

export default BadButtons