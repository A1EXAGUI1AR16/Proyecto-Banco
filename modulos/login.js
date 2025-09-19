import {paginaPrincipal} from "./principal.js"
export function login(interfazLogin){
    interfazLogin.innerHTML = `
    <h2>Login</h2>
    <input id="username" type="text" placeholder="Nombre de Usuario"><br>
    <input id="password" type="password" placeholder="Contraseña"><br>
    <button id="loginBtn">Entrar</button>
  `;
document.getElementById('loginBtn').onclick =
    async ()  =>{
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        const res = await fetch(`http://localhost:3000/users?username${username}&password=${password}`);
        const user = await res.json();
        if(user.length > 0) {
            paginaPrincipal(interfaz);
        }   else    {
            alert("Usuario o Contraseña Incorrectos");
        }
    }  
}
