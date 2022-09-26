import {NavLink} from 'react-router-dom'




const Nav = () => {
    return (
        <>
            <div id='navbar'>
                <ul id='navbar-container'>
                    <li>
                        <NavLink activeClassName='link home' to='/'>
                            <i class="fa-regular fa-calendar"></i>
                            &nbsp; Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink activeClassName='link list' to='events'>
                            <i class="fa-solid fa-list"></i>     
                            &nbsp; Event List
                        </NavLink>
                    </li>
                </ul>
                



            </div>
        </>
    )
}

export default Nav