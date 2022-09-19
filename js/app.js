const arr = [];

const loadProducts = (url) => {
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         arr.push(data);
         showProducts(data);
      });
};

loadProducts('https://fakestoreapi.com/products');

// show all product in UI
const showProducts = (products) => {

   setInnerText('total_products', products.length);

   document.getElementById("all-products").innerHTML = "";

   // const allProducts = products.slice(0, 10).map((pd) => pd);
   const allProducts = products.map((pd) => pd);//show total product solved-08
   for (const product of allProducts) {
      // const image = product.images;
      const image = product.image; // line23-resolved-01-show img
      // console.log(product); //check undefined
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>

      <button onclick="showProductDetails(${product.id})" id="details-btn"    data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success border-0 w-100 rounded-0 bg-main py-2">Add to cart</button>
      `;
      document.getElementById('all-products').appendChild(div);
   }
};

let count = 0;

const addToCart = (id, price) => {
   count = count + 1;
   // updatePrice('price', value);
   updatePrice('price', price); //line-49 resolved-02-add to cart

   updateTaxAndCharge();
   updateTotal(); // add -04-update total
   document.getElementById('total-Products').innerText = count;
};

const showProductDetails = (product_id) => {
   console.log(product_id);
   fetch(`https://fakestoreapi.com/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => showProductDetailsInModal(data));
};

const showProductDetailsInModal = (product_details) => {
   // console.log(product_details);
   setInnerText('exampleModalLabel', product_details.title);
   setInnerText('productId', product_details.id); // resolve -07 product details
   setInnerText('modal_body', product_details.description);
   setInnerText('rating', product_details.rating.rate);
};

const getInputValue = (id) => {
   const element = document.getElementById(id).innerText;
   const converted = parseFloat(element); //resolved-03-Int to praseFloat
   return converted;
};

// main price update function
const updatePrice = (id, value) => {
   const convertedOldPrice = getInputValue(id);
   // const convertPrice = parseInt(value);
   const convertPrice = parseFloat(value); //l-80 resolved-03-Int to praseFloat
   const total = convertedOldPrice + convertPrice;
   // document.getElementById(id).innerText = Math.round(total);
   document.getElementById(id).innerText = (total).toFixed(2); // l-88 resolved-04-round to only value

};

// set innerText function
const setInnerText = (id, value) => {
   // solved-06-modal title. NaN 
   if (typeof value === "number") {
      value = Math.round(value);
   }
   console.count();
   console.log(id, value);
   document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
   const priceConverted = getInputValue('price');
   if (priceConverted > 500) {
      setInnerText('delivery-charge', 60);
      setInnerText('total-tax', priceConverted * 0.4);
   }
   else if (priceConverted > 400) {
      setInnerText('delivery-charge', 50);
      setInnerText('total-tax', priceConverted * 0.3);
   }
   else if (priceConverted > 200) {
      setInnerText('delivery-charge', 30);
      setInnerText('total-tax', priceConverted * 0.2);
   }
   else {
      setInnerText('delivery-charge', 20);
   }

};

//grandTotal update function
const updateTotal = () => {
   const grandTotal =
      getInputValue('price') +
      getInputValue('delivery-charge') +
      getInputValue('total-tax');
   document.getElementById('total').innerText = grandTotal.toFixed(2); // add toFixed solved-5
};

// search by category
document.getElementById("search-btn").addEventListener("click", function () {
   const inputField = document.getElementById("input-value").value;
   const searchedProduct = arr[0].filter((p) =>
      p.title.toLowerCase().includes(inputField.toLowerCase())
   );
   showProducts(searchedProduct);
});


// console.table(arr[0])


