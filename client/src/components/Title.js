import classNames from "classnames"

import Container from "./Container"

const Title = ({ title, subtitle, className }) => {
    return (
        <div className={classNames(className)}>
            <Container>
                <hgroup>
                    { title && <h3 className="text-xl font-semibold mb-1">{title}</h3> }
                    { subtitle && <h4 className="text-gray-400">{subtitle}</h4> }
                </hgroup>
            </Container>
        </div>
    )
}

export default Title