import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    // constructor(props) { теперь констркутор бесполезен он не нужен так как есть componentDidMount
    //     super(props);
    //     // this.updateChar();
    // }
/* это синтаксис поля классов тоже самое будет this.state = {....} */
    state = { /* теперь нужно данные полуить от сервера */ 
        char: {},
        loading: true, /* !!!идет загрузка компонента появляется спиннер */
        error: false
    }

    marvelService = new MarvelService(); /* this.marvelService  (получаестя новое свойство без const) синтаксис полей классов*/

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => { /* если персонаж загрузился */
        this.setState({
            char,
            loading: false /* !!!компонент загрузился, спиннер пропал */
        });/* (char: char) сокращение */
    }

    onCharLoading = () => {
        this.setState({
            loading: true /* при клике на try it теперь крутится спиннер показывая загрузку */
        })
    }

    onError = () => { /* ошибка в запросе 401, 404 */
        this.setState({
            loading: false, /* если произошла ошбика то загрузжа уже не нужна */
            error: true
        })
    }

    updateChar = () => { /* при каждом создание компонента, создаем нового случайного персонажа */
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); /* случайно число в нужном диапозоне */
        this.onCharLoading();
        this.marvelService
            // .getAllCharacters()
            // .then(res => console.log(res));
            .getSingleCharacter(id) /* getSingleCharacter возвращается уже нужный намо обьект _transformCharacter */
            .then(this.onCharLoaded) /* через цепочку промисов аргумент автоматические передается в стояющий метод  */
            .catch(this.onError);
    }

    render(){
        const {char, loading, error} = this.state;
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
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
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