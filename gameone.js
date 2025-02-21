document.addEventListener("DOMContentLoaded", () => {
    const celdas = document.querySelectorAll(".celda");
    const turnoTexto = document.getElementById("turno");
    const reiniciarBtn = document.getElementById("reiniciar");
    const mensaje = document.getElementById("mensaje");
    let turno = "X";
    let tablero = Array(9).fill(null);

    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const verificarGanador = () => {
        for (let [a, b, c] of combinacionesGanadoras) {
            if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                mostrarMensaje(`¡${tablero[a]} ha ganado!`, tablero[a] === "X" ? "mensaje-ganar" : "mensaje-perder");
                return true;
            }
        }
        if (!tablero.includes(null)) {
            mostrarMensaje("¡Es un empate!", "mensaje-perder");
            return true;
        }
        return false;
    };
//
    const turnoIA = () => {
        let mejorMovimiento = minimax(tablero, "O").index;
        if (mejorMovimiento !== -1) {
            tablero[mejorMovimiento] = "O";
            celdas[mejorMovimiento].textContent = "O";
            if (!verificarGanador()) {
                turno = "X";
                turnoTexto.textContent = turno;
            }
        }
    };

    const minimax = (nuevoTablero, jugador) => {
        let espaciosLibres = nuevoTablero.map((v, i) => v === null ? i : null).filter(v => v !== null);
        if (verificarGanador())
            return {score: jugador === "O" ? -1 : 1};
        if (espaciosLibres.length === 0)
            return {score: 0};
        let movimientos = [];
        for (let i of espaciosLibres) {
            let nuevoTableroCopia = [...nuevoTablero];
            nuevoTableroCopia[i] = jugador;
            let resultado = minimax(nuevoTableroCopia, jugador === "O" ? "X" : "O");
            movimientos.push({index: i, score: resultado.score});
        }
        return movimientos.reduce((mejor, m) => jugador === "O" ? (m.score < mejor.score ? m : mejor) : (m.score > mejor.score ? m : mejor));
    };

    const mostrarMensaje = (texto, clase) => {
        mensaje.textContent = texto;
        mensaje.className = `mensaje ${clase}`;
        mensaje.style.display = "block";
    };

    celdas.forEach(celda => {
        celda.addEventListener("click", () => {
            let index = celda.getAttribute("data-index");
            if (!tablero[index] && turno === "X") {
                tablero[index] = "X";
                celda.textContent = "X";
                if (!verificarGanador()) {
                    turno = "O";
                    turnoTexto.textContent = turno;
                    setTimeout(turnoIA, 500);
                }
            }
        });
    });

    reiniciarBtn.addEventListener("click", () => location.reload());
});