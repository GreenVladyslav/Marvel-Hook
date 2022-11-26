class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';  /* с loudash нельзя менять переменные (между нам) */
    _apiKey = 'apikey=83e623e06da8b05bf8436b9188fdc8e3'

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter); /* каждый отдельный обьект будет приходить по порядку */
    }
    /* теперь мы данные будем сохранять в переменную(промежуточный результат) */
    getSingleCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        /* это асинхронная функция, здесь результат мы получим не сразу */
        return this._transformCharacter(res.data.results[0]); /* (res) сокращаем код передаем повторяющееся  */
        /* вернем в этот метод(готовые красивые, чистые данные) */
    }
    /* будем получать какие-то данные и уже возвращать трансформированный обьект  */
    _transformCharacter = (char) => { /* с loudash чтобы другой программист не вносил поправки(или был максимально оккуратен) */
        return { /* char - Один персонаж) */
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 200)}...` : `Sorry, we dont have a description for ${char.name}`,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;
















