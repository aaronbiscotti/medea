import { Fragment, useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { firestore } from '../../firebase/initFirebase'
import { collection, query, onSnapshot } from "firebase/firestore";
export default function CourseSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const coursesRef = collection(firestore, "courses");
        const q = query(coursesRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const coursesArray = [];
            querySnapshot.forEach((doc) => {
                coursesArray.push({ id: doc.id, ...doc.data() });
            });
            setCourses(coursesArray);
            setFilteredData(coursesArray);
        })

        return () => {
            unsubscribe();
        }
    }, []);


    useEffect(() => {
        const filtered = courses.filter((item) =>
            item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.topic.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);

        if (searchQuery == "") {
            setFilteredData(courses);
        }
    }, [searchQuery]);
    return (
        <>
            <div className="min-h-full">
                <Sidebar />
                {/* Page heading */}
                <header className="bg-gray-50 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
                        <div className="flex-1 min-w-0">
                            <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Course Search
                            </h1>
                        </div>
                    </div>
                </header>

                <main className="pt-8 pb-16">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                className="px-3 py-2 w-full border rounded-md"
                            />
                            <div className="mt-8 flex flex-col">
                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-300">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                            <a href="#" className="group inline-flex">
                                                                Course ID
                                                            </a>
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            <a href="#" className="group inline-flex">
                                                                Course courseID
                                                            </a>
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            <a href="#" className="group inline-flex">
                                                                Category
                                                            </a>
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            <a href="#" className="group inline-flex">
                                                                Status
                                                            </a>
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                            <span className="sr-only">Action</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                    {filteredData.map((course) => (
                                                        <tr key={course.category}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                {course.id}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{course.name}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{course.topic}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-black">
                                                                <span className="bg-green-200 rounded-full px-3 py-1">Qualified</span>
                                                            </td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                    Edit<span className="sr-only">, {course.ID}</span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
