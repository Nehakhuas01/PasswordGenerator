import { useCallback, useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const[length, setLength] = useState(8)
  const[charAllowed, setCharacter] = useState(false)
  const[numberAllowed, setNumber] = useState(false)

   const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*(){}[]`"
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass+=str.charAt(char);
    }
    setPassword(pass)
  }, [length, charAllowed, numberAllowed])

  useEffect(() => {
    passwordGenerator()
  },[length, charAllowed, numberAllowed, passwordGenerator])

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();   //To highlight the text to be copied
    passwordRef.current?.setSelectionRange(0,25); //To highlight only upto 25 characters
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
    <div className='background'>
     <div className="container">
      <h2 className='heading'>Password Generator</h2>
      <div className="container2">
       <input type="text" value={password} placeholder="password" className='inputbox' ref={passwordRef}></input>
       <button onClick={copyToClipboard} className='btn'>Copy</button>
       </div>
       <div>
       <input type="range" min={8} max={40} value={length} placeholder='length' className='inputrange'
       onChange={(e) => {setLength(e.target.value)}}></input>
       <label className='lengthcolor'>Length={length}</label>
       </div>
       <div>
        <input type="checkbox"  defaultChecked={setNumber} id="num" onChange={() => {setNumber((prev)=>!prev)}}></input>
        <label htmlFor='num' id="num">Number</label>
       </div>
       <div>
        <input type="checkbox"  defaultChecked={setCharacter} id="char" onChange={() => {setCharacter((prev)=>!prev)}}></input>
        <label htmlFor='char' id="char">Character</label>
       </div>
     </div>
     </div>
    </>
  )
}

export default App
