import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import useToken from '../../hooks/userToken';

const Login = () => {
  const { logIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [token] = useToken(userEmail);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  // Handle Login
  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    const { email, password } = data;
    setUserEmail(email);
    try {
      await logIn(email, password);
      // if (token) {
      //   navigate('/allTask');
      // }
       navigate('/allTask');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    const email = getValues("email");

    if (!email) {
      setResetMessage("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setResetMessage("Failed to send reset email. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-xl bg-white p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login Now!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' },
              })}
              className="input input-bordered w-full border rounded-xl ps-2"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div className="form-control relative">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' }
              })}
              className="input input-bordered w-full border rounded-xl ps-2 pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-[27px] text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)} // Toggle state
            >
              {showPassword ?  <AiOutlineEye size={20}/> :  <AiOutlineEyeInvisible size={20} />  }
            </button>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Forgot Password */}
          <p className="text-right text-sm text-blue-500 cursor-pointer" onClick={handleForgotPassword}>
            Forgot Password?
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className={`btn w-full mt-4 cursor-pointer ${loading ? 'btn-disabled opacity-50' : 'bg-gradient-to-r from-accent to-secondary py-2 bg-slate-400 font-bold rounded'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Reset Password Message */}
          {resetMessage && <p className="text-sm text-green-500 text-center mt-2">{resetMessage}</p>}

          {/* Error Message */}
          {error && <p className="text-center text-red-500 mt-2">Wrong password or email</p>}

          {/* Register Link */}
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
