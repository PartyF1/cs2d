import Game from "../../game/game";

export default function GamePage(props) {
    const {userData, server, setPage} = props;
    let game = new Game(server).render();

    const exitGame = () => {
        game.destroy(true, false);
        game = null;
        setPage("Menu")
    }
}