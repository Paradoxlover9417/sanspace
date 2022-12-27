var swiper = new Swiper(".mySwiper", {
    slidesPerView: 8,
    spaceBetween: 50,
    centeredSlides: true,
    speed: 10000,
    autoplay: {
        delay: 0,
    },
    loop: true,
    allowTouchMove: false,
});
var swiper = new Swiper(".project", {
    slidesPerView: 1,
    spaceBetween: 100,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    parallax: !0,
});
var swiper = new Swiper(".ncs", {
    slidesPerView: 1,
    spaceBetween: 100,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    parallax: !0,
});
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".panel").forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
        pinSpacing: false,
    });
});

var wobbles = document.getElementsByClassName("wobble"),
    curve = 500;

setWobble();

document.addEventListener("scroll", trackScroll);

var scrollSpeed, curveAmount;

function setWobble() {
    for (var x = 0; x < wobbles.length - 1; x++) {
        wobbles[x].setAttribute("d", "M0 200 C 300 " + (curve - 450) + ", 1620 " + (curve - 450) + ", 1920 200");
    }
    if ((x = wobbles.length - 1)) {
        wobbles[x].setAttribute("d", "M0 200 C 300 " + (curve - 150) + ", 1620 " + (curve - 150) + ", 1920 200");
    }
    requestAnimationFrame(setWobble);
}

function trackScroll() {
    scrollSpeed = checkScrollSpeed();
    curveAmount = 500 + scrollSpeed * 2;

    if (curveAmount > 500) {
        curveAmount = Math.min(curveAmount, 750);
    } else {
        curveAmount = Math.max(curveAmount, 250);
    }

    TweenMax.to(window, 2.2, { ease: Elastic.easeOut.config(.5, 0.07), curve: curveAmount });

    if (scrollSpeed != 0) {
        requestAnimationFrame(trackScroll);
    }
}

var lastPos,
    newPos,
    timer,
    delta,
    delay = 100;

var checkScrollSpeed = (function () {
    function clear() {
        lastPos = null;
        delta = 0;
    }

    clear();

    return function () {
        newPos = window.scrollY;

        if (lastPos != null) {
            delta = newPos - lastPos;
        }

        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);

        return delta;
    };
})();

let content = document.querySelector("section.aboutMe");
let line = document.querySelector(".cls-1");

let pathLength = line.getTotalLength();

line.style.strokeDasharray = pathLength;
line.style.strokeDashoffset = pathLength;

window.addEventListener("scroll", scrollHandler);
function calcDashoffset(y, element, length) {
    const ratio = (y - element.offsetTop) / element.offsetHeight;
    const value = length - length * ratio;
    return value < 0 ? 0 : value > length ? length : value;
}
function scrollHandler() {
    const scrollY = window.scrollY + window.innerHeight;

    line.style.strokeDashoffset = calcDashoffset(scrollY, content, pathLength);
}

let cursor = document.createElement("div");
cursor.setAttribute({
    position: "absolute",
    width: "100px",
    height: "100px",
    backgroundColor: "blue",
});
window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.pageX;
    cursor.style.top = e.pageY;
    console.log(e.pageX)
});
