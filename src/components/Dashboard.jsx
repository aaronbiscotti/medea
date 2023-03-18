import { Fragment, useEffect, useState, useCallback } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    CogIcon,
    CreditCardIcon,
    HomeIcon,
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
import { firestore } from '../../firebase/initFirebase'
import { collection, query, onSnapshot } from "firebase/firestore";
import SubmitTranscript from './SubmitTranscript';
import RecommendedCourses from './RecommendedCourses';
// import { recommendCourses, getCourseJSON } from "../chatgpt";


// const q = query(collection(db, "courses"), where("topic", "==", "English"));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
// });


const cards = [
    { name: 'Select courses', href: '#', icon: ScaleIcon, dueDate: 123 },
    { name: 'Complete Naviance student survey', href: '#', icon: ScaleIcon, dueDate: 123 },
    { name: 'Build your college list', href: '#', icon: ScaleIcon, dueDate: 123 },
]
const schedule = [
    { name: 'AP American Studies: US History', href: '/', icon: ScaleIcon, roomNumber: 123, teacher: "Todd Davis" },
    { name: 'Precalculus', href: '/course_description', icon: ScaleIcon, roomNumber: 123, teacher: "Priscilla Won" },
    { name: 'AP Physics 1', href: '/course_description', icon: ScaleIcon, roomNumber: 123, teacher: "Adnan Iqbal" },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {

    // const [courses, setCourses] = useState("");

    // const handleButtonClick = useCallback(() => {
    //     setCourses(generate());
    // }, []);

    // useEffect(() => {
    //     async function fetchData() {
    //         const courseJSON = await getCourseJSON();
    //         const newCourses = await recommendCourses(courseJSON);
    //         setCourses(courseJSON);
    //         // setRecommendedCourses(newCourses);
    //     }

    //     fetchData();
    // }, []);

    return (
        <>
            <div className="min-h-full">
                <Sidebar />
                <div className="lg:pl-64 flex flex-col flex-1">
                    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
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
                    {/* <button
                        onClick={handleButtonClick}
                        type="button"
                        className="w-[350px] mt-10 ml-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Recommend courses
                    </button> */}
                    {/* <p>{courses}</p> */}

                    {/* <pre>{courses ? JSON.stringify(courses, null, 2) : 'Loading...'}</pre> */}
                    {/* <h1>Recommended Courses:</h1> */}
                    {/* <pre>{recommendCourses ? (recommendCourses, null, 2) : 'Loading...'}</pre> */}
                </div>
            </div>
        </>
    )
}

function mainProfile() {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const coursesRef = collection(firestore, "users");
        const q = query(coursesRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userInformation = [];
            querySnapshot.forEach((doc) => {
                userInformation.push({ id: doc.id, ...doc.data() });
            });
            setUserInfo(userInformation);
        })

        return () => {
            unsubscribe();
        }
    }, []);
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
                        Hello, {userInfo.map((user) => user.first_name)}
                    </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt className="sr-only">Company</dt>
                    <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <OfficeBuildingIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        OSIS: {userInfo.map((user) => user.osis)}
                    </dd>
                    <dt className="sr-only">Account status</dt>
                    <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        Homeroom: {userInfo.map((user) => user.off_class)}
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

var input = `English /ENL / 1 Actual Mark 2019 / 1 10X445 EEN41 ENGLISH 9 94 BERGER 2.00/2.00 2020 / 1 10X445 EES83 ENGLISH 10 98 LEWIS 1.00/1.00 2020 / 2 10X445 EES84 ENGLISH 10 99 LEWIS 1.00/1.00 2021 / 1 10X445 EEN43 ENGLISH 11 94 ALLEN 2.00/2.00 Subject Area : Actual Credits / Credits Earned : 6.00 / 6.00 Subject Area Average : 95.50% Credits Averaged : 6.00 Social Studies / 2 Actual Mark 2019 / 1 10X445 HGN21 GLOBAL HISTORY 98 LUBIN 2.00/2.00 2020 / 1 10X445 HGS43XW AP WORLD HISTOR 95 GONZOWITZ 1.00/1.00 2020 / 2 10X445 HGS44XW AP WORLD HISTOR 99 GONZOWITZ 1.00/1.00 2021 / 1 10X445 HUN11X AP US HISTORY 96 STEIKER 2.00/2.00 Subject Area : Actual Credits / Credits Earned : 6.00 / 6.00 Subject Area Average : 97.00% Credits Averaged : 6.00 Mathematics / 3 Actual Mark 2018 / 1 26Q172 MEN11A ALGEBRA 98 2.00/2.00 2019 / 1 10X445 MGN11H GEOMETRY HONORS 92 CHEUNG 2.00/2.00 2020 / 1 10X445 MRS21H HONORS ALG2&TRI 97 LI H 1.00/1.00 2020 / 2 10X445 MRS22H HONORS ALG2&TRI 98 LI H 1.00/1.00 2021 / 1 10X445 MKN11X AP COMP SCI A 100 QIU W 2.00/2.00 2021 / 1 10X445 MPN1ORS PRECALC 98 WENG 2.00/2.00 Subject Area : Actual Credits / Credits Earned : 10.00 / 10.00 Subject Area Average : 97.10% Credits Averaged : 10.00 Sciences / 4 Actual Mark 2018 / 1 26Q172 SLN11A LIVING ENV 98 2.00/2.00 2019 / 1 10X445 SCN11QF CHEMISTRY 95 MEYER L 2.00/2.00 2019 / 1 10X445 SKS11Q2 ELEMENTS OF ENG 100 WOMER 1.00/1.00 2019 / 1 10X445 SWS11QJ1 SCIENCE RESEARC 88 DIMOULAS 1.00/1.00 2020 / 1 10X445 SCS21X AP CHEMISTRY 97 MEYER L 1.00/1.00 2020 / 2 10X445 SCS22X AP CHEMISTRY 97 MEYER L 1.00/1.00 2021 / 1 10X445 SPN11X1 AP PHYSICS 1 95 SEOH 2.00/2.00 Subject Area : Actual Credits / Credits Earned : 10.00 / 10.00 Subject Area Average : 95.80% Credits Averaged : 10.00 Foreign Language / 5 Actual Mark 2018 / 1 26Q172 FSN31A SPANISH I 93 2.00/2.00 2019 / 1 10X445 FSN32 SPANISH LEVEL 2 98 VASQUEZ 2.00/2.00 2020 / 1 10X445 FSS65 SPANISH LEVEL 3 93 SANSON 1.00/1.00 2020 / 2 10X445 FSS66 SPANISH LEVEL 3 97 SANSON 1.00/1.00 Subject Area : Actual Credits / Credits Earned : 6.00 / 6.00 Subject Area Average : 95.33% Credits Averaged : 6.00 The Arts / 7 Actual Mark 2018 / 7 10X445 CJF11 DRAMA 88 HANNON 1.00/1.00 2018 / 7 10X445 UHF11 MUSIC 94 MCNEIL 1.00/1.00 Subject Area : Actual Credits / Credits Earned : 2.00 / 2.00 Subject Area Average : 91.00% Credits Averaged : 2.00 Health/Physical Education / 8 Actual Mark 2018 / 7 10X445 PHF11 HEALTH 95 SCHORR 1.00/1.00 2019 / 1 10X445 PPN11QA PHYS ED 100* KONSTANTAK 1.00/1.00 2020 / 1 10X445 PPS11 PHYS ED 99* OHARA 0.50/0.50 2020 / 2 10X445 PPS11 PHYS ED 96* OHARA 0.50/0.50  FALLON 1.00/1.00 Subject Area : Actual Credits / Credits Earned : 4.00 2 HXRCE GLOBAL II  `

const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    organization: "org-z7m6hqrQHuHbpI0K9pYlJiR0",
    apiKey: "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"
});



const openai = new OpenAIApi(configuration);

export async function recommendCourses(courses) {
    console.log('hi');
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:
                    "Return in JSON format. You will be given previous courses by a student, and recommend future courses to them based on their old courses and give a brief description. Make sure to give not taken courses" + courses,
            },
            {
                role: "user",
                content: courses,
            },
        ],
        max_tokens: 1000,
    });

    return completion.data.choices[0].message;
};

var courses = '';
export async function getCourseJSON() {
    const question = "Can you take this text data from the input, and seperate in JSON format with the name of each map being a subject, IE English, Social Studies, Mathematics. Each subject will contain a key, which name is the course, so like English 9: 94, which is the grade of the course. Keep all the english courses in one section and so on for all the subject. Make sure it is not the course ID, but the course name. So like Algebra Return a json with all of it:  " + input;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 1000
    });
    return completion.data.choices[0].text;
}


export async function generate() {
    const courses = await getCourseJSON();
    console.log(courses);
    const newcourses = await recommendCourses(courses)
    console.log(newcourses);
    return newcourses;

};