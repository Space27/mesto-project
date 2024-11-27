import '../pages/index.css';
import {createCard} from "./card.js";
import {openModal, closeModal} from "./modal.js";
import initialCards from "./cards.js";
import {enableValidation, clearValidation} from "./validate.js";

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


const cardPopup = document.querySelector('.popup_type_new-card');
const cardPopupOpenButton = document.querySelector('.profile__add-button');

const cardFormElement = document.forms['new-place'];


const imagePopup = document.querySelector('.popup_type_image');

const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');


const cardsContainer = document.querySelector('.places__list');


function handlePopupProfileOpenButtonClick() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

    clearValidation(profileFormElement, validationConfig);

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

    clearValidation(cardFormElement, validationConfig);

    openModal(cardPopup);
}

function handleCardFormSubmit(event) {
    event.preventDefault();

    const nameInput = cardFormElement.elements['place-name'];
    const linkInput = cardFormElement.elements.link;

    cardsContainer.prepend(createCard({name: nameInput.value, link: linkInput.value}, handleCardImageClick));

    cardFormElement.reset();

    closeModal(cardPopup);
}

function handleCardImageClick(event) {
    imagePopupImage.src = event.currentTarget.src;
    imagePopupImage.alt = event.currentTarget.alt;
    imagePopupCaption.textContent = event.currentTarget.alt;

    openModal(imagePopup);
}

profilePopupOpenButton.addEventListener('click', handlePopupProfileOpenButtonClick);
cardPopupOpenButton.addEventListener('click', handlePopupCardButtonOpenClick);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(cardData => cardsContainer.append(createCard(cardData, handleCardImageClick)));

[profilePopup, cardPopup, imagePopup].forEach(el => el.classList.add('popup_is-animated'));

enableValidation(validationConfig);