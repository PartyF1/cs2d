import "./chat.css"

export default function Message(props) {
    const { message } = props;
    return (
        <div className="message">
            <div className="name">
                {message.userName}
            </div>
            <div className="text">
                {message.message}
            </div>
        </div>
    )
}