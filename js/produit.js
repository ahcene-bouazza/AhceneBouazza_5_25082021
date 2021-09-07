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


       // setup boutton Ajouter au panier 
        const addToCartBtn = document.getElementById("addToCart");
        addToCartBtn.addEventListener("click", e=>{
        e.preventDefault();
        
            let item = {
            name : e.target.parentElement.children[0].textContent,
            id : e.target.parentElement.children[0].id,
            price : e.target.parentElement.children[2].children[0].textContent,
            image : e.target.parentElement.parentElement.children[0].children[0].src,
            option : e.target.parentElement.children[1].children[0].value,
            no : 1
        };

        // fonction popup ajout panier
        const poPup = ()=> {
        if (window.confirm(`${e.target.parentElement.children[0].textContent} à bien été ajouté au panier, consulter le panier OK ou revenir à l'accueil ANNULER`)){
        window.location.href = "cart.html" ;
        }else{
        window.location.href = "index.html" ;
        }
        }

        // local Storage setup
       
       let items = JSON.parse(localStorage.getItem("produit"));


        if(items){
            items.push(item);
            localStorage.setItem("produit", JSON.stringify(items));
            window.location.reload();
            poPup();
        }else{
            items = [];
            items.push(item);
            localStorage.setItem("produit", JSON.stringify(items));
            poPup();

        }
    


        // local storage test

        // localStorage.setItem('data', '[1, 2, 3]');
        const addToCartBtn = document.getElementById("addToCart");
        let items = [];
        


/*        addToCartBtn.addEventListener("click", e=>{
        e.preventDefault();

            let item = {
            name : e.target.parentElement.children[0].textContent,
            id : e.target.parentElement.children[0].id,
            price : e.target.parentElement.children[2].children[0].textContent,
            image : e.target.parentElement.parentElement.children[0].children[0].src,
            option : e.target.parentElement.children[1].children[0].value,
            no : 1
            };

            if(localStorage.getItem('produit') == null){
            items.push(item);
            localStorage.setItem('produit', JSON.stringify(items));
            }
            else{
                let newitems = JSON.parse(localStorage.getItem('produit'));

                newitems.map(data=>{
                    if(item.id == data.id){
                    item.no = data.no +1 ;
                    localStorage.setItem('produit', JSON.stringify(items));

                    }else{
                    newitems.push(item);
                    localStorage.setItem('produit', JSON.stringify(items));
                        }
                });
            items.push(item);
            localStorage.setItem('produit', JSON.stringify(items));

/*            }

        // local storage end test

    // add event listener end
       });

    // fetch function end
    });
    


    // Cart number icon
    let items = JSON.parse(localStorage.getItem("produit"));
    const cartNumber = document.getElementById('cart-number');
    let no=0;
    items.forEach(data=>{
        no = no+data.no
    });
    cartNumber.innerHTML = no;







