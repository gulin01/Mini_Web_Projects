const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random  = document.getElementById('random-btn'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
singleEl = document.getElementById('single-meal');

// search meal and fetch from api
function searchMeal(e){
    e.preventDefault();
    // clear single meal
    singleEl.innerHTML = '';
    
    //get search word
    const term  = search.value;

    //check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        resultHeading.innerHTML = `<h2>Search result for '${term}'</h2>`
        if(data.meals===null){
            resultHeading.innerHTML = `<p>There are no results . Try again</p>`;
        }else {
            mealsEl.innerHTML = data.meals.map(meal=>`
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealId ="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
            </div>
            </div>`).join('');
        }
        //clear search text 
        search.value = '';

            });

    }else{
        alert('Please enter a search term');
    }

}
// fetch meal by id
function getMealById(mealId) {

     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
     .then(res=>res.json())
     .then(data=>{
         const meal  = data.meals[0];

         addMealToDom(meal);
     })
}

//fetch random meal
function getRandomMeal(){
    // clear meals and heading 
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data=>{
      const meal = data.meals[0];
      console.log(meal);
      addMealToDom(meal);
    });
     

}

// Add meal to dom 
function addMealToDom(m) {
    const ingredients = [];
    for(let i = 1; i<=20; i++){
        if(m[`strIngredient${i}`]){
            ingredients.push(`${m[`strIngredient${i}`]} - ${m[`strMeasure${i}`]}`)
        }
        else{
            break;
        }
    }
    singleEl.innerHTML = `
    <div class="single-meal">
    <h1>${m.strMeal}</h1>
    <img src="${m.strMealThumb}" alt = "${m.strMeal}"/>
    <div class="single-meal-info">
    ${m.strCategory ? `<p>${m.strCategory}</p>` : ''} 
    ${m.strArea ? `<p>${m.strArea}</p>` : ''} 
    </div>
    <div class ="main">
    <p>${m.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing=>
        `<li>${ing}</li>`
    ).join('')}
    </ul>
   
    </div>
    </div>
    `;
}
// Event Listeners

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click',(e)=>{
   const mealInfo = e.path.find(item=>{
    if(item.classList){
        return item.classList.contains('meal-info');
    }else{
        return false;
    }
   });

  if(mealInfo){
      const mealId = mealInfo.getAttribute('data-mealId');
      console.log(mealId);
      getMealById(mealId);
  } 

});

