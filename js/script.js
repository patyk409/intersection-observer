let getDataFlag = true;
const target = document.querySelector('.target');

const showPreloader = () => {
    let preloader = document.querySelector('img');
    preloader.style.display = 'block';
};

const hidePreloader = () => {
    let preloader = document.querySelector('img');
    preloader.style.display = 'none';
};

const getData = () => {
    fetch('https://akademia108.pl/api/ajax/get-users.php')
        .then(response => response.json())
        .then(data => {
            let line = document.createElement('hr');
            document.querySelector('.users').appendChild(line);

            for (let user of data) {
                let userId = document.createElement('p');
                let userName = document.createElement('p');
                let userWeb = document.createElement('p');

                userId.innerText = `User ID: ${user.id}`;
                userName.innerText = `User Name: ${user.name}`;
                userWeb.innerHTML = `<p>User URL: ${user.website}<br>--------</p>`;

                document.querySelector('.users').appendChild(userId);
                document.querySelector('.users').appendChild(userName);
                document.querySelector('.users').appendChild(userWeb);
            };

            hidePreloader();
            getDataFlag = true;
        })

        .catch(error => {
            console.error(error);
        });
};

const handler = (entries, observer) => {
    for (entry of entries) {
        if (entry.isIntersecting) {
            getDataFlag = false;
            showPreloader();
            getData();
        };
    };
};

let observer = new IntersectionObserver(handler);
observer.observe(target);