// app.js

document.addEventListener("DOMContentLoaded", () => {
  // ===== Smooth Scrolling =====
  const navLinks = document.querySelectorAll("nav ul li a, .btn");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      if (link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // ===== Active Link Highlight =====
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // ===== FAQ Toggle =====
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach(q => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;

      // Close other answers
      document.querySelectorAll(".faq-answer").forEach(a => {
        if (a !== answer) a.style.display = "none";
      });

      // Toggle current answer
      answer.style.display = (answer.style.display === "block") ? "none" : "block";

      // Optional: toggle + / - icon
      if (q.textContent.includes("+")) {
        q.textContent = q.textContent.replace("+", "–");
      } else if (q.textContent.includes("–")) {
        q.textContent = q.textContent.replace("–", "+");
      }
    });
  });
});