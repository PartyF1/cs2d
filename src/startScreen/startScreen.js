import { useState } from "react";
import Authorization from "./authorization";
import Registration from "./registration";


export default function StartScreen(props) {
    const { setData, server } = props;
    const [state, setState] = useState("startScreen");

    const authorisation = () => {setState("authorisation")}
    const registration = () => {setState("registration")}

    return (
        <div>
            {state === "authorisation" ?
            (<Authorization key={"authorisation"} setData={setData} server={server} setState={(state) => setState(state)}></Authorization>) :
             state === "registration" ?
             (<Registration key={"registration"}setData={setData} server={server} setState={(state) => setState(state)}></Registration>) :
             (<div>
                 <button onClick={authorisation}> ВОЙТИ </button>
                 <button onClick={registration}> ЗАРЕГИСТРИРОВАТЬСЯ </button>
             </div>)}
        </div>
    )
}