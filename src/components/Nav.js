import {NavLink} from 'react-router-dom'




const Nav = () => {
    return (
        <>
            <div id='navbar'>
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