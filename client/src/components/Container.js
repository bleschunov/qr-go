import classNames from "classnames"

const Container = ({ className, children }) => {
    return (
        <div className={`${classNames(className)} px-4 max-w-md w-full mx-auto`}>
            {children}
        </div>
    )
}

export default Container