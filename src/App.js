import logo from './logo.svg';
import './App.css';
import Editor from './components/Editor.js';

function App() {
  let divStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#72edca"
  }
  return (
    <div style={divStyle}>
      <Editor />
    </div>
  );
}

export default App;
