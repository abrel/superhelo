import S3Manager from '@@/services/s3';
import mammoth from 'mammoth';
import { parse } from 'csv-parse/sync';
import XLSX from 'xlsx';
import PDFBufferLoaderWithImages from '@@/utils/document/pdf';

export const extractContent = async (
  title: string,
  mimetype: string,
  buffer: Buffer,
): Promise<SH.DocumentContent[]> => {
  switch (mimetype) {
    case 'text/plain': {
      return [{ title, data: buffer.toString('utf-8') }];
    }
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      const word = await mammoth.extractRawText({
        buffer,
      });

      return [{ title, data: word.value }];
    }
    case 'application/pdf': {
      const loader = new PDFBufferLoaderWithImages(buffer);
      const pages = await loader.load();

      const contents: SH.DocumentContent[] = [];

      for (const page of pages) {
        contents.push({
          title: `${title} - Page : ${page.page}`,
          data: page.pageText.replace(/\{/g, '').replace(/\}/g, ''),
          b64Images: page.b64Images,
        });
      }

      return contents;
    }
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
    case 'image/webp': {
      const base64Image = buffer.toString('base64');
      return [
        {
          title,
          b64Images: [`data:${mimetype};base64,${base64Image}`],
        },
      ];
    }
    case 'text/csv': {
      const csvContent = buffer.toString('utf-8');
      const records = parse(csvContent, {
        skip_empty_lines: true,
      });
      const extractedText = records
        .map((row: string[]) => row.join(', '))
        .join('\n');
      return [{ title, data: extractedText }];
    }
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      let extractedText = '';
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const csv = XLSX.utils.sheet_to_csv(sheet);
        extractedText += `Sheet: ${sheetName}\n${csv}\n\n`;
      }
      return [{ title, data: extractedText }];
    }

    default:
      return [{ title, data: '' }];
  }
};

export const getDocumentContent = async (
  document: SH.Document,
): Promise<SH.DocumentContent[]> => {
  const data = await S3Manager.getObject(document.key).promise();
  return extractContent(document.name, document.mimetype, data.Body as Buffer);
};

export const getFileContent = async (
  file: Express.Multer.File,
): Promise<SH.DocumentContent[]> => {
  return extractContent(file.originalname, file.mimetype, file.buffer);
};
