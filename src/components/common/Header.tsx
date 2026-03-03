import logoUrl from "../../assets/logo.svg";

export function Header() {
    return (
        <header>
            <img src={logoUrl} alt="Pixell River Logo" width="200" />
            <h1>Pixell River Employee Directory</h1>
            <p>Welcome to the Pixell River Employee Directory. Here you can find information about our team members.</p>
        </header>
    );
}
