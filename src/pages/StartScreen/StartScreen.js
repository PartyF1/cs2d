export default function StartScreen(props) {
    const { setPage } = props;
    const authorisation = () => { setPage("Authorisation") }
    const registration = () => { setPage("Registration") }
    return (
        <div>
            <button onClick={authorisation}> ВОЙТИ </button>
            <button onClick={registration}> ЗАРЕГИСТРИРОВАТЬСЯ </button>
        </div>
    )
}