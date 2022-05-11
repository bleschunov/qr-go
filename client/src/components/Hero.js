import useAuth from "hooks/useAuth"
import classNames from "classnames"

import Avatar from "components/Avatar"

import leaves from 'images/leaves.jpg'
import Container from "./Container"

const Hero = ({ className }) => {
    const { auth } = useAuth()

    return (
        <div className={classNames(className)}>
            <div className="relative h-36 mb-12">
                <img className="h-full w-full object-cover mb-12" src={leaves} alt="обои" />
                <Avatar src={auth.user.ava} className="border-2 border-solid border-white absolute bottom-0 translate-y-1/2 w-24 h-24 ml-6" />
            </div>
            <div className="py-6">
                <Container>
                    <hgroup>
                        <h2 className="text-2xl font-medium">{auth.user.name}</h2>
                        <h3 className="text-lg text-gray-500">@{auth.user.login}</h3>
                    </hgroup>
                </Container>
            </div>
        </div>
    )
}

export default Hero