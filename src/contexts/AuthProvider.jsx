import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import app from '../firebase/firebase.config';
// Create the AuthContext with a default value
export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logInUserDetails, setLogInUserDetails] = useState(null); // Move this hook inside the component

    // Email password register
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(() => setLoading(false))
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };

    // Sign in with email and password
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then(() => setLoading(false))
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };

    // Logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => setLoading(false))
            .catch((error) => {
                setLoading(false);
                throw error;
            });
    };

    // Manage auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Fetch user details
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${import.meta.env.VITE_SERVER_API}/users?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            const data = await res.json();
            setLogInUserDetails(data);
        };

        if (user?.email) {
            fetchData();
        }
    }, [user]);

    const authInfo = {
        user,
        createUser,
        loading,
        logOut,
        logIn,
        logInUserDetails,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
