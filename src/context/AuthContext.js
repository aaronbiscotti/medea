// // context/AuthContext.js
// import { createContext, useState, useEffect, useContext } from 'react';
// import { auth } from '../firebase.js'

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             setUser(user);
//             setLoading(false);
//         });

//         return unsubscribe;
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, loading }}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };
