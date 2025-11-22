import React, { useState } from 'react'

const Toggle = () => {

    const [currentToggle, setCurrentToggle] = useState([1]);

    const ToggleBars = [
        { id: 1, name: "desc 1", description: "jfbdjfbjsbjhfbsjdbfjb" },
        { id: 2, name: "desc 1", description: "jfbdjfbjsbjhfbsjdbfjb" },
        { id: 3, name: "desc 1", description: "jfbdjfbjsbjhfbsjdbfjb" },
        { id: 4, name: "desc 1", description: "jfbdjfbjsbjhfbsjdbfjb" },
    ]

    const handleToggle = (id) => {
        setCurrentToggle(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)  // remove
                : [...prev, id]               // add
        );
    }


    return (
        <>

            <div>Toggle</div>
            {
                ToggleBars.map(t => {
                    return (
                        <div>
                            <p key={t.id} onClick={() => handleToggle(t.id)}>t.name</p>
                            {currentToggle.includes(t.id) ? t.description : null}
                        </div>
                    )
                })
            }
        </>
    )
}

export default Toggle