async function getMedias() {
    const { media } = await getPhotographers();

    const selectedMedia = media.filter( //trouve et verifi si id du photographer == id dans l'url
        (media) => media.photographerId == getIdParam
    );
}

async function init() {
    await getMedias();
};

init();