import classNames from "classnames"
import { AnimatePresence } from "framer-motion"
import useModal from "hooks/useModal"
import usePointsService from "hooks/usePointsService"
import useAuth from "hooks/useAuth"

import Container from "components/Container"
import Icon from "components/Icon"
import Modal from "components/modals/Modal"
import QrReader from "components/QrReader"
import { useEffect, useState } from "react"

const Qr = ({ className }) => {
    const { showModal, hideModal, showing } = useModal()
    const [qrReaderLoading, setQrReaderLoading] = useState(true)
    const [code, setCode] = useState(null)
    const { completePoint } = usePointsService()
    const { setAuth } = useAuth()

    const handleHideModal = () => {
        if (!qrReaderLoading) hideModal()
    }

    useEffect(() => {
        const fn = async () => {
            if (code) {
                try {
                    const data = await completePoint(code.data)
                    setAuth(prev => ({ ...prev, user: data.users[0] }))
                } catch (error) {
                    console.log(error)
                }
            }
        }

        fn()
    }, [code])

    return (
        <div className={classNames(className)}>
            <Container>
                <div 
                    className="flex justify-center items-center gap-3 border border-solid border-gray-100 bg-white py-2 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={showModal}
                >
                    <Icon 
                        className="text-gray-900"
                        name="qr"
                        width="24"
                        height="24"
                    />
                    <div className="text-gray-700 font-medium">Сканировать</div>
                </div>
            </Container>
            <AnimatePresence>
                {
                    showing && (
                        <Modal hideModal={handleHideModal}>
                            <QrReader 
                                hideModal={hideModal}
                                qrReaderLoading={qrReaderLoading} 
                                setQrReaderLoading={setQrReaderLoading}
                                setCode={setCode} 
                            />
                        </Modal>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default Qr