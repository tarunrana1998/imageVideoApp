import { useState } from 'react'
import './App.css'
import axios from 'axios'
import ImageCard from './components/ImageCard'

function App() {
    const [imagesData, setImagesData] = useState([])

    function getData() {
        axios.get("https://picsum.photos/v2/list").then((response) => {
            console.log(response.data);
            setImagesData(response.data)
        }).catch((error) => {
            console.log(error);
        });

    }
    return (
        <>
            <div className='bg-black flex justify-center items-center flex-col'>
                <button onClick={getData} className='bg-blue-500 text-white p-2 rounded'>Get Data</button>
                {imagesData && <div className='bg-white grid grid-cols-4 gap-4 p-5'>
                    {imagesData &&
                        imagesData.map((image) => {
                            return (
                                <ImageCard key={image.id} download_url={image.download_url} author={image.author} />
                            )
                        })
                    }
                </div>}
            </div>
        </>
    )
}

export default App