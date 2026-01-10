document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
});

function displayCurrentDate() {
    const date = new Date();
    const formattedDate: number = date.getFullYear();
    const copyrightElement = document.getElementById("copyright");
    if (copyrightElement) {
        copyrightElement.textContent = `Copyright Pixell River Financial ${formattedDate}`;
    }
};

