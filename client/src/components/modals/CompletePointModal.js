import { Formik, Form } from "formik"
import * as yup from 'yup'
import useAuth from "hooks/useAuth"
import usePointsService from "hooks/usePointsService"

import Input from "components/form/Input"
import Button from "components/Button"
import SmallTitle from "components/SmallTitle"
import Modal from "./Modal"

const CompletePointModal = ({ selectedPoint, handleHideModal }) => {
    const { setAuth } = useAuth()
    const { completePoint } = usePointsService()

    return (
        <Modal className="text-center" hideModal={handleHideModal}>
            <SmallTitle 
                title={selectedPoint.title} 
                subtitle={`Широта: ${selectedPoint.location.lat} / Долгота: ${selectedPoint.location.lng}`}
            />
            <Formik
                initialValues={{ code: '' }}
                validationSchema={yup.object({
                    code: yup.string().required('Введи код')
                })}
                onSubmit={async (values, actions) => {
                    try {
                        const data = await completePoint(values.code, selectedPoint._id)
                        handleHideModal()
                        setAuth(prev => ({ ...prev, user: { ...prev.user, ...data.users[0] } }))
                    } catch (error) {
                        if (error.response.status === 404) {
                            actions.setFieldError('code', 'Неправильный код')
                        }
                    } finally {
                        actions.setSubmitting(false)
                    }
                }}
            >
                <Form>
                    <Input
                        name="code"
                    />
                    <Button className="w-full">Пройти локацию</Button>
                </Form>
            </Formik>
        </Modal>
    )
}

export default CompletePointModal