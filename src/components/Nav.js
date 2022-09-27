import {NavLink} from 'react-router-dom'
import {useEffect, useRef} from 'react'

const Nav = () => {
    const refOne = useRef(null)

    const onClickOutside = (e) => {
        // console.log(e.target);
        if (!refOne.current.contains(e.target)){
            //console.log('clicked outside');
            document.getElementById('navbar').style.display = 'none'
        } else {
            //console.log('clicked inside');
        }
    }

    useEffect(()=>{
        document.addEventListener('click', onClickOutside, true)
    }, [])


    return (
        <>
            <div id='navbar' ref={refOne}>
                <ul id='navbar-container'>
                    <li>
                        <NavLink className='link home' to='/'>
                            <i className="fa-regular fa-calendar"></i>
                            &nbsp; Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className='link list' to='events'>
                            <i className="fa-solid fa-list"></i>     
                            &nbsp; Event List
                        </NavLink>
                    </li>
                </ul>
                



            </div>
        </>
    )
}

export default Nav