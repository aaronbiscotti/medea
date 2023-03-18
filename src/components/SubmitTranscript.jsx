import { useState } from 'react';
import { pdfToText } from 'pdf-text-reader';

export default function Submit() {
    const [text, setText] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const fileData = new Uint8Array(event.target.result);
            pdfToText(fileData).then((result) => {
                setText(result);
            });
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <label htmlFor="pdf-upload" className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
                Upload PDF
            </label>
            <input id="pdf-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
            {text && (
                <div className="mt-4 px-4 py-2 bg-gray-100 rounded-md">
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
}
