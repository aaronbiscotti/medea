import { workerSrc } from 'pdfjs-dist/build/pdf'
import Worker from 'worker-loader!pdfjs-dist/build/pdf.worker';

if (typeof window !== 'undefined') {
    window.pdfWorkerSrc = workerSrc;
    window.PDFWorker = Worker;
}