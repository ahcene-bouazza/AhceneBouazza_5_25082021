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


    // LocalStorage
    const addToCartBtn = document.getElementById("addToCart");
    let items =[];
    addToCartBtn.addEventListener("click", function(e){
    
    if(typeof(Storage) !== 'undefined'){
        let item = {
            id: e.target.parentElement.children[0].id,
            name : e.target.parentElement.children[0].textContent,
            price: e.target.parentElement.children[2].children[0].textContent,
            no: 1
        };
        if(JSON.parse(localStorage.getItem('items')) === null){
            items.push(item);
            localStorage.setItem("items", JSON.stringify(items));
            window.location.reload();
        }else{
            const localItems = JSON.parse(localStorage.getItem("items"));
            localItems.map(data=>{
                if(item.id == data.id){
                    item.no = data.no + 1;
                }else{
                    items.push(data);
                }
            });
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
            window.location.reload();         
        }
    
    }else{
        alert('local storage is not working on your browser');
    }

    });
     
    // adding data to shopping cart
    const cartNumber = document.getElementById('cart-number');
    let no=0;
    JSON.parse(localStorage.getItem('items')).map(data=>{
        no = no+data.no
    });
    cartNumber.innerHTML = no;

    
    // show products on cart

    });