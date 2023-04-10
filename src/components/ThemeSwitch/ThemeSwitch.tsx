import "./themeswitch.css";
import React, { ChangeEventHandler } from "react";

const setDark = () => {
  localStorage.setItem("theme", "dark");
  document.body.classList.toggle("dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.body.classList.toggle("dark");
};

const storedTheme = localStorage.getItem("theme");

const prefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

const defaultLight =
  storedTheme === "light" || (storedTheme === null && prefersLight);

if (defaultLight) {
  setLight();
}

const toggleTheme: ChangeEventHandler<HTMLInputElement> = e => {
  if (e.target.checked) {
    setLight();
  } else {
    setDark();
  }
};

const ThemeSwitch = () => (
  <>
    <div className="w-auto px-0">
      <div className="d-flex align-items-center me-4 hp-header-search-button">
        <label className="dark-mode">
          <input
            type="checkbox"
            onChange={toggleTheme}
            defaultChecked={defaultLight}
          />
          <span></span>
        </label>
      </div>
    </div>
  </>
);

ThemeSwitch.displayName = "ThemeSwitch";
export default ThemeSwitch;
