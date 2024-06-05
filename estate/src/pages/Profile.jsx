import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const { loading, error } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({})
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const handleVisible = (e) => {
        setVisible(!visible);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                alert(error)
                return;
            }
            dispatch(updateUserSuccess(data));
            alert("Profile Details Updated")
        }
        catch (error) {
            dispatch(updateUserFailure(error.message));
            alert(error.message)
        }
    }
    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',

            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(error.message));
                alert(error.message);
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
            alert(error.message);
        }
    }

    const handleSignOut = async () =>{
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if(data.success===false){
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data));
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-7">Manage Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' defaultValue={currentUser.username} onChange={handleChange} />
                <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' defaultValue={currentUser.email} onChange={handleChange} />
                <input type="text" placeholder='phone number' className='border p-3 rounded-lg' id='phone' defaultValue={currentUser.phone} onChange={handleChange} />
                <span className="flex items-center">
                    <input type={visible ? 'text' : 'password'} placeholder='password' className='border p-3 rounded-l-lg w-full focus:outline-none' id='password' onChange={handleChange} />
                    <button type='button' className="bg-slate-500 p-4 rounded-r-lg hover:bg-green-600" onClick={handleVisible}><FaEye className='text-slate-200' /></button>
                </span>
                <button disabled={loading} className="bg-green-600 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80 cursor-pointer">Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDelete} className='text-red-500 font-semibold hover:text-red-700 cursor-pointer'>Delete Account</span>
                <span onClick={handleSignOut} className='text-red-500 font-semibold hover:text-red-700 cursor-pointer'>Sign out</span>
            </div>
        </div>
    )
}