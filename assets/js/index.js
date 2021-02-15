//
const wrapAllProducts = document.querySelector(".wrap");
const loader=document.querySelector(".loader-01");

const state = {
  config: {
    BASE_URL: "https://fakestoreapi.com/",
  },
  products: null,
  categories: null,
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

const getAllProducts = async () => {
  const pathname = getUrl("products");
  const allProducts = await getData(pathname);
  const products = allProducts.map((product) => {
    return {
      ...product,
      stars: (Math.random() * 4+1 ).toFixed(1),
      numFeedback: Math.floor(Math.random() * 5000),
    };
  });
  state.products = products;
  console.log(state.products)
  return renderCarouselProducts(state.products,wrapAllProducts)
};

const getAllCategories = async () => {
  const path = getUrl("products/categories");
  const allCategories = await getData(path);
  state.categories = allCategories;
  renderSidebar();
};
//function per calcolare numero di stelle dei prodotti
function feedBack(feedbackStars) {
    const stars = [];
    stars.push(parseInt(feedbackStars));
    if ((feedbackStars - stars[0]) > 0.5) {
      stars.push(0.5);
    }
    return stars;
  }
function productCard(coverURL,id,stars,titleProduct,vote,priceProduct){
    const wrapCard=document.createElement('article');
    wrapCard.classList.add('wrap__items-card')
    const wrapAnchor=document.createElement('a');
    wrapAnchor.id=id;
    wrapCard.appendChild(wrapAnchor);
    
    // const category=document.createElement('h4');
    // category.textContent(titleCategories);
    
    const imgProduct=document.createElement('img');
    imgProduct.src=coverURL;
    
    const product=document.createElement('h5');
    product.textContent=titleProduct;
    
    const price=document.createElement('h3');
    price.textContent=`€ ${priceProduct}`;
    
    const wrapFeedback=document.createElement('div');
    wrapFeedback.classList.add('wrap__items-card--feedback');
    
    renderStars(stars,wrapFeedback);
    const votes=document.createElement('span');
    votes.textContent=vote;
    
    wrapFeedback.append(votes);
    wrapAnchor.append(imgProduct,product,price,wrapFeedback);
    
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

function renderStars(arrayStar,wrapFeedback){
    const arr=feedBack(arrayStar);
    for(let i=0;i<arr[0];i++){
        const starIcon=document.createElement('i');
        starIcon.className=`fa fa-star`;
        wrapFeedback.appendChild(starIcon);
    }
    if(arr[1]){
        const halfStarIcon=document.createElement('i');
        halfStarIcon.className=`fa fa-star-half`;
        wrapFeedback.appendChild(halfStarIcon);
    }

}

function renderCarouselProducts(listItems,sectionNode){
    const listProducts=document.createElement('div');
    listProducts.classList.add('wrap__items');

    listItems.forEach(item => {
        const card=productCard(item.image,item.id,item.stars,item.title,item.numFeedback,item.price)
        listProducts.append(card);
    });
    sectionNode.append(listProducts)
}

async function handleMounted() {
 // document.body.classList.add('is-blur');
  loader.classList.add('loader-01');
  await Promise.all([getAllProducts(), getAllCategories()]);
  loader.classList.remove('loader-01');
  document.body.classList.remove('is-blur');

}

/******event listener ******/
document.addEventListener("DOMContentLoaded", handleMounted);
