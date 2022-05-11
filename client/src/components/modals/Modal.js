import { motion } from "framer-motion"

import Icon from "../Icon"

const Modal = ({ children, hideModal }) => {

    const handleModalClick = event => {
        if (event.target.dataset.layout) {
            hideModal()
        }
    }

    return (
        <motion.div 
            initial={ 'bgTransparent' }
            animate={ 'bgBlur' }
            exit={ 'bgTransparent' }
            variants={{
                bgBlur: { backgroundColor: 'rgb(127 86 217 / 0.3)', backdropFilter: 'blur(8px)' },
                bgTransparent: { backgroundColor: 'rgb(127 86 217 / 0)', backdropFilter: 'blur(0px)' }
            }}
            className="fixed top-0 h-full w-full backdrop-blur z-50" 
            onClick={handleModalClick}
            data-layout>
            <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: '0' }}
                exit={{ y: '100%' }}
                transition={{ type: 'tween' }}
                className="absolute left-0 right-0 bottom-0 bg-white border border-gray-100 border-solid rounded-tl-2xl rounded-tr-2xl">
                <div className="p-6">
                    <Icon 
                        className="cursor-pointer text-gray-900 block ml-auto mb-4"
                        name="exit"
                        width="12"
                        height="12"
                        onClick={hideModal}
                    />
                    {children}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Modal