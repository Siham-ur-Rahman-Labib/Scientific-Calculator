document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const historyPanel = document.getElementById("historyPanel");
    const historyDiv = document.getElementById("history");
    const aboutModal = document.getElementById("aboutModal");
    let memory = 0;

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            if (value === "C") {
                display.value = "";
            } else if (value === "⌫") {
                display.value = display.value.slice(0, -1);
            } else if (value === "=") {
                try {
                    const result = Function('"use strict"; return (' + display.value + ')')();
                    historyDiv.innerHTML += `<p>${display.value} = ${result}</p>`;
                    display.value = result;
                } catch {
                    display.value = "Error";
                }
            } else if (value === "sqrt") {
                display.value = Math.sqrt(parseFloat(display.value));
            } else if (value === "square") {
                display.value = Math.pow(parseFloat(display.value), 2);
            } else if (value === "cube") {
                display.value = Math.pow(parseFloat(display.value), 3);
            } else if (value === "reciprocal") {
                display.value = 1 / parseFloat(display.value);
            } else if (["sin", "cos", "tan", "log"].includes(value)) {
                display.value = Math[value](parseFloat(display.value));
            } else {
                display.value += value;
            }
        });
    });

    document.querySelectorAll(".memory-btn").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            if (value === "MC") {
                memory = 0;
            } else if (value === "MR") {
                display.value = memory;
            } else if (value === "M+") {
                memory += parseFloat(display.value);
            } else if (value === "M-") {
                memory -= parseFloat(display.value);
            }
        });
    });

    document.querySelector(".history-btn").addEventListener("click", () => {
        historyPanel.style.display = historyPanel.style.display === "block" ? "none" : "block";
    });

    document.querySelector(".clear-history").addEventListener("click", () => {
        historyDiv.innerHTML = ""; // Clears history panel
    });

    document.querySelector(".about-btn").addEventListener("click", () => {
        aboutModal.classList.add("active");
    });

    document.querySelector(".close").addEventListener("click", () => {
        aboutModal.classList.remove("active");
    });
});