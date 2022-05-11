import sprite from 'images/sprite.svg'

import classNames from 'classnames'

const Icon = ({ name, className, width='32', height='32', ...props }) => {
    const classes = classNames('icon', className)

    const style = { width: `${width}px`, height: `${height}px` }

    return (
        <svg className={classes} style={style} {...props}>
            <use href={`${sprite}#${name}`}></use>
        </svg>
    )
}

export default Icon