import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Listbox, Menu, Transition } from '@headlessui/react'
import {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CurrencyDollarIcon,
    LinkIcon,
    LocationMarkerIcon,
    MailIcon,
    PencilIcon,
    SearchIcon,
} from '@heroicons/react/solid'
import Sidebar from '@/components/Sidebar'

const tabs = [
    { courseID: 'Applied', href: '#', count: '2', current: false },
    { courseID: 'Phone Screening', href: '#', count: '4', current: false },
    { courseID: 'Interview', href: '#', count: '6', current: true },
    { courseID: 'Offer', href: '#', current: false },
    { courseID: 'Disqualified', href: '#', current: false },
]
const candidates = [
    {
        courseID: 'Emily Selman',
        category: 'emily.selman@example.com',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        applied: 'January 7, 2020',
        appliedDatetime: '2020-07-01T15:34:56',
        status: 'Completed phone screening',
    },
]
const publishingOptions = [
    { courseID: 'Published', description: 'This job posting can be viewed by anyone who has the link.', current: true },
    { courseID: 'Draft', description: 'This job posting will no longer be publicly accessible.', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const data = [
    { courseID: 'Zee Roblox', courseName: 'Indian', category: 'tanga@bxscience.edu', action: 'Member' },
    { courseID: 'Ben Chong', courseName: 'Sex', category: 'engineerg', action: 'Member' },
    { courseID: 'Will Kim', courseName: 'Baby', category: 'walt', action: 'Member' },
    { courseID: 'Jeffrey Li', courseName: 'Idiot', category: 'kimw11@gmail.com', action: 'Member' },
    { courseID: 'Chelsea Li', courseName: 'Student', category: 'lindsay.walton@', action: 'Member' },
]

export default function CourseSearch() {
    const [selected, setSelected] = useState(publishingOptions[0])
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(data);
    useEffect(() => {
        const filtered = data.filter((item) =>
            item.courseID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.action.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);

        if (searchQuery == "") {
            setFilteredData(data);
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
                                                    {filteredData.map((person) => (
                                                        <tr key={person.category}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                {person.courseID}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.courseName}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.category}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-black">
                                                                <span className="bg-green-200 rounded-full px-3 py-1">{person.action}</span>
                                                            </td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                    Edit<span className="sr-only">, {person.courseID}</span>
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
