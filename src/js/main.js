"use strict";

// PASOS:
//  1: obtener datos (default-list=margaritas) y pintarlos en html
//      * 1- Obtener los datos (fetch, lista ) : Fetch
//      * 2- Pintarlos en el HTML : innerHtml
// 2: buscar cocktailes y cuando usuaria pulse search (con eventlistener sobre boton search), generar datos de todos los cocktailes atraves de otro fetch interpolado. Luego pintarlo en HTML
// 3: Guardar los favoritos de la usuaria
// //   * 1- Crear una lista para los favoritos en el HTML
//      * 2- Crear una lista de datos de los favoritos: list guarda objetos de resultado.
//      * 3- Buscar con ese id en el listado (original)de ***cockteles que cocktail tiene el id del curren target, lo hacemos con un find (devuelve el primer elemento y solo un elemento ***objeto)
//      * 4- La guardo en el listado de favoritos: push
//      * 5- Pintar en el listado HTML de favoritos: renderFavoritos innerHTML, ¿se puede reutilizar algun función que ya tenemos?
//      * 6 - Comprobar si ya existe (findIndex) y lo elimino de la lista de favoritos (splice)
//      * * */

//4: Almacenamiento local con local storage

//console.log('>> Ready to start :)');

//variables
const url =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const resultList = document.querySelector('.js-result-list');
const favoriteList = document.querySelector('.js-favorite-list');
const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset')

let resultListData = [];
let favoriteListData = [];


//buscar en Local Storage y pintarlo en html(que es el favoritelist)
const storedCocktail = JSON.parse(localStorage.getItem('favoriteCocktail'));
  if (storedCocktail !== null) { // tambien lo puede escribir (storedCocktail) solo que es lo mismo
    favoriteListData = storedCocktail;
    renderFavorite(favoriteList);
  }


//fetch para obtener (default)datos que serian (margaritas)
fetch(url)
    .then((response) => response.json())
    .then((data) => {
    //console.log(data);
    resultListData = data.drinks;
    //console.log(resultListData);
    renderResult(resultList);
  
  });

//funcion Pintarlos en el HTML cockteles
function renderResult(resultList) {
    resultList.innerHTML = '';
    for (const eachCocktail of resultListData) {
    resultList.innerHTML += `<li class="list-cocktail">
    <article class="cocktail js-art-li-cocktail" id=${eachCocktail.idDrink}>
    <h3 class="cocktail-title">${eachCocktail.strDrink}</h3>
    <img class="cocktail-image" src=${eachCocktail.strDrinkThumb} alt="image of cocktail" />
    </article>
    </li>`;
  }
  addEventToCocktail();
}
//funcion Pintarlos en lista favorites en el HTML 
function renderFavorite(favoriteList) {
    favoriteList.innerHTML = '';
    for (const eachCocktail of favoriteListData) {
    favoriteList.innerHTML += `<li class="list-cocktail">
    <article class="cocktail js-art-li-cocktail" id=${eachCocktail.idDrink}>
    <h3 class="cocktail-title">${eachCocktail.strDrink}</h3>
    <img class="cocktail-image" src=${eachCocktail.strDrinkThumb} alt="image of cocktail" />
    </article>
    </li>`;
  }
  //addEventToCocktail();
}

//funcion manejadora handlelickBtnSearch
function handleClickBtnSearch(ev){
    ev.preventDefault();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
    resultListData= data.drinks;
    //console.log(resultListData);
     renderResult(resultList);


     
   
  });
 
}



//funcion para cuando le damos click a uno de los cocktails
function handleClickOfEachCocktail(ev) {
  //console.log(ev.currentTarget.id);

  ev.currentTarget.classList.toggle('selected');


  const idSelectedCocktail = ev.currentTarget.id;
// find; nos devuelve primer elemento que cumpla condicion, aqui es el ID
  const selectedCocktail = resultListData.find(cocktailItem => cocktailItem.idDrink=== idSelectedCocktail);
//console.log(selectedCocktail);

//comprobar si ya existe el favorito con findIndex y nos devuelve posicion donde esta el elemento o -1 cuando no esta
  const indexCocktail = favoriteListData.findIndex(cocktailItem => cocktailItem.idDrink=== idSelectedCocktail);
  //console.log(indexCocktail);

 if(indexCocktail === -1) {//-1 significa que no esta en lista favo

  //guardar ese objeto (que obtuvimos con find) en listado de favoritos(FLData): con push
  favoriteListData.push(selectedCocktail);
 
 } 

 /*else{ // si SI esta en el listado de favoritos, con splice lo puedes eliminar
  favoriteListData.splice(indexCocktail, 1);
 } //decirdir si utilizo esto ya qye da problemas por el local storage
*/


 //pintar en el listado de favorits en html
renderFavorite(favoriteList);

localStorage.setItem('favoriteCocktail', JSON.stringify(favoriteListData));
}

//function para cada uno de los li/cocktailes para manejar el addevent listener
function addEventToCocktail(){
const liElementsList = document.querySelectorAll('.js-art-li-cocktail');
//console.log(liElementsList);
for (const eachLi of liElementsList) {
  eachLi.addEventListener('click', handleClickOfEachCocktail);
 }
}

function handleClickBtnReset(ev){
  ev.preventDefault();
  //console.log('hola');
if(favoriteListData!==null) {
  
  favoriteList.innerHTML = '';
  localStorage.removeItem('favoriteCocktail');

  // como hacer para que la funcion handleClickOfEachCocktail o al pinchar a los cocktails, deje de funcionar despues de darle click al reset 


}
}
btnSearch.addEventListener('click', handleClickBtnSearch);

btnReset.addEventListener('click', handleClickBtnReset);


//1. hacer que valor del input se borre al pinchar boton search
//2. hacer que al pinchar boton reset, luego al pinchar cocktail no se agregen de nuevo

 /*const inputSearchValue = inputSearch.value;
 inputSearchValue.innerHTML === '';*/
// const inputSearchValue = inputSearch.value;
    //inputSearchValue.innerHTML = '';// porque no se borra el input?
// const inputSearchValue = inputSearch.value;

    //if(inputSearchValue ===''){


    //     
    // };