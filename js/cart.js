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
                    <p class="product-type"> option : ${element.option}</p>
                    <a href="#" class="remove-btn"> <i class="fas fa-trash-alt"></i> supprimer</a>
                </div>

                <div class="product-quantity ml-auto">
                    <i class="fas fa-sort-up btn-addCart"></i>
                    <p class="cart-quantity ">${element.no}</p>
                    <i class="fas fa-sort-down btn-removeCart"></i>
                </div>
                </div>
        `;  

            });

    cartProductList.innerHTML= cartProducts;     
}


// boutton supprimer produit panier
    const btnRemove = document.querySelectorAll("#removeItem")


    btnRemove.forEach( button=>{

    button.addEventListener("click", (e)=>{

    let newCart = [] ;

    JSON.parse(localStorage.getItem('items')).map( data=>{
        
        if (data.id !== e.target.parentElement.parentElement.id){
        newCart.push(data);
        }
    });
    localStorage.setItem('produit', JSON.stringify(newCart))
    window.location.reload();


    })
})


/*
// adding data to shopping cart
    const cartNumber = document.getElementById('cart-number');
    let no=0;
    JSON.parse(localStorage.getItem('items')).map(data=>{
        no = no+data.no
    });
    cartNumber.innerHTML = no;
*/




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


