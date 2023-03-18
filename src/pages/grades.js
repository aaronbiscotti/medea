import Sidebar from '@/components/Sidebar'
import SubmitTranscript from '@/components/SubmitTranscript'
import React from 'react'
import { Fragment } from 'react'
const locations = [
    {
        name: 'Edinburgh',
        people: [
            { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
            { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const grades = () => {
    return (
        <div>
            <Sidebar />
            <main className="pb-16">
                <header className="bg-gray-50 py-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex-1 min-w-0">
                            <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Grades
                            </h1>
                        </div>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto mt-10 flex">
                    <SubmitTranscript />
                </div>
                <div className="max-w-7xl mx-auto mt-10">
                    <div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="min-w-full">
                                            <thead className="bg-white">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Title
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Role
                                                    </th>
                                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                        <span className="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {locations.map((location) => (
                                                    <Fragment key={location.name}>
                                                        <tr className="border-t border-gray-200">
                                                            <th
                                                                colSpan={5}
                                                                scope="colgroup"
                                                                className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                                            >
                                                                {location.name}
                                                            </th>
                                                        </tr>
                                                        {location.people.map((person, personIdx) => (
                                                            <tr
                                                                key={person.email}
                                                                className={classNames(personIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                            >
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    {person.name}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                        Edit<span className="sr-only">, {person.name}</span>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </Fragment>
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
    )
}

export default grades