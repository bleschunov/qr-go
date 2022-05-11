import * as yup from 'yup'
import { Formik, Form } from 'formik'
import usePointsService from 'hooks/usePointsService'

import Input from "components/form/Input"
import Button from "components/Button"
import Modal from './Modal'
import SmallTitle from 'components/SmallTitle'
import Divider from 'components/Divider'

const EditModal = ({ handleHideModal, selectedPoint, setLocations }) => {
    const { updatePoint, deletePoint } = usePointsService()

    const handleDeletePoint = async () => {
        try {
            const data = await deletePoint(selectedPoint._id)
            setLocations(prev => prev.filter(point => point._id !== data.points[0]._id))
            handleHideModal()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal className="text-center" hideModal={handleHideModal}>
            <SmallTitle 
                className="mb-12"
                title="Редактирование"
            />
            <Formik
                initialValues={{ 
                    title: selectedPoint.title,
                    lng: selectedPoint.location.lng,
                    lat: selectedPoint.location.lat,
                    code: selectedPoint.code
                }}
                validationSchema={yup.object({
                    title: yup.string().required('Введи название'),
                    lng: yup.string().required('Введи долготу'),
                    lat: yup.string().required('Введи широту'),
                    code: yup.string().required('Введи код'),
                })}
                onSubmit={async (values, actions) => {
                    try {
                        const patch = {
                            title: values.title,
                            location: {
                                lat: values.lat,
                                lng: values.lng
                            },
                            code: values.code
                        }
                        const data = await updatePoint(selectedPoint._id, patch)
                        handleHideModal()
                        setLocations(prev => {
                            const a = prev.filter(point => point._id !== data.points[0]._id)
                            return [ ...a, data.points[0] ]
                        })
                    } catch (error) {
                        console.log(error)
                    } finally {
                        actions.setSubmitting(false)
                    }
                }}
            >
                <Form className="mb-8">
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
            <Divider className="mb-8" />
            <Button 
                className="w-full" 
                hierarchy="error-stroke"
                onClick={handleDeletePoint}
            >
                Удалить
            </Button>
        </Modal>
    )
}

export default EditModal