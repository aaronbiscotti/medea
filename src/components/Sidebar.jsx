import React from "react"
const navigation = [
    { name: 'Home', href: '/', icon: SquareRounded },
    { name: 'Grades', href: '/grades', icon: Notebook },
    { name: 'Selection Form', href: '/selection-form', icon: ClipboardList },
    { name: 'Course Search', href: '/course-search', icon: CreditCardIcon },
]
const secondaryNavigation = [
    { name: 'Profile', href: '/profile', icon: UserGroupIcon },
    { name: 'Settings', href: '#', icon: CogIcon },
]
import { ClipboardList, Notebook, SquareRounded } from 'tabler-icons-react';
import {
    CogIcon,
    CreditCardIcon,
    UserGroupIcon,
} from '@heroicons/react/outline'
import { useRouter } from "next/router";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Sidebar = () => {
    const router = useRouter();
    return (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
            <div className="flex flex-col flex-grow bg-gray-100 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <img
                        className="h-8 w-auto"
                        src="/logo.svg"
                        alt="Easywire logo"
                    />
                </div>
                <nav className="mt-5 flex-1 flex flex-col divide-y divide-black overflow-y-auto" aria-label="Sidebar">
                    <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    router.pathname == item.href ? 'bg-gray-200 text-black' : 'text-black hover:text-black hover:bg-gray-200',
                                    'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-black" aria-hidden="true" />
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="mt-6 pt-6">
                        <div className="px-2 space-y-1">
                            {secondaryNavigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-black hover:bg-gray-200"
                                >
                                    <item.icon className="mr-4 h-6 w-6 text-black" aria-hidden="true" />
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar