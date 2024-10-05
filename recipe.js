const searchbox=document.querySelector('.searchbox');
const button=document.querySelector('.submit');
const recipecontainer=document.querySelector('.recipe-container');
const recipedetailscontent=document.querySelector('.recipe-details-content');
const recipeclosebtn=document.querySelector('.recipe-closebtn');

const fetchrecipe= async(query)=>{
    recipecontainer.innerHTML="Fetching";
    try {
        
   const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const response=await data.json();


    
   recipecontainer.innerHTML="";
//    if (response.meals) {
    
    response.meals.forEach(meal => {
        const recipediv=document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML=`
           <img src="${meal.strMealThumb}">
           <h3>${meal.strMeal}</h3>
           <p><span>${meal.strArea} DISH</span></p>
           <p>Belongs to <span>${meal.strCategory}</span> Category</p>
           
        `

        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipediv.appendChild(button);  
        

        // adding eventlistener to recipe button
        button.addEventListener('click',()=>{
                openrecipepopup(meal);
        })
         recipecontainer.appendChild(recipediv);
    });
} catch (error) {
        recipecontainer.innerHTML="<h2> Error in fetching Recipes.........</h2>";
}
}

// function to fetch ingredients
const fetchingredients=(meal)=>{
    let ingredientslist="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];

        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientslist+=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientslist;
}

const openrecipepopup=(meal)=>{
    recipedetailscontent.innerHTML=`
    <h2 class="recipename">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientlist">${fetchingredients(meal)}</ul>

    <div class="instruction">
       <h3>Instructions:</h3>;
       <p >${meal.strInstructions}</p>;
    </div>
    `;

    recipedetailscontent.parentElement.style.display="block";
}

// close button working
 recipeclosebtn.addEventListener('click',()=>{
     recipedetailscontent.parentElement.style.display="none";
})

button.addEventListener('click',(e)=>{
    e.preventDefault();
    
    const searchinput=searchbox.value.trim();
     if(!searchinput){
        recipecontainer.innerHTML=`<h2>Type the meal in the search box...</h2>`;
        return;
     }
    fetchrecipe(searchinput);
//    console.log("button clicked")
});
