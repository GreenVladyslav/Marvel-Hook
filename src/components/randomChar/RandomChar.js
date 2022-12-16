import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState(null);

    const {loading, error, getSingleCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();

        // const timerId = setInterval(updateChar, 60000);

        // return () => {
        //     clearInterval(timerId);
        // }
    }, [])

    const onCharLoaded = (char) => { 
        setChar(char);
    }


    const updateChar = () => { /* при каждом создание компонента, создаем нового случайного персонажа */
        clearError(); /* вызвать эту функцию прямо перед тем как мы делаем каждый новый запрос */
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); /* случайно число в нужном диапозоне */
        
        getSingleCharacter(id) /* getSingleCharacter возвращается уже нужный намо обьект _transformCharacter */
            .then(onCharLoaded) /* через цепочку промисов аргумент автоматические передается в стояющий метод  */
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
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