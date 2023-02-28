'use strict';
// PASOS:
/*1: obtener datos (default-list=margaritas) y pintarlos en html
 * 1- Obtener los datos (fetch, lista ) : Fetch
 * 2- Pintarlos en el HTML : innerHtml */

/*2: buscar cocktailes y cuando usuaria pulse search (con eventlistener sobre boton search), generar datos de todos los cocktailes atraves de otro fetch interpolado. Luego pintarlo en HTML */

/*3: Guardar los favoritos de la usuaria
 * 1- Crear una lista para los favoritos en el HTML
 * 2- Crear una lista de datos de los favoritos: list guarda objetos de resultado.
 * 3- Buscar con ese id en el listado (original)de ***cockteles que cocktail tiene el id del curren target, lo hacemos con un find (devuelve el primer elemento y solo un elemento ***objeto)
 * 4- La guardo en el listado de favoritos: push
 * 5- Pintar en el listado HTML de favoritos: renderFavoritos innerHTML, ¿se puede reutilizar algun función que ya tenemos?
 * 6 - Comprobar si ya existe (findIndex) y lo elimino de la lista de favoritos (splice)*/

/*4: Almacenamiento local con local storage.
 * 1 - guardar local en local storage
 * 2 - obtener los datos guardados en local storage */

//5. Reset BTN, eliminar/borrar lista de favoritos y del localstorage, con el add event listener sobre ese boton, para que no se vuelvan a pintar

//variables
const url =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const resultList = document.querySelector('.js-result-list');
const favoriteList = document.querySelector('.js-favorite-list');
const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const errorMsj = document.querySelector('.js-error-message');

let resultListData = [];
let favoriteListData = [];

//4.2 FUNCTION PARA OBTENER en Local Storage los datos guardados y pintarlo en html en favoritelist
const storedCocktail = JSON.parse(localStorage.getItem('favoriteCocktail'));
if (storedCocktail !== null) {
  // tambien lo puede escribir (storedCocktail) solo que es lo mismo
  favoriteListData = storedCocktail;
  renderFavorite(favoriteList);
}

//1. FETCH, PARA OBTENER LOS DATOS
//1.1 FETCH CON LOS CUAL OBTENGO DATOS(DEFAULT QUE SERIA MARGARITAS)
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    resultListData = data.drinks;
    renderResult(resultList);
  });

//1.2 FUNCION PARA PINTARLOS (default/input cocktails) EN HTML (en RESULTLIST se pintan los cocktails que son los cocktails por defecto al levantarse la pagina (las margaitas) o los cocktails que la usuaria introdujo en el input --> con el bucle 'for of' utilizando el findIndex verifico si idDrink del array resultlistdata es igual al idDrink del array favoritelistdata (hace comparacion). Sí el indexcocktail no esta quiro que me pinte el resultlist sin class 'selected', PERO si si esta que me pinte el resultlist con class 'selected'
function renderResult(resultList) {
  resultList.innerHTML = '';
  for (const eachCocktail of resultListData) {
    const indexCocktail = favoriteListData.findIndex(
      (eachCocktailFav) => eachCocktail.idDrink === eachCocktailFav.idDrink
    );
    if (indexCocktail === -1) {
      resultList.innerHTML += `<li class='list-cocktail'>
    <article class='cocktail js-art-li-cocktail' id=${eachCocktail.idDrink}>
    <h3 class='cocktail-title'>${eachCocktail.strDrink}</h3>
    <img class='cocktail-image' src=${eachCocktail.strDrinkThumb} alt='image of cocktail' />
    </article>
    </li>`;
    } else {
      resultList.innerHTML += `<li class='list-cocktail'>
    <article class='cocktail js-art-li-cocktail selected' id=${eachCocktail.idDrink}>
    <h3 class='cocktail-title'>${eachCocktail.strDrink}</h3>
    <img class='cocktail-image' src=${eachCocktail.strDrinkThumb} alt='image of cocktail' />
    </article>
    </li>`;
    }
  }
  addEventToCocktail();
}

//3.5 FUNCION PARA PINTAR LISTA DE FAVORITOS EN HTML (en FAVORITELIST se pintan los cocktails que la usuaria ha seleccionado, que seran los que se pintan en lista de favoritos
function renderFavorite(favoriteList) {
  favoriteList.innerHTML = '';
  for (const eachCocktail of favoriteListData) {
    favoriteList.innerHTML += `<li class='list-cocktail '>
    <article class='cocktail js-art-li-cocktail' id=${eachCocktail.idDrink}>
    <i class="fas fa-window-close icon-remove"></i>
    <h3 class='cocktail-title'>${eachCocktail.strDrink}</h3>
    <img class='cocktail-image' src=${eachCocktail.strDrinkThumb} alt='image of cocktail' />
    </article>
    </li>`;
  }
  //addEventToCocktail();
}

//FUNCION PARA PINTAR MENSAJE DE ERROR
function renderErrorMsj(msj) {
  errorMsj.innerHTML = msj;
}

//2. FUNCION PARA buscar cocktailS y cuando usuaria pulse search (con eventlistener sobre boton search), generar datos de todos los cocktailes atraves de otro fetch interpolado, que utilizada el inputSearch.value = que es el valor que usuaria ha puesto en el input. Si el valor del input es vacio, se pintara mensaje de error. Sino se pintara la lista de resultado con valor/cocktail que usuaria puso en input. Luego se pinta lista de resultado en HTML llamando a la funcion renderresult.
function handleClickBtnSearch(ev) {
  ev.preventDefault();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (inputSearch.value === '') {
        renderErrorMsj('Oeps, please insert a cocktail');
        errorMsj.classList.add('error-message');
      } else {
        resultListData = data.drinks;
        inputSearch.value = '';
        renderErrorMsj('');
        errorMsj.classList.remove('error-message');
        renderResult(resultList);
      }
    });
}

/*/*3: Guardar los favoritos de la usuaria
 * 1- Crear una lista para los favoritos en el HTML
 * 2- Crear una lista de datos de los favoritos: list guarda objetos de resultado.
 * 3- Buscar con ese id en el listado (original)de ***cockteles que cocktail tiene el id del curren target, lo hacemos con un find (devuelve el primer elemento y solo un elemento ***objeto)
 * 4- La guardo en el listado de favoritos: push
 * 5- Pintar en el listado HTML de favoritos: renderFavoritos innerHTML, ¿se puede reutilizar algun función que ya tenemos?
 * 6 - Comprobar si ya existe (findIndex) y lo elimino de la lista de favoritos (splice)*/

//3. FUNCTION PARA CUANDO LE DAMOS CLICK A UNO DE LOS COCKTAILS, PARA QUE SE GUARDEN Y PINTEN EN EL LISTADO DE FAVORITOS. UTILIZANDO EL 'FIND Y FINDINDEX'.
function handleClickOfEachCocktail(ev) {
  const idSelectedCocktail = ev.currentTarget.id;
  // 3.3 FIND; nos devuelve primer elemento del array que cumpla condicion, aqui es el ID
  const selectedCocktail = resultListData.find(
    (cocktailItem) => cocktailItem.idDrink === idSelectedCocktail
  );

  // FINDINDEX: comprobar si ya existe el favorito con findIndex y nos devuelve posicion donde esta el elemento o si nos devuelve -1 es que no esta
  const indexCocktail = favoriteListData.findIndex(
    (cocktailItem) => cocktailItem.idDrink === idSelectedCocktail
  );

  if (indexCocktail === -1) {
    //-1 significa que no esta en lista favoritos

    //3.2 y 3.4 guardar ese objeto (que obtuvimos con find) en listado (array) de favoritos(FLData): con push --> el array lo cree arriba como let favoriteListData = [];
    favoriteListData.push(selectedCocktail);
    ev.currentTarget.classList.add('selected');
  } else {
    //  3.6. si SI esta en el listado de favoritos, con splice lo  elimino -->
    favoriteListData.splice(indexCocktail, 1);
    ev.currentTarget.classList.remove('selected');
  }
  //3.5 pintar en el listado de favorits en html con la funcion de renderFavorite
  renderFavorite(favoriteList);

  //4.1  GUARDAR (datos) local en LOCALSTORAGE
  localStorage.setItem('favoriteCocktail', JSON.stringify(favoriteListData));
}

//function para manejar el addevent listener de cada uno de los li/cocktailes. Ya que con el bucle va recorriendo cada uno de los li, no le puedo poner a cada li manual el evento add eventlistener, con esta funcion se le pone el evento de add event listener a cada li atraves del bucle a los que le dan click
function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-art-li-cocktail');

  for (const eachLi of liElementsList) {
    eachLi.addEventListener('click', handleClickOfEachCocktail);
  }
}

//5. FUNCTION PARA ELIMINAR/RESETEAR con Reset BTN, lista de favoritos y del localstorage, con el add event listener sobre ese boton, para que no se vuelvan a pintar
function handleClickBtnReset(ev) {
  ev.preventDefault();

  if (favoriteListData !== null) {
    favoriteListData = [];
    favoriteList.innerHTML = '';
    localStorage.removeItem('favoriteCocktail');
    inputSearch.value = '';
    renderErrorMsj('');
    errorMsj.classList.remove('error-message');
    renderResult(resultList);
  }
}

btnSearch.addEventListener('click', handleClickBtnSearch);

btnReset.addEventListener('click', handleClickBtnReset);

// parte que aun me falta por terminar que es la de los iconos

/*function handleClickIconRemove //function para icono que se debe eliminar al hacer click sobre icono

function addEventToIcon() {
  const iconArray = document.querySelectorAll('.icon-remove');
  for (const eachIcon of iconArray) {
    eachIcon.addEventListener('click', handleClickIconRemove);
  }
}*/
