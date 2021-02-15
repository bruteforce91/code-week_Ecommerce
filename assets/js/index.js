


const state={
    config:{
        BASE_URL:'https://fakestoreapi.com/',
    },
    products:null,
    categories:null
}

const getData = async (url) =>{
    try {
        const response = await fetch(url);
        const result= await response.json();
        
        if(!response.ok){
            throw error;
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}

const getUrl=(path)=>{
    const pathName=`${state.config.BASE_URL}${path}`;
    return pathName;
}


const getAllCategories= async ()=>{
    const path=getUrl('products/categories');
    const allCategories=await getData(path);
    state.categories=allCategories;
    renderSidebar();
}

function renderSidebar(){
    //getAllCategories().then();
    const ulCategories=document.querySelector('.sidebar_categories')
    state.categories.forEach(category => {
        const btn=document.createElement('button')
        btn.id=category;
        btn.textContent=category.toUpperCase();
        const li=document.createElement('li');
        li.appendChild(btn)
        ulCategories.appendChild(li);
    })

}

/******event listener ******/
document.addEventListener("DOMContentLoaded",getAllCategories);