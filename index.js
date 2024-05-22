
const myModal = new bootstrap.Modal("#register-modal");

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const session = document.getElementById("session-input").checked;
    const account = getAccount(email);

    if (!account) {
        alert("Usuário não encontrado");
        return;
    }

    if (account.password !== password) {
        alert("Algo de errado não está certo, champs");
        return;
    }

    saveSession(email, session);

    window.location.href = "home.html";
});

document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    const confirmPassword = document.getElementById("confirm-password-input").value;

    if (email.length < 5) {
        alert("Digite um email válido.");
        return;
    }

    if (password.length < 3) {
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso!");
});

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    return account ? JSON.parse(account) : null;
}

function checkLogged() {
    const session = localStorage.getItem("session");
    const logged = sessionStorage.getItem("logged");

    if (session) {
        sessionStorage.setItem("logged", session);
    }

    if (logged) {
        saveSession(logged, true);
        window.location.href = "home.html";
    }
}

checkLogged();