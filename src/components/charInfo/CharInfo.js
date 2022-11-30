import { Component } from 'react';

import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false, /* тут false Так как изначально не должен быть загружен будет скилетон */
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() { /* вызывается после того как наш компонент был создан на странице и это идеальный момент для того чтобы делать запросы на сервер */
        this.updateChar(); /* первый раз загрузка будет выдавать null */
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    } /* срабатывает когда приходит новый props или изменяется state или пренудительная перерисовка компонента */

    componentDidCatch(err, info) {
        console.log(err, info);
        this.setState({
            error: true
        })
    }

    updateChar = () => { /* когда у нас будет происходить запрос то будем ориентироватьсян на пропс который придет в charId*/
        const {charId} = this.props;
        if (!charId) { /* если нету */
            return;
        }

        this.onCharLoading(); /* будет показыватся спиннер загрузки  */
        this.marvelService
            .getSingleCharacter(charId) /* когда к нам приедет обьект с одним персонажем он попадет ниже */
            .then(this.onCharLoaded) /* он попадет сюда */
            .catch(this.onError) /* если ошибка то сюда */     
    }

    onCharLoaded = (char) => {  /* он попадет сюда в качестве аргумента состояния и запишется сюда*/
        this.setState({
            char,
            loading: false 
        });
    }

    onCharLoading = () => {
        this.setState({
            loading: true 
        })
    }

    onError = () => { 
        this.setState({
            loading: false, 
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;
        /* отобразится один из компоннетов в зависимости от нашего state */
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton} 
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    let {name, description, thumbnail, homepage, wiki, comics} = char;

    const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const imgStyle = thumbnail === imageNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list"> 
                {/* {comics.length > 0 ? null : 'There is no comics with this character'} */}
                {comics.length === 0 ? 'There is no comics with this character' : null}
                {
                    comics.map((item, index) => {
                        // if (index > 9) return; 10 комисков

                        return (
                            <li key={index} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;