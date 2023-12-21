import './App.css';
import {useState, useEffect} from 'react' ;
import io from 'socket.io-client'
import {nanoid} from "nanoid"

const socket = io.connect("http://localhost:5000")

function App() {

  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit('chat' , {message})  //payload that we have injected is message
    setMessage('')
  }

  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat,payload])
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty app</h1>

        {chat.map((payload, index)=> {
          return(
            <p key={index}>{payload.message}</p>
          )
        })}

        <form onSubmit={sendChat}>
          <input type='text' 
          name='chat' 
          placeholder='send text' 
          value={message} 
          onChange={(e) => {
            setMessage(e.target.value)
          }}/>
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
