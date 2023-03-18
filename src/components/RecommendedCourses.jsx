import { useState } from "react";
import { generate } from "@/chatgpt";

export default function RecommendedCourses() {
    const [showHTML, setShowHTML] = useState(false);

    const handleClick = () => {
        setTimeout(() => {
            setShowRecommended(true);
        }, 2500);
    };

    const htmlString = `Here are some recommended courses based on the student's previous courses:
    <ol>
      <li>Advanced Placement (AP) English Literature and Composition: This course builds on the student's previous English courses and prepares them for the AP exam. It focuses on close reading, critical analysis, and interpretation of various literary works.</li>
      <li>AP Human Geography: This social studies course examines various human geographic patterns and processes that shape the world. It introduces students to the tools and methods used by geographers to study population, migration, culture, language, religion, and economic systems.</li>
      <li>AP Calculus AB: This math course is designed for students who have a strong foundation in algebra, geometry, and precalculus. It covers functions, limits, derivatives, integrals, and their applications in real-world contexts.</li>
      <li>AP Physics C: Mechanics: This science course covers topics in classical mechanics, such as motion, forces, energy, momentum, and rotational motion. It deepens the student's understanding of the physical world and prepares them for further studies in physics.</li>
      <li>AP Spanish Language and Culture: This foreign language course builds on the student's previous Spanish courses and develops their proficiency in listening, speaking, reading, and writing. It focuses on authentic materials and cultural perspectives from various Spanish-speaking countries.</li>
      <li>AP Studio Art: This art course allows students to create a portfolio of artwork in various media and styles. It encourages experimentation, creativity, and self-expression.</li>
      <li>Health and Wellness: This course focuses on the student's physical, mental, emotional, and social health. It covers topics such as nutrition, fitness, stress management, relationships, and decision-making skills.</li>
    </ol>`;
    return (
        <div>
            <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Recommend Courses
            </button>
            <p>{showHTML && <div dangerouslySetInnerHTML={{ __html: htmlString }} />}</p>
            {/* <ul className="mt-4">
                {courses.map((course, index) => (
                    <li key={index} className="list-disc list-inside">
                        {course}
                    </li>
                ))}
            </ul> */}
        </div>
    );
}
