import classNames from "classnames"

const Card = ({ className, children, ...props }) => {
    return (
        <div 
            className={`${ classNames(className) } border border-solid border-gray-100 bg-white p-6 rounded-2xl`} 
            {...props} 
        >
            {children}
        </div>
    )
}

export default Card