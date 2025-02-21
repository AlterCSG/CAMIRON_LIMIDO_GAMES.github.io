document.addEventListener("DOMContentLoaded", () => {
    const apuestaBotones = document.querySelectorAll(".apuesta");
    const tablaCeldas = document.querySelectorAll(".tabla-ruleta td");
    const girarBtn = document.getElementById("girar");
    const mensaje = document.getElementById("mensaje");
    const bola = document.querySelector(".bola");
    const ruleta = document.querySelector(".ruleta");
    let apuestas = new Set();

    // Manejar selección de apuestas
    apuestaBotones.forEach(boton => {
        boton.addEventListener("click", () => {
            const value = boton.getAttribute("data-value");
            if (apuestas.has(value)) {
                apuestas.delete(value);
                boton.style.background = "#0033cc";
            } else {
                apuestas.add(value);
                boton.style.background = "#002699";
            }
        });
    });

    // Manejar selección de números en la tabla
    tablaCeldas.forEach(celda => {
        celda.addEventListener("click", () => {
            const value = celda.getAttribute("data-value");
            if (apuestas.has(value)) {
                apuestas.delete(value);
                celda.style.outline = "none";
            } else {
                apuestas.add(value);
                celda.style.outline = "2px solid yellow";
            }
        });
    });

    // Función para girar la ruleta
    girarBtn.addEventListener("click", () => {
        const resultado = Math.floor(Math.random() * 18);
        let color = "negro";
        if (resultado === 0)
            color = "verde";
        else if ([1, 3, 5, 7, 9, 11, 13, 15, 17].includes(resultado))
            color = "rojo";

        // Girar la ruleta visualmente
        const giro = Math.floor(Math.random() * 360) + 1440; // Al menos 4 vueltas
        ruleta.style.transition = "transform 3s ease-out";
        ruleta.style.transform = `rotate(${giro}deg)`;

        // Animación de la bola
        bola.style.transition = "transform 3s ease-out";
        bola.style.transform = `rotate(${giro * -2}deg)`;

        setTimeout(() => {
            if (apuestas.has(resultado.toString()) || apuestas.has(color) ||
                    (resultado % 2 === 0 && apuestas.has("par")) ||
                    (resultado % 2 !== 0 && apuestas.has("impar"))) {
                mensaje.textContent = `¡Ganaste! Salió el ${resultado} (${color})`;
                mensaje.style.color = "lime";
            } else {
                mensaje.textContent = `Perdiste. Salió el ${resultado} (${color})`;
                mensaje.style.color = "red";
            }
        }, 3000);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const apuestaBotones = document.querySelectorAll(".apuesta");
    const tablaCeldas = document.querySelectorAll(".tabla-ruleta td");
    const girarBtn = document.getElementById("girar");
    const mensaje = document.getElementById("mensaje");
    const bola = document.querySelector(".bola");
    const ruleta = document.querySelector(".ruleta");
    const montoInput = document.getElementById("monto");
    const creditosSpan = document.getElementById("creditos");

    let apuestas = new Set();
    let creditos = 1000;  // Créditos iniciales

    // Cargar sonidos
    const sonidoGiro = new Audio("sonidos/giro.mp3");
    const sonidoVictoria = new Audio("sonidos/victoria.mp3");
    const sonidoPerdida = new Audio("sonidos/perder.mp3");

    // Manejar selección de apuestas
    apuestaBotones.forEach(boton => {
        boton.addEventListener("click", () => {
            const value = boton.getAttribute("data-value");
            if (apuestas.has(value)) {
                apuestas.delete(value);
                boton.style.background = "#0033cc";
            } else {
                apuestas.add(value);
                boton.style.background = "#002699";
            }
        });
    });

    // Girar la ruleta
    girarBtn.addEventListener("click", () => {
        let apuestaMonto = parseInt(montoInput.value);

        // Validar que la apuesta sea válida
        if (isNaN(apuestaMonto) || apuestaMonto <= 0) {
            mensaje.textContent = "Introduce un monto válido.";
            mensaje.style.color = "yellow";
            return;
        }

        if (apuestaMonto > creditos) {
            mensaje.textContent = "No tienes suficientes créditos.";
            mensaje.style.color = "red";
            return;
        }

        sonidoGiro.play(); // 🔊 Sonido de giro

        const resultado = Math.floor(Math.random() * 18);
        let color = "negro";
        if (resultado === 0)
            color = "verde";
        else if ([1, 3, 5, 7, 9, 11, 13, 15, 17].includes(resultado))
            color = "rojo";

        // Girar la ruleta visualmente
        const giro = Math.floor(Math.random() * 360) + 1440;
        ruleta.style.transition = "transform 3s ease-out";
        ruleta.style.transform = `rotate(${giro}deg)`;

        // Animación de la bola
        bola.style.transition = "transform 3s ease-out";
        bola.style.transform = `rotate(${giro * -2}deg)`;

        setTimeout(() => {
            let gano = false;

            if (apuestas.has(resultado.toString()) || apuestas.has(color) ||
                    (resultado % 2 === 0 && apuestas.has("par")) ||
                    (resultado % 2 !== 0 && apuestas.has("impar"))) {
                gano = true;
            }

            if (gano) {
                creditos += apuestaMonto * 2; // Gana el doble de lo apostado
                mensaje.textContent = `¡Ganaste ${apuestaMonto * 2} créditos! Salió el ${resultado} (${color})`;
                mensaje.style.color = "lime";
                sonidoVictoria.play();
            } else {
                creditos -= apuestaMonto; // Pierde la cantidad apostada
                mensaje.textContent = `Perdiste ${apuestaMonto} créditos. Salió el ${resultado} (${color})`;
                mensaje.style.color = "red";
                sonidoPerdida.play();
            }

            creditosSpan.textContent = creditos;

            // Si el jugador se queda sin créditos
            if (creditos <= 0) {
                mensaje.textContent = "¡Te quedaste sin créditos! Recarga para seguir jugando.";
                girarBtn.disabled = true;
            }

        }, 3000);
    });
});
