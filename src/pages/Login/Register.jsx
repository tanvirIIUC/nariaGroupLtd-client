import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/userToken';
import { AuthContext } from '../../contexts/AuthProvider';



const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdUserEmail, setCreatedUserEmail] = useState('');
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  if (token) {
    navigate('/allTask');
  }

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    setLoading(true);

    try {
      await createUser(email, password); // create user and move forward if successful
      const newUser = { name, email, password };
      await addUser(newUser);
      reset();
    } catch (error) {
      console.error(error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await fetch('https://naria-group-ltd-server.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register user');
      }

      if (data.acknowledged) {
        setCreatedUserEmail(user.email);
        alert('You have registered successfully!');
        setError('');
      }
    } catch (error) {
      setError(error.message || 'Failed to save user information. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-xl bg-white p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register Now!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered w-full border rounded-xl ps-2"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                validate: value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid email address',
              })}
              className="input input-bordered w-full border rounded-xl ps-2"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' },
              })}
              className="input input-bordered w-full border rounded-xl ps-2"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`btn w-full mt-4 cursor-pointer ${loading ? 'btn-disabled opacity-50' : 'bg-gradient-to-r from-accent to-secondary py-2 bg-slate-400 font-bold rounded'}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {error && <p className="text-center text-red-500 mt-2">{error}</p>}

          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
