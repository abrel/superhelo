import S3Manager from '@@/services/s3';
import mammoth from 'mammoth';
import PDFBufferLoaderWithImages from '@@/utils/document/pdf';

export const getDocumentContent = async (
  document: SH.Document,
): Promise<SH.DocumentContent[]> => {
  const data = await S3Manager.getObject(document.key).promise();
  switch (document.mimetype) {
    case 'text/plain': {
      return [{ title: document.name, data: data.Body?.toString('utf-8') }];
    }
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      const word = await mammoth.extractRawText({
        buffer: data.Body as Buffer,
      });

      return [{ title: document.name, data: word.value }];
    }
    case 'application/pdf': {
      const loader = new PDFBufferLoaderWithImages(data.Body as Buffer);
      const pages = await loader.load();

      const contents: SH.DocumentContent[] = [];

      for (const page of pages) {
        contents.push({
          title: `${document.name} - Page : ${page.page}`,
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
      const base64Image = data.Body?.toString('base64');
      return [
        {
          title: document.name,
          b64Images: [`data:${document.mimetype};base64,${base64Image}`],
        },
      ];
    }

    case 'text/csv':
    default:
      return [{ title: document.name, data: '' }];
  }
};
