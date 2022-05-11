import { AnimatePresence } from 'framer-motion'
import { Outlet } from 'react-router-dom'

import Container from "components/Container"
import Icon from "components/Icon"
import Sidebar from "./Sidebar"

import useModal from "hooks/useModal"

const Header = () => {
    const { showModal, hideModal, showing } = useModal()

    return (
        <>
        <header className="bg-gray-25 py-6">
            <Container>
                <div className="flex justify-between items-center">
                    <Icon
                        name="logo"
                        width="48"
                        height="24"
                    />
                    <Icon
                        onClick={showModal}
                        name="burger"
                        width="18"
                        height="12"
                    />
                </div>
            </Container>
            <AnimatePresence>
                { showing && <Sidebar hideSidebar={hideModal} /> }
            </AnimatePresence>
        </header>
        <main>
            <Outlet />
        </main>
        </>
    )
}

export default Header