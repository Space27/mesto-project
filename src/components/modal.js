function openModal(popup) {
    popup.classList.add('popup_is-opened');

    document.addEventListener('keydown', closeByEsc);
    popup.addEventListener('mousedown', handleCloseModal);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', closeByEsc);
    popup.removeEventListener('mousedown', handleCloseModal);
}

function handleCloseModal(event) {
    if (event.target.classList.contains('popup_is-opened')) {
        closeModal(event.target);
    } else if (event.target.closest('.popup__close')) {
        closeModal(event.target.closest('.popup'));
    }
}

function closeByEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');

        closeModal(openedPopup);
    }
}

export {openModal, closeModal};