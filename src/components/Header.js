import {Link} from 'react-router-dom'

import { useEffect } from 'react'

const Header = () => {
    const showNav = () => {
        document.getElementById('navbar').style.display === 'block' ?
            document.getElementById('navbar').style.display = 'none'
                :
            document.getElementById('navbar').style.display = 'block'
    }

    //using useeffect to give navbar a style attribute on page load
    useEffect(()=>{
        showNav()
    },[])


    return (
        <>
            <div id='pageHeader'>
                <i onClick={showNav} className="fa-solid fa-bars"></i>
                <div>Event Manager</div>
            </div>
        </>
    )
}

export default Header