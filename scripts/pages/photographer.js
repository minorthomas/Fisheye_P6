const getParams = window.location.search; //recup params dans l'url
const getUrlParams = new URLSearchParams(getParams);
const getIdParam = getUrlParams.get("id"); //recup seulement param id de l'url

function pageNotFound() {
    //recup id main
    const photographerMain = document.querySelector("#main");

    //display none all elements
    document.querySelector(".sort_by").style.display = "none";
    document.querySelector(".photographer_header").style.display = "none";

    //set timeout after error (3s)
    setTimeout(function () { window.location.href = "index.html"; }, 3000);

    const errorInDom = `
    <div class="error">
        <p class="error_number">404</p>
        <p class="error_text">Page not found</p>
        <p class="error_redirect">Auto redirect after 3 seconds</p>
    </div>
    `

    photographerMain.innerHTML = errorInDom;
}

async function displayPhotographerData() { //display infos photographers
    const { photographers } = await getPhotographers(); //recup photographers et medias
    const photographerHeader = document.querySelector(".photographer_header");//recup element dom (header)

    const selectedPhotographer = photographers.find( //trouve et verifi si id du photographer == id dans l'url
        (photographer) => photographer.id == getIdParam
    );

    //condition si aucun photographe
    if (selectedPhotographer === undefined) {
        //initialise fonction affichage error dom
        pageNotFound();
    } else {
        const photographerModel = new Photographers(selectedPhotographer); //constructor creer new photographer
        photographerHeader.innerHTML += photographerModel.templatePhotographerPage(); //ajout les infos photographer dans dom

        const photographerBottom = document.querySelector(".photographer_bottom");

        photographerBottom.innerHTML = photographerModel.templateLikeAndPrice();
    }
};

async function displayPhotographerMedias() { //display les medias photographers (images, videos)
    function sortBy() {
        const filterSelect = document.querySelector("#filter-select");//get select menu

        sortByPopularity(); //initialise popularity filter par defaut

        filterSelect.addEventListener("change", (event) => {
            if (event.target.value === "popularity") { //si sur popularity, change dans l'ordre like
                sortByPopularity();
            } else if (event.target.value === "date") { //si sur date, change dans l'ordre: plus recente plus ancienne
                sortByDate();
            } else if (event.target.value === "title") { //si sur title, change ordre alpha
                sortByTitle();
            }
        })
    }
    sortBy(); //initialise la funct de tri
}

async function init() {
    await displayPhotographerData();
    await displayPhotographerMedias();
};

init();