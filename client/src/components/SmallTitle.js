import classNames from "classnames"

const SmallTitle = ({ className, title, subtitle }) => {
    return (
        <div className={classNames(className)}>
            <hgroup>
                { title && <h5 className="text-lg font-semibold mb-3">{title}</h5> }
                { subtitle && <h6 className="text-sm text-gray-500">{subtitle}</h6> }
            </hgroup>
        </div>
    )
}

export default SmallTitle