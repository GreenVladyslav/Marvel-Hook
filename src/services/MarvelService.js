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

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);

    }

    getSingleCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

    }
}

export default MarvelService;




















