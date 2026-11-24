const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


const finePointer =
  window.matchMedia(
    "(pointer: fine)"
  ).matches;



/* =========================================================
   MOBILE NAV
========================================================= */

const navToggle =
  document.querySelector(
    ".nav-toggle"
  );


const siteNav =
  document.querySelector(
    ".site-nav"
  );


if (
  navToggle &&
  siteNav
) {

  navToggle.addEventListener(
    "click",
    () => {

      const open =
        siteNav.classList.toggle(
          "open"
        );


      navToggle.setAttribute(
        "aria-expanded",
        open
      );

    }
  );

}



/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progressBar =
  document.getElementById(
    "scroll-progress-bar"
  );


function updateProgress() {

  if (!progressBar) {
    return;
  }


  const maximum =
    document.documentElement.scrollHeight
    -
    window.innerHeight;


  const value =
    maximum > 0
      ?
      window.scrollY / maximum
      :
      0;


  progressBar.style.transform =
    `scaleX(${value})`;

}


updateProgress();


window.addEventListener(
  "scroll",
  updateProgress,
  {
    passive: true
  }
);



/* =========================================================
   POINTER
========================================================= */

let pointerX =
  window.innerWidth / 2;


let pointerY =
  window.innerHeight / 2;


if (
  finePointer &&
  !reducedMotion
) {

  document.addEventListener(
    "pointermove",
    event => {

      pointerX =
        event.clientX;


      pointerY =
        event.clientY;


      document.documentElement.style.setProperty(
        "--mouse-x",
        `${pointerX}px`
      );


      document.documentElement.style.setProperty(
        "--mouse-y",
        `${pointerY}px`
      );


      const xShift =
        (
          pointerX /
          window.innerWidth -
          0.5
        ) * 15;


      const yShift =
        (
          pointerY /
          window.innerHeight -
          0.5
        ) * 10;


      document.documentElement.style.setProperty(
        "--collage-shift-x",
        `${xShift}px`
      );


      document.documentElement.style.setProperty(
        "--collage-shift-y",
        `${yShift}px`
      );

    }
  );

}



/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealItems =
  document.querySelectorAll(
    ".reveal"
  );


if (reducedMotion) {

  revealItems.forEach(
    item => {

      item.classList.add(
        "visible"
      );

    }
  );

}

else {

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: 0.08
      }

    );


  revealItems.forEach(
    item => {

      revealObserver.observe(
        item
      );

    }
  );

}



/* =========================================================
   COLLAGE DEPTH
========================================================= */

const collageItems =
  document.querySelectorAll(
    ".collage-item"
  );


if (
  finePointer &&
  !reducedMotion
) {

  collageItems.forEach(
    (
      item,
      index
    ) => {

      item.style.transition =
        `
        opacity 260ms ease,
        filter 260ms ease,
        margin 350ms ease
        `;


      item.addEventListener(
        "mouseenter",
        () => {

          item.style.opacity =
            "0.95";

        }
      );


      item.addEventListener(
        "mouseleave",
        () => {

          item.style.opacity =
            "";

        }
      );

    }
  );

}



/* =========================================================
   MOTH
========================================================= */

const moth =
  document.getElementById(
    "moth-guide"
  );


if (
  moth &&
  finePointer &&
  !reducedMotion
) {

  let mothX =
    pointerX + 50;


  let mothY =
    pointerY + 35;


  let previousX =
    mothX;


  let idleTimer;


  function wakeMoth() {

    moth.classList.add(
      "awake"
    );


    moth.classList.remove(
      "idle"
    );


    clearTimeout(
      idleTimer
    );


    idleTimer =
      setTimeout(
        () => {

          moth.classList.add(
            "idle"
          );

        },
        1500
      );

  }


  document.addEventListener(
    "pointermove",
    wakeMoth
  );


  function animateMoth() {

    const targetX =
      pointerX + 50;


    const targetY =
      pointerY + 36;


    mothX +=
      (
        targetX -
        mothX
      ) * 0.062;


    mothY +=
      (
        targetY -
        mothY
      ) * 0.062;


    const velocity =
      mothX -
      previousX;


    previousX =
      mothX;


    const rotation =
      Math.max(
        -10,
        Math.min(
          10,
          velocity * 1.4
        )
      );


    moth.style.transform =
      `
      translate3d(
        ${mothX}px,
        ${mothY}px,
        0
      )
      rotate(${rotation}deg)
      `;


    requestAnimationFrame(
      animateMoth
    );

  }


  animateMoth();



  document
    .querySelectorAll(
      "[data-discover]"
    )
    .forEach(
      element => {

        element.addEventListener(
          "pointerenter",
          () => {

            moth.classList.add(
              "active"
            );


            const label =
              moth.querySelector(
                ".moth-label"
              );


            if (label) {

              label.textContent =
                "VIEW ↗";

            }

          }
        );


        element.addEventListener(
          "pointerleave",
          () => {

            moth.classList.remove(
              "active"
            );


            const label =
              moth.querySelector(
                ".moth-label"
              );


            if (label) {

              label.textContent =
                "EXPLORE";

            }

          }
        );

      }
    );

}



/* =========================================================
   CURSOR PARTICLES
========================================================= */

let lastParticle =
  0;


if (
  finePointer &&
  !reducedMotion
) {

  document.addEventListener(
    "pointermove",
    event => {

      const now =
        performance.now();


      if (
        now -
        lastParticle <
        90
      ) {

        return;

      }


      lastParticle =
        now;


      const particle =
        document.createElement(
          "span"
        );


      particle.className =
        "cursor-particle";


      particle.style.left =
        `${event.clientX + 32}px`;


      particle.style.top =
        `${event.clientY + 26}px`;


      document.body.appendChild(
        particle
      );


      setTimeout(
        () => {

          particle.remove();

        },
        650
      );

    }
  );

}



/* =========================================================
   BEETLE
========================================================= */

const beetle =
  document.getElementById(
    "beetle-guide"
  );


const browseSection =
  document.querySelector(
    ".browse-section"
  );


if (
  beetle &&
  browseSection &&
  finePointer
) {

  const beetleObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            beetle.classList.toggle(
              "visible",
              entry.isIntersecting
            );

          }
        );

      },

      {
        threshold: 0.1
      }

    );


  beetleObserver.observe(
    browseSection
  );


  beetle.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "field-mode"
      );

    }
  );

}



/* =========================================================
   PROJECT TILT
========================================================= */

if (
  finePointer &&
  !reducedMotion
) {

  document
    .querySelectorAll(
      "[data-tilt]"
    )
    .forEach(
      element => {

        element.addEventListener(
          "pointermove",
          event => {

            const rect =
              element.getBoundingClientRect();


            const x =
              (
                event.clientX -
                rect.left
              )
              /
              rect.width
              -
              0.5;


            const y =
              (
                event.clientY -
                rect.top
              )
              /
              rect.height
              -
              0.5;


            element.style.transform =
              `
              perspective(1200px)
              rotateX(${y * -1.8}deg)
              rotateY(${x * 2.6}deg)
              translateY(-5px)
              `;

          }
        );


        element.addEventListener(
          "pointerleave",
          () => {

            element.style.transform =
              "";

          }
        );

      }
    );

}



/* =========================================================
   BROWSE PREVIEW
========================================================= */

const browseRows =
  document.querySelectorAll(
    ".browse-row"
  );


const browsePreview =
  document.getElementById(
    "browse-preview"
  );


const browsePreviewImage =
  document.getElementById(
    "browse-preview-image"
  );


const browsePreviewTitle =
  document.getElementById(
    "browse-preview-title"
  );


const browsePreviewText =
  document.getElementById(
    "browse-preview-text"
  );


function setBrowsePreview(
  row
) {

  if (
    !browsePreview ||
    !browsePreviewTitle ||
    !browsePreviewText
  ) {

    return;

  }


  browseRows.forEach(
    item => {

      item.classList.remove(
        "active"
      );

    }
  );


  row.classList.add(
    "active"
  );


  browsePreviewTitle.textContent =
    row.dataset.previewTitle;


  browsePreviewText.textContent =
    row.dataset.previewText;


  const image =
    row.dataset.previewImage;


  if (
    !image ||
    image === "none"
  ) {

    browsePreview.classList.add(
      "empty"
    );


    if (
      browsePreviewImage
    ) {

      browsePreviewImage.removeAttribute(
        "src"
      );

    }

  }

  else {

    browsePreview.classList.remove(
      "empty"
    );


    browsePreviewImage.src =
      image;

  }

}


browseRows.forEach(
  row => {

    row.addEventListener(
      "pointerenter",
      () => {

        setBrowsePreview(
          row
        );

      }
    );


    row.addEventListener(
      "focus",
      () => {

        setBrowsePreview(
          row
        );

      }
    );

  }
);


if (
  browseRows.length
) {

  setBrowsePreview(
    browseRows[0]
  );

}



/* =========================================================
   CLICK STAR
========================================================= */

if (
  finePointer &&
  !reducedMotion
) {

  document.addEventListener(
    "click",
    event => {

      const star =
        document.createElement(
          "span"
        );


      star.className =
        "click-star";


      star.textContent =
        "✦";


      star.style.left =
        `${event.clientX}px`;


      star.style.top =
        `${event.clientY}px`;


      document.body.appendChild(
        star
      );


      setTimeout(
        () => {

          star.remove();

        },
        580
      );

    }
  );

}
