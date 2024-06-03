import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const handleVisible = (e) => {
        e.preventDefault();
        setVisible(!visible);
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/auth/sign-in',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }
        );
        const data = await res.json();
        if (data.success === false) {
            setLoading(false);
            alert(data.message);
        }
        else {
            setError(null);
            navigate('/')
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="text" placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={handleChange} required />
                <span className="flex items-center">
                    <input type={visible ? 'text' : 'password'} placeholder='password' className='border p-3 rounded-l-lg w-full' id='password' onChange={handleChange} required />
                    <button className="bg-red-500 p-4 rounded-r-lg hover:bg-red-600" onClick={handleVisible}><FaEye className='text-slate-200' /></button>
                </span>
                <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">Sign in</button>
            </form>
            <div className='flex gap-2 mt-2'>
                <p>Don't have an account?</p>
                <Link to={"/sign-up"}><span className='text-blue-700'>Sign up</span></Link>
            </div>
        </div>
    )
}