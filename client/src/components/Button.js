import classNames from "classnames"

const Button = ({ className, children, hierarchy = 'default', disabled = false, ...props }) => {

    const styleClasses = classNames({
        'bg-primary-600 text-white hover:ring-4 ring-primary-100 disabled:bg-primary-200 disabled:text-white disabled:ring-0': hierarchy === 'default',
        'bg-error-50 text-error-700 hover:ring-4 ring-error-25': hierarchy === 'error-fill',
        'bg-white text-error-700 border border-solid hover:bg-error-700 hover:text-white border-error-300': hierarchy === 'error-stroke'
    }, {
        'hover:ring-4': hierarchy === 'default' && !disabled,
        'hover:ring-4': hierarchy === 'error-fill' && !disabled,
        'hover:bg-error-700 hover:text-white': hierarchy === 'error-stroke' && !disabled
    })

    return (
        <button 
            className={`${className} cursor-pointer text-center ${styleClasses} transition-all rounded-lg text-sm font-medium py-2 px-4 disabled:cursor-not-allowed`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button