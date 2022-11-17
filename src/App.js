import { useState } from 'react';
import StartScreen from './startScreen/startScreen.js';
import Server from './Menu/server.js';
import Header from './Menu/Header.js';
import './App.css';

function AppMain({ server }) {
  const [data, setData] = useState();
  return (
    <div className="App">
      {data && data.name ? (
        <Header server={server} data={data} setData={(data) => setData(data)} />
      ) : (
        <StartScreen server={server} setData={(data) => setData(data)} />
      )}
    </div>
  );
}

function App() {
  const server = new Server();
  return (
    <>
      <AppMain server={server} />
    </>
  );
}

export default App;
