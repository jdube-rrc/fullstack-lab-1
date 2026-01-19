export function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer id="copyright">
            Copyright Pixell River Financial {currentYear}
        </footer>
    );
}
