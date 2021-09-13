const order = JSON.parse(localStorage.getItem("order")) || [];


// affiche Mes informations
const informations = document.getElementById("order__confirmed");
informations.innerHTML += `
    <p class="fs-5"><span class="font-weight-bold text-capitalize">${order.contact.firstName}</span>, merci pour votre achat sur notre site !</p>
    <p class="fs-5">Votre facture va vous être transmise par mail à : <span class="font-weight-bold">${order.contact.email}</span>.</p>
    <p class="fs-5">Votre commande sera envoyée à l'adresse suivante :
    <div class=" fs-5 font-weight-bold">
        <p class="text-capitalize">${order.contact.firstName} ${order.contact.lastName}, ${order.contact.address}, ${order.contact.city} </p>
    </div>
    `;

//clear localStorage
const homeBtn = document.getElementById("home_btn");

homeBtn.addEventListener("click", () => {
    clearBasket();
});


// supprimer le Panier
function clearBasket() {
localStorage.clear();
}