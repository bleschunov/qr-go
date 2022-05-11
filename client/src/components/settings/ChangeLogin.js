import Button from "components/Button"
import Container from "components/Container"
import Input from "components/form/Input"
import IsLoginAvailable from "components/form/IsLoginAvailable"
import { Form, Formik } from "formik"
import * as yup from 'yup'
import useUsersService from "hooks/useUsersService"
import useAuth from "hooks/useAuth"
import classNames from "classnames"

import SmallTitle from "components/SmallTitle"



const initialValues = {
    login: ''
}

const validationSchema = yup.object({
    login: yup
        .string()
        .min(3, 'Логин не должен быть меньше 3-х символов')
        .max(30, 'Логин не должнен быть больше 30-х символов')
        .required('Введи логин')
})

const ChangeLogin = ({ className }) => {
    const { updateUser } = useUsersService()
    const { setAuth } = useAuth()

    const handleSubmit = async (values, actions) => {
        try {
            const data = await updateUser({ login: values.login })
            console.log(data)
            setAuth(prev => ({ ...prev, user: data.users[0] }))
            actions.resetForm()
        } catch (error) {
            console.log(error)
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <div className={classNames(className)}>
            <Container>
                <SmallTitle className="mb-5" title="Логин" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Input
                            label="Новый логин"
                            name="login"
                        />
                        <IsLoginAvailable />
                        <Button className="w-full" type="submit">Обновить логин</Button>
                    </Form>
                </Formik>
            </Container>
        </div>
    )
}

export default ChangeLogin