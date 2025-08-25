document.addEventListener("DOMContentLoaded", () => {

  // ==================================================
  // Navbar Burger Menu
  // ==================================================
  function toggleMenu(burger) {
    const navLinks = document.getElementById("nav-links");
    if (navLinks) {
      navLinks.classList.toggle("active");
      burger.classList.toggle("active");
    }
  }
  window.toggleMenu = toggleMenu;


  // ==================================================
  // Preloader with Typewriter Words
  // ==================================================
  const words = ["WE BUILD", "WE MAKE", "YOU GROW"];
  let i = 0;  // word index
  let j = 0;  // letter index
  let isDeleting = false;
  const typewriter = document.getElementById("typewriter");

  function preloaderTypewriter() {
    if (!typewriter) return;
    const currentWord = words[i];

    if (!isDeleting && j <= currentWord.length) {
      typewriter.innerHTML = currentWord.substring(0, j) + '<span class="cursor">|</span>';
      j++;
      setTimeout(preloaderTypewriter, 80);
    } else if (isDeleting && j >= 0) {
      typewriter.innerHTML = currentWord.substring(0, j) + '<span class="cursor">|</span>';
      j--;
      setTimeout(preloaderTypewriter, 30);
    } else if (!isDeleting && j > currentWord.length) {
      if (i === words.length - 1) {
        typewriter.innerHTML = currentWord; // keep last word
        return;
      }
      isDeleting = true;
      setTimeout(preloaderTypewriter, 500);
    } else if (isDeleting && j < 0) {
      isDeleting = false;
      i++;
      setTimeout(preloaderTypewriter, 200);
    }
  }

  window.addEventListener("load", () => {
    setTimeout(() => preloaderTypewriter(), 400);
    setTimeout(() => {
      const preloader = document.querySelector(".preloader");
      const content = document.getElementById("content");
      if (preloader) preloader.classList.add("hidden");
      if (content) content.style.display = "block";
    }, 5000);
  });


  // ==================================================
  // Services Tabs
  // ==================================================
  const servicesData = {
    digital: [
      { icon: "fa-solid fa-chart-line", title: "SEO", desc: "Optimize your website to rank higher on search engines." },
      { icon: "fa-solid fa-bullseye", title: "PPC", desc: "Drive instant traffic with targeted Pay-Per-Click ads." },
      { icon: "fa-solid fa-share-nodes", title: "SMM", desc: "Grow your business with smart social media strategies." },
      { icon: "fa-solid fa-pen-nib", title: "Content Marketing", desc: "Engage your audience with impactful content." },
      { icon: "fa-solid fa-envelope", title: "Email Marketing", desc: "Build connections and increase sales through emails." }
    ],
    tech: [
      { icon: "fa-solid fa-laptop-code", title: "Web Development", desc: "Custom websites tailored for your business." },
      { icon: "fa-solid fa-cart-shopping", title: "E-Commerce", desc: "Sell online with scalable e-commerce platforms." },
      { icon: "fa-solid fa-palette", title: "UI/UX Design", desc: "User-friendly and visually appealing designs." },
      { icon: "fa-solid fa-diagram-project", title: "Web Portals", desc: "Powerful portals to manage and streamline workflows." },
      { icon: "fa-solid fa-mobile-screen", title: "Mobile Apps", desc: "iOS and Android apps to reach customers anywhere." },
      { icon: "fa-solid fa-server", title: "Maintenance & Hosting", desc: "Reliable support, updates, and secure hosting." }
    ]
  };

  function showServices(type) {
    const container = document.getElementById("services");
    if (!container) return;
    container.innerHTML = "";

    servicesData[type].forEach((service, i) => {
      const box = document.createElement("div");
      box.classList.add("service-box");
      box.style.animationDelay = `${i * 0.1}s`;
      box.innerHTML = `
        <i class="${service.icon}"></i>
        <h3>${service.title}</h3>
        <p>${service.desc}</p>
      `;
      container.appendChild(box);
    });

    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`.tab-button[onclick="showServices('${type}')"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }
  window.showServices = showServices;
  showServices("digital"); // default tab


  // ==================================================
  // Swiper Slider
  // ==================================================
  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
    });
  }


  // ==================================================
  // Count Up Animation
  // ==================================================
  const counters = document.querySelectorAll(".za-stat h2");
  const speed = 200;

  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          let count = 0;

          const updateCount = () => {
            const inc = target / speed;
            if (count < target) {
              count += inc;
              counter.innerText = Math.ceil(count);
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target + (target >= 1000 ? "+" : "");
            }
          };

          updateCount();
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }


  // ==================================================
  // Progress Bars
  // ==================================================
  const progressBars = document.querySelectorAll(".za-progress-bar");
  if (progressBars.length) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute("data-width");
          progressObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
  }


  // ==================================================
  // Section 3 Image Switcher
  // ==================================================
  const items = document.querySelectorAll(".dm-content-item");
  const mainImage = document.getElementById("main-image");

  if (items.length && mainImage) {
    items.forEach(item => {
      item.addEventListener("click", () => {
        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const newImageSrc = item.getAttribute("data-image");
        const newImageAlt = item.getAttribute("data-title");

        mainImage.style.opacity = "0";
        setTimeout(() => {
          mainImage.src = newImageSrc;
          mainImage.alt = newImageAlt + " image";
          mainImage.style.opacity = "1";
        }, 300);
      });
    });
  }


  // ==================================================
  // Marketing Strategies Tabs
  // ==================================================
  const contentData = {
    ppc: { title: "Pay-Per-Click (PPC)", description: "PPC is an online advertising model where advertisers pay a fee each time one of their ads is clicked.", icon: "fas fa-bullseye" },
    seo: { title: "Search Engine Optimization (SEO)", description: "SEO improves website visibility in search engines by optimizing content, structure, and keywords.", icon: "fas fa-search" },
    smm: { title: "Social Media Marketing (SMM)", description: "SMM uses social platforms to engage users, promote services, and strengthen brand visibility.", icon: "fas fa-users" },
    content: { title: "Content Marketing", description: "Content marketing focuses on valuable, relevant, and consistent content to attract and retain an audience.", icon: "fas fa-file-alt" },
    video: { title: "Video Marketing", description: "Video marketing uses engaging videos to promote products, educate audiences, and build stronger connections.", icon: "fas fa-video" },
    voice: { title: "Voice SEO", description: "Voice search optimization targets conversational, long-tail keywords.", icon: "fas fa-microphone-alt" },
    email: { title: "Email Marketing", description: "Email marketing delivers targeted messages to customers, building relationships and driving conversions.", icon: "fas fa-envelope" }
  };

  const menuItems = document.querySelectorAll(".menu-item");
  const panelContent = document.getElementById("panel-content");

  function showContent(contentKey, clickedItem) {
    const data = contentData[contentKey];
    if (data && panelContent) {
      menuItems.forEach(item => item.classList.remove("active"));
      clickedItem.classList.add("active");

      panelContent.style.opacity = 0;
      setTimeout(() => {
        panelContent.innerHTML = `
          <div class="icon-title">
            <i class="${data.icon}"></i>
            <h2>${data.title}</h2>
          </div>
          <p>${data.description}</p>
        `;
        panelContent.style.opacity = 1;
      }, 200);
    }
  }

  if (menuItems.length) {
    menuItems.forEach(item => {
      const contentKey = item.getAttribute("data-content");
      item.addEventListener("click", () => showContent(contentKey, item));
    });
  }


  // ==================================================
  // Section 4 Typewriter Effect
  // ==================================================
  const element = document.querySelector(".typewriter-text");
  const htmlString = `Unleashing Creativity The <br> Unleashing <span class="Success">Success</span>`;
  let hasTyped = false;

  function startTypewriter() {
    let i = 0;
    let isTag = false;
    let text = "";

    function type() {
      if (i < htmlString.length) {
        let char = htmlString[i];

        if (char === "<") isTag = true;
        if (char === ">") isTag = false;

        text += char;
        element.innerHTML = text + '<span class="cursor">|</span>';

        i++;
        setTimeout(type, isTag ? 0 : 70);
      } else {
        element.innerHTML = text;
        element.classList.add("done");
      }
    }
    type();
  }

  if (element) {
    const targetSection = document.querySelector(".section-4");
    if (targetSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasTyped) {
            hasTyped = true;
            startTypewriter();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(targetSection);
    }
  }

}); // DOMContentLoaded end

// blog section
 // Intersection Observer for reveal on scroll
    const posts = document.querySelectorAll(".blog-post");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    posts.forEach(post => observer.observe(post));

    // Toggle Read More
    document.querySelectorAll(".read-more").forEach(button => {
      button.addEventListener("click", () => {
        const content = button.parentElement;
        content.classList.toggle("expanded");
        button.textContent = content.classList.contains("expanded") ? "Read Less" : "Read More";
      });
    });