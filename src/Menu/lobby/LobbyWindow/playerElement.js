export default function PlayerElement(props) {
    const { player } = props;
    return (
      <div className="player">
          <div className="name">
              {player.userName}
          </div>
      </div>
    )
}