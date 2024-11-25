const profilePopup = document.querySelector('.popup_type_edit');
const profilePopupOpenButton = document.querySelector('.profile__edit-button');

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const cardPopup = document.querySelector('.popup_type_new-card');
const cardPopupOpenButton = document.querySelector('.profile__add-button');

const cardFormElement = document.forms['new-place'];


const imagePopup = document.querySelector('.popup_type_image');

const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');


const popupCloseButton = document.querySelectorAll('.popup__close');


const cardTemplate = document.querySelector('#card-template').content;

const cardsContainer = document.querySelector('.places__list');

function createCard(cardData, deleteCallback = deleteCard, likeCallback = likeCard, imageCallback = handleCardImageClick) {
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

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

function handleCloseModal(event) {
    closeModal(event.target.closest('.popup'));
}

function handlePopupProfileOpenButtonClick() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

    openModal(profilePopup);
}

function handleProfileFormSubmit(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(profilePopup);
}

function handlePopupCardButtonOpenClick() {
    cardFormElement.reset();

    openModal(cardPopup);
}

function handleCardFormSubmit(event) {
    event.preventDefault();

    const nameInput = cardFormElement.elements['place-name'];
    const linkInput = cardFormElement.elements.link;

    cardsContainer.prepend(createCard({
        name: nameInput.value,
        link: linkInput.value
    }, deleteCard, likeCard, handleCardImageClick));

    cardFormElement.reset();

    closeModal(cardPopup);
}

function handleCardImageClick(event) {
    imagePopupImage.src = event.currentTarget.src;
    imagePopupImage.alt = event.currentTarget.alt;
    imagePopupCaption.textContent = event.currentTarget.alt;

    openModal(imagePopup);
}

popupCloseButton.forEach(el => el.addEventListener('click', handleCloseModal));

profilePopupOpenButton.addEventListener('click', handlePopupProfileOpenButtonClick);
cardPopupOpenButton.addEventListener('click', handlePopupCardButtonOpenClick);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(cardData => cardsContainer.append(createCard(cardData, deleteCard, likeCard, handleCardImageClick)));

[profilePopup, cardPopup, imagePopup].forEach(el => el.classList.add('popup_is-animated'));