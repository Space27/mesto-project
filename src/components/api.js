const CONFIG = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
        authorization: 'ca26c59a-03b6-403c-baf9-bcc4d8d2e891',
        'Content-Type': 'application/json'
    },
};

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

function getInitialCards() {
    return fetch(`${CONFIG.baseUrl}/cards`, {
        headers: CONFIG.headers
    })
        .then(handleResponse);
}

function addCard(name, link) {
    return fetch(`${CONFIG.baseUrl}/cards`, {
        method: 'POST',
        headers: CONFIG.headers,
        body: JSON.stringify({
            name,
            link,
        })
    })
        .then(handleResponse);
}

function deleteCard(cardId) {
    return fetch(`${CONFIG.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: CONFIG.headers
    })
        .then(handleResponse);
}

function likeCard(cardId) {
    return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: CONFIG.headers
    })
        .then(handleResponse);
}

function unLikeCard(cardId) {
    return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: CONFIG.headers
    })
        .then(handleResponse);
}

function getUserInfo() {
    return fetch(`${CONFIG.baseUrl}/users/me`, {
        headers: CONFIG.headers
    })
        .then(handleResponse);
}

function updateUserInfo(name, description) {
    return fetch(`${CONFIG.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: CONFIG.headers,
        body: JSON.stringify({
            name,
            about: description,
        })
    })
        .then(handleResponse);
}


function updateUserAvatar(link) {
    return fetch(`${CONFIG.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: CONFIG.headers,
        body: JSON.stringify({
            avatar: link,
        })
    })
        .then(handleResponse);
}

export {
    getInitialCards,
    addCard,
    deleteCard,
    likeCard,
    unLikeCard,
    getUserInfo,
    updateUserInfo,
    updateUserAvatar,
};