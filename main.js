async function getArticles() {
    const player = document.querySelector('.player').value;
    const team = document.querySelector('.team').value;
    let url = 'https://nba-latest-news.p.rapidapi.com/articles';

    if (player !== "" && team === "") {
        
        const playerString = player.split(' ').join('-').toLowerCase();
        url = `${url}?player=${playerString}`;

    } else if (player === "" && team !== "") {

        const teamString = team.toLowerCase();
        url = `${url}?team=${teamString}`;

    } else if (player !== "" && team !== "") {

        const teamString = team.toLowerCase();
        const playerString = player.split(' ').join('-').toLowerCase();
        url = `${url}?team=${teamString}&player=${playerString}`;

    } else {

        url = 'https://nba-latest-news.p.rapidapi.com/articles';

    }
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0986094737mshe3ba81751936e2bp18c255jsnead0fc2ffb3d',
            'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Parse JSON data
        const articlesElement = document.querySelector('.articles');

        const articlesHTML = data.map(article => `
            <a href="${article.url}" target="_blank">${article.title}</a>
        `);

        articlesElement.innerHTML = articlesHTML.join('<br>');
    } catch (error) {
        console.error(error);
    }
}

const button = document.querySelector('button');
button.addEventListener('click', getArticles);