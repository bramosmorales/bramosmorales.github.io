const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


const finePointer =
  window.matchMedia(
    "(pointer: fine)"
  ).matches;



/* =========================================================
   ALL 91 ART LIBRARY FILES

   Every one of these gets injected into a collage zone.
========================================================= */

const ART_LIBRARY = [

  "arrow-02.png",
  "beetle-01.png",
  "beetle-guide.png",
  "bird-01.png",
  "blur-lines-01.png",
  "branching-tree-01.png",
  "cattails-01.png",
  "celestial-cross-01.png",
  "circle-x-01.png",
  "cliff-01.png",
  "compass-star-01.png",
  "contour-symbol-01.png",
  "corner-brackets-01.png",
  "corner-brackets-02.png",
  "cracked-earth-01.png",
  "cross-marks-01.png",
  "crosshair-01.png",
  "diamond-star-01.png",
  "drainage-tree-01.png",
  "fern-01.png",
  "fern-large-01.png",
  "field-arrow-01.png",
  "firefly-01.png",
  "grid-cluster-01.png",
  "halftone-dots-01.png",
  "hanging-plant-01.png",
  "leaf-vine-01.png",
  "location-pin-01.png",
  "moon-pair-01.png",
  "moon-phases-01.png",
  "moth-02.png",
  "mountain-range-01.png",
  "orbit-01.png",

  "overlay-botanical-center.png",
  "overlay-botanical-far-right.png",
  "overlay-botanical-left.png",
  "overlay-botanical-right.png",

  "overlay-bottom-creatures.png",

  "overlay-celestial-left.png",
  "overlay-celestial-right.png",

  "overlay-marks-left.png",
  "overlay-marks-right.png",

  "overlay-terrain-center.png",
  "overlay-terrain-left.png",
  "overlay-terrain-right.png",

  "overlay-topography-01.png",
  "overlay-topography-02.png",
  "overlay-topography-03.png",
  "overlay-topography-04.png",
  "overlay-topography-05.png",

  "pine-branch-01.png",

  "pixel-cluster-01.png",
  "pixel-steps-01.png",

  "reeds-01.png",

  "river-network-01.png",
  "river-network-02.png",

  "rock-01.png",

  "root-network-01.png",
  "roots-large-01.png",
  "roots-large-02.png",

  "rough-frame-01.png",
  "rough-frame-02.png",

  "scribble-lines-01.png",
  "scribble-oval-01.png",

  "section-transition-land-water.png",

  "skew-frame-01.png",

  "slash-marks-01.png",

  "small-star-01.png",
  "small-stars-01.png",

  "star-pixel-cluster-01.png",
  "starburst-01.png",

  "strata-01.png",
  "stripe-mark-01.png",
  "stump-01.png",
  "sunburst-01.png",

  "survey-hash-01.png",
  "survey-tripod-01.png",

  "target-01.png",
  "target-x-01.png",

  "terrain-large-01.png",

  "thorn-vine-01.png",

  "topography-01.png",
  "topography-02.png",
  "topography-03.png",
  "topography-04.png",
  "topography-05.png",

  "triangle-01.png",

  "volcano-01.png",

  "waveform-01.png",

  "wildflower-01.png",

  "x-mark-01.png"

];



/* =========================================================
   HASH

   Makes positions consistent after refresh instead of
   randomizing every time.
========================================================= */

function hashString(string) {

  let hash = 0;


  for (
    let i = 0;
    i < string.length;
    i++
  ) {

    hash =
      (
        hash * 31
        +
        string.charCodeAt(i)
      )
      >>> 0;

  }


  return hash;

}



/* =========================================================
   CLASSIFY ART
========================================================= */

function classifyArt(name) {

  if (
    name.includes("frame")
    ||
    name.includes("bracket")
  ) {

    return "frame";

  }


  if (
    name.includes("moth")
    ||
    name.includes("beetle")
    ||
    name.includes("bird")
    ||
    name.includes("firefly")
    ||
    name.includes("creature")
  ) {

    return "creature";

  }


  if (
    name.includes("fern")
    ||
    name.includes("root")
    ||
    name.includes("branch")
    ||
    name.includes("plant")
    ||
    name.includes("vine")
    ||
    name.includes("cattail")
    ||
    name.includes("reeds")
    ||
    name.includes("wildflower")
  ) {

    return "botanical";

  }


  if (
    name.includes("topography")
    ||
    name.includes("terrain")
    ||
    name.includes("mountain")
    ||
    name.includes("volcano")
    ||
    name.includes("cliff")
    ||
    name.includes("strata")
    ||
    name.includes("rock")
    ||
    name.includes("cracked")
    ||
    name.includes("stump")
  ) {

    return "terrain";

  }


  if (
    name.includes("moon")
    ||
    name.includes("star")
    ||
    name.includes("orbit")
    ||
    name.includes("sun")
    ||
    name.includes("celestial")
  ) {

    return "celestial";

  }


  return "mark";

}



/* =========================================================
   BUILD COLLAGES
========================================================= */

const collageZones =
  Array.from(
    document.querySelectorAll(
      "[data-collage]"
    )
  );


if (
  collageZones.length
  &&
  document.body.classList.contains(
    "is-home"
  )
) {

  ART_LIBRARY.forEach(
    (
      filename,
      index
    ) => {

      const zone =
        collageZones[
          index
          %
          collageZones.length
        ];


      const hash =
        hashString(
          filename
        );


      const kind =
        classifyArt(
          filename
        );


      const image =
        document.createElement(
          "img"
        );


      image.src =
        `/assets/art/${filename}`;


      image.alt =
        "";


      image.loading =
        index < 16
          ? "eager"
          : "lazy";


      image.decoding =
        "async";


      image.className =
        "collage-item";


      image.dataset.kind =
        kind;


      /* ---------------------------------------
         X POSITION

         bias items toward edges but allow
         center pieces too.
      --------------------------------------- */

      const lane =
        hash % 5;


      let x;


      if (lane === 0) {

        x =
          -5
          +
          (
            hash % 13
          );

      }

      else if (lane === 1) {

        x =
          8
          +
          (
            hash % 21
          );

      }

      else if (lane === 2) {

        x =
          34
          +
          (
            hash % 23
          );

      }

      else if (lane === 3) {

        x =
          61
          +
          (
            hash % 22
          );

      }

      else {

        x =
          82
          +
          (
            hash % 13
          );

      }



      /* Y POSITION */

      const y =
        2
        +
        (
          (
            hash >>> 5
          )
          %
          88
        );



      /* WIDTH */

      let minWidth = 70;
      let maxWidth = 220;


      if (
        kind === "botanical"
        ||
        kind === "terrain"
      ) {

        minWidth = 130;
        maxWidth = 330;

      }


      if (
        filename.includes(
          "overlay"
        )
        ||
        filename.includes(
          "large"
        )
        ||
        filename.includes(
          "section-transition"
        )
      ) {

        minWidth = 240;
        maxWidth = 520;

      }


      if (
        kind === "creature"
      ) {

        minWidth = 65;
        maxWidth = 160;

      }


      const width =
        minWidth
        +
        (
          (
            hash >>> 8
          )
          %
          (
            maxWidth
            -
            minWidth
          )
        );



      /* ROTATION */

      const rotation =
        -16
        +
        (
          (
            hash >>> 12
          )
          %
          33
        );



      /* OPACITY */

      let opacity =
        0.16
        +
        (
          (
            (
              hash >>> 15
            )
            %
            30
          )
          /
          100
        );


      if (
        kind === "mark"
        ||
        kind === "frame"
      ) {

        opacity *=
          0.85;

      }


      if (
        filename.includes(
          "overlay"
        )
      ) {

        opacity =
          Math.min(
            opacity,
            0.25
          );

      }



      image.style.setProperty(
        "--x",
        `${x}%`
      );


      image.style.setProperty(
        "--y",
        `${y}%`
      );


      image.style.setProperty(
        "--w",
        `${width}px`
      );


      image.style.setProperty(
        "--r",
        `${rotation}deg`
      );


      image.style.setProperty(
        "--o",
        opacity.toFixed(2)
      );


      zone.appendChild(
        image
      );

    }
  );

}



/* =========================================================
   NAV
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
  navToggle
  &&
  siteNav
) {

  navToggle.addEventListener(
    "click",
    () => {

      const open =
        siteNav
          .classList
          .toggle(
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
    document
      .documentElement
      .scrollHeight
    -
    window.innerHeight;


  const value =
    maximum > 0
      ?
      window.scrollY
      /
      maximum
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
  finePointer
  &&
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
          `${pointerX}px`
        );


      document
        .documentElement
        .style
        .setProperty(
          "--mouse-y",
          `${pointerY}px`
        );



      const normalizedX =
        (
          pointerX
          /
          window.innerWidth
          -
          0.5
        )
        *
        12;


      const normalizedY =
        (
          pointerY
          /
          window.innerHeight
          -
          0.5
        )
        *
        8;


      document
        .documentElement
        .style
        .setProperty(
          "--collage-shift-x",
          `${normalizedX}px`
        );


      document
        .documentElement
        .style
        .setProperty(
          "--collage-shift-y",
          `${normalizedY}px`
        );

    }
  );

}



/* =========================================================
   REVEAL
========================================================= */

const revealItems =
  document.querySelectorAll(
    ".reveal"
  );


if (reducedMotion) {

  revealItems.forEach(
    item => {

      item
        .classList
        .add(
          "visible"
        );

    }
  );

}

else {

  const observer =
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


              observer
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
    item => {

      observer.observe(
        item
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
  moth
  &&
  finePointer
  &&
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
        targetX
        -
        mothX
      )
      *
      0.062;


    mothY +=
      (
        targetY
        -
        mothY
      )
      *
      0.062;


    const velocity =
      mothX
      -
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
   PARTICLES
========================================================= */

let lastParticle =
  0;


if (
  finePointer
  &&
  !reducedMotion
) {

  document.addEventListener(
    "pointermove",
    event => {

      const now =
        performance.now();


      if (
        now
        -
        lastParticle
        <
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
  beetle
  &&
  browseSection
  &&
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
        threshold: 0.1
      }

    );


  beetleObserver.observe(
    browseSection
  );


  beetle.addEventListener(
    "click",
    () => {

      document.body
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
  finePointer
  &&
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
                event.clientX
                -
                rect.left
              )
              /
              rect.width
              -
              0.5;


            const y =
              (
                event.clientY
                -
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
    !browsePreview
    ||
    !browsePreviewTitle
    ||
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
    !image
    ||
    image === "none"
  ) {

    browsePreview.classList.add(
      "empty"
    );


    if (
      browsePreviewImage
    ) {

      browsePreviewImage
        .removeAttribute(
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
  finePointer
  &&
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
