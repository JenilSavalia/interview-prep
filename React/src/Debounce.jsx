import React from 'react'

const Debounce = () => {

    //Debouncing bacically it ensures function is triggered  only after certain amount of time since last it was invoked

    function DebounceFunction(fnct, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fnct(...args);
            }, delay)
        }
    }

    const fetchSearchResults = (val) => {
        console.log(val)
    }
    const debounceInput = DebounceFunction(fetchSearchResults, 300)

    return (
        <input type="text" onChange={e => debounceInput(e.target.value)} />
    )
}

export default Debounce