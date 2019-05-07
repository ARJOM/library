usuarios = [];

function carregar(){
    try {
        usuarios = getObjectLocalStorage("usuarios");
    }
    catch (usuarios){
        var admin = new Usuario("admin", "admin", "admin");
        usuarios.push(admin);
        setObjectLocalStorage("usuarios", usuarios);
    }
}

function cadastro() {
    if (typeof (Storage) !== "undefined") {
        var nome = document.getElementById("novo_nome").value;
        var senha = document.getElementById("nova_senha").value;

        var usuario = new Usuario(nome, senha, "normal");
        var usuarios = getObjectLocalStorage("usuarios");
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
            window.alert("logou");
        }
    };
}


function Usuario(nome, senha, tipo){
	this.nome = nome;
    this.senha = senha;
    this.tipo = tipo;
    this.descricao = function(){
        return "O usuário é: "+this.nome+"!";
    }
}

function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}