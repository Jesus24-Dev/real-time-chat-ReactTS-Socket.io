import {useState, useEffect} from 'react'

function App() {
  const [message, setMessage] = useState<string | undefined>(undefined)

  useEffect(() => {
    fetch("http://localhost:3030/api/hello")
    .then(res => res.json())
    .then(data => setMessage(data.message))
  }, [])

  return (
    <>
      <h1 className="text-2xl text-white bg-blue-500">Hello world from react!</h1>
      <p className="italic">Message from backend: {message}</p>
    </>
  )
}

export default App
