import './Nav.scss';
import { Link } from 'react-router-dom';

export default function Nav({children}) {

    const path = '/images/IMG_6556.jpg';

    return (
        <nav className='nav'>
            <div className='logo'>
                <Link to='https://github.com/IanPelina/'>
                    <div className='logo-pic' style={{ backgroundImage: `url(${path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}></div>
                </Link>
            </div>
                {children}
        </nav>  
    );
}
