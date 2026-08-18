export default function ImageCard({ download_url, author }) {
    return (
        <div className='bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-zinc-700/20 flex flex-col'>
            <img 
                src={download_url} 
                loading='lazy' 
                alt={author} 
                className='w-full h-64 object-cover bg-zinc-800' 
            />
            <div className='p-3 text-center'>
                <p className='text-zinc-200 font-medium text-sm truncate' title={author}>
                    {author}
                </p>
            </div>
        </div>
    );
}

