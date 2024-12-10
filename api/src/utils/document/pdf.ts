import * as pdfjsLib from 'pdfjs-dist';
import { createCanvas, DOMMatrix } from 'canvas';

// @ts-ignore
global.DOMMatrix = DOMMatrix;

type PDFPage = {
  page: number;
  pageText: string;
  b64Images: string[];
};

class PDFBufferLoaderWithImages {
  private buffer: Buffer;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }

  async load(): Promise<PDFPage[]> {
    const documents: PDFPage[] = [];
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(this.buffer),
    });

    const pdfDoc = await loadingTask.promise;

    for (let pageIndex = 1; pageIndex <= pdfDoc.numPages; pageIndex++) {
      const page = await pdfDoc.getPage(pageIndex);

      const textContent = await page.getTextContent();
      let text = textContent.items.map((item: any) => item.str).join(' ');
      const b64Images: string[] = [];

      if (!text) {
        const page = await pdfDoc.getPage(pageIndex);

        const viewport = page.getViewport({ scale: 1 });
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext(
          '2d',
        ) as unknown as CanvasRenderingContext2D;

        await page.render({ canvasContext: context, viewport }).promise;
        const base64Image = canvas.toDataURL('image/png');
        b64Images.push(base64Image);
      }

      documents.push({
        page: pageIndex,
        pageText: text,
        b64Images,
      });
    }

    return documents;
  }
}

export default PDFBufferLoaderWithImages;
