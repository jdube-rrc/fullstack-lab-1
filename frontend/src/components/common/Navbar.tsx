import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/employees">Employees</Link>
                </li>
                <li>
                    <Link to="/organization">Organization</Link>
                </li>
            </ul>
        </nav>
    );
}
