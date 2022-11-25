import Game from "../../game/game";
import "./GamePage.css"

export default function GamePage(props) {
    const { userData, server, setPage } = props;
    let game = new Game(server);

    function exitGame() {
        game.destroy(true, false);
        game = null;
        setPage("Menu")
    }

    return (
        <div>
            {game.render()}
            <button className="exitGame" onClick={() => exitGame()}>ВЫХОД</button>
        </div>
    )
}