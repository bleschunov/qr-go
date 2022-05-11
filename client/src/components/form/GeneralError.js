import { useFormikContext } from "formik"
import { motion, AnimatePresence } from "framer-motion"

const GeneralError = () => {
    const formik = useFormikContext()

    if ( !formik.status ) return null

    return (
        <AnimatePresence>
            <motion.div
                className="text-sm text-white bg-error-300 px-2 py-3 rounded-lg mb-8"
                initial={{ opacity: 0, y: '-10px' }}
                animate={{ opacity: 1, y: '0px' }}
                exit={{ opacity: 0, y: '-10px'}}
            >
                {formik.status}
            </motion.div>
        </AnimatePresence>
    )
}

export default GeneralError