import {useState} from "react";

interface QuickSendButtonProps {
    onClick: () => Promise<void>;
}

function addProfileButton() {
    

    const button = createButton('profile-button', 'profile', 'Go to your profile');
    // Добавляем обработчик события 'click', который будет перенаправлять на сайт
    button.addEventListener('click', async function() {
        const result_token = await chrome.storage.local.get(['accessToken']);
        const token = result_token.accessToken;
        console.log("Токен после удаления, ", token);
        if (!token) {
            window.open('http://127.0.0.1:8000/api/v1/login', '_blank');

        } else {
            window.open('http://127.0.0.1:8000/profile', '_blank');
        }
    });
    addButtonToPage(button);
}