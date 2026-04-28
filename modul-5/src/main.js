import "./style.css";

// DARK MODE TOGGLE
const btn = document.getElementById("toggleDark");

if (btn) {
  btn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  });
}

// LOAD MODE
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}
