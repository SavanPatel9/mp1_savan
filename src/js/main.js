const header = document.querySelector("header");
const navLinks = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll("main section");
const track = document.querySelector('#carousel');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const projectNav = document.getElementById('project_nav');
const showBtn = document.getElementById("showPicture");
const popup = document.getElementById("picture-popup");
const closeBtn = document.getElementById("closePopup");

let currentIndex = 0;

function updateSlidePosition() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
});

showBtn.addEventListener("click", () => {
    popup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

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

projectNav.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = projectNav.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    const targetTop = target.getBoundingClientRect().top;
    const headerHeight = header.offsetHeight;

    window.scrollTo({
        top: window.scrollY + targetTop - headerHeight + 1,
        behavior: "smooth",
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

window.addEventListener('resize', updateSlidePosition);

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
