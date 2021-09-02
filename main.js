
// affichage produits dans la grille de la page d'acceuil
showProducts();

function showProducts (){
fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(data =>{

        let productGrid = "";
        data.forEach(element => productGrid +=`
            <article class="product">
                <div class="img-container">
                    <img src="${element.imageUrl}" alt="product" class="product-img">
                    <div class="info-btn">
                        <a href="produit.html?id=${element._id}" class="info-btn-link" >voir produit</a>
                    </div>     
                </div>
                <h3 class="text-center">${element.name}</h3>
                <h4 class="text-center">from ${element.price}€</h4>
            </article>
            `
        )
        document.querySelector('#product-grid').innerHTML = productGrid;
    });
} 

// Javascript Page Produit

// recuperation id de l'url
const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
const id = urlParams.get("id");

// affichage du produit par l'id
showProduct();

function showProduct () {
    fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(response => response.json())
    .then(data =>{
        let  productGrid =`
            <div class="col-md-4 mb-2">
                 <img src="${data.imageUrl}" alt="" class="product-img">
            </div>
            <div class="col-md-8 product-container-info">
                <h2 class="mb-2">${data.name}</h2>
                <select name="camera-type" id="type-selector" class="selector mb-2">
                    <option value="">choisissez un objectif...</option>
                </select>
                <h3>${data.price}€</h3>
                <button class="btn addtocart-btn my-2" id="addCartBtn">Ajouter au panier</button>
                <p class="product-discription w-75">${data.description}</p>
            </div>
            `;      
        document.querySelector('#product-container').innerHTML = productGrid; 

        let selectLense = ""
        let arrayLense = data.lenses ;
        arrayLense.forEach(element =>{
             selectLense += `
             <option value="type1">${element}</option>
             `
        })
        document.querySelector('#type-selector').innerHTML = selectLense;


// gestion des bouttons ajouter au panier

        const cartBtn = document.querySelector('#addCartBtn');
        cartBtn.addEventListener("click", ()=>{    
            cartNumbers();
            
        })

        function onLoadCartNumbers(){
            let productNumbers = localStorage.getItem('cartNumbers');
            if(productNumbers){
               document.querySelector('#cart-number').textContent= productNumbers;
            }
        }

        function cartNumbers(){
            let productNumbers = localStorage.getItem('cartNumbers');
            productNumbers = parseInt(productNumbers);
            if( productNumbers){
                localStorage.setItem('cartNumbers',productNumbers+1);
                document.querySelector('#cart-number').textContent= productNumbers + 1;
            } else {
                localStorage.setItem('cartNumbers', 1);
                document.querySelector('#cart-number').textContent= 1;

            }
                        
        }
        onLoadCartNumbers();

    });    
}

// Javascript Produit


