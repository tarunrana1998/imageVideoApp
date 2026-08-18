export default function ImageCard(props) {
    const { id, download_url, author } = props
    return (
        <div key={id} className='flex justify-center items-center flex-col'>
            <img src={download_url} alt={author} className='w-500px h-500px object-cover' />
            <h1 className='text-white'>{author}</h1>
        </div>
    );
}
