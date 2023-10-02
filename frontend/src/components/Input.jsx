import React from 'react'

function Input({label,type,name,placeholder, text, onChange}) {
    return (
        <div><label htmlFor={name}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                id={name}
                onChange={onChange}
            /> <span>{text}</span>
        </div>
    )
}

export default Input
