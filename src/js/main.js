const header = document.querySelector("header");
const navLinks = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll("main section");

function updateNavBar () {
    const scrollPos = header.offsetHeight;

    let currentSectionId = sections[0].id;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const top = rect.top;

        if (scrollPos >= top) {
            currentSectionId = section.id;
        }
    });

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        currentSectionId = sections[sections.length - 1].id;
    }

    navLinks.forEach((link) => {
        link.classList.toggle("current", link.getAttribute("href") === `#${currentSectionId}`);
    })
}

// Smooth scroll with header offset
navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);
        const targetTop = target.getBoundingClientRect().top;
        const headerHeight = header.offsetHeight;

        window.scrollTo({
            top: window.scrollY + targetTop - headerHeight + 1,
            behavior: "smooth",
        });
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('resize');
    } else {
        header.classList.remove('resize');
    }

    updateNavBar();
});
