import { Form, Formik,  } from "formik"
import * as yup from 'yup'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import useImagesService from "hooks/useImagesService"
import useAuth from "hooks/useAuth"
import useAuthService from "hooks/useAuthService"

import Container from "components/Container"
import Icon from "components/Icon"
import Input from "components/form/Input"
import PasswordInput from "components/form/PasswordInput"
import Button from "components/Button"
import GeneralError from "components/form/GeneralError"



const initialValues = {
    login: '',
    password: ''
}

const validationSchema = yup.object({
    login: yup.string().required('Введи логин'),
    password: yup.string().required('Введи пароль')
})

const LoginForm = () => {
    const { setAuth } = useAuth()
    const { login } = useAuthService()
    const { getImage } = useImagesService()
    const navigate = useNavigate()

    const handleSubmit = async (values, actions) => {
        try {
            const data = await login(values.login, values.password)
            
            const accessToken = data.jwt
            const user = data.users[0]

            const ava = await getImage(user.thumbnail)

            setAuth({ user: { ...user, ava }, jwt: accessToken })

            actions.resetForm()
            navigate('/', { replace: true })
        } catch (error) {
            if (error.response.status === 401) {
                actions.setStatus('Неправильный логин или пароль')
            }
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <div className="grid items-center h-full">
            <Container>
                <Icon 
                    className="m-auto block mb-2"
                    name="logo"
                    width="72"
                    height="32" />
                <div className="text-gray-500 text-center mb-8">Привет! Готов к игре?</div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    onSubmit={handleSubmit}
                >
                    <Form className="mb-8">
                        <GeneralError />
                        <Input 
                            name="login"
                            label="Логин"
                            autoComplete="username" />
                        <PasswordInput 
                            name="password"
                            label="Пароль"
                            autoComplete="current-password"/>
                        <Button className="w-full" type="submit">Войти</Button>
                    </Form>
                </Formik>
                <div className="text-center text-gray-500 text-sm">
                    Нет аккаунта?
                    <Link className="text-primary-700" to="/register"> Регистрация</Link>
                </div>
            </Container>
        </div>
    )
}

export default LoginForm