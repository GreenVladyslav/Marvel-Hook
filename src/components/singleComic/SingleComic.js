// import { useState, useEffect } from 'react';

// // import PropTypes from 'prop-types';

// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import Skeleton from '../skeleton/Skeleton';
// import useMarvelService from '../../services/MarvelService';

// import './singleComic.scss';
// // import xMen from '../../resources/img/x-men.png';

// const SingleComic = (props) => {

//     const [comics, setComics] = useState(null)

//     const {loading, error, getComics, clearError} = useMarvelService();

//     useEffect(() => { 
//         updateComics(); 
//     }, [props.charId])

//     const updateComics = () => { 
//         const {charId} = props;
//         if (!charId) { 
//             return;
//         }

//         clearError();
//         getComics(charId) 
//             .then(onCharLoaded)
//     }

//     const onCharLoaded = (comics) => { 
//         setComics(comics);
//     }

//     const skeleton = comics || loading || error ? null : <Skeleton/>;
//     const errorMessage = error ? <ErrorMessage/> : null;
//     const spinner = loading ? <Spinner/> : null;
//     const content = !(loading || error || !comics) ? <View comics={comics}/> : null;

//     return (
//         <div className="single-comic">
//             {skeleton} 
//             {errorMessage}
//             {spinner}
//             {content}
//         </div>
//     )
// }


// const View = ({comics}) => {

//     const {thumbnail, title, description, pageCount, language, price} = comics;

//     return (
//         <>
//             <img src={thumbnail} alt={title} className="single-comic__img"/>
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount}</p>
//                 <p className="single-comic__descr">{language}</p>
//                 <div className="single-comic__price">{price}</div>
//             </div>
//             <a href="#" className="single-comic__back">Back to all</a>
//         </>
//     )
// }

// export default SingleComic;