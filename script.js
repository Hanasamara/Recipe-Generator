
/////////// Start get from recipie API ////////////
///////////////////////////////////////////////////

////////// Recipe API ////////
const APIKey = "489acda33ae8414a887c621fccce2fbe";
const myAPI = "https://65427340ad8044116ed3651e.mockapi.io/recipe"

let ingredients = "";
let count = 1 ;
//apples,+flour,+sugar

///////////// User Enter ingrident /////////////
const box1 = document.getElementById("box1");
const form = document.getElementById("ingredientForm");
const addButton = document.getElementById("addButton");
const userInput = document.getElementById("ingredientInput");
const ingredientList = document.getElementById("list");
const getRecipe = document.getElementById("getRecipe");
const resultTitle = document.getElementById("resTitle");
const resultInst = document.getElementById("rules");
const resultLink = document.getElementById("Link");
const hide = document.getElementById("hide");
const resultInput = document.getElementById("resultInput");
const resultButton = document.getElementById("resultButton");
////////////// Fetching data ////////////////////

///////GET///////
async function fetchData(apiUrl) 
{
    try 
    {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;

    } 
    catch (error) 
    {
        console.error('Fetch Error:', error);
        throw error; // Re-throw the error to handle it further if needed
    }
}


//////Post//////
async function fetchPost(postData) 
{
    try 
    {
        const response = await fetch(myAPI,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json', },//ask CHATGPT about it
                body:JSON.stringify(postData),
            });
        const data = await response.json();
        return data;

    } 
    catch (error) 
    {
        console.error('MockAPI Posting Error:', error);
        throw error; // Re-throw the error to handle it further if needed
    }
}

///////////// Input Validation ///////////


////////////  Function to add ingredient /////////////// 

function addIngredient()
{
    if( count <=5 )
    {
        if(count == 1)
        {
            console.log(count);
            ingredients += userInput.value.toLowerCase();
            console.log(ingredients);
            // create li to add ingredient to the ul list /////
            // Create a new li element
            const li = document.createElement('li');
            li.textContent = userInput.value;
            ingredientList.appendChild(li);
            userInput.value = '';

            count++;
        }
        else{

            console.log(count);
            ingredients += ',+' + userInput.value.toLowerCase();
            console.log(ingredients);
            // create li to add ingredient to the ul list /////
            // Create a new li element
            const li = document.createElement('li');
            li.textContent = userInput.value;
            ingredientList.appendChild(li);
            userInput.value = '';

            count++;
            if(count ==5)
            {
                // Hidw input box and change button style ///
                form.style.display = 'none';
                /// reset count to 1 again ////
                count = 1;
            }
        }
    }

}

////////////// Event listeners /////////////////////


const recDetails = {};

addButton.addEventListener('click',addIngredient);
getRecipe.addEventListener('click',async ()=>
{
    const apiUrl1 = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIKey}&ingredients=${ingredients}&number=1`;
    const data = await fetchData(apiUrl1);
    // console.log(data[0]);

    const apiUrl2 = `https://api.spoonacular.com/recipes/${data[0].id}/information?apiKey=${APIKey}&includeNutrition=false`; 
    const myResult = await fetchData(apiUrl2);
    // console.log(myResult);

    recDetails.recID = myResult.id;
    recDetails.title = myResult.title;
    recDetails.image = myResult.image;
    recDetails.ingredients = ingredients;
    recDetails.sourceName = myResult.sourceName;
    recDetails.sourceUrl = myResult.sourceUrl;
    recDetails.servings = myResult.servings;
    recDetails.cuisines = myResult.cuisines;
    recDetails.dishTypes = myResult.dishTypes;
    recDetails.instructions =myResult.instructions;


    console.log(recDetails.instructions);

    getRecipe.style.display = 'none';
    form.style.display = 'none';
    ingredientList.style.display = 'none';

    //////  Display result on webApp ////

    resultTitle.innerHTML = recDetails.title;
    resultInst.innerHTML = recDetails.instructions;
    resultLink.innerHTML = recDetails.sourceUrl;
    resultLink.href = recDetails.sourceUrl;
    hide.style.display = "flex";
    box1.style.backgroundImage = `url('${recDetails.image}')`;

});


resultButton.addEventListener('click',()=>
{
    ///Should check validation for user input //
    recDetails.opinion = resultInput.value;
    console.log(recDetails);
    fetchPost(recDetails);
    // recDetails = {};
    ingredients = '';
    count = 1;
    hide.style.display = 'none';
    getRecipe.style.display = 'flex';
    form.style.display = 'flex';
    ingredientList.innerHTML = '';
    resultInput.value = '';
    ingredientList.style.display = 'block';
    box1.style.backgroundImage = 'none';

})









