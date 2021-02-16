//
const wrapAllProducts = document.querySelector(".wrap");
const loader = document.querySelector(".loader-01");
const toast = document.querySelector(".toast");
const modal = document.querySelector(".modal");
const modal_body = document.querySelector(".modal__body");
const formLogin = document.querySelector(".formLogin");

//btn
const btnLogin = document.querySelector(".sidebar__login");
const btnForm = document.querySelector(".modal__body-wrap-btnForm");
const btnOpenModalSign = document.querySelector(".modal__body-wrap-sign");

//wrap login form
const wrapLogin = document.querySelector(".modal__body-wrap-login");

//wrap sign form
const wrapSign = document.querySelector(".modal__body-wrap-sign");
//form
const label = document.querySelector(".label_input");
const input = document.querySelector(".input");
let title,
  labelEmail,
  inputEmail,
  btnContinue,
  parag,
  divBreak,
  btnSign,
  labelPassword,
  inputPassword,
  labelName,
  inputName;
let isStartLogin = true,
  isStartSign = true;

/*************STATE AND CONFIG*********/
const state = {
  config: {
    BASE_URL: "https://fakestoreapi.com/",
  },
  products: null,
  categories: null,
  loginUser: null,
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
  console.log(state.products);
  return renderCarouselProducts(state.products, wrapAllProducts);
};

const getAllCategories = async () => {
  const path = getUrl("products/categories");
  const allCategories = await getData(path);
  state.categories = allCategories;
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

/*********POST METHOD ***************/
const postAddUser = async () => {};

//function per calcolare numero di stelle dei prodotti
function feedBack(feedbackStars) {
  const stars = [];
  stars.push(parseInt(feedbackStars));
  if (feedbackStars - stars[0] > 0.5) {
    stars.push(0.5);
  }
  return stars;
}
function productCard(coverURL, id, stars, titleProduct, vote, priceProduct) {
  const wrapCard = document.createElement("article");
  wrapCard.classList.add("wrap__items-card");
  const wrapAnchor = document.createElement("a");
  wrapAnchor.id = id;
  wrapCard.appendChild(wrapAnchor);

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

  wrapFeedback.append(votes);
  wrapAnchor.append(imgProduct, product, price, wrapFeedback);

  return wrapCard;
}

/*************RENDER CARDS, STARS AND CATEGORIES*********/
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

function renderCarouselProducts(listItems, sectionNode) {
  const listProducts = document.createElement("div");
  listProducts.classList.add("wrap__items");

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
  sectionNode.append(listProducts);
}
/*************END RENDER CARDS AND CATEGORIES*********/

/*************LOGIN FORM *********/
function handleLogin() {
  event.preventDefault();
  modal.classList.toggle("is-invisible");
  wrapSign.classList.add("is-invisible");
  wrapLogin.classList.remove("is-invisible");
  if (isStartLogin) {
    title = document.createElement("h1");
    labelEmail = document.createElement("label");
    labelEmail.classList.add("label_input");
    inputEmail = document.createElement("input");
    inputEmail.classList.add("input");
    btnContinue = document.createElement("button");
    btnContinue.classList.add("modal__body-wrap-btnForm");
    parag = document.createElement("p");
    divBreak = document.createElement("div");
    divBreak.classList.add("divider-break");
    btnSign = document.createElement("button");
    btnSign.classList.add("modal__body-wrap-sign");
    title.classList.add("modal__body-wrap-title");
  }

  title.textContent = "Accedi";
  //labelEmail
  labelEmail.textContent = "Indirizzo Email";

  //inputEmail
  inputEmail.value = "";
  inputEmail.required = true;
  inputEmail.type = "email";

  //btnContinueToPassword
  btnContinue.textContent = "Continua";

  //p
  parag.textContent = `Accedendo al tuo account dichiari di aver letto e accetti le
  nostre Condizioni generali di uso e vendita. Prendi visione
  della nostra Informativa sulla privacy, della nostra Informativa
  sui Cookie e della nostra Informativa sulla Pubblicità definita
  in base agli interessi`;

  //divBreak
  divBreak.textContent = "Sei nuovo su Amazon?";
  //button to sign
  btnSign.textContent = "Crea il tuo nuovo account Amazon";

  wrapLogin.append(
    title,
    labelEmail,
    inputEmail,
    btnContinue,
    parag,
    divBreak,
    btnSign
  );
  //append
  btnSign.addEventListener("click", handleSign);
  btnContinue.addEventListener("click", handleLoginPassword);
  isStartLogin = false;
}

function handleLoginPassword() {
  formLogin.addEventListener("submit", handleSubmitLogin);
  event.preventDefault();
  isStartLogin = false;
  const inputValue = inputEmail.value;
  state.loginUser = { email: inputValue };
  labelEmail.textContent = state.loginUser.email;
  title.textContent = "Password";
  inputEmail.value = "";
  inputEmail.type = "password";
  btnContinue.type = "submit";
  btnContinue.textContent = "Accedi";
  btnContinue.removeEventListener("click", handleLoginPassword);
  btnContinue.addEventListener("click", handleSubmitLogin);
}

function handleSubmitLogin() {
  event.preventDefault();
  const input = document.querySelector(".input");
  const inputValue = input.value;
  modal.classList.toggle("is-invisible");
  state.loginUser.password = inputValue;
  state.users=localStorage.getItem('users')

  for (const key in state.users) {
    if(state.users[key].username===state.loginUser.username){
      if(state.users[key].username===state.loginUser.username){
        console.log("accesso eseguito");
      }
    }
  }
  console.log("dati incorretti")
  // if(state.loginUser.username)
  formLogin.removeEventListener("submit", handleSubmitLogin);
}

function closeForm(event) {
  //event.preventDefault();
  const target = event.target;
  if (target.classList.value === "modal__overlay") {
    modal.classList.add("is-invisible");
  }
}

/*************END LOGIN FORM *********/

/**************SIGN IN FORM ***********/
function handleSign() {
  event.preventDefault();
  btnSign.removeEventListener("click", handleSign);
  wrapLogin.classList.add("is-invisible");
  wrapSign.classList.remove("is-invisible");
  btnContinue.removeEventListener("click", handleLoginPassword);

  title.textContent = "Crea Account";
  //name
  //email
  if (isStartSign) {
    labelPassword = document.createElement("label");
    inputPassword = document.createElement("input");
    labelConfirmPassword = document.createElement("label");
    inputConfirmPassword = document.createElement("input");
    labelName = document.createElement("label");
    inputName = document.createElement("input");
    inputEmail.type = "email";
    inputName.type = "text";
    inputPassword.type = "password";
    inputPassword.minLength = 6;
    inputConfirmPassword.type = "password";
  }
  labelName.textContent = "Il tuo Nome";
  labelEmail.textContent = "Email";
  labelPassword.textContent = "Password";
  inputPassword.placeholder = "Almeno 6 caratteri";
  labelConfirmPassword.textContent = "Verifica Password";
  inputPassword.required = true;
  inputConfirmPassword.required = true;
  btnSign.textContent = "Crea il tuo account Amazon";

  btnSign.addEventListener("click", handleSubmitSign);
  //append
  wrapSign.prepend(
    title,
    labelName,
    inputName,
    labelEmail,
    inputEmail,
    labelPassword,
    inputPassword,
    labelConfirmPassword,
    inputConfirmPassword,
    btnSign
  );

  divBreak = document.querySelector(".divider-break");
  divBreak.textContent = "";
  isStartSign = false;
  formLogin.addEventListener("submit", handleSubmitSign);
}
function handleSubmitSign() {
  event.preventDefault();
  const inputs = modal_body.querySelectorAll("input");
  const newUser={
    username:null,
    email:null,
    password:null,
  };
  let count=0;
  for (const key in newUser) {
      newUser[key] = inputs[count].value;
      count++;  
  }
  //creazione idRandom
  newUser.id=(Math.floor((Math.random()*8888)+(Math.random()*451)));
  state.users={
    ...state.users,
    newUser
  }
  const usersStringify=JSON.stringify(state.users)
  localStorage.setItem("users",usersStringify);
  modal.classList.toggle("is-invisible");
}

/******END SIGN IN FORM*********/

async function handleMounted() {
  // document.body.classList.add('is-blur');
  loader.classList.add("loader-01");
  await Promise.all([getAllProducts(), getAllCategories(), getAllUsers()]);
  loader.classList.remove("loader-01");
  showToast("Nuovo Cliente?Accedi");
  console.log("state", state.users);
}

/******event listener ******/
document.addEventListener("DOMContentLoaded", handleMounted);
modal.addEventListener("click", closeForm);

//btn
btnLogin.addEventListener("click", handleLogin);
