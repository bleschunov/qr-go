import * as yup from 'yup'
import { Formik, Form } from 'formik'
import usePointsService from 'hooks/usePointsService'

import Input from "components/form/Input"
import Button from "components/Button"
import Modal from './Modal'
import SmallTitle from 'components/SmallTitle'

const CreateModal = ({ handleHideModal, setLocations }) => {
    const { createPoint } = usePointsService()

    return (
        <Modal className="text-center" hideModal={handleHideModal}>
            <SmallTitle 
                className="mb-12"
                title="Создание"
            />
            <Formik
                initialValues={{ 
                    title: '',
                    lng: '',
                    lat: '',
                    code: ''
                }}
                validationSchema={yup.object({
                    title: yup.string().required('Введи название'),
                    lng: yup.string().required('Введи долготу'),
                    lat: yup.string().required('Введи широту'),
                    code: yup.string().required('Введи код'),
                })}
                onSubmit={async (values, actions) => {
                    try {
                        const point = {
                            title: values.title,
                            location: {
                                lat: values.lat,
                                lng: values.lng
                            },
                            code: values.code
                        }
                        const data = await createPoint(point)
                        handleHideModal()
                        setLocations(prev => [ ...prev, data.points[0] ])
                    } catch (error) {
                        console.log(error)
                    } finally {
                        actions.setSubmitting(false)
                    }
                }}
            >
                <Form>
                    <Input
                        label="Название"
                        name="title"
                    />
                    <Input     
                        label="Долгота"
                        name="lng"
                    />
                    <Input  
                        label="Широта"
                        name="lat"
                    />
                    <Input
                        label="Код"
                        name="code"
                    />
                    <Button className="w-full" type="submit">Редактировать</Button>
                </Form>
            </Formik>
        </Modal>
    )
}

export default CreateModal