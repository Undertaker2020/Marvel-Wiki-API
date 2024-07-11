import errorImg from '../Image/error.gif';

const ErrorMessage = () => {
    return (
        // eslint-disable-next-line no-undef
        <img src={errorImg}
             style={{display: 'block', width: "250px", height: "250px", overflow: 'contain',
                 margin: "0 auto"}} alt="Error"/>
    )
}
export default ErrorMessage;