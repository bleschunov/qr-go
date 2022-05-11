import classNames from 'classnames'
import { useField } from 'formik'
import { useState } from 'react'

import Icon from 'components/Icon'

const Input = ({ className, label, ...props }) => {
    const [{onBlur, ...field}, meta] = useField({ ...props})
    const [focus, setFocus] = useState(false)

    const customBlurHandler = event => {
        setFocus(false)
        onBlur(event)
    } 

    const handleFocus = () => setFocus(true)

    const showError = meta.touched && meta.error && !focus

    const borderColor = classNames({
        'border-error-300': showError,
        'border-gray-100': !showError
    })

    return (
        <div className={`${className} mb-8`}>
            <label className='block text-sm font-medium mb-2' htmlFor={props.name}>{label}</label>
            <div className={`flex items-center bg-white border-solid border ${borderColor} rounded-lg pr-3  mb-2`}>
                <input 
                    className="grow py-3 pl-3"
                    type="text"
                    {...field} 
                    onFocus={handleFocus}
                    onBlur={customBlurHandler} 
                    {...props} 
                />
                {
                    showError && 
                    <Icon 
                        className="text-error-500"
                        name="error"
                        width="16" 
                        height="16"
                    />
                }
            </div>
            { showError && <div className="text-error-500">{meta.error}</div> }
        </div>
    )
}

export default Input