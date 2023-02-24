"use strict";

// PASOS:
//  1: obtener datos (default-list=margaritas) y pintarlos en html
//      * 1- Obtener los datos (fetch, lista ) : Fetch
//      * 2- Pintarlos en el HTML : innerHtml
// 2: buscar cocktailes y cuando usuaria pulse search (con eventlistener sobre boton search), generar datos de todos los cocktailes atraves de otro fetch interpolado. Luego pintarlo en HTML
// 3: Guardar los favoritos de la usuaria
// //   * 1- Crear una lista para los favoritos en el HTML
//      * 2- Crear una lista de datos de los favoritos: list guarda objetos de resultado.
//      * 3- Buscar con ese id en el listado (original)de ***cockteles que cocktail tiene el id del curren target, lo hacemos con un find (devuelve el/1 objeto)
//      * 4- La guardo en el listado de favoritos: push
//      * 5- Pintar en el listado HTML de favoritos: renderFavoritos innerHTML, ¿se puede reutilizar algun función que ya tenemos?
//      * 6 - Comprobar si ya existe (findIndex) y lo elimino de la lista de favoritos (splice)
//      * * */

//4: Almacenamiento local con local storage

//console.log('>> Ready to start :)');

//variables

const resultList = document.querySelector('.js-result-list');
const url =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');

let resultListData = [];
//let resultListDataCocktails = [];

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
function renderResult(cocktail) {
    resultList.innerHTML = '';
    for (const eachCocktail of resultListData) {
    cocktail.innerHTML += `<li class="js-li-cocktail list-cocktail" id=${eachCocktail.idDrink}>
    <article class="cocktail">
    <h3 class="cocktail-title">${eachCocktail.strDrink}</h3>
    <img class="cocktail-image" src=${eachCocktail.strDrinkThumb} alt="image of cocktail" />
    </article>
    </li>`;
  }
  addEventToCocktail();
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
  console.log(ev.currentTarget.id);
  ev.currentTarget.classList.toggle('selected');
}

//function para cada uno de los li/cocktailes para manejar el addevent listener
function addEventToCocktail(){
const liElementsList = document.querySelectorAll('.js-li-cocktail');
//console.log(liElementsList);
for (const eachLi of liElementsList) {
  eachLi.addEventListener('click', handleClickOfEachCocktail);
 }
}

btnSearch.addEventListener('click', handleClickBtnSearch);





// const inputSearchValue = inputSearch.value;
    //inputSearchValue.innerHTML = '';// porque no se borra el input?
// const inputSearchValue = inputSearch.value;

    //if(inputSearchValue ===''){


    //     
    // };
    //console.log(btnSearch);