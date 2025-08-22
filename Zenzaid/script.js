//   navbar burger menu
   function toggleMenu(burger) {
      const navLinks = document.getElementById("nav-links");
      navLinks.classList.toggle("active");
      burger.classList.toggle("active");
    }
//  slider      
     var swiper = new Swiper(".mySwiper", {
       loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
    //    autoplay: {
    //      delay: 6500,
    //      disableOnInteraction: false,
    //    },
       pagination: {
         el: ".swiper-pagination",
         clickable: true,
       },
       navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
       },
     });

    // Animate Progress Bars when visible
    const progressBars = document.querySelectorAll('.za-progress-bar');
    const options = { threshold: 0.5 };
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute('data-width');
          progressObserver.unobserve(bar);
        }
      });
    }, options);

    progressBars.forEach(bar => {
      progressObserver.observe(bar);
    });

    // Count Up Animation for Stats
    const counters = document.querySelectorAll('.za-stat h2');
    const speed = 200; // lower is faster

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
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

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });


    // section 3 
     document.addEventListener('DOMContentLoaded', () => {
            const items = document.querySelectorAll('.dm-content-item');
            const mainImage = document.getElementById('main-image');

            items.forEach(item => {
                item.addEventListener('click', () => {
                    // Remove 'active' class from all items
                    items.forEach(i => i.classList.remove('active'));

                    // Add 'active' class to the clicked item
                    item.classList.add('active');

                    // Get the new image source from the data attribute
                    const newImageSrc = item.getAttribute('data-image');
                    const newImageAlt = item.getAttribute('data-title');
                    console.log(newImageSrc, newImageAlt);

                    // Set the new image source with a fade effect
                    mainImage.style.opacity = '0';
                    setTimeout(() => {
                        mainImage.src = newImageSrc;
                        mainImage.alt = newImageAlt + " image";
                        mainImage.style.opacity = '1';
                    }, 300); // Wait for the fade-out to complete
                });
            });
        }); 

        // marketing stragies

        const contentData = {
      ppc: {
        title: "Pay-Per-Click (PPC)",
        description: "PPC is an online advertising model where advertisers pay a fee each time one of their ads is clicked. It's a way of buying visits instead of earning them organically.",
        icon: "fas fa-bullseye"
      },
      seo: {
        title: "Search Engine Optimization (SEO)",
        description: "SEO improves website visibility in search engines by optimizing content, structure, and keywords to attract organic traffic.",
        icon: "fas fa-search"
      },
      smm: {
        title: "Social Media Marketing (SMM)",
        description: "SMM uses social platforms to engage users, promote services, and strengthen brand visibility.",
        icon: "fas fa-users"
      },
      content: {
        title: "Content Marketing",
        description: "Content marketing focuses on valuable, relevant, and consistent content to attract and retain an audience.",
        icon: "fas fa-file-alt"
      },
      video: {
        title: "Video Marketing",
        description: "Video marketing uses engaging videos to promote products, educate audiences, and build stronger connections.",
        icon: "fas fa-video"
      },
      voice: {
        title: "Voice SEO",
        description: "Voice search optimization targets conversational, long-tail keywords matching how people speak queries.",
        icon: "fas fa-microphone-alt"
      },
      email: {
        title: "Email Marketing",
        description: "Email marketing delivers targeted messages to customers, building relationships and driving conversions.",
        icon: "fas fa-envelope"
      }
    };

    const menuItems = document.querySelectorAll('.menu-item');
    const panelContent = document.getElementById('panel-content');

    function showContent(contentKey, clickedItem) {
      const data = contentData[contentKey];
      if (data) {
        // Remove active from all
        menuItems.forEach(item => item.classList.remove('active'));

        // Add active to clicked
        clickedItem.classList.add('active');

        // Update content panel
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

    menuItems.forEach(item => {
      const contentKey = item.getAttribute('data-content');
      item.addEventListener('click', () => showContent(contentKey, item));
    });