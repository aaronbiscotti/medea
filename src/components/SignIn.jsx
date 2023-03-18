import { auth, googleProvider } from '../lib/firebase';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
    const { user } = useAuth();
    const router = useRouter();

    const signInWithGoogle = async () => {
        try {
            await auth.signInWithPopup(googleProvider);
            router.push('/');
        } catch (error) {
            console.error('Error signing in with Google:', error.message);
        }
    };

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="p-8 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Sign in with Google</h2>
                <button
                    onClick={signInWithGoogle}
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md"
                >
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default SignIn;
