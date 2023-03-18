import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    CogIcon,
    CreditCardIcon,
    MenuAlt1Icon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
} from '@heroicons/react/outline'
import { ClipboardList, Notebook, SquareRounded } from 'tabler-icons-react';
import {
    CashIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    OfficeBuildingIcon,
    SearchIcon,
} from '@heroicons/react/solid'
import Sidebar from './Sidebar';
import SubmitTranscript from './SubmitTranscript';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const cards = [
    { name: 'Select courses', href: '#', icon: ScaleIcon, dueDate: 123 },
    { name: 'Complete Naviance student survey', href: '#', icon: ScaleIcon, dueDate: 123 },
    { name: 'Build your college list', href: '#', icon: ScaleIcon, dueDate: 123 },
]
const schedule = [
    { name: 'AP American Studies: US History', href: '#', icon: ScaleIcon, roomNumber: 123, teacher: "Todd Davis" },
    { name: 'AP American Studies: US History', href: '#', icon: ScaleIcon, roomNumber: 123, teacher: "Todd Davis" },
    { name: 'AP American Studies: US History', href: '#', icon: ScaleIcon, roomNumber: 123, teacher: "Todd Davis" },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div className="min-h-full">
                <Sidebar />

                <div className="lg:pl-64 flex flex-col flex-1">
                    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                    </div>
                    <main className="flex-1">

                        <div className="bg-white shadow flex justify-between border-gray-200 pb-5">
                            {mainProfile()}
                            <div className="flex justify-center items-center">

                                {profileDropDown()}
                            </div>
                        </div>


                        <div className="mt-8">
                            {tasks()}

                            <h2 className="mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                                Schedule
                            </h2>

                            {/* Courses list (smallest breakpoint only) */}
                            <div className="shadow sm:hidden">
                                <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                                    {schedule.map((s) => (
                                        <li key={s.id}>
                                            <a href={s.href} className="block px-4 py-4 bg-white hover:bg-gray-50">
                                                <span className="flex items-center space-x-4">
                                                    <span className="flex-1 flex space-x-2 truncate">
                                                        <CashIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        <span className="flex flex-col text-gray-500 text-sm truncate">
                                                            <span className="truncate">{s.name}</span>
                                                            <span>
                                                                <span className="text-gray-900 font-medium">{s.amount}</span>{' '}
                                                                {s.currency}
                                                            </span>
                                                            <time dateTime={s.datetime}>{s.date}</time>
                                                        </span>
                                                    </span>
                                                    <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <nav
                                    className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                                    aria-label="Pagination"
                                >
                                    <div className="flex-1 flex justify-between">
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                                        >
                                            Previous
                                        </a>
                                        <a
                                            href="#"
                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                                        >
                                            Next
                                        </a>
                                    </div>
                                </nav>
                            </div>

                            {/* Activity table (small breakpoint and up) */}
                            <div className="hidden sm:block">
                                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex flex-col mt-2">
                                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Courses
                                                        </th>
                                                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Room Number
                                                        </th>
                                                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Teacher
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {schedule.map((s) => (
                                                        <tr key={s.id} className="bg-white">
                                                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                <div className="flex">
                                                                    <a href={s.href} className="group inline-flex space-x-2 truncate text-sm">
                                                                        <CashIcon
                                                                            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                            aria-hidden="true"
                                                                        />
                                                                        <p className="text-gray-500 truncate group-hover:text-gray-900">
                                                                            {s.name}
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                                <span className="text-gray-900 font-medium">{s.amount} </span>
                                                                {s.currency}
                                                            </td>
                                                            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                                                <span
                                                                    className=
                                                                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'

                                                                >
                                                                    {s.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                                <time dateTime={s.datetime}>{s.date}</time>
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
                    </main>
                </div>
            </div>
        </>
    )
}

function mainProfile() {
    return (
        <div className="flex items-center ml-12">
            <img
                className="hidden h-16 w-16 rounded-full sm:block"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                alt=""
            />
            <div>
                <div className="flex items-center">
                    <img
                        className="h-16 w-16 rounded-full sm:hidden"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                        alt=""
                    />
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        Hello, Buttcake
                    </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt className="sr-only">Company</dt>
                    <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <OfficeBuildingIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        OSIS
                    </dd>
                    <dt className="sr-only">Account status</dt>
                    <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <CheckCircleIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                            aria-hidden="true"
                        />
                        Homeroom
                    </dd>
                </dl>
            </div>

        </div>
    )
}

function profileDropDown() {
    return (
        <Menu as="div" className="mr-12 relative">
            <div>
                <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>Buttcake
                    </span>
                    <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Your Profile
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Settings
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Logout
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

function tasks() {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Tasks</h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {cards.map((card) => (
                    <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">{card.roomNumber}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}