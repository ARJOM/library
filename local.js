let usuarios = [];

function carregar(){
    usuarios = getObjectLocalStorage("usuarios");
    console.log(usuarios);
    if (usuarios == null) {
        var admin = new Usuario("admin", "admin", "admin");
        console.log(usuarios);
        usuarios = [];
        usuarios.push(admin);
        console.log(usuarios);
        setObjectLocalStorage("usuarios", usuarios);
    } 
}


function cadastro() {
    if (typeof (Storage) !== "undefined") {
        var nome = document.getElementById("novo_nome").value;
        var senha = document.getElementById("nova_senha").value;

        var usuario = new Usuario(nome, senha, "normal");
        usuarios = getObjectLocalStorage("usuarios");
        usuarios.push(usuario);

        setObjectLocalStorage("usuarios", usuarios);

    } else {
        window.alert("API Web Storage não encontrada");
    }
}

function login() {
    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;

    var cadastrados = getObjectLocalStorage("usuarios");

    for (var i = 0; i < cadastrados.length; i++){
        resultado = cadastrados[i];
        if (resultado.nome == nome && resultado.senha == senha) {
            setObjectLocalStorage("logado", resultado);
            location.href = "account.html";
        }
    };
}

function exibir() {
    let usuario = getObjectLocalStorage("logado");
    
    let minhaSecao = document.getElementById("dados") ;
    let resultado = "Nome de Usuário:</br>Tipo: "+ usuario.tipo +"</br>Senha: "+usuario.senha;
    minhaSecao.innerHTML = resultado;
}

function updateUser() {
    // Ainda Nada
}

function delateUser() {
    var usuario = getObjectLocalStorage("logado")[0];
    let cadastrados = getObjectLocalStorage("usuarios");

    for (var i = 0; i < cadastrados.length; i++){
        resultado = cadastrados[i];
        if (usuario == resultado){
            cadastrados.splice(i);
        }
    }
    setObjectLocalStorage("usuarios", cadastrados);
    setObjectLocalStorage("logado", "");
    
}


//Classes

function Usuario(nome, senha, tipo){
	this.nome = nome;
    this.senha = senha;
    this.tipo = tipo;
    this.descricao = function(){
        return "O usuário é: "+this.nome+"!";
    }
}


// Funções Default

function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}