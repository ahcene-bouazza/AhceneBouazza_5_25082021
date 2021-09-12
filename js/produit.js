// Get id From URL
const searchParams = new URLSearchParams(location.search);
const id = searchParams.get("_id");


// URL Single Product Fetch
const newUrl = `http://localhost:3000/api/cameras/${id}`;


// Fetch new URL
fetch(newUrl)
.then(response=> response.json())
.then(data=>{
    const product = data;
    viewSingleProduct(data);
    
    // Function to view single product page
    function viewSingleProduct(product){

        const element = document.getElementById("product-container");
        element.innerHTML=`
                <div class="col-md-4 mb-2">
                    <img src="${product.imageUrl}" alt="" class="product-img">
                </div>
                <div class="col-md-8 product-container-info">
                    <h2 class="mb-2" id="${product._id}">${product.name}</h2>
                    <select name="camera-type" id="option" class="selector mb-2">
                        <option value="">choisissez un objectif...</option>
                    </select>
                    <h3><span>${product.price/100}</span>€</h3>
                    <button class="btn addtocart-btn my-2" id="addToCart">Ajouter au panier</button>
                    <p class="product-discription w-75">${product.description}</p>
                </div>       
        `;
            // function to select product option
            let selectLense = ""
            let arrayLense = product.lenses ;
            arrayLense.forEach(element =>{
                selectLense += `
                <option value="${element}">${element}</option>
                `        
            })
            document.querySelector('#option').innerHTML = selectLense;
     }


        // fonction popup ajout panier
        const poPup = ()=> {
        if (window.confirm(`${e.target.parentElement.children[0].textContent} à bien été ajouté au panier, consulter le panier OK ou revenir à l'accueil ANNULER`)){
        window.location.href = "cart.html" ;
        }else{
        window.location.href = "index.html" ;
        }
        }

        // local Storage setup
        const addToCartBtn = document.getElementById("addToCart");
        let items = [];
       
        addToCartBtn.addEventListener("click", e=>{
            e.preventDefault();

                let item = {
                name : e.target.parentElement.children[0].textContent,
                id : e.target.parentElement.children[0].id,
                price : e.target.parentElement.children[2].children[0].textContent,
                image : e.target.parentElement.parentElement.children[0].children[0].src,
                option : (e.target.parentElement.children[1].selectedIndex)+1,
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

    // fetch function end
    });
    

// adding data to shopping cart
const cartNumber = document.getElementById('cart-number');
let no=0;
JSON.parse(localStorage.getItem('items')).map(data=>{
    no = no+data.no
});
cartNumber.innerHTML = no;




