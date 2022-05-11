import classNames from "classnames"

const Container = ({ className, children }) => {
    return (
        <div className={`${classNames(className)} px-4`}>
            {children}
        </div>
    )
}

export default Container