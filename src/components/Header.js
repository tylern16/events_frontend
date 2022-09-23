import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <>
            Header

            <div>
                <Link to='/'> Home</Link>

                <Link to='/events'>Events List</Link>

            </div>
        </>
    )
}

export default Header