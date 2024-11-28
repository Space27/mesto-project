const cardTemplate = document.querySelector('#card-template').content;

function createCard(thisUserId, cardData, imageCallback, deleteCallback, likeCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const counter = cardElement.querySelector('.card__like-counter');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    counter.textContent = cardData.likes.length;
    if (cardData.likes.length === 0) {
        counter.classList.add('card__like-counter_disabled');
    }

    if (cardData.owner._id === thisUserId) {
        cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCallback(cardData._id, deleteButton));
    } else {
        deleteButton.classList.add('card__delete-button_disabled');
    }

    if (cardData.likes.find(el => el._id === thisUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    cardImage.addEventListener('click', imageCallback);
    likeButton.addEventListener('click', () => likeCallback(cardData._id, likeButton, counter));

    return cardElement;
}

export {createCard};