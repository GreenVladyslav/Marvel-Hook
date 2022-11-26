import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        isHover: false,
        setIsHover: false
    }

    handleMouseEnter = (isHover) => {
        this.setState({isHover});
    };
    handleMouseLeave = (setIsHover) => {
        this.setState({setIsHover})
    };

    marvelService = new MarvelService();
    
    componentDidMount() {  /* updateAllCharacter вызываем тут главную*/
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    // renderItems(arr) {

    //     const elements = arr.map((item) => {
    //         const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    //         const styleFit = item.thumbnail === imageNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};
        
    //         return(
    //             <li className='char__item'
    //                 key={item.id}>
    //                 <img src={item.thumbnail} alt={item.name} style={styleFit}/>
    //                 <div className="char__name">{item.name}</div>
    //             </li>
    //         )
    //     });
    //     // А эта конструкция вынесена для центровки спиннера/ошибки
    //     return (
    //         <ul className="char__grid">
    //             {elements}
    //         </ul>
    //     )
    // }

    // Этот метод создан для оптимизации, МОЙ МЕТОД для каждоый карточки
    renderItems(charList) {
        
        const elements = charList.map(item => {
            const {id, ...itemProps} = item

            const imgHover = {boxShadow: '0 5px 20px $main-color', transform: 'translateY(-8px)'}
            const clazz = this.isHover ? imgHover : ''
            // const clazz = this.isHover ? 'char__item char__item_selected' : 'char__item';
            return (
                <Character key={id}
                    {...itemProps}
                    // style={this.isHover ? imgHover : ''}
                    style={clazz}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}/>
            )
        })
// А эта конструкция вынесена для центровки спиннера/ошибки
        return(
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    
    render() {

        const {charList, loading, error} = this.state;

        const elements = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? elements : null;
        // const content = errorMessage || spinner || <View char={char} />

        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;

const Character = (charList) => {

    const {name, thumbnail} = charList;

    const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const styleFit = thumbnail === imageNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};

    return (
        <li className='char__item'>
            <img src={thumbnail} alt={name} style={styleFit}/>
            <div className="char__name">{name}</div>
        </li>
    )
}