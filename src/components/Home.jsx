import NoProjectImage from '../assets/no-projects.png'

export default function Home ({onCreate}) {
    return (
        <main className='flex flex-col m-auto text-center'>
            <img className='w-10 h-10 mx-auto mb-5' src={NoProjectImage} alt="No Project Image" />
            <h1 className='text-3xl mb-3'>No Project Selected</h1>
            <p className='text-xl'>Create a new project and get started with new one</p>
            <button className= "bg-black text-white mx-auto mt-5 rounded-md text-2xl font-normal py-2.5 px-10 hover:bg-slate-700 " onClick={onCreate}>Create a new project</button>
        </main>
    )
}