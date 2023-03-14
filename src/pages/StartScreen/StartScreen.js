import "./startScreen.css"
export default function StartScreen(props) {
    const { setPage } = props;
    const authorisation = () => { setPage("Authorisation") }
    const registration = () => { setPage("Registration") }
    return (
            <div >
                <div className="logo"></div>
                <div className="startScreen">
                    <button className="button" onClick={authorisation}> ВОЙТИ </button>
                    <button className="button" onClick={registration}> ЗАРЕГИСТРИРОВАТЬСЯ </button>
                </div>
            </div>
    )
}