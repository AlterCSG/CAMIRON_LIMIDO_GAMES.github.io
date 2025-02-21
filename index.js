
document.getElementById("nameForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue

    let playerName = document.getElementById("playerName").value;
    localStorage.setItem("playerName", playerName); // Guarda el nombre en localStorage

    // Cargar la nueva pantalla con el nombre del usuario
    document.getElementById("content").innerHTML = `
                <h1>¡Bienvenido, ${playerName}!</h1>
                <p>Selecciona un minijuego:</p>
                <form id="gameForm">
                    <button type="button" onclick="startGame('minijuego1.html')">Minijuego 1</button>
                    <button type="button" onclick="startGame('minijuego2.html')">Minijuego 2</button>
                    <button type="button" onclick="startGame('minijuego3.html')">Minijuego 3</button>
                    <button type="button" onclick="startGame('minijuego4.html')">Minijuego 4</button>
                </form>
            `;
});

function startGame(page) {
    window.location.href = page; // Redirige a la página del minijuego
}
