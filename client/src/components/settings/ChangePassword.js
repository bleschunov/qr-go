import classNames from "classnames"
import { Form, Formik } from "formik"
import * as yup from 'yup'
import useUsersService from "hooks/useUsersService"

import SmallTitle from "components/SmallTitle"
import PasswordInput from "components/form/PasswordInput"
import Button from "components/Button"
import Container from "components/Container"
import GeneralError from "components/form/GeneralError"

const initialValues = {
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: ''
}

const validationSchema = yup.object({
    oldPassword: yup
        .string()
        .required('Введи старый пароль'),
    newPassword: yup
        .string()
        .min(3, 'Пароль не должен быть меньше 3-х символов')
        .max(60, 'Пароль не должнен быть больше 60-х символов')
        .required('Введи пароль'),
    passwordConfirmation: yup
        .string()
        .oneOf([ yup.ref('newPassword'), null ], 'Пароли не совпадают')
})



const ChangePassword = ({ className }) => {
    const { changePassword } = useUsersService()

    const handleSubmit = async (values, actions) => {
        try {
            await changePassword(values.oldPassword, values.newPassword)
            actions.resetForm()
            actions.setSubmitting(false)
        } catch (error) {
            if (error.response.status === 401) {
                actions.setStatus('Неправильный логин или пароль')
            }
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <div className={classNames(className)}>
            <Container>
                <SmallTitle className="mb-5" title="Пароль" />
                <Formik
                   initialValues={initialValues} 
                   validationSchema={validationSchema}
                   onSubmit={handleSubmit}
                >
                    <Form>
                        <GeneralError />
                        <PasswordInput
                            label="Старый пароль"
                            name="oldPassword" />
                        <PasswordInput
                            label="Новый пароль"
                            name="newPassword" />
                        <PasswordInput
                            label="Повтори пароль"
                            name="passwordConfirmation" />
                        <Button className="w-full" type="submit">Поменять пароль</Button>
                    </Form>
                </Formik>
            </Container>
        </div>
    )
}

export default ChangePassword