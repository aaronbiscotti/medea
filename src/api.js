export async function generate() {
    //  const courses = await getCourseJSON();
    //  console.log(courses);
    const newcourses = await recommendCourses(courses);
    console.log(newcourses);
    return newcourses;
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


// export async function generate() {
//     const courses = await getCourseJSON();
//     console.log(courses);
//     const newcourses = await recommendCourses(courses)
//     console.log(newcourses);

// };