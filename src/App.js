import { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([])
  const [undid, setUndid] = useState([])

  const handleClick = (event) => {
  
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY
    }  
    
    setList((prev) => [...prev, newDot])
    setUndid([])

  }

  const handleUndo = (event) => {
    event.stopPropagation() 

    if (list.length === 0 ) {
      return
    }

    const lastItem = list[list.length - 1]
    setUndid((prev) => [...prev, lastItem])

    setList((prev) => {
      const newArr = [...prev].slice(0, -1)
      return newArr
    })
  }

  const handleRedo = (event) => {
    event.stopPropagation()

    if (undid.length === 0) {
      return
    }

    const undidItem = undid[undid.length - 1]
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1)
      return newArr
    })
    setList((prev) => [...prev, undidItem])
   
  }

  return (
    <div className="App" onClick={handleClick}>  
      <div className='button-wrapper'>
        <button onClick={handleUndo}>Desfazer</button>    
        <button onClick={handleRedo}>Refazer</button> 
      </div>

      {list.map((item) => (
        <span 
          key={Math.random((item.clientX) * 100)}
          className="dot"
          style={{top: item.clientY, left: item.clientX}}
        />
      ))} 
      
      <h3>Clique na Tela</h3>
    </div>
  );
}

export default App;