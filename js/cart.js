// Afficher les données dans le panier
const cartProductList = document.getElementById("productsBasket");
let cartProducts ='';

if(JSON.parse(localStorage.getItem('items')) === null){
    cartProducts = `
    <section id="emptyBasket">
    <div class="container my-3 py-1">
        <div class="text-center my-5 shadow p-3 mb-5 bg-body rounded">
            <h1 class="fs-1 font-weight-bold text-secondary my-5">Oups, votre panier semble vide, commencez vos achats
            </h1>
            <a role="button" class="btn btn-secondary text-uppercase my-3" href="../index.html">C'est par
                ici</a>
        </div>
    </div>
    </section>
    `;
    cartProductList.innerHTML= cartProducts;
}else{

    JSON.parse(localStorage.getItem('items')).forEach(element => {
        cartProducts += `
                <div id="singleProduct" class="${element.id}">
                <div class="product-img-container">
                    <img class="product-img" src="${element.image}" alt="image produit">
                </div>

                <div class="product-info">
                    <p class="product-title">${element.name}</p>
                    <p class="product-price"><span>${element.price}</span>€</p>
                    <p class="product-type"> option :<span>${element.option}</span></p>
                    <a href="#" class="remove-btn"> <i class="fas fa-trash-alt"></i> supprimer</a>
                </div>

                <div class="product-quantity ml-auto">
                    <i class="fas fa-sort-up " id="btnAddCart"></i>
                    <p class="cart-quantity ">${element.no}</p>
                    <i class="fas fa-sort-down " id="btnRemoveCart"></i>
                </div>
                </div>
        `;  

            });

    cartProductList.innerHTML= cartProducts;     
}


// supprimer produit :

const btnRemove = document.querySelectorAll(".remove-btn");
    
    btnRemove.forEach(btn=>{
        btn.addEventListener("click", (e)=>{
            
            if(JSON.parse(localStorage.getItem('items')).length > 1){

            let newCart = [];            
            JSON.parse(localStorage.getItem('items')).forEach(element=>{

                if(element.id !== e.target.parentElement.parentElement.className || element.option != e.target.parentElement.parentElement.children[1].children[2].children[0].textContent){
                    newCart.push(element);                   
                }
                localStorage.setItem('items',JSON.stringify(newCart));
                window.location.reload();     
            });

            }else{
                localStorage.clear();
                document.location.reload();
            }
        }); 
    });   


// Augementer quantité produit
    const addCartBtn = document.querySelectorAll("#btnAddCart");
    let items = [];
    
    addCartBtn.forEach(btn=>{
        btn.addEventListener("click", (e)=>{
            e.preventDefault();

            let item = {
            name : e.target.parentElement.parentElement.children[1].children[0].textContent,
            id : e.target.parentElement.parentElement.className,
            price : e.target.parentElement.parentElement.children[1].children[1].children[0].textContent,
            image : e.target.parentElement.parentElement.children[0].children[0].src,
            option : e.target.parentElement.parentElement.children[1].children[2].children[0].textContent,
            no : 1
            };
                
            if(JSON.parse(localStorage.getItem('items')) === null){
                items.push(item);
                localStorage.setItem("items",JSON.stringify(items));
                window.location.reload();
            }else{
                const localItems = JSON.parse(localStorage.getItem("items"));
                localItems.map(data=>{
                    if(item.id == data.id && item.option == data.option){
                        item.no = data.no + 1;
                    }else{
                        items.push(data);
                    }
                });
                items.push(item);
                localStorage.setItem('items',JSON.stringify(items));
                window.location.reload();
            }
        });
    });


    
// Diminuer quantité produit

    const removeCartBtn = document.querySelectorAll("#btnRemoveCart");
    let removedItems = [];

    removeCartBtn.forEach(btn=>{
        btn.addEventListener("click", (e)=>{
            e.preventDefault();

            let removeditem = {
            name : e.target.parentElement.parentElement.children[1].children[0].textContent,
            id : e.target.parentElement.parentElement.className,
            price : e.target.parentElement.parentElement.children[1].children[1].children[0].textContent,
            image : e.target.parentElement.parentElement.children[0].children[0].src,
            option : e.target.parentElement.parentElement.children[1].children[2].children[0].textContent,
            no : 1
            };
    
            if(JSON.parse(localStorage.getItem('items')) === null){
                removedItems.push(removeditem);
                localStorage.setItem("items",JSON.stringify(removedItems));
                window.location.reload();
            }else{
                const localItems = JSON.parse(localStorage.getItem("items"));
                localItems.map(data=>{
                    if(removeditem.id == data.id && removeditem.option == data.option){
                        if(data.no > 1){
                           removeditem.no = data.no - 1;
                        }else{
                           
                        }
                    }else{
                        removedItems.push(data);
                    }
                });
                removedItems.push(removeditem);
                localStorage.setItem('items',JSON.stringify(removedItems));
                window.location.reload();
            }
        });
    });




// adding data to shopping cart icon
    const cartNumber = document.getElementById('cart-number');
    no=0;
    JSON.parse(localStorage.getItem('items')).map(data=>{
        no = no+data.no
    });
    cartNumber.innerHTML = no;


// affichage du total
    const totalPrice = document.getElementById("totalPrice");

    function calcTotalCart() {
    let totalCart = 0;
    JSON.parse(localStorage.getItem('items')).forEach(element => {
        totalCart = totalCart + element.price * element.no;
    });
    return totalCart;
    }

    totalPrice.innerHTML += `${calcTotalCart()}<span>€</span>`;


// Afficher le formulaire

const formBlock = document.getElementById("form-container");
const orderBtn = document.getElementById("orderBtn");
let displayForm = '';



if(localStorage.getItem('items') === null){
    formBlock.innerHTML = null;
}else{
    displayForm =`
    <h2 class="form-title">Informations</h2>

    <form class="container contact__form"  id="orderForm">

    <label class ="label" for="firstname">PRENOM</label>
    <input class ="details__form" type="text" name="firstname" id="firstname" placeholder="Jhon" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />

    <label class ="label" for="name">NOM</label>
    <input class ="details__form" type="text" name="name" id="name" placeholder="Colin" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />


    <label class ="label" for="address">ADRESSE</label>
    <input class ="details__form" type="text" name="address" id="address" placeholder="20 rue lucille" maxlength="50" required />


    <label class ="label" for="city">VILLE</label>
    <input class ="details__form" type="text" name="city" id="city" placeholder="Paris" maxlength="50" pattern="[A-Za-z]{2,}" required />


    <label class ="label" for="email">EMAIL</label>
    <input class ="details__form" type="email" name="email" id="email"
        placeholder="Veulliez entrer une adresse valide: adresse@mail.com"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}" required />

    <button type="submit" class="validate btn-dark btn" id="submit" value="envoyer"> Valider vôtre commande </button>
    </form>

    `;

    formBlock.innerHTML = displayForm;
}
// Récupération des informations du formulaire
const submit = document.querySelector("#submit");
const basket = JSON.parse(localStorage.getItem("items"));


//validation du formulaire et envoie en POST
const order = document.getElementById("submit");
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

// ENVOI EN POST

submit.addEventListener("click", (e)=>{
    e.preventDefault();

    let contact = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("name").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };
    if (
        (regexMail.test(contact.email) == true) &
        (regexName.test(contact.firstName) == true) &
        (regexName.test(contact.lastName) == true) &
        (regexCity.test(contact.city) == true) &
        (regexAddress.test(contact.address) == true)
    ){

        let products = [];
        for (singleProduct of basket){
            products.push(singleProduct.id);
        }


        // Send Form and  order data to server

        fetch("http://localhost:3000/api/cameras/order", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contact, products }),
            })

            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("order", JSON.stringify(data));
                document.location.href = "order.html";
            })
            .catch((erreur) => console.log("erreur : " + erreur));
    
    }else{
        alert(
         "Veuillez correctement renseigner l'entièreté du formulaire pour valider votre commande."
        );
    }
    

});

