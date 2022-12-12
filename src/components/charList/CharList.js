import { Component } from 'react';

import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true, /* при загрузке первых 9 персонажей true */
        error: false,
        newItemLoading: false,/* ! */
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();
    
    componentDidMount() { 
        this.onRequest(); /* вызывается этот метод без какого либо аргумента */
        // this.marvelService.getAllCharacters()
        //     .then(this.onCharListLoaded)
        //     .catch(this.onError)
    }

    onRequest = (offset) => {/* ! */ /* offset = null */
        this.onCharListLoading(); /* при первой загрузке state переключится в true  и это нормально*/
        this.marvelService.getAllCharacters(offset) /* передаем какой-то отступ */
            .then(this.onCharListLoaded) /* !!получает новый массив с новыми персонажами */
            .catch(this.onError)
    }

    onCharListLoading = () => {/* ! */ /* загружается */
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => { /* ! */ /* !!получает новый массив с новыми персонажами */
        let ended = false;
        if (newCharList.length < 9) { /* если меньше 9 то скорее пустой массив и закончились дааные */
            ended = true;
        }

            /* ({ скобки значат что мы возвращаем обьект из этой функции */
        this.setState(({offset, charList}) => ({/* когда наши данные загрузились то 9 + 9, 18 + 9 */
            charList: [...charList, ...newCharList], /* charList = санчала пустой потом 9 персонажей потом 18 и далеее */
            loading: false,
            newItemLoading: false, /* когда персонажи загрузили то переключим в false */
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {

        const elements = arr.map((item, index) => {
            const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            const styleFit = item.thumbnail === imageNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};
        
            return(
                <li 
                    className='char__item'
                    tabIndex={0}
                    ref={this.setRef}
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id)
                        this.focusOnItem(index)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id)
                            this.focusOnItem(index)
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={styleFit}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    // Этот метод создан для оптимизации, МОЙ МЕТОД для каждоый карточки
//     renderItems(charList) {
        
//         const elements = charList.map(item => {
//             const {id, ...itemProps} = item;
//             return (
//                 <Character key={id}
//                     {...itemProps}/>
//             )
//         })
// // А эта конструкция вынесена для центровки спиннера/ошибки
//         return(
//             <ul className="char__grid">
//                 {elements}
//             </ul>
//         )
//     }

    
    render() {

        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

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
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}/* ! */ /* либо true. false */
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;

// const Character = (charList) => {

//     const {name, thumbnail} = charList;

//     const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
//     const styleFit = thumbnail === imageNotFound ? {objectFit: 'contain'} : {objectFit: 'cover'};

//     return (
//         <li className='char__item'>
//             <img src={thumbnail} alt={name} style={styleFit}/>
//             <div className="char__name">{name}</div>
//         </li>
//     )
// }