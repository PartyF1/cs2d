import Game from "../../game/game";
import "./GamePage.css"

export default function GamePage(props) {
    const { server, setPage, gamer } = props;

    let game = new Game(server, gamer, setPage);

    async function exitGame() {
        game.destroy(true, false);
        game = null;
        server.gamer = null;
        await server.leaveMatch();
        setPage("Menu")
    }

    return (
        <div>
            {game.render()}
            <button className="exitGame" onClick={() => exitGame()}>ВЫХОД</button>
        </div>
    )
}