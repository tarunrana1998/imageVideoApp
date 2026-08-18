import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import ImageCard from './components/ImageCard'

function App() {
    const [imagesData, setImagesData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function fetchImages() {
            setLoading(true)
            setError(null)
            try {
                const response = await axios.get(
                    `https://picsum.photos/v2/list?page=${page}&limit=20`,
                    { signal: controller.signal }
                )
                setImagesData(response.data)
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error(err)
                    setError('Failed to load images. Please check your connection and try again.')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchImages()
        window.scrollTo({ top: 0, behavior: 'smooth' })

        return () => controller.abort()
    }, [page])

    return (
        <div className='min-h-screen bg-zinc-950 text-white flex flex-col items-center py-8 px-4 sm:px-8'>
            <header className='text-center mb-8'>
                <h1 className='text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent'>
                    Photo Gallery
                </h1>
                <p className='text-zinc-400 mt-1 text-sm'>
                    Curated high-resolution imagery
                </p>
            </header>

            {/* Error Message */}
            {error && (
                <div className='bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 max-w-md text-center'>
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl'>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className='bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden animate-pulse'>
                            <div className='w-full h-64 bg-zinc-800' />
                            <div className='p-3 flex justify-center'>
                                <div className='h-4 bg-zinc-800 rounded w-1/2' />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Images Grid */
                imagesData.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl'>
                        {imagesData.map((image) => (
                            <ImageCard
                                key={image.id}
                                download_url={image.download_url}
                                author={image.author}
                            />
                        ))}
                    </div>
                )
            )}

            {/* Pagination Controls */}
            <div className='flex items-center gap-4 mt-8'>
                <button
                    disabled={page === 1 || loading}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className='px-4 py-2 rounded-lg font-medium transition duration-200 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-yellow-500 cursor-pointer'
                >
                    Prev
                </button>

                <span className='text-zinc-300 font-semibold px-2'>
                    Page {page}
                </span>

                <button
                    disabled={page >= 10 || loading}
                    onClick={() => setPage((prev) => prev + 1)}
                    className='px-4 py-2 rounded-lg font-medium transition duration-200 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-yellow-500 cursor-pointer'
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default App