import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();

        // const timerId = setInterval(updateChar, 60000);

        // return () => {
        //     clearInterval(timerId);
        // }
    }, [])

    const onCharLoaded = (char) => { 
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => { 
        setLoading(false);
        setError(true);
    }

    const updateChar = () => { /* при каждом создание компонента, создаем нового случайного персонажа */
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); /* случайно число в нужном диапозоне */
        onCharLoading();
        marvelService
            .getSingleCharacter(id) /* getSingleCharacter возвращается уже нужный намо обьект _transformCharacter */
            .then(onCharLoaded) /* через цепочку промисов аргумент автоматические передается в стояющий метод  */
            .catch(onError);
    }

    /* свойство char из которого мы вытаскиваем все нужно вот такая деструктуризация */
    // if (loading) {/* если вдруг идет состояние загрузки то мы будем возвращать этот компонет */
    //     return  <Spinner/>/* в render первым идет !!return!! поэтому здесь будет остановка */
    // }
    // if (description === '') {
    //     description += `Sorry, we dont have a description for ${name}`;
    // }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    // const content = errorMessage || spinner || <View char={char} />

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => { /* Это простой render -ющий компонент, в нем нету логики он просто как аргумент получает обьект с данными  принимает в себя и возвращает участок верстки (отоброзить) */

    const {name, description, thumbnail, homepage, wiki} = char;

    const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const imgStyle = thumbnail === imageNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};

    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className='randomchar__img' style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;


// 1.Сдлеать запрос на сервер, получить 9 персонажей и построить на этих данных интерфейс
// не особо отличается от компонента randomChar, проставить id всех персонажей