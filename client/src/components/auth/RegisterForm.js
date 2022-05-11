import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import useAuthService from 'hooks/useAuthService'
import useImagesService from 'hooks/useImagesService'
import { useNavigate } from 'react-router-dom'

import Container from 'components/Container'
import Input from "components/form/Input"
import PasswordInput from 'components/form/PasswordInput'
import Button from 'components/Button'
import Icon from 'components/Icon'
import IsLoginAvailable from 'components/form/IsLoginAvailable'


const initialValues = {
    name: '',
    login: '',
    password: '',
    passwordConfirmation: ''
}

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Имя не должно быть меньше 3-х символов')
        .max(20, 'Имя не должно быть больше 20-х символов')
        .required('Введи имя'),
    login: yup
        .string()
        .min(3, 'Логин не должен быть меньше 3-х символов')
        .max(30, 'Логин не должнен быть больше 30-х символов')
        .required('Введи логин'),
    password: yup
        .string()
        .min(3, 'Пароль не должен быть меньше 3-х символов')
        .max(60, 'Пароль не должнен быть больше 60-х символов')
        .required('Введи пароль'),
    passwordConfirmation: yup
        .string()
        .oneOf([ yup.ref('password'), null ], 'Пароли не совпадают')
})

const RegisterForm = () => {
    const { setAuth } = useAuth()
    const { register } = useAuthService()
    const { getImage } = useImagesService()
    const navigate = useNavigate()

    
    const handleSubmit = async (values, actions) => {    
        const newUser = [
            values.name,
            values.login,
            values.password
        ]
    
        try {
            const data = await register(...newUser)

            const accessToken = data.jwt
            const user = data.users[0]

            const ava = await getImage(user.thumbnail)

            setAuth({ user: { ...user, ava }, jwt: accessToken })

            actions.resetForm()
            navigate('/', { replace: true })
        } catch (error) {
            console.log(error)
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
                <div className="text-gray-500 text-center mb-8">Присоединяйся</div>

                <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnBlur={false}
                    onSubmit={handleSubmit}
                >
                    <Form className="mb-8">
                        <Input 
                            className="mb-6" 
                            name="name" 
                            label="Имя"
                            autoComplete="given-name"
                        />  
                        <Input 
                            className="mb-6" 
                            name="login" 
                            label="Логин"
                            autoComplete="username"
                        />
                        <IsLoginAvailable />
                        <PasswordInput 
                            className="mb-6" 
                            name="password" 
                            label="Пароль"
                            autoComplete="new-password"
                        />
                        <PasswordInput 
                            className="mb-8" 
                            name="passwordConfirmation" 
                            label="Пароль ещё раз"
                            autoComplete="off"
                        />
                        <Button className="w-full" type="submit">Зарегистрироваться</Button>
                    </Form>
                </Formik>
                <div className="text-center text-gray-500 text-sm">
                    Уже есть аккаунт?
                    <Link className="text-primary-700" to="../login"> Войти</Link>
                </div>
            </Container>
        </div>
    )
}

export default RegisterForm