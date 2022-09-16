let darkMode = localStorage.getItem("dark-mode");
const themeSwitch = document.querySelector("#toogleSlider");

const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
}

const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", null);
}

if (darkMode === "enabled") {
    enableDarkMode();
} else {
    disableDarkMode();
}


themeSwitch.addEventListener("click", () => {
    let darkMode = localStorage.getItem("dark-mode");

    if (darkMode !== "enabled") {
        enableDarkMode();

    } else {
        disableDarkMode();
    }
})