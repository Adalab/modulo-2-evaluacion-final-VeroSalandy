"use strict";

// PASOS:
//  1: obtener datos (default-list=margaritas) y pintarlos en html
//      * 1- Obtener los datos (fetch, lista ) : Fetch
//      * 2- Pintarlos en el HTML : innerHtml
// 2: buscar cocktailes y cuando usuaria pulse search (con eventlistener sobre boton search), generar datos de todos los cocktailes atraves de otro fetch interpolado. Luego pintarlo en HTML
// 3: Guardar los favoritos de la usuaria
// //   * 1- Crear una lista para los favoritos en el HTML
//      * 2- Crear una lista de datos de los favoritos: list guarda objetos de resultado.
//      * 3- Buscar con ese id en el listado de ***palettas que paleta tiene el id del curren target, lo hacemos con un find (devuelve el objeto)
//      * 4- La guardo en el listado de favoritos: push
//      * 5- Pintar en el listado HTML de favoritos: renderFavoritos innerHTML, ¿se puede reutilizar algun función que ya tenemos?
//      * 6 - Comprobar si ya existe (findIndex) y lo elimino de la lista de favoritos (splice)
//      * * */

//Buscar con ese id en el listado de palettas que paleta tiene el id del curren target, lo hacemos con un find (devuelve el objeto)

//4: Almacenamiento local con local storage

//console.log('>> Ready to start :)');

//variables

const resultList = document.querySelector('.js-result-list');
const url =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');

let resultListDataMargarita = [];
let resultListDataCocktails = [];

//fetch para obtener (default)datos que serian (margaritas)
fetch(url)
    .then((response) => response.json())
    .then((data) => {
    //console.log(data);
    resultListDataMargarita = data.drinks;
    //console.log(resultListData);
    renderResult(resultList);
  });

//Pintarlos en el HTML cockteles margaritas
function renderResult(cocktail) {
     resultList.innerHTML = '';// dejar esto?
    for (const eachcocktail of resultListDataMargarita) {
    cocktail.innerHTML += `<li>
    <article class="cocktail">
    <h3 class="cocktail-title">${eachcocktail.strDrink}</h3>
    <img class="cocktail-image" src=${eachcocktail.strDrinkThumb} alt="image of cocktail" />
    </article>
    </li>`;
  }
}

function renderResultAll(cocktail) {
    resultList.innerHTML = '';
    for (const eachcocktail of resultListDataCocktails) {
    cocktail.innerHTML += `<li>
    <article class="cocktail">
    <h3 class="cocktail-title">${eachcocktail.strDrink}</h3>
    <img class="cocktail-image" src=${eachcocktail.strDrinkThumb} alt="image of cocktail" />
    </article>
    </li>`;
  }
}


//funcion manejadora handleinput
function handleClickBtnSearch(ev){
    ev.preventDefault();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
    resultListDataCocktails = data.drinks;
    console.log(resultListDataCocktails);
    renderResultAll(resultList);

    
   // const inputSearchValue = inputSearch.value;
    //inputSearchValue.innerHTML = '';// porque no se borra el input?

  });
 

   // const inputSearchValue = inputSearch.value;

    //if(inputSearchValue ===''){


    //     
    // };
    //console.log(btnSearch);
}


btnSearch.addEventListener('click', handleClickBtnSearch);
