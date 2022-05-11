import classNames from 'classnames'

const Avatar = ({ src, className, width="100", height="100" }) => {
    const style = {
        width: `${width}px`,
        height: `${height}px`
    }

    return (
        <div style={style} className={`rounded-full ${ classNames(className) }`}>
            <img src={src} alt="аватар" className="rounded-full w-full h-full object-cover" />
        </div>
    )
}

export default Avatar