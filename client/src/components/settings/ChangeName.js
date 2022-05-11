import classNames from "classnames"
import { Form, Formik } from "formik"
import useUsersService from "hooks/useUsersService"
import * as yup from 'yup'

import Button from "components/Button"
import Container from "components/Container"
import Input from "components/form/Input"
import SmallTitle from "components/SmallTitle"
import useAuth from "hooks/useAuth"

const initialValues = {
    name: ''
}

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Имя не должно быть меньше 3-х символов')
        .max(20, 'Имя не должно быть больше 20-х символов')
        .required('Введи имя'),
})

const ChangeName = ({ className }) => {
    const { updateUser } = useUsersService()
    const { setAuth } = useAuth()

    const handleSubmit = async (values, actions) => {
        try {   
            const data = await updateUser({ name: values.name })
            setAuth(prev => ({ ...prev, user: { ...prev.user, name: data.users[0].name } }))
        } catch (error) {
            console.log(error)
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <div className={classNames(className)}>
            <Container>
                <SmallTitle className="mb-5" title="Имя" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Input
                            label="Новое имя"
                            name="name"
                        />
                        <Button className="w-full">Поменять имя</Button>
                    </Form>
                </Formik>
            </Container>
        </div>
    )
}  

export default ChangeName