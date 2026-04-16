import { Link } from 'react-router-dom';
import { useUser, SignInButton, SignOutButton } from '@clerk/react';

export function Navbar() {
    const { isSignedIn } = useUser();
    return (
        <nav>
            <ul className="navbar-list">
                <li>
                    <Link to="/employees">Employees</Link>
                </li>
                <li>
                    <Link to="/organization">Organization</Link>
                </li>
                <li className="navbar-auth">
                    {isSignedIn ? (
                        <SignOutButton>
                            <button type="button" className="navbar-auth-button">Log out</button>
                        </SignOutButton>
                    ) : (
                        <SignInButton mode="modal">
                            <button type="button" className="navbar-auth-button">Log in</button>
                        </SignInButton>
                    )}
                </li>
            </ul>
        </nav>
    );
}
