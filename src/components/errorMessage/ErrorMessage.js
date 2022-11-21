import imgError from './error.gif';

const ErrorMessage = () => {
    return (
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}}
             src={imgError} alt="Error"/>
    )
}

export default ErrorMessage;
// Если когда нибудь в папке src понадобится статичный файл то мы можем обратится к нему через вот такую конструкцию
// PUBLIC_URL - ссылка на папку паблик  
// <img src={process.env.PUBLIC_URL + '/error.gif'} /> 
// файлы в public бывают редко
// Но лучше поместитить эту картинку в комопненты