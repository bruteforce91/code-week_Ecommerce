//sidebar
const listCategories = document.querySelector(".sidebar_categories");
const countItemsSpan = document.querySelector(".sidebar__cart-counter-items");
const sidebarCart = document.querySelector(".sidebar__cart");
//loader e toast
const loader = document.querySelector(".loader-01");
const toast = document.querySelector(".toast");

//wrap products
const wrapAllProducts = document.querySelector(".wrap");
//modal
const modal = document.querySelector(".modal");
const modal_body = document.querySelector(".modal__body");
const modal_overlay = document.querySelector(".modal__overlay");
const wrapProductDetails = document.querySelector(
  ".modal__body-wrap--produtct-details"
);
const wrapInsertCardPay=document.querySelector(".modal__body-wrap--insertCardPay");
const wrapModalPay = document.querySelector(".modal__body-wrap--pay");

//btn
const btnCartSidebar = document.querySelector(".sidebarCartBtn");
const btnLogin = document.querySelector(".sidebar__login");
const btnForm = document.querySelector(".modal__body-wrap-btnForm");
const btnOpenModalSign = document.querySelector(".modal__body-wrap-sign");
const btnPurchase = document.querySelector(".btnPurchase");

//wrap login form
const form = document.querySelector(".form");
const wrapLogin = document.querySelector(".modal__body-wrap-login");

//wrap sign form
const wrapSign = document.querySelector(".modal__body-wrap-sign");
//form
const label = document.querySelector(".label_input");
const input = document.querySelector(".input");

//main
const main = document.querySelector(".main__wrap");

let btnContinue, btnSign, btnSignIn, btnAddProductToCart;
let isStart = true;
let array = [];
let count = 0;
/*************STATE AND CONFIG*********/
const state = {
  config: {
    BASE_URL: "https://fakestoreapi.com/",
  },
  products: [{ 0: null }],
  categories: null,
  loginUser: null,
  isLogin:false
};

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw error;
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getUrl = (path) => {
  const pathname = `${state.config.BASE_URL}${path}`;
  return pathname;
};

function configPostMethod(email, username, password) {
  return {
    method: "POST",
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  };
}
async function postData() {
  fetch("https://fakestoreapi.com/users/", {
    method: "POST",
    body: JSON.stringify({
      title: "test product",
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
}

/*********SESSION DATA******************** */
const newSessionUser = async () => {
  localStorage.setItem("loadSession", true);
  await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllUsers(),
    postCreateCart(),
  ]);
  const countItemsToCart = state.cart[0].products.length;
  countItemsSpan.textContent = countItemsToCart;
  loader.classList.remove("loader-01");
};

const loadOldSessionUser = () => {
  const products = localStorage.getItem("products");
  state.products = JSON.parse(products);
  renderCarouselProducts(state.products, wrapAllProducts, "ALL PRODUCTS");

  const categories = localStorage.getItem("categories");
  state.categories = JSON.parse(categories);
  renderSidebar();

  const cart = localStorage.getItem("cart");
  state.cart = JSON.parse(cart);
  const countItemsToCart = state.cart[0].products.length;
  countItemsSpan.textContent = countItemsToCart;
  console.log("STATE", state);
};

/**********END SESSION DATA ****************/

/*************END STATE AND CONFIG*********/

/*************GETS METHODS*********/
const getAllProducts = async () => {
  const pathname = getUrl("products");
  const allProducts = await getData(pathname);
  const products = allProducts.map((product) => {
    return {
      ...product,
      price: product.price.toFixed(2),
      stars: (Math.random() * 4 + 1).toFixed(1),
      numFeedback: Math.floor(Math.random() * 5000),
    };
  });
  state.products = products;
  const stringifyProducts = JSON.stringify(state.products);
  console.log("state.products");
  localStorage.setItem("products", stringifyProducts);
  console.log(state.products);
  return renderCarouselProducts(
    state.products,
    wrapAllProducts,
    "All Products"
  );
};

const getAllCategories = async () => {
  const path = getUrl("products/categories");
  const allCategories = await getData(path);
  state.categories = allCategories;
  const stringifyCategories = JSON.stringify(state.categories);
  localStorage.setItem("categories", stringifyCategories);
  renderSidebar();
};

const getAllUsers = async () => {
  const path = getUrl("users");
  const allUsers = await getData(path);
  const users = allUsers.map((user) => {
    return {
      ...user,
      //to do
    };
  });
  state.users = users;
};
/*************END GETS METHODS*********/
function showToast(text) {
  toast.textContent = text;
  toast.classList.toggle("is-hidden");

  setTimeout(() => {
    toast.classList.toggle("is-hidden");
  }, 4000);
}

function getCategory(category) {
  const filterCategory = state.products.filter(
    (product) => product.category === category
  );
  return filterCategory;
}

function getProductsForCategory(event) {
  loader.classList.add("loader-01");
  clearWrapMainSection();
  document.body.classList.toggle("is-blur");
  const div = wrapAllProducts.querySelectorAll("div");
  const titleCarousel = wrapAllProducts.querySelectorAll("h2");
  setTimeout(() => {
    const allProducts = wrapAllProducts.querySelectorAll("article");
    console.log("allProducts", allProducts);
    for (let index = 0; index < allProducts.length; index++) {
      allProducts[index].remove();
      if (div[index]) {
        div[index].remove();
      }
      if (titleCarousel[index]) {
        titleCarousel[index].remove();
      }
    }
    console.log(event.target.id);
    const products = getCategory(event.target.id);
    renderCarouselProducts(
      products,
      wrapAllProducts,
      event.target.id.toUpperCase()
    );
    loader.classList.remove("loader-01");
    document.body.classList.toggle("is-blur");
  }, 1000);
}
/*********POST METHOD ***************/
const postAddUser = async () => {};

const postCreateCart = async () => {
  fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    body: JSON.stringify({
      userId: 7,
      date: new Date(),
      products: [
        { productId: 5, quantity: 1 },
        { productId: 1, quantity: 5 },
      ],
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      localStorage.setItem(
        "cart",
        JSON.stringify([json, { count: 0 }, { pending: false }])
      );
      const cart = localStorage.getItem("cart");
      state.cart = JSON.parse(cart);
    });
};

//function per calcolare numero di stelle dei prodotti
function feedBack(feedbackStars) {
  const stars = [];
  stars.push(parseInt(feedbackStars));
  if (feedbackStars - stars[0] > 0.5) {
    stars.push(0.5);
  }
  return stars;
}
function createParagrafAcceptCondition() {
  const parag = document.createElement("p");
  parag.textContent = `Accedendo al tuo account dichiari di aver letto e accetti le
  nostre Condizioni generali di uso e vendita. Prendi visione
  della nostra Informativa sulla privacy, della nostra Informativa
  sui Cookie e della nostra Informativa sulla Pubblicità definita
  in base agli interessi`;
  return parag;
}
/*************LOGIN FORM *********/
function createModalLogin() {
  clearModalBody(wrapProductDetails);
  clearModalBody(wrapLogin);
  clearModalBody(wrapSign);
  const wrap = document.createElement("div");

  const title = document.createElement("h1");
  title.classList.add("modal__body-wrap-title");

  //email
  const labelEmail = document.createElement("label");
  labelEmail.classList.add("label_input");
  const inputEmail = document.createElement("input");
  inputEmail.classList.add("input");

  btnContinue = document.createElement("button");
  btnContinue.classList.add("modal__body-wrap-btnForm");
  //p
  const parag = createParagrafAcceptCondition();

  const divBreak = document.createElement("div");
  divBreak.classList.add("divider-break");

  btnSign = document.createElement("button");
  btnSign.classList.add("modal__body-wrap-sign");

  title.textContent = "Accedi";
  //labelEmail
  labelEmail.textContent = "Indirizzo Email";

  //inputEmail
  inputEmail.value = "";
  inputEmail.required = true;
  inputEmail.type = "email";

  //btnContinueToPassword
  btnContinue.textContent = "Continua";
  //btnContinue.removeEventListener("click", handleSubmitLogin);
  //divBreak
  divBreak.textContent = "Sei nuovo su Amazon?";
  //button to sign
  btnSign.textContent = "Crea il tuo nuovo account Amazon";
  wrap.append(
    title,
    labelEmail,
    inputEmail,
    btnContinue,
    parag,
    divBreak,
    btnSign
  );
  btnSign.addEventListener("click", handleSign);
  btnContinue.addEventListener("click", handleLoginPassword);
  return wrap;
}

function handleLogin() {
  event.preventDefault();
  modal.classList.toggle("is-invisible");
  wrapSign.classList.add("is-invisible");
  wrapLogin.classList.remove("is-invisible");
  wrapModalPay.classList.add('is-invisible');
  wrapInsertCardPay.classList.add('is-invisible')
  clearModalBody(wrapProductDetails);
  clearModalBody(wrapLogin);
  clearModalBody(wrapSign);
  clearModalBody(wrapModalPay);
  clearModalBody(wrapInsertCardPay)

  const wrap = createModalLogin();

  wrapLogin.append(wrap);
}
function createModalPasswordLogin() {
  const wrap = document.createElement("div");
  const input = modal_body.querySelectorAll("input");
  const inputValue = input[0].value;
  clearModalBody(wrapProductDetails);
  clearModalBody(wrapLogin);
  clearModalBody(wrapSign);
  state.loginUser = { email: inputValue };
  const labelEmail = document.createElement("label");
  labelEmail.textContent = state.loginUser.email;
  const title = document.createElement("h1");
  title.textContent = "Password";
  const inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.placeholder = "inserisci password";
  const parag = createParagrafAcceptCondition();
  wrap.append(title, labelEmail, inputPassword, parag);

  return wrap;
}
function handleLoginPassword() {
  event.preventDefault();
  const input = modal_body.querySelectorAll("input");
  console.log(input);
  btnSign.removeEventListener("click", handleSign);
  form.addEventListener("submit", handleSubmitLogin);

  const wrap = createModalPasswordLogin();
  btnContinue = document.createElement("button");
  btnContinue.type = "submit";
  btnContinue.textContent = "Accedi";

  btnContinue.removeEventListener("click", handleLoginPassword);
  btnContinue.addEventListener("click", handleSubmitLogin);
  wrap.appendChild(btnContinue);
  wrapLogin.append(wrap);
}

function handleSubmitLogin() {
  event.preventDefault();
  btnSign.removeEventListener("click", handleSubmitSign);
  btnSign.removeEventListener("click", handleSign);
  const input = modal_body.querySelectorAll("input");
  const inputValue = input[0].value;
  modal.classList.toggle("is-invisible");
  state.loginUser.password = inputValue;
  state.users = JSON.parse(localStorage.getItem("user"));
  console.log("state.users", state.users);
  const spanUserName = document.querySelector(".sidebar__login-span");

  /********************************************************************************************** */
  //control to login
  let isCorrect = false;
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);
  console.log(parseUser);
  if (parseUser.email === state.loginUser.email) {
    if (parseUser.password === state.loginUser.password) {
      console.log("accesso eseguito");
      btnLogin.textContent = `Benvenuto! `;
      spanUserName.textContent = parseUser.username;
      btnLogin.append(spanUserName);
      isCorrect = true;
      btnLogin.removeEventListener("click", handleLogin);
      btnLogin.disabled = true;
      toast.classList.remove("pleaseLogin");
      toast.classList.remove("unsuccessfulLogin");
      toast.classList.add("successfulLogin");
      showToast("Accesso eseguito correttamente!!");
      form.removeEventListener("submit", handleSubmitLogin);
      state.isLogin=true;
      console.log("STATEINLOGIN",state.isLogin)
    }
  }
  if (!isCorrect) {
    toast.classList.remove("pleaseLogin");
    toast.classList.remove("successfulLogin");
    toast.classList.add("unsuccessfulLogin");
    showToast("I dati inseriti non sono corretti!");
  }
}

function closeModal(event) {
  //event.preventDefault();
  const target = event.target;
  if (target.classList.value === "modal__overlay") {
    modal.classList.add("is-invisible");
  }
}
/*************END LOGIN FORM *********/

/**************SIGN IN FORM ***********/
function createModalSign() {
  clearModalBody(wrapProductDetails);
  clearModalBody(wrapLogin)
  clearModalBody(wrapModalPay);
  clearModalBody(wrapInsertCardPay)
  const wrap = document.createElement("div");

  const title = document.createElement("h1");
  const labelPassword = document.createElement("label");
  const inputPassword = document.createElement("input");
  const labelConfirmPassword = document.createElement("label");
  const inputConfirmPassword = document.createElement("input");
  const labelName = document.createElement("label");
  const inputName = document.createElement("input");
  const labelEmail = document.createElement("label");
  const inputEmail = document.createElement("input");

  title.textContent = "Crea Account";
  inputEmail.type = "email";
  inputName.type = "text";
  inputPassword.type = "password";
  inputPassword.minLength = 6;
  inputConfirmPassword.type = "password";
  labelName.textContent = "Il tuo Nome";
  labelEmail.textContent = "Email";
  labelPassword.textContent = "Password";
  inputPassword.placeholder = "Almeno 6 caratteri";
  labelConfirmPassword.textContent = "Verifica Password";
  inputPassword.required = true;
  inputConfirmPassword.required = true;
  btnSignIn = document.createElement("button");
  btnSignIn.textContent = "Crea il tuo account Amazon";

  wrap.append(
    title,
    labelName,
    inputName,
    labelEmail,
    inputEmail,
    labelPassword,
    inputPassword,
    labelConfirmPassword,
    inputConfirmPassword,
    btnSignIn
  );

  return wrap;
}
function handleSign() {
  event.preventDefault();
  wrapSign.classList.remove("is-invisible");
  wrapLogin.classList.add("is-invisible");
  wrapModalPay.classList.add('is-invisible');
  wrapInsertCardPay.classList.add('is-invisible')
  const wrap = createModalSign();
  btnContinue.removeEventListener("click", handleLoginPassword);

  btnSignIn.addEventListener("click", handleSubmitSign);
  //append
  wrapSign.append(wrap);

  form.addEventListener("submit", handleSubmitSign);
}

function handleSubmitSign() {
  event.preventDefault();
  btnSignIn.removeEventListener("click", handleSubmitSign);
  const inputs = wrapSign.querySelectorAll("input");
  console.log("inputs", inputs);
  const newUser = {
    username: null,
    email: null,
    password: null,
  };
  let count = 0;
  for (const key in newUser) {
    newUser[key] = inputs[count].value;
    count++;
  }
  //creazione idRandom
  newUser.id = Math.floor(Math.random() * 8888 + Math.random() * 451);
  state.users = {
    ...state.users,
    newUser,
  };
  const usersStringify = JSON.stringify(newUser);
  localStorage.setItem("user", usersStringify);
  modal.classList.toggle("is-invisible");

  toast.classList.add("successfulLogin");
  showToast("Registrazione effettuata con successo! Accedi");
}
/******END SIGN IN FORM*********/

/*********PAY FORM ******/
function calculateIva(price){
  return parseFloat(price/100*22)
}

function createModalPay() {
  const input = modal_body.querySelectorAll("input");
  let numberCard;
  for (let index = 0; index < input.length; index++) {
    if(index===0){
      numberCard=input[index].value
    }
    
  }

  const wrap = document.createElement("div");

  const title = document.createElement("h1");
  const username = document.createElement("h3");
  const email = document.createElement("h3");
  const numCard = document.createElement("h3");
  const idUser = document.createElement("h4");
  const idCarello = document.createElement("h4");
  const ulListProduct = document.createElement("ul");
  const totalPriceWithoutIva = document.createElement("h4");
  const Iva = document.createElement("h4");
  const totalPrice = document.createElement("h2");
  const btnPay = document.createElement("button");

  //get data LocalStorage
  const userData=JSON.parse(localStorage.getItem('user'));
  const productsCart=JSON.parse(localStorage.getItem('cart'));
  const totalPriceCart=JSON.parse(localStorage.getItem('TotalPriceCart'));
  console.log("products",productsCart)
  title.textContent = "Riepilogo";
  username.textContent=`username: ${userData.username}`;
  email.textContent=`email: ${userData.email}`;
  numCard.textContent=`Numero Card: ${numberCard}`
  idUser.textContent=`ID-User: ${userData.id}`
  idCarello.textContent=`ID-Cart: ${totalPriceCart[1]}`
  productsCart[0].products.forEach((elem)=>{
    const li=document.createElement('li');
    let quantityForProduct = parseInt(elem.quantity);
    let priceForProduct = (+elem.price).toFixed(2);
    let priceForAllQuantity = quantityForProduct * priceForProduct;
    li.textContent=`${elem.title} Quantità:${elem.quantity} Price:${priceForAllQuantity} +Iva`;
    ulListProduct.appendChild(li);
  })
  totalPriceWithoutIva.textContent=`€ ${totalPriceCart[0].totalPrice}`
  const totalIva=(calculateIva(+totalPriceCart[0].totalPrice)).toFixed(2)
  Iva.textContent=`€ ${totalIva}`;
  const calculateTotalPrice=(parseFloat(totalIva) +parseFloat(totalPriceCart[0].totalPrice)).toFixed(2);
  totalPrice.textContent=`Totale € ${calculateTotalPrice}`
  btnPay.textContent = "PAGA ADESSO";

  wrap.append(
    title,
    username,
    email,
    numCard,
    idUser,
    idCarello,
    ulListProduct,
    totalPriceWithoutIva,
    Iva,
    totalPrice,
    btnPay
  );

  return wrap;
}
function createModalPayCard(){
  const wrap = document.createElement("div");

  const title = document.createElement("h1");
  const username = document.createElement("h3");
  const email = document.createElement("h3");
  const idUser = document.createElement("h4");
  const labelInputCardPayment=document.createElement('label')
  const inputCardPayment = document.createElement("input");
  const labelInputExpiredCard=document.createElement('label')
  const inputCardExpiredCard = document.createElement("input");
  const labelInputCVC=document.createElement('label')
  const inputCvC = document.createElement("input");
  const imgCards=document.createElement('img');
  imgCards.src="./assets/img/payCards.png";
  imgCards.id="cardPaysImg"
  const btnPay = document.createElement("button");

  //get data LocalStorage
  const userData=JSON.parse(localStorage.getItem('user'));
  const productsCart=JSON.parse(localStorage.getItem('cart'));
  console.log("products",productsCart)
  title.textContent = "Dati Pagamento";
  username.textContent=`username: ${userData.username}`;
  email.textContent=`email: ${userData.email}`;
  idUser.textContent=`ID-User: ${userData.id}`;

  btnPay.textContent = "CONTINUA IL PAGAMENTO";
  
  labelInputCardPayment.textContent="Numero di carta";
  inputCardPayment.type="number";
  labelInputExpiredCard.textContent="Data di scadenza";
  inputCardExpiredCard.type="number";
  labelInputCVC.textContent="CVC";
  inputCvC.type="number";

  wrap.append(
    title,
    username,
    email,
    idUser,
    labelInputCardPayment,
    inputCardPayment,
    labelInputExpiredCard,
    inputCardExpiredCard,
    labelInputCVC,
    inputCvC,
    imgCards,
    btnPay
  );
  btnPay.addEventListener('click',handlePayForm)
  return wrap;
}
function handleInsertCardPayment(){
  clearModalBody(wrapProductDetails);
  clearModalBody(wrapLogin);
  clearModalBody(wrapSign);
  clearModalBody(wrapModalPay);
  clearModalBody(wrapInsertCardPay)
  console.log("STATE-LOGIN",state.isLogin)
  if(state.isLogin){
  modal.classList.toggle("is-invisible");
  wrapSign.classList.add("is-invisible");
  wrapLogin.classList.add("is-invisible");
  wrapModalPay.classList.add('is-invisible');
  wrapInsertCardPay.classList.remove('is-invisible')

  const div=createModalPayCard();
  wrapInsertCardPay.appendChild(div);
  }
  else{
    toast.classList.remove("pleaseLogin");
    toast.classList.remove("successfulLogin");
    toast.classList.add("pleaseLogin");
    showToast("Accedi prima di continuare");
  }
}
function handlePayForm() {
  clearModalBody(wrapProductDetails);
  clearModalBody(wrapLogin);
  clearModalBody(wrapSign);
  clearModalBody(wrapModalPay);
  wrapSign.classList.add("is-invisible");
  wrapLogin.classList.add("is-invisible");
  wrapModalPay.classList.remove('is-invisible');
  wrapInsertCardPay.classList.add('is-invisible')
  const div=createModalPay()
  clearModalBody(wrapInsertCardPay)
  wrapModalPay.appendChild(div);
}

/*********CART*******/
function addProductToCart() {
  event.preventDefault();
  btnPurchase.classList.remove("is-invisible");
  const target = event.path[1].id; //prendo l'id del product selezionato
  //localStorage.setItem("cart","")
  const productToAddToCart = state.products.filter(
    (product) => product.id === +target
  ); // search in products
  let filterProductEguals;
  let updateProduct;
  //console.log("a chi sacciu",filterProductEguals)
  let newProduct = {
    ...productToAddToCart[0],
    quantity: 1,
  };

  const getLocalStorageCart = JSON.parse(localStorage.getItem("cart"));
  getLocalStorageCart[0].products.push(newProduct);
  localStorage.setItem("cart", JSON.stringify(getLocalStorageCart));

  //state.cart=getLocalStorageCart;

  // //mi prendo il numero di elementi presenti nello state e parallelamente nel localStorage
  const countItems = getLocalStorageCart[0].products.length;
  const spanCountItems = document.querySelector(".sidebar__cart-counter-items");
  spanCountItems.textContent = countItems.toString();
}
function renderCartProducts() {
  clearWrapMainSection();
  clearWrapProducts();
  state.cart = JSON.parse(localStorage.getItem("cart"));
  console.log("STATE_CART", state.cart);
  const div = document.createElement("div");
  const textTotalPrice = document.createElement("h3");
  textTotalPrice.classList.add("wrap_price_total");
  const btnRemoveAll = document.createElement("button");
  btnRemoveAll.textContent="Svuota";
  btnRemoveAll.classList.add("btnRemoveAllProducts");
  btnRemoveAll.addEventListener('click',handleResetCart)

  let quantityArray = [];

  console.log("Array", quantityArray);
  state.cart[0].products.map((val, index) => {
    filterProductEguals = state.cart[0].products.filter((e) => e.id === val.id);
    console.log("PROVA", filterProductEguals);
    let c = filterProductEguals.length;
    const updateProduct = {
      ...filterProductEguals[0],
      quantity: c,
    };
    if (!quantityArray.includes(val.id)) {
      quantityArray.push(updateProduct);
    }
  });

  //elimino i doppioni
  const uniqueProducts = arrayUnique(quantityArray);
  //
  const listProducts = document.createElement("div");
  listProducts.classList.add("wrap__items");
  const titleCarousel = document.createElement("h2");
  titleCarousel.textContent = "Cart";

  //UPDATE CART IN LOCAL STORAGE
  const getLocalStorageCart = JSON.parse(localStorage.getItem("cart"));
  getLocalStorageCart[0].products = uniqueProducts;
  localStorage.setItem("cart", JSON.stringify(getLocalStorageCart));

  //calcolo prezzo totale * quantità di ogni singolo prodotto
  let priceForProduct,
    quantityForProduct,
    priceTotal = 0,
    priceForAllQuantity;
  uniqueProducts.forEach((elem) => {
    quantityForProduct = parseInt(elem.quantity);
    priceForProduct = (+elem.price).toFixed(2);
    priceForAllQuantity = quantityForProduct * priceForProduct;
    priceTotal = priceTotal + +priceForAllQuantity;
  });

  console.log("price", priceTotal);
  textTotalPrice.textContent = `Total Price: € ${priceTotal} + IVA`;
  ////UPDATE PRICE IN LOCAL STORAGE CART
  const objTotalPrice = { totalPrice: priceTotal };
  localStorage.setItem(
    "TotalPriceCart",
    JSON.stringify([objTotalPrice, state.cart[0]._id])
  );

  uniqueProducts.forEach((product, index) => {
    console.log(product);
    // quantityProduct.textContent=product.quantity;
    const card = productCard(
      product.image,
      product.id,
      product.stars,
      product.title,
      product.numFeedback,
      product.price,
      product.quantity
    );
    listProducts.append(card);
  });
  wrapAllProducts.append(textTotalPrice,btnRemoveAll, titleCarousel, listProducts);
}
function handleResetCart(){
  
}
/*********END CART*******/
/*************RENDER CARDS, STARS AND CATEGORIES*********/
function createWrapProductDetails(product) {
  const { title, description, image, price, category } = product;
  const wrap = document.createElement("div");
  const titleProduct = document.createElement("h2");
  titleProduct.textContent = title;

  const descriptionProduct = document.createElement("p");
  descriptionProduct.textContent = description;

  const imageProduct = document.createElement("img");
  imageProduct.src = image;

  const priceProduct = document.createElement("h3");
  priceProduct.textContent = `€ ${price} + Iva`;

  const categoryProduct = document.createElement("h4");
  categoryProduct.textContent = category;

  btnAddProductToCart = document.createElement("button");
  btnAddProductToCart.textContent = "Aggiungi al Carello";
  btnAddProductToCart.addEventListener("click", addProductToCart);

  wrap.append(
    titleProduct,
    imageProduct,
    descriptionProduct,
    priceProduct,
    categoryProduct,
    btnAddProductToCart
  );
  return wrap;
}
function productCard(
  coverURL,
  id,
  stars,
  titleProduct,
  vote,
  priceProduct,
  quantity
) {
  const wrapCard = document.createElement("article");
  wrapCard.classList.add("wrap__items-card");
  const wrapAnchor = document.createElement("a");
  wrapAnchor.id = id;

  // const category=document.createElement('h4');
  // category.textContent(titleCategories);

  const imgProduct = document.createElement("img");
  imgProduct.src = coverURL;

  const product = document.createElement("h5");
  product.textContent = titleProduct;

  const price = document.createElement("h3");
  price.textContent = `€ ${priceProduct}`;

  const wrapFeedback = document.createElement("div");
  wrapFeedback.classList.add("wrap__items-card--feedback");

  renderStars(stars, wrapFeedback);
  const votes = document.createElement("span");
  votes.textContent = vote;
  if (quantity) {
    const quantityProduct = document.createElement("span");
    quantityProduct.textContent = `Quantità: ${quantity}`;
    wrapFeedback.append(votes);
    wrapCard.append(
      imgProduct,
      product,
      price,
      quantityProduct,
      wrapFeedback,
      wrapAnchor
    );
  } else {
    wrapFeedback.append(votes);
    wrapCard.append(imgProduct, product, price, wrapFeedback, wrapAnchor);
  }

  return wrapCard;
}

function renderSidebar() {
  //getAllCategories().then();
  const ulCategories = document.querySelector(".sidebar_categories");
  state.categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.id = category;
    btn.textContent = category.toUpperCase();
    const li = document.createElement("li");
    li.appendChild(btn);
    ulCategories.appendChild(li);
  });
}

function renderStars(arrayStar, wrapFeedback) {
  const arr = feedBack(arrayStar);
  for (let i = 0; i < arr[0]; i++) {
    const starIcon = document.createElement("i");
    starIcon.className = `fa fa-star`;
    wrapFeedback.appendChild(starIcon);
  }
  if (arr[1]) {
    const halfStarIcon = document.createElement("i");
    halfStarIcon.className = `fa fa-star-half`;
    wrapFeedback.appendChild(halfStarIcon);
  }
}

function renderCarouselProducts(listItems, sectionNode, category) {
  const listProducts = document.createElement("div");
  listProducts.classList.add("wrap__items");
  const titleCarousel = document.createElement("h2");
  titleCarousel.textContent = category;
  listItems.forEach((item) => {
    const card = productCard(
      item.image,
      item.id,
      item.stars,
      item.title,
      item.numFeedback,
      item.price
    );
    listProducts.append(card);
  });
  sectionNode.append(titleCarousel, listProducts);
}



function renderProductDetails(event) {
  clearModalBody(wrapProductDetails);
  clearModalBody(wrapLogin);
  clearModalBody(wrapSign);
  const idProduct = event.target.id;
  const productDetails = state.products[idProduct - 1]; //-1 perchè l'indice in state.products parte da 0
  const wrap = createWrapProductDetails(productDetails);
  wrap.id = idProduct;
  modal.classList.toggle("is-invisible");
  wrapProductDetails.classList.remove("is-invisible");
  wrapProductDetails.append(wrap);
}
function renderBtnPurchase() {
  const getCart = JSON.parse(localStorage.getItem("cart"));
  if (getCart[0].products.length >= 1) {
    btnPurchase.classList.remove("is-invisible");
  }
}

/*************END RENDER CARDS AND CATEGORIES*********/

/**********CLEAR SECTION *********/
function clearWrapProducts() {
  loader.classList.add("loader-01");
  document.body.classList.toggle("is-blur");
  const div = wrapAllProducts.querySelectorAll("div");
  const titleCarousel = wrapAllProducts.querySelectorAll("h2");
  const allProducts = wrapAllProducts.querySelectorAll("article");
  //console.log("allProducts", allProducts);
  for (let index = 0; index < allProducts.length; index++) {
    allProducts[index].remove();
    if (div[index]) {
      div[index].remove();
    }
    if (titleCarousel[index]) {
      titleCarousel[index].remove();
    }
  }
  setTimeout(() => {
    loader.classList.remove("loader-01");
    document.body.classList.toggle("is-blur");
  }, 1000);
}

function clearWrapMainSection() {
  const textTotalPrice = main.querySelectorAll("h3");
  for (let index = 0; index < textTotalPrice.length; index++) {
    textTotalPrice[index].remove();
  }
}

function clearModalBody(wrap) {
  const allDivModalBody = wrap.querySelectorAll("div");
  for (let index = 0; index < allDivModalBody.length; index++) {
    allDivModalBody[index].remove();
  }
}
/**********CLEAR SECTION *********/

/**************UTILITY PER ELIMINARE OBJECT DOPPIONI */
const serializeArr = (arr) => {
  return arr.map((obj) => {
    return JSON.stringify(obj);
  });
};

const arrayUnique = (arr) => {
  let objects = serializeArr(arr);
  let unique = [...new Set(objects)];
  return unique.map((str) => {
    return JSON.parse(str);
  });
};
/**************END UTILITY PER ELIMINARE OBJECT DOPPIONI */

async function handleMounted() {
  // document.body.classList.add('is-blur');
  const newSession = localStorage.getItem("loadSession");
  console.log(newSession);
  loader.classList.add("loader-01");
  if (!newSession) {
    await newSessionUser();
  } else {
    setTimeout(() => {
      loadOldSessionUser();
      loader.classList.remove("loader-01");
    }, 1000);
  }
  showToast("Nuovo Cliente?Accedi");
  renderBtnPurchase();
  // console.log("state", state.users);
  // console.log(document.querySelector('#eletronic'))
}

/******event listener ******/
document.addEventListener("DOMContentLoaded", handleMounted, { once: true });
modal.addEventListener("click", closeModal);

//btn
btnLogin.addEventListener("click", handleLogin);
listCategories.addEventListener("click", getProductsForCategory);
wrapAllProducts.addEventListener("click", renderProductDetails);
btnCartSidebar.addEventListener("click", renderCartProducts);
btnPurchase.addEventListener("click", handleInsertCardPayment);
