document.addEventListener("DOMContentLoaded", () => {
  // Botão "Voltar ao topo"
  const btnTop = document.getElementById("btn-top");

  if (btnTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        btnTop.classList.add("show");
      } else {
        btnTop.classList.remove("show");
      }
    });

    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  } else {
    console.error("❌ Botão 'Voltar ao topo' não encontrado.");
  }

  // Troca de tema com LocalStorage
  const themeButtons = {
    blue: document.getElementById("theme-blue"),
    green: document.getElementById("theme-green"),
    orange: document.getElementById("theme-orange"),
    dark: document.getElementById("toggle-theme-btn"),
  };

  const body = document.body;

  function applyTheme(theme) {
    console.log(`Aplicando tema: ${theme}`);

    body.classList.remove("blue-theme", "green-theme", "orange-theme", "dark-theme");

    if (theme !== "light") {
      body.classList.add(`${theme}-theme`);
    }

    localStorage.setItem("theme", theme);
    console.log(`Tema alterado para: ${theme}`);
  }

  Object.entries(themeButtons).forEach(([key, button]) => {
    if (button) {
      button.addEventListener("click", () => {
        applyTheme(key);
        console.log(`Clique no botão: ${key}`);
      });
    } else {
      console.error(`❌ Botão ${key} não encontrado.`);
    }
  });

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // Menu hambúrguer
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      console.log("Menu hambúrguer ativado!");
    });
  } else {
    console.error("❌ Elementos do menu hambúrguer não encontrados.");
  }

  // Validação do formulário
  const form = document.getElementById("contact-form");
  const errorMessage = document.getElementById("error-message");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || message === "") {
        errorMessage.style.display = "block";
        console.log("Campos obrigatórios não preenchidos.");
      } else {
        errorMessage.style.display = "none";

        const successMessage = document.createElement("p");
        successMessage.textContent = "Mensagem enviada com sucesso!";
        successMessage.style.color = "green";
        successMessage.style.fontWeight = "bold";
        successMessage.style.marginTop = "1rem";

        form.appendChild(successMessage);
        console.log("Formulário enviado com sucesso.");
        form.reset();
      }
    });
  } else {
    console.error("❌ Formulário não encontrado.");
  }

  // Quiz
  const quizForm = document.getElementById("quiz-form");
  const resultBox = document.getElementById("result");

  if (quizForm && resultBox) {
    quizForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const correctAnswers = {
        q1: "B", q2: "A", q3: "B", q4: "A", q5: "B",
        q6: "C", q7: "A", q8: "A", q9: "B", q10: "C"
      };

      let score = Object.entries(correctAnswers).reduce((acc, [question, correct]) => {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        return acc + (userAnswer?.value === correct ? 1 : 0);
      }, 0);

      resultBox.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${Object.keys(correctAnswers).length}</strong> perguntas!`;

      resultBox.classList.remove("hidden");
      resultBox.style.display = "block";
      resultBox.scrollIntoView({ behavior: "smooth" });

      console.log("Resultado do quiz exibido.");
    });
  } else {
    console.error("❌ Quiz não encontrado.");
  }

  // SlideShow
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlides() {
    slides.forEach(slide => slide.style.display = "none");
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000);
  }

  showSlides();

  window.changeSlide = (n) => {
    slideIndex += n;
    if (slideIndex < 1) slideIndex = slides.length;
    if (slideIndex > slides.length) slideIndex = 1;

    slides.forEach(slide => slide.style.display = "none");
    slides[slideIndex - 1].style.display = "block";
  };
});
