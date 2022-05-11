import { useFormikContext } from "formik"
import { useDebounce } from "use-debounce"
import useAuthService from "hooks/useAuthService"
import { useEffect } from "react"

const IsLoginAvailable = () => {
    const formik = useFormikContext()
    const [possibleLogin] = useDebounce(formik.values.login, 1000)
    const { checkLogin } = useAuthService()

    useEffect(() => {
        const fn = async () => {
            const isLoginAvailable = await checkLogin(possibleLogin)
            if ( !isLoginAvailable ) {
                formik.setFieldError('login', 'Логин уже занят')
            }
        }

        possibleLogin && fn()
    }, [possibleLogin]) 
}

export default IsLoginAvailable