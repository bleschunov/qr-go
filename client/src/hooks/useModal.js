import { useState } from 'react'

const useModal = () => {
    const [showing, setShowing] = useState(false)

    const showModal = () => setShowing(true)
    const hideModal = () => setShowing(false)
    const toggleModal = () => setShowing(!showing)

    return {
        showing,
        showModal,
        hideModal,
        toggleModal
    }
}

export default useModal