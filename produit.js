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
        cartBtn.addEventListener("click", (e)=>{
            event.preventDefault();

        })


    });    
}




