let carts=document.querySelectorAll('.add-cart');
let products=[
    {
        name:'Black T-shirt',
        tag:'blacktshirt',
        price:15.00,
        inCart:0

    },
    {
        name:'Blue T-shirt',
        tag:'bluetshirt',
        price:20.00,
        inCart:0

    },
    {
        name:'Grey T-shirt',
        tag:'greytshirt',
        price:25.00,
        inCart:0

    }
];
for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}
 function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
 }


function cartNumbers(products){
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if (productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);  
        document.querySelector('.cart span').textContent=1; 
    }
    setItem(products);
}
function setItem(products){
    let cartItems=localStorage.getItem('productsInCart');
        cartItems=JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[products.tag] == undefined){
            cartItems={
                ...cartItems,
                [products.tag]:products
            }
            
        }
        cartItems[products.tag].inCart +=1
    } else{
        products.inCart=1;
        cartItems={
        [products.tag]:products
    }
}
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));


}
 function totalCost(products){
    //console.log("the product price is ",products.price);
    let cartCost=localStorage.getItem('totalCost');
    
    console.log("My cartCost is",cartCost);
    console.log(typeof cartCost);
    if(cartCost != null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + products.price);
    }else{
        localStorage.setItem("totalCost",products.price);
    }  
 }

function displayCart(){
    let cartItems=localStorage.getItem("productsInCart");
        cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".products");
    let cartCost=localStorage.getItem('totalCost');
    
    if (cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=`
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./Shopping Cart/images/${item.tag}.jpeg">
                <span>${item.name}</span>
            </div>
            <div class="price">GH¢${item.price}.00</div>
            <div class="quantity">
            <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
                GH¢${item.inCart*item.price}.00
            </div>
            `;
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer" >
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">GH¢${cartCost}.00</h4>

        </div>
        `;
    }
}

onLoadCartNumbers();
displayCart();

