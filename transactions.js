const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("data-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    // Check for negative value when type is "Entrada"
    if (type === "1" && value < 0) {
        alert("Valor negativo não é permitido para Entrada.");
        return;
    }

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    saveData(data);
    e.target.reset();

    myModal.hide();
    getTransaction();

    alert("Lançamento lançado, parça");
});

checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransaction();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "home.html";
}

function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}

function getTransaction() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach(transaction => {
            let type = "Entrada";

            if (transaction.type == "2") {
                type = "Saída";
            }
            transactionsHtml += `
                <tr>
                    <th scope="row">${transaction.date}</th>
                    <td>${transaction.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${transaction.description}</td>
                </tr>
            `;
        });
    }
    document.getElementById("transaction-list").innerHTML = transactionsHtml;
}