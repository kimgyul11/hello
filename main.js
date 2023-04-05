"use strict";

//스크롤시 메뉴바 변경
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//클릭시 이동하기
const navbarMenu = document.querySelector(".navbar__menu");
const navbarMenuActive = document.querySelector(".navbar__menu.active");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link === null) {
    return;
  }
  //여기까지 Id를 가져왔음.
  navbarMenu.classList.remove("open");
  scrollIntoViews(link);
  selectNavItem(target);
});

//반응형 네브바 toggle
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

//프로젝트 버튼 눌렀을때 이동하기
const contactMeBtn = document.querySelector("#workMove");
contactMeBtn.addEventListener("click", () => {
  scrollIntoViews("#work");
});

//스크롤시 HOME의 투명도가 낮아지기
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

//화살표
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});
arrowUp.addEventListener("click", () => {
  scrollIntoViews("#home");
});

//프로젝트 카테고리
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) return;
  // 버튼 활성화하기
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projectContainer.classList.remove("anim-out");
  }, 300);
  projects.forEach((project) => {
    if (filter === project.dataset.type) {
      project.classList.remove("invisible");
    } else {
      project.classList.add("invisible");
    }
  });
});

const sectionIds = ["#home", "#about", "#skills", "#work", "#contact"];

//섹션을 가져오기
const sections = sectionIds.map((id) => document.querySelector(id));
//섹션에 해당하는 메뉴아이템을 가져온다
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}
function scrollIntoViews(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      //스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
//여기서 옵저버를 사용하였음
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    //제일 밑으로 도달한다면
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
addEventListener("scroll", () => {});
//스킬영역 카드
const skillsObserverCallback = (e) => {
  e.forEach((card) => {
    if (card.isIntersecting) {
      setTimeout(() => {
        card.target.style.opacity = 1;
        card.target.style.transform = "translateY(0px)";
      }, 450);
    } else {
      card.target.style.opacity = 0;
      card.target.style.transform = "translateY(30%)";
    }
  });
};
let skillsObserver = new IntersectionObserver(skillsObserverCallback);
let skillCard = document.querySelectorAll(".skillCard");

skillsObserver.observe(skillCard[0]);
skillsObserver.observe(skillCard[1]);
