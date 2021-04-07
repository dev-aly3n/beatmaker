// modern Navigation bar code start here
const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    //toggle nav
    burger.addEventListener('click', () => {
        console.log(nav.classList.contains('nav-active'))
        nav.classList.toggle('nav-active');

        //animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.6}s`;
            }
        });

        //burger animation 
        burger.classList.toggle('toggle');
    });

    document.addEventListener("click", e => {
        if (e.target.matches('.navigation')) return
        nav.classList.remove('nav-active')
        burger.classList.remove('toggle');
        navLinks.forEach((link) => {
            link.style.animation = '';
        });
    });
}
navSlide();
// modern Navigation bar code stop here