// 1. Declaramos las variables principales (colors y pickedColor sin valor inicial)
let numSquares = 6;
let colors = [];
let pickedColor;

// 2. Seleccionamos los elementos del HTML
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.getElementById("message");
let h1 = document.getElementById("h1");
let resetButton = document.getElementById("reset");
let modeButtons = document.querySelectorAll(".mode");

// 3. Ejecutamos la función principal que arranca todo el juego
init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

// Configura los botones de dificultad (.mode)
function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      // Quitamos la clase selected de ambos y se la ponemos al cliqueado
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      // Operador ternario: si dice "EASY" son 3 cuadrados, sino 6
      this.textContent === "EASY" ? (numSquares = 3) : (numSquares = 6);

      reset();
    });
  }
}

// Configura los clics de cada cuadrado
function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      let clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "¡Correcto!";
        resetButton.textContent = "Play Again?";
        h1.style.backgroundColor = clickedColor;
        changeColors(clickedColor);
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Intentalo Nuevamente";
      }
    });
  }
}

// Reinicia el juego (sirve para iniciar, cambiar dificultad o tocar Nuevos Colores)
function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "Nuevos Colores";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue";

  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

// El botón #reset ahora llama directamente a la función reset
resetButton.addEventListener("click", function() {
  reset();
});

// --- FUNCIONES AUXILIARES ---
function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}