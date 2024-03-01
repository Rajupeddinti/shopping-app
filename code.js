let products = document.querySelector('.products')
let cartitems = document.querySelector('.cartitems')
let dynamic_count = document.querySelector('.dynamic_count ')
let Total = document.querySelector('.Total')
let arrr= [];
let totalprice = [];
// fetch data from api

async function getdata(){
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    console.log(data)

    data.map((product)=>{ 
        let maindiv = document.createElement("div")
        let createimg = document.createElement("img")         // image
        createimg.setAttribute("src", product.image)
        createimg.setAttribute("class", "product-image")
        maindiv.setAttribute("class", "product")
        let createTitle = document.createElement("h2")        // title
        createTitle.innerHTML = product.title.slice(0,20) + '...'
        let createCategory = document.createElement("h3")       // category
        createCategory.innerHTML = product.category  
        let createDescription = document.createElement("p")   // description
        createDescription.innerHTML = product.description.slice(0,100) + ' ...more'
        let pricecontainer =  document.createElement("div")
        pricecontainer.setAttribute("class", "price-container")
        let createPrice = document.createElement("b")
        let createText = document.createTextNode(`$${product.price}`)
        createPrice.appendChild(createText)
        let createbtn = document.createElement("Button")
        createbtn.setAttribute("class", "fa-solid fa-cart-shopping fa-lg")
        maindiv.appendChild(createimg)
        maindiv.appendChild(createTitle)
        maindiv.appendChild(createCategory)
        maindiv.appendChild(createDescription)
        maindiv.appendChild(pricecontainer)

        
        pricecontainer.appendChild(createText)
        pricecontainer.appendChild(createbtn)
        products.appendChild(maindiv)
       
        
        
        function addtocart(img,price){
            alert("product added to the cart")
            dynamic_count.innerHTML ++
            arrr.push({img,price})
            let div = document.createElement("div")
            div.setAttribute("class", "cart")
            let cartitem = document.createElement("img")
            cartitem.setAttribute("src", img)
            let cartprice = document.createElement("p")
            let cartpricetext = document.createTextNode(`$${price}`)
            cartprice.appendChild(cartpricetext)
            let cartimg = document.createElement("i")
            cartimg.setAttribute("class","fa-solid fa-trash fa-lg")
            function deleteitem(){
                alert("Remove item from cart")
                div.remove()
                console.log(div)
                dynamic_count.innerHTML--
                let mytota = totalprice.reduce((accum,curval)=>{
                    return (accum + curval);
                })
                Total.innerHTML = `Total price : $${mytota - price}`
                console.log(price)
            }
            cartimg.addEventListener("click", deleteitem)
            div.appendChild(cartitem)
            div.appendChild(cartpricetext)
            div.appendChild(cartimg)
            cartitems.appendChild(div)
            totalprice.push(price)
            let mytotal = totalprice.reduce((accum,curval)=>{
                return accum + curval;
            })
            Total.innerHTML = `Total price : $${mytotal}`
    
        }
        createbtn.addEventListener("click", ()=>addtocart(product.image, + product.price))
    })
}
getdata()

