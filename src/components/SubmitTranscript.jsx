import React, { useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';


if (typeof window !== 'undefined') {
    const pdfjsWorker = '/workers/pdf.worker.min.js';
    GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

const SubmitTranscript = () => {
    const [jsonData, setJsonData] = useState(null);

    const parsePdf = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const arrayBuffer = event.target.result;
            const typedArray = new Uint8Array(arrayBuffer);

            const pdf = await getDocument({ data: typedArray }).promise;
            let pdfText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                pdfText += content.items.map((item) => item.str).join(' ') + '\n';
            }

            // Parse the PDF text here
            // You can modify the parsing logic to better suit the PDF format
            const lines = pdfText.split('\n');
            const subjects = {};

            let currentSubject = '';

            lines.forEach((line) => {
                if (line.includes('Actual')) {
                    currentSubject = line.split(' / ')[0].trim();
                    subjects[currentSubject] = [];
                } else if (line.includes(' / ') && currentSubject) {
                    const parts = line.split(' ');
                    const course = parts.slice(4, -2).join(' ').trim();
                    const grade = parseFloat(parts[parts.length - 2]);

                    if (!isNaN(grade)) {
                        subjects[currentSubject].push({ course, grade });
                    }
                }
            });

            setJsonData(subjects);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" onChange={parsePdf} />
            {jsonData && (
                <pre>
                    <code>{JSON.stringify(jsonData, null, 2)}</code>
                </pre>
            )}
        </div>
    );
};

export default SubmitTranscript;