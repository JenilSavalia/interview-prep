import React, { useEffect, useState } from 'react'

const LoocalStorage = () => {
    const [count, setCount] = useState(0);

    const handle = () => {
        setCount(prevCount => {
            const newCount = prevCount + 1;
            localStorage.setItem("count", String(newCount));
            return newCount;
        });

        // You are saving count to localStorage before setCount actually updates the state.
        //  In React, state updates are asynchronous, so you are always storing the old value.

        // const handle = () => { 
        // setCount(count + 1) 
        // localStorage.setItem("count", String(count))
        // }

        // above commented is not correct way to update a state

    }

    useEffect(() => {
        let x = localStorage.getItem("count")
        setCount(Number(x));
    }, [])

    return (
        <div>LoocalStorage
            {count}
            <button onClick={() => handle()}>Add</button>
        </div>
    )
}

export default LoocalStorage