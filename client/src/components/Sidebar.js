import { motion } from 'framer-motion'
import classNames from 'classnames'
import useAuth from 'hooks/useAuth'

import Icon from "./Icon"
import Container from "./Container"
import Avatar from "./Avatar"
import { NavLink } from 'react-router-dom'

const Sidebar = ({ hideSidebar }) => {
    const { auth } = useAuth()

    const handleSidebarClick = event => {
        if (event.target.dataset.layout) {
            hideSidebar()
        }
    }

    const CustomLink = ({ to, children, ...props }) => {
        return (
            <NavLink 
                className={({ isActive }) => classNames({ 'text-primary-600': isActive })} 
                to={to}
                onClick={hideSidebar}
                {...props}
            >
                {children}
            </NavLink>
        )
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
            onClick={handleSidebarClick}
            data-layout>
            <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: '0' }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                className="absolute right-0 top-0 bottom-0 w-3/5 bg-white border-gray-100 border-l border-solid text-right">
                <Container>
                    <Icon 
                        className="mb-4"
                        name="logo"
                        width="54"
                        height="24"
                    />
                    <Avatar 
                        className="ml-auto mb-4"
                        src={auth.user.ava}
                        width="40"
                        height="40"
                    />
                    <ul className="mb-6 text-xs">
                        <li className="mb-2">
                            <CustomLink to="/">Локации</CustomLink>
                        </li>
                        <li className="mb-2">
                            <CustomLink to="/rating">Рейтинг</CustomLink>
                        </li>
                        {/* <li className="mb-2">
                            <CustomLink to="/advantages">Достижения</CustomLink>
                        </li> */}
                        <li>
                            <CustomLink to="/settings">Настройки</CustomLink>
                        </li>
                    </ul>
                    <ul className="text-xs">
                        <li className={ classNames({ 'hidden': auth.user.access !== 'admin' }) }>
                            <CustomLink to="/edit">Редактирование локаций</CustomLink>
                        </li>
                    </ul>
                    <a className="absolute bottom-4 right-4 text-xs text-gray-400" href="http://bleschunov.ru">Created by bleschunov</a>
                </Container>
            </motion.div>
        </motion.div>
    ) 

}

export default Sidebar