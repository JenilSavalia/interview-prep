import React from 'react'

const Button = ({ value, handlerFunction }) => {
    return (
        <button onClick={() => handlerFunction(value)}>
            {value}
        </button>
    )
}

export default Button