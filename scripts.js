const sections = document.querySelectorAll("section");
let currentSection = 0;
let isScrolling = false;

window.addEventListener("wheel", function (event) {
  if (isScrolling) return;

  const delta = Math.sign(event.deltaY);

  if (delta > 0 && currentSection < sections.length - 1) {
    scrollToSection(currentSection + 1);
  } else if (delta < 0 && currentSection > 0) {
    scrollToSection(currentSection - 1);
  }
});

function scrollToSection(index) {
  const targetSection = sections[index];
  const targetPosition = targetSection.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000; // Adjust this value to control the scroll speed
  let startTimestamp = null;

  function scrollStep(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = timestamp - startTimestamp;

    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, duration)
    );

    if (progress < duration) {
      window.requestAnimationFrame(scrollStep);
    } else {
      currentSection = index;
      isScrolling = false;
    }
  }

  isScrolling = true;
  window.requestAnimationFrame(scrollStep);
}

// Easing function - Cubic easing in/out - acceleration until halfway, then deceleration
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

// Set the initial active section
const initialSection = document.getElementById("section1");
initialSection.classList.add("active");
