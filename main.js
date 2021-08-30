
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

function navigate(productId){
    window.location.href= '/produit.html?id='+productId.value;
}