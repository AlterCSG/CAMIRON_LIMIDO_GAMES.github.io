const palabras = [
  // Videojuegos
  "mario", "zelda", "sonic", "megaman", "pacman", "halo", "fortnite", "minecraft", "skyrim", "doom",
  "fallout", "pokemon", "metroid", "tetris", "overwatch", "roblox", "starcraft", "bloodborne", "dark souls", "cyberpunk",
  "uncharted", "bioshock", "warcraft", "diablo", "street fighter", "tekken", "call of duty", "battlefield", "far cry", "resident evil",
  
  // Películas
  "matrix", "avengers", "inception", "interstellar", "batman", "superman", "godzilla", "spiderman", "jurassic park", "terminator",
  "alien", "predator", "star wars", "harry potter", "lotr", "deadpool", "wolverine", "shrek", "avatar", "ghostbusters",

  // Animes
  "naruto", "sasuke", "sakura", "itachi", "dragon ball", "goku", "vegeta", "one piece", "luffy", "zoro",
  "bleach", "ichigo", "rukia", "death note", "kira", "light", "misa", "attack on titan", "eren", "mikasa",
  "tanjiro", "nezuko", "demon slayer", "hunter x hunter", "gon", "killua", "hisoka", "saitama", "one punch man", "fullmetal alchemist",
  "edward", "alphonse", "tokyo ghoul", "kaneki", "black clover", "asta", "yuno", "chainsaw man", "denji", "makima"
];

let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let palabraAdivinada = Array(palabraSecreta.length).fill("_").join(" ");
let intentos = 6;

document.getElementById("palabra").textContent = palabraAdivinada;
document.getElementById("intentos").textContent = intentos;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

drawBase();

function verificarLetra() {
    let letra = document.getElementById("letra").value.toLowerCase();
    document.getElementById("letra").value = "";
    
    if (letra && palabraSecreta.includes(letra)) {
        let nuevaPalabra = palabraAdivinada.split(" ");
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                nuevaPalabra[i] = letra;
            }
        }
        palabraAdivinada = nuevaPalabra.join(" ");
    } else {
        intentos--;
        drawFigure(6 - intentos);
    }
    
    document.getElementById("palabra").textContent = palabraAdivinada;
    document.getElementById("intentos").textContent = intentos;
    
    if (!palabraAdivinada.includes("_")) {
        document.getElementById("mensaje").textContent = "¡Ganaste!";
        document.getElementById("botonProbar").style.display = "none";
        document.getElementById("botonNuevaPartida").style.display = "inline";
    } else if (intentos === 0) {
        document.getElementById("mensaje").textContent = "Perdiste. La palabra era: " + palabraSecreta;
        document.getElementById("botonProbar").style.display = "none";
        document.getElementById("botonNuevaPartida").style.display = "inline";
    }
}

function drawBase() {
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(10, 240);
    ctx.lineTo(190, 240);
    ctx.moveTo(50, 240);
    ctx.lineTo(50, 20);
    ctx.lineTo(120, 20);
    ctx.lineTo(120, 50);
    ctx.stroke();
}

function drawFigure(step) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    switch(step) {
        case 1:
            ctx.arc(120, 70, 20, 0, Math.PI * 2); // Cabeza
            break;
        case 2:
            ctx.moveTo(120, 90);
            ctx.lineTo(120, 150); // Cuerpo
            break;
        case 3:
            ctx.moveTo(120, 100);
            ctx.lineTo(100, 130); // Brazo izquierdo
            break;
        case 4:
            ctx.moveTo(120, 100);
            ctx.lineTo(140, 130); // Brazo derecho
            break;
        case 5:
            ctx.moveTo(120, 150);
            ctx.lineTo(100, 190); // Pierna izquierda
            break;
        case 6:
            ctx.moveTo(120, 150);
            ctx.lineTo(140, 190); // Pierna derecha
            break;
    }
    ctx.stroke();
}

function nuevaPartida() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    palabraAdivinada = Array(palabraSecreta.length).fill("_").join(" ");
    intentos = 6;

    document.getElementById("palabra").textContent = palabraAdivinada;
    document.getElementById("intentos").textContent = intentos;
    document.getElementById("mensaje").textContent = "";
    
    // Limpiar el canvas (rehacer la base)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();
    
    // Mostrar el botón "Probar" y ocultar el de "Nueva Partida"
    document.getElementById("botonProbar").style.display = "inline";
    document.getElementById("botonNuevaPartida").style.display = "none";
}
