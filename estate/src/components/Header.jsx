import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';


export default function Header() {
    const location = useLocation();
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-red-500'>Home</span>
                        <span className='w-1'></span>
                        <span className='text-gray-500'>Estate</span>
                    </h1>
                </Link>
                <ul className="flex gap-4">
                    <Link to='/'>
                        <li className={`hidden sm:inline hover:text-red-500 hover:cursor-pointer ${location.pathname === '/' ? 'text-red-500 font-bold' : ''}`}>Home</li>
                    </Link>
                    <Link to="/about">
                        <li className={`hidden sm:inline hover:text-red-500 hover:cursor-pointer ${location.pathname === '/about' ? 'text-red-500 font-bold' : ''}`}>About</li>
                    </Link>
                </ul>
                <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type="text" placeholder='search' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-700' />
                </form>
                <Link to="/sign-in">
                    <button className='hidden sm:inline hover:text-white hover:cursor-pointer bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded'>Sign in</button>
                </Link>
            </div>
        </header>
    )
}