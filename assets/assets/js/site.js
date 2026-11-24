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
      ? window.scrollY / maximum
      : 0;


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
   POINTER POSITION
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


      document
        .documentElement
        .style
        .setProperty(
          "--mouse-x",
          pointerX + "px"
        );


      document
        .documentElement
        .style
        .setProperty(
          "--mouse-y",
          pointerY + "px"
        );

    }
  );

}



/* =========================================================
   REVEALS
========================================================= */

const revealItems =
  document.querySelectorAll(
    ".reveal"
  );


if (reducedMotion) {

  revealItems.forEach(
    item =>
      item.classList.add(
        "visible"
      )
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

              entry
                .target
                .classList
                .add(
                  "visible"
                );


              revealObserver
                .unobserve(
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
    item =>
      revealObserver.observe(
        item
      )
  );

}



/* =========================================================
   PARALLAX
========================================================= */

const parallaxItems =
  document.querySelectorAll(
    "[data-parallax]"
  );


function updateParallax() {

  if (
    reducedMotion ||
    !parallaxItems.length
  ) {

    return;

  }


  parallaxItems.forEach(
    item => {

      const speed =
        parseFloat(
          item.dataset.parallax
        )
        ||
        0.05;


      const rect =
        item.getBoundingClientRect();


      const center =
        rect.top
        +
        rect.height / 2
        -
        window.innerHeight / 2;


      item.style.setProperty(
        "--parallax-y",
        `${center * speed}px`
      );

    }
  );

}


updateParallax();


window.addEventListener(
  "scroll",
  updateParallax,
  {
    passive: true
  }
);



/* =========================================================
   MOTH FOLLOWER
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
    pointerX + 55;

  let mothY =
    pointerY + 40;

  let lastMothX =
    mothX;

  let idleTimer;


  function wakeMoth() {

    moth
      .classList
      .add(
        "awake"
      );


    moth
      .classList
      .remove(
        "idle"
      );


    clearTimeout(
      idleTimer
    );


    idleTimer =
      setTimeout(
        () => {

          moth
            .classList
            .add(
              "idle"
            );

        },
        1400
      );

  }


  document.addEventListener(
    "pointermove",
    wakeMoth
  );


  function animateMoth() {

    const targetX =
      pointerX + 52;

    const targetY =
      pointerY + 36;


    mothX +=
      (
        targetX - mothX
      )
      *
      0.065;


    mothY +=
      (
        targetY - mothY
      )
      *
      0.065;


    const velocity =
      mothX - lastMothX;


    lastMothX =
      mothX;


    const rotation =
      Math.max(
        -10,
        Math.min(
          10,
          velocity * 1.5
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

            moth
              .classList
              .add(
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

            moth
              .classList
              .remove(
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
   MOTH PARTICLES
========================================================= */

let lastParticleTime =
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
        now - lastParticleTime
        <
        85
      ) {

        return;

      }


      lastParticleTime =
        now;


      const particle =
        document.createElement(
          "span"
        );


      particle.className =
        "cursor-particle";


      particle.style.left =
        `${event.clientX + 34}px`;


      particle.style.top =
        `${event.clientY + 28}px`;


      document.body.appendChild(
        particle
      );


      setTimeout(
        () =>
          particle.remove(),
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

            beetle
              .classList
              .toggle(
                "visible",
                entry.isIntersecting
              );

          }
        );

      },

      {
        threshold: 0.12
      }

    );


  beetleObserver.observe(
    browseSection
  );


  beetle.addEventListener(
    "click",
    () => {

      document
        .body
        .classList
        .toggle(
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
              element
                .getBoundingClientRect();


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
              rotateX(${y * -2.2}deg)
              rotateY(${x * 3.4}deg)
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
   CATEGORY PREVIEW
========================================================= */

const browseRows =
  document.querySelectorAll(
    ".browse-row"
  );


const preview =
  document.getElementById(
    "browse-preview"
  );


const previewImage =
  document.getElementById(
    "browse-preview-image"
  );


const previewTitle =
  document.getElementById(
    "browse-preview-title"
  );


const previewMeta =
  document.getElementById(
    "browse-preview-meta"
  );


function updateBrowsePreview(
  row
) {

  if (
    !preview ||
    !previewTitle ||
    !previewMeta
  ) {

    return;

  }


  const title =
    row.dataset.previewTitle
    ||
    "";


  const meta =
    row.dataset.previewMeta
    ||
    "";


  const image =
    row.dataset.previewImage
    ||
    "";


  previewTitle.textContent =
    title;


  previewMeta.textContent =
    meta;


  browseRows.forEach(
    item =>
      item.classList.remove(
        "active"
      )
  );


  row
    .classList
    .add(
      "active"
    );


  if (
    !image ||
    image === "none"
  ) {

    preview
      .classList
      .add(
        "empty"
      );


    if (previewImage) {

      previewImage
        .removeAttribute(
          "src"
        );

    }

  }

  else {

    preview
      .classList
      .remove(
        "empty"
      );


    if (previewImage) {

      previewImage.src =
        image;

    }

  }

}


browseRows.forEach(
  row => {

    row.addEventListener(
      "pointerenter",
      () =>
        updateBrowsePreview(
          row
        )
    );


    row.addEventListener(
      "focus",
      () =>
        updateBrowsePreview(
          row
        )
    );

  }
);


if (browseRows.length) {

  updateBrowsePreview(
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
        event.clientX + "px";


      star.style.top =
        event.clientY + "px";


      document.body.appendChild(
        star
      );


      setTimeout(
        () =>
          star.remove(),
        580
      );

    }
  );

}
