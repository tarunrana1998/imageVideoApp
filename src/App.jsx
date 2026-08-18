import { useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className='bg-black h-screen w-screen flex justify-center items-center flex-col'>
                <button className='bg-blue-500 text-white p-2 rounded'>Get Data</button>
            </div>
        </>
    )
}

export default App