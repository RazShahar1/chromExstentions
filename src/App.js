import './App.css';
import {useState} from 'react'
// import start from './webscraping'

function App() {
  const [urlp,seturl]=useState("")
  const webscrpting=()=>{
    window.alert("hello to you")
    // start
}
  return (
    <div className="App">
      {/* <input type={'url'} onChange={seturl}>Url</input> */}
     <button onClick={webscrpting}>Web Scraping</button>
     
     
    </div>
  );
}

export default App;
