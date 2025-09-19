export function mostrarModalCambiarPass(interfaz) {
    const modal = document.createElement("div");
    modal.innerHTML = `
    <div style="background:white; padding:20px; border-radius:8px; text-align:center;">
      <h3>Cambiar Contraseña</h3>
      <input id="userChange" type="text" placeholder="Usuario"><br><br>
      <input id="newPass" type="password" placeholder="Nueva contraseña"><br><br>
      <button id="guardarNuevaPass">Guardar</button>
      <button id="cerrarModal">Cancelar</button>
    </div>
  `;

    document.body.appendChild(modal);

    document.getElementById("cerrarModal").onclick = () => {
        modal.remove();
    };

    document.getElementById("guardarNuevaPass").onclick = async () => {
        const username = document.getElementById("userChange").value;
        const nuevaPass = document.getElementById("newPass").value;

        if (username === "" || nuevaPass === "") {
            alert("Por favor llena todos los campos");
            return;
        }

        const res = await fetch(`http://localhost:3000/users?username=${username}`);
        const user = await res.json();

        if (user.length === 0) {
            alert("Usuario no encontrado");
            return;
        }

        const userId = user[0].id;

        await fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: nuevaPass })
        });

        alert("Contraseña actualizada");
        modal.remove();
    };
}
