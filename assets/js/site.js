const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progressBar = document.getElementById("scroll-progress-bar");

function updateScrollProgress() {
  if (!progressBar) return;

  const availableScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    availableScroll > 0
      ? window.scrollY / availableScroll
      : 0;

  progressBar.style.transform = `scaleX(${progress})`;
}

updateScrollProgress();

window.addEventListener(
  "scroll",
  updateScrollProgress,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateScrollProgress
);

/* =========================================================
   POINTER POSITION + BACKGROUND PARALLAX
========================================================= */

let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;

if (finePointer && !reducedMotion) {
  document.addEventListener("pointermove", event => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    document.documentElement.style.setProperty(
      "--mouse-x",
      `${pointerX}px`
    );

    document.documentElement.style.setProperty(
      "--mouse-y",
      `${pointerY}px`
    );

    const shiftX =
      (pointerX / window.innerWidth - 0.5) * 13;

    const shiftY =
      (pointerY / window.innerHeight - 0.5) * 9;

    document.documentElement.style.setProperty(
      "--collage-shift-x",
      `${shiftX}px`
    );

    document.documentElement.style.setProperty(
      "--collage-shift-y",
      `${shiftY}px`
    );
  });
}

/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealItems =
  document.querySelectorAll(".reveal");

if (reducedMotion) {
  revealItems.forEach(item => {
    item.classList.add("visible");
  });
} else {
  const revealObserver =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.07
      }
    );

  revealItems.forEach(item => {
    revealObserver.observe(item);
  });
}

/* =========================================================
   COLLAGE HOVER DEPTH
========================================================= */

if (finePointer && !reducedMotion) {
  document
    .querySelectorAll(".collage-item")
    .forEach(item => {
      item.addEventListener(
        "pointerenter",
        () => {
          item.style.opacity = "0.95";
        }
      );

      item.addEventListener(
        "pointerleave",
        () => {
          item.style.opacity = "";
        }
      );
    });
}

/* =========================================================
   MOTH CURSOR FOLLOWER
========================================================= */

const moth =
  document.getElementById("moth-guide");

if (
  moth &&
  finePointer &&
  !reducedMotion
) {
  let mothX = pointerX + 58;
  let mothY = pointerY + 40;
  let previousX = mothX;
  let idleTimer = null;

  moth.classList.add("awake");

  function wakeMoth() {
    moth.classList.add("awake");
    moth.classList.remove("idle");

    if (idleTimer) {
      clearTimeout(idleTimer);
    }

    idleTimer =
      window.setTimeout(
        () => {
          moth.classList.add("idle");
        },
        1400
      );
  }

  document.addEventListener(
    "pointermove",
    wakeMoth
  );

  function animateMoth() {
    const targetX = pointerX + 56;
    const targetY = pointerY + 42;

    mothX +=
      (targetX - mothX) * 0.07;

    mothY +=
      (targetY - mothY) * 0.07;

    const velocityX =
      mothX - previousX;

    previousX = mothX;

    const rotation =
      Math.max(
        -11,
        Math.min(
          11,
          velocityX * 1.45
        )
      );

    moth.style.transform =
      `translate3d(${mothX}px, ${mothY}px, 0) translate(-50%, -50%) rotate(${rotation}deg)`;

    requestAnimationFrame(
      animateMoth
    );
  }

  animateMoth();

  document
    .querySelectorAll(
      "[data-discover], .project-card, .other-item, .work-feature"
    )
    .forEach(element => {
      element.addEventListener(
        "pointerenter",
        () => {
          moth.classList.add("active");

          const label =
            moth.querySelector(".moth-label");

          if (label) {
            label.textContent = "VIEW ↗";
          }
        }
      );

      element.addEventListener(
        "pointerleave",
        () => {
          moth.classList.remove("active");

          const label =
            moth.querySelector(".moth-label");

          if (label) {
            label.textContent = "EXPLORE";
          }
        }
      );
    });
}

/* =========================================================
   CURSOR PIXEL TRAIL
========================================================= */

let lastParticleTime = 0;

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
        now - lastParticleTime < 100
      ) {
        return;
      }

      lastParticleTime = now;

      const particle =
        document.createElement("span");

      particle.className =
        "cursor-particle";

      particle.style.left =
        `${event.clientX + 35}px`;

      particle.style.top =
        `${event.clientY + 30}px`;

      const size =
        2 + Math.random() * 3;

      particle.style.width =
        `${size}px`;

      particle.style.height =
        `${size}px`;

      document.body.appendChild(
        particle
      );

      window.setTimeout(
        () => particle.remove(),
        650
      );
    }
  );
}

/* =========================================================
   BEETLE INTERACTION
========================================================= */

const beetle =
  document.getElementById("beetle-guide");

const browseSection =
  document.querySelector(".browse-section");

if (
  beetle &&
  finePointer
) {
  if (browseSection) {
    const beetleObserver =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            beetle.classList.toggle(
              "visible",
              entry.isIntersecting
            );
          });
        },
        {
          threshold: 0.08
        }
      );

    beetleObserver.observe(
      browseSection
    );
  } else {
    const updateInnerPageBeetle = () => {
      beetle.classList.toggle(
        "visible",
        window.scrollY > 500
      );
    };

    updateInnerPageBeetle();

    window.addEventListener(
      "scroll",
      updateInnerPageBeetle,
      {
        passive: true
      }
    );
  }

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
    .querySelectorAll("[data-tilt]")
    .forEach(element => {
      element.addEventListener(
        "pointermove",
        event => {
          const bounds =
            element.getBoundingClientRect();

          const x =
            (
              event.clientX - bounds.left
            ) /
            bounds.width -
            0.5;

          const y =
            (
              event.clientY - bounds.top
            ) /
            bounds.height -
            0.5;

          element.style.transform =
            `perspective(1200px) rotateX(${y * -1.7}deg) rotateY(${x * 2.4}deg) translateY(-4px)`;
        }
      );

      element.addEventListener(
        "pointerleave",
        () => {
          element.style.transform = "";
        }
      );
    });
}

/* =========================================================
   BROWSE-BY-AREA PREVIEW
========================================================= */

const browseRows =
  document.querySelectorAll(".browse-row");

const browsePreview =
  document.getElementById("browse-preview");

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

function setBrowsePreview(row) {
  if (
    !browsePreview ||
    !browsePreviewTitle ||
    !browsePreviewText
  ) {
    return;
  }

  browseRows.forEach(item => {
    item.classList.remove("active");
  });

  row.classList.add("active");

  browsePreviewTitle.textContent =
    row.dataset.previewTitle || "";

  browsePreviewText.textContent =
    row.dataset.previewText || "";

  const image =
    row.dataset.previewImage;

  if (
    !image ||
    image === "none"
  ) {
    browsePreview.classList.add(
      "empty"
    );

    if (browsePreviewImage) {
      browsePreviewImage.removeAttribute(
        "src"
      );
    }
  } else {
    browsePreview.classList.remove(
      "empty"
    );

    if (browsePreviewImage) {
      browsePreviewImage.src =
        image;
    }
  }
}

browseRows.forEach(row => {
  row.addEventListener(
    "pointerenter",
    () => {
      setBrowsePreview(row);
    }
  );

  row.addEventListener(
    "focus",
    () => {
      setBrowsePreview(row);
    }
  );
});

if (browseRows.length) {
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
      if (
        event.target.closest(
          "input, textarea, select"
        )
      ) {
        return;
      }

      const star =
        document.createElement("span");

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

      window.setTimeout(
        () => star.remove(),
        580
      );
    }
  );
}
