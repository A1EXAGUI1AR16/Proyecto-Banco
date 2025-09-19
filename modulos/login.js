import { paginaPrincipal } from "./principal.js"
import { obtenerUsuarioLogueado } from "./usuarios.js";
import { mostrarModalCambiarPass } from "./password.js";

export function login(interfazLogin) {
    interfazLogin.innerHTML = `
    <div class="cabecero">
      <h2>Bienvenido</h2>
      <input id="username" type="text" placeholder="Nombre de Usuario"><br>
      <input id="password" type="password" placeholder="Contraseña"><br>
      <button id="loginBtn">Entrar</button>
      <button id="changePassBtn">Cambiar Contraseña</button>
    </div>
  `;

    document.getElementById('loginBtn').onclick = async () => {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        if (username === '' || password === '') {
            alert('Por favor, llena todos los campos.');
        } else {
            const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
            const user = await res.json();
            if (user.length > 0) {
                obtenerUsuarioLogueado(user[0]);
                paginaPrincipal(interfazLogin);
            } else {
                alert("Usuario o Contraseña Incorrectos");
            }
        }
    };

    document.getElementById("changePassBtn").onclick = () => {
        mostrarModalCambiarPass(interfazLogin);
    };

    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
}
