import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Dashboard from './Dashboard';
import AddActivity from './AddActivity';

function App() {
  return (
    <div className="App">
      <header 
      // className="App-header"
      >
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
      </header>
      {/* <Home /> */}
      {/* <Dashboard /> */}
      <AddActivity />
    </div>
  );
}

export default App;
