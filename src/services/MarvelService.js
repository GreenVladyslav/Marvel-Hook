import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';  /* с loudash нельзя менять переменные (между нам) */
    const _apiKey = 'apikey=83e623e06da8b05bf8436b9188fdc8e3';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter); /* каждый отдельный обьект будет приходить по порядку */
    }

       // Вариант модификации готового метода для поиска по имени. 
    // Вызывать его можно вот так: getAllCharacters(null, name)

    // const getAllCharacters = async (offset = _baseOffset, name = '') => {
    //     const res = await request(`${_apiBase}characters?limit=9&offset=${offset}${name ? `&name=${name}` : '' }&${_apiKey}`);
    //     return res.data.results.map(_transformCharacter);
    // }

    // Или можно создать отдельный метод для поиска по имени

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    /* теперь мы данные будем сохранять в переменную(промежуточный результат) */
    const getSingleCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        /* это асинхронная функция, здесь результат мы получим не сразу */
        return _transformCharacter(res.data.results[0]); /* (res) сокращаем код передаем повторяющееся  */
        /* вернем в этот метод(готовые красивые, чистые данные) */
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    /* будем получать какие-то данные и уже возвращать трансформированный обьект  */
    const _transformCharacter = (char) => { /* с loudash чтобы другой программист не вносил поправки(или был максимально оккуратен) */
        return { /* char - Один персонаж) */
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : `Sorry, we dont have a description for ${char.name}`,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(0, 10)
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description for this comics',
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number pages',
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension
        }
    }

    // посколько это функция (кастомный хук) мы можем вернуть обьект со всем что мне нужно
    return {loading, error, clearError, getAllCharacters, getSingleCharacter, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;
















