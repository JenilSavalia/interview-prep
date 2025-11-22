import React, { useContext } from 'react'
import { themeContext } from './context'

const Home = () => {

    const { theme, handleClick } = useContext(themeContext);
    return (
        <>
            {theme}
            <button onClick={() => handleClick()}>
                change theme
            </button>
        </>
    )
}

export default Home