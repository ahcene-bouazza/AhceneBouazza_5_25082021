
// Variables
const url = "http://localhost:3000/api/cameras";
const basket = JSON.parse(localStorage.getItem("cameras")) || [] ;

// Fetch URL 
fetch(url)
    .then(response => response.json())
    .then(data => {   
        addProductList(data);    
    })
    .catch(erreur => console.log("error"));


// Function to fill product list
function addProductList(data){

    for(product of data){
       const element = document.getElementById("liste");

       element.innerHTML += `
            <article class="product">
                <div class="img-container">
                    <img src="${product.imageUrl}" alt="product" class="product-img">
                    <div class="info-btn">
                        <a href="/product.html?_id=${product._id}" class="info-btn-link" >voir produit</a>
                    </div>     
                </div>
                <h3 class="text-center">${product.name}</h3>
                <h4 class="text-center">from ${product.price/100}€</h4>
            </article>
            ` ;
    }
}

/*
// adding data to shopping cart
const cartNumber = document.getElementById('cart-number');
let no=0;
JSON.parse(localStorage.getItem('items')).map(data=>{
    no = no+data.no
});
cartNumber.innerHTML = no;
*/