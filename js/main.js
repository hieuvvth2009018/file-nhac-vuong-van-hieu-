var token = localStorage.getItem('token');

if (token === null || token === undefined) {
    window.location.href = 'login.html';
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status === 200) {
            alert('Get success');

            var jsonResponse = JSON.parse(this.responseText);

            var contentDiv = document.getElementById('content');

            contentDiv.innerHTML = '<div>';
            for (var i = 0; i < jsonResponse.length; i++) {
                var element = jsonResponse[i];
                contentDiv.innerHTML += `<div onclick="playSong(\'${element.link}\')" class="col-3">
                                            <img alt="?" src="${element.thumbnail}" onerror="this.src='https://www.workinghprs.co.uk/sites/all/themes/jollyany/demos/no-avatar.jpg'">
                                            <h2 style="text-align: center;" class="song-title">${element.name}</h2>
                                            <h3 style="text-align: center;" class="artist-tittle">${element.singer}</h3>
                                         </div>`;
            }
            contentDiv.innerHTML += '</div>';

        } else {
            alert('Error');
        }
    }
}

xhr.open('GET', 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs');
xhr.setRequestHeader('Authorization', `Basic ${token}`);
xhr.send();

function playSong(link) {
    var audioElement = document.querySelector('audio');
    audioElement.src = link;
    audioElement.load();
    audioElement.play();
}