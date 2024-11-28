import '../pages/index.css';
import {createCard} from "./card.js";
import {openModal, closeModal} from "./modal.js";
import {enableValidation, clearValidation} from "./validate.js";
import {
    getInitialCards,
    addCard,
    deleteCard,
    likeCard,
    unLikeCard,
    getUserInfo,
    updateUserInfo,
    updateUserAvatar,
} from "./api";

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

const profilePopup = document.querySelector('.popup_type_edit');
const profilePopupOpenButton = document.querySelector('.profile__edit-button');

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileImagePopup = document.querySelector('.popup_type_edit-avatar');

const profileImageFormElement = document.forms['edit-avatar'];


const cardPopup = document.querySelector('.popup_type_new-card');
const cardPopupOpenButton = document.querySelector('.profile__add-button');

const cardFormElement = document.forms['new-place'];


const imagePopup = document.querySelector('.popup_type_image');

const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');


const cardsContainer = document.querySelector('.places__list');

function setProfile(name, description, avatar) {
    profileName.textContent = name;
    profileDescription.textContent = description;
    profileImage.style.backgroundImage = `url(${avatar})`;
}

function renderLoading(buttonElement, isLoading) {
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        buttonElement.textContent = 'Сохранить';
    }
}

function handlePopupProfileOpenButtonClick() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

    clearValidation(profileFormElement, validationConfig);

    openModal(profilePopup);
}

function handlePopupCardButtonOpenClick() {
    cardFormElement.reset();

    clearValidation(cardFormElement, validationConfig);

    openModal(cardPopup);
}

function handlePopupProfileImageClick() {
    profileImageFormElement.reset();

    clearValidation(profileImageFormElement, validationConfig);

    openModal(profileImagePopup);
}

function handleCardImageClick(event) {
    imagePopupImage.src = event.currentTarget.src;
    imagePopupImage.alt = event.currentTarget.alt;
    imagePopupCaption.textContent = event.currentTarget.alt;

    openModal(imagePopup);
}


function handleProfileFormSubmit(event) {
    event.preventDefault();

    const submitButton = profileFormElement.querySelector('.popup__button');

    renderLoading(submitButton, true);
    updateUserInfo(nameInput.value, jobInput.value)
        .then(({name, about, avatar}) => {
            setProfile(name, about, avatar);
            closeModal(profilePopup);
        })
        .catch(err => console.error(err))
        .finally(() => renderLoading(submitButton, false));
}

function handleCardFormSubmit(event) {
    event.preventDefault();

    const nameInput = cardFormElement.elements['place-name'];
    const linkInput = cardFormElement.elements.link;
    const submitButton = cardFormElement.querySelector('.popup__button');

    renderLoading(submitButton, true);
    addCard(nameInput.value, linkInput.value)
        .then(cardData => {
            cardsContainer.prepend(createCard(cardData.owner._id, cardData, handleCardImageClick, handleCardDelete, handleCardLike));

            cardFormElement.reset();

            closeModal(cardPopup);
        })
        .catch(err => console.error(err))
        .finally(() => renderLoading(submitButton, false));
}

function handleProfileImageFormSubmit(event) {
    event.preventDefault();

    const imageInput = profileImageFormElement.elements.avatar;
    const submitButton = profileImageFormElement.querySelector('.popup__button');

    renderLoading(submitButton, true);
    updateUserAvatar(imageInput.value)
        .then(({name, about, avatar}) => {
            setProfile(name, about, avatar);
            closeModal(profileImagePopup);
        })
        .catch(err => console.error(err))
        .finally(() => renderLoading(submitButton, false));
}

function handleCardLike(cardId, buttonElement, counterElement) {
    buttonElement.disabled = true;

    if (buttonElement.classList.contains('card__like-button_is-active')) {
        unLikeCard(cardId)
            .then(({likes}) => {
                buttonElement.classList.remove('card__like-button_is-active');

                if (likes.length) {
                    counterElement.classList.remove('card__like-counter_disabled');
                    counterElement.textContent = likes.length;
                } else {
                    counterElement.classList.add('card__like-counter_disabled');
                }
            })
            .catch(err => console.error(err))
            .finally(() => buttonElement.disabled = false);
    } else {
        likeCard(cardId)
            .then(({likes}) => {
                buttonElement.classList.add('card__like-button_is-active');

                counterElement.classList.remove('card__like-counter_disabled');
                counterElement.textContent = likes.length;
            })
            .catch(err => console.error(err))
            .finally(() => buttonElement.disabled = false);
    }
}

function handleCardDelete(cardId, buttonElement) {
    buttonElement.disabled = true;

    deleteCard(cardId)
        .then(() => buttonElement.closest('.card').remove())
        .catch(err => console.error(err))
        .finally(() => buttonElement.disabled = false);
}


profilePopupOpenButton.addEventListener('click', handlePopupProfileOpenButtonClick);
cardPopupOpenButton.addEventListener('click', handlePopupCardButtonOpenClick);
profileImage.addEventListener('click', handlePopupProfileImageClick);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);
profileImageFormElement.addEventListener('submit', handleProfileImageFormSubmit);

[profilePopup, cardPopup, imagePopup, profileImagePopup].forEach(el => el.classList.add('popup_is-animated'));

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
    .then(([{name, about, avatar, _id}, cardsData]) => {
        setProfile(name, about, avatar);

        cardsData.forEach(cardData => cardsContainer.append(createCard(_id, cardData, handleCardImageClick, handleCardDelete, handleCardLike)));
    })
    .catch(err => console.error(err));