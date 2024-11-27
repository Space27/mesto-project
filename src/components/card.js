const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, imageCallback, deleteCallback = deleteCard, likeCallback = likeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardImage.addEventListener('click', imageCallback);
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCallback);

    return cardElement;
}

function deleteCard(event) {
    event.target.closest('.card').remove();
}

function likeCard(event) {
    event.currentTarget.classList.toggle('card__like-button_is-active');
}

export {createCard};