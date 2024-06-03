import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function SignUp() {
    const [ formData, setFormData ] = useState({});
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password1 != formData.password2) {
            alert("Passwords do not match");
        }
        else {
            const res = await fetch('/api/auth/sign-up',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await res.json();
            if(data.success===false){
                setError(data.message);
                setLoading(false);
            }
        }
        setError(null);
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl text-center font-semibold my-5">Sign Up</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="text" placeholder='username' className='border p-3 rounded-lg ' id='username' onChange={handleChange} required/>
                <input type="text" placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={handleChange} required/>
                <input type="text" placeholder='phone' className='border p-3 rounded-lg ' id='phone' onChange={handleChange} required/>
                <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password1' onChange={handleChange} required/>
                <input type="password" placeholder='confirm password' className='border p-3 rounded-lg' id='password2' onChange={handleChange} required/>
                <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">Sign up</button>
            </form>
            <div className='flex gap-2 mt-2'>
                <p>Have an account?</p>
                <Link to={"/sign-in"}><span className='text-blue-700'>Sign in</span></Link>
            </div>
        </div>
    )
}