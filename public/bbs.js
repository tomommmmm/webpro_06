"use strict";

let number = 0; //クライアントで持っている投稿件数(いくつまで読んだか)
const bbs = document.querySelector('#bbs');

document.querySelector('#post').addEventListener('click', () => { //投稿ボタンが押された時
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message, //送るパラメータ
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log(params);
    const url = "/post";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);
        document.querySelector('#message').value = ""; 
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        let value = response.number;
        console.log(value);

        console.log(number);
        if (number !== value) { 
            const params = {
                method: "POST",
                body: 'start=' + number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch(url, params)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then((response) => {
                number += response.messages.length;
                for (let mes of response.messages) { //response.messagesサーバで
                    console.log(mes);  // 表示する投稿
                    let cover = document.createElement('div'); //coverは1件分の投稿のためのスペース
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);

                    // 編集・削除・返信ボタンの作成
                    let editButton = document.createElement('button');
                    editButton.className = 'edit-btn';
                    editButton.innerText = '編集';

                    let deleteButton = document.createElement('button');
                    deleteButton.className = 'delete-btn';
                    deleteButton.innerText = '削除';

                    let replyButton = document.createElement('button');
                    replyButton.className = 'reply-btn';
                    replyButton.innerText = '返信';

                    cover.appendChild(editButton);
                    cover.appendChild(deleteButton);
                    cover.appendChild(replyButton);

                    bbs.appendChild(cover);
                }
            });
        }
    });
});

// 編集ボタン
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const cover = event.target.closest('.cover');
        const id = cover.dataset.id;
        const name = cover.querySelector('.name').innerText;
        const message = cover.querySelector('.mes').innerText;

        const nameInput = document.createElement('input');
        nameInput.value = name;
        const messageInput = document.createElement('textarea');
        messageInput.value = message;

        const saveButton = document.createElement('button');
        saveButton.innerText = '保存';

        cover.innerHTML = ''; // 古い内容を削除
        cover.appendChild(nameInput);
        cover.appendChild(messageInput);
        cover.appendChild(saveButton);

        saveButton.addEventListener('click', () => {
            const params = {
                method: 'PUT',
                body: `name=${nameInput.value}&message=${messageInput.value}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            fetch(`/bbs/${id}`, params)
                .then(response => response.json())
                .then(data => {
                    cover.innerHTML = `<span class="name">${nameInput.value}</span>
                                       <span class="mes">${messageInput.value}</span>
                                       <button class="edit-btn">編集</button>
                                       <button class="delete-btn">削除</button>
                                       <button class="reply-btn">返信</button>`;
                });
        });
    }
});

// 削除ボタン
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const cover = event.target.closest('.cover');
        const id = cover.dataset.id;

        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        fetch(`/bbs/${id}`, params)
            .then(response => response.json())
            .then(data => {
                cover.remove(); // 投稿を削除
            });
    }
});

// 返信ボタン
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('reply-btn')) {
        const cover = event.target.closest('.cover');
        const id = cover.dataset.id;

        const replyForm = document.createElement('form');
        const nameInput = document.createElement('input');
        const messageInput = document.createElement('textarea');
        const submitButton = document.createElement('button');
        submitButton.innerText = '返信する';

        replyForm.appendChild(nameInput);
        replyForm.appendChild(messageInput);
        replyForm.appendChild(submitButton);

        cover.appendChild(replyForm);

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            const params = {
                method: 'POST',
                body: `parentId=${id}&name=${nameInput.value}&message=${messageInput.value}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            fetch('/reply', params)
                .then(response => response.json())
                .then(data => {
                    const replyDiv = document.createElement('div');
                    replyDiv.className = 'reply';
                    replyDiv.innerHTML = `<span class="name">${nameInput.value}</span>: <span class="mes">${messageInput.value}</span>`;
                    cover.appendChild(replyDiv);
                    replyForm.remove(); // 返信フォームを削除
                });
        });
    }
});





