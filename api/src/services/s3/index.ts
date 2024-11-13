import AWS from 'aws-sdk';

type UploadPayload = {
  key: string;
  contentType: string;
  body: Buffer | NodeJS.ReadWriteStream;
  acl?: string;
};

class S3Manager {
  s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: process.env.AWS_S3_ENDPOINT,
    });
    this.init();
  }

  getRawS3 = () => this.s3;

  listBuckets = () => this.s3.listBuckets().promise();

  init = async () => {
    if (process.env.ENV !== 'local') {
      return;
    }

    const buckets = (await this.listBuckets()).Buckets;

    if (
      !buckets?.find(
        (bucket: { Name?: string }) => bucket.Name === process.env.S3_BUCKET,
      )
    ) {
      await this.s3
        .createBucket({
          Bucket: process.env.S3_BUCKET,
        })
        .promise();
    }
  };

  listObjects = (prefix: string) =>
    this.s3
      .listObjectsV2({
        Bucket: process.env.S3_BUCKET,
        Prefix: prefix,
      })
      .promise();

  getObject = (key: string) =>
    this.s3.getObject({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    });

  uploadFile = ({ key, contentType, body, acl = 'private' }: UploadPayload) =>
    this.s3
      .upload({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
        ACL: acl,
      })
      .promise();

  deleteFile = (key: string) =>
    this.s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: key,
      })
      .promise();

  renameFile = async (oldKey: string, newKey: string) => {
    await this.s3
      .copyObject({
        Bucket: process.env.S3_BUCKET,
        CopySource: `${process.env.S3_BUCKET}/${oldKey}`,
        Key: newKey,
      })
      .promise();

    await this.deleteFile(oldKey);
  };

  emptyDirectory = async (prefix: string) => {
    if (!prefix) {
      throw new Error('You must provide a prefix');
    }

    const listedObjects = await this.listObjects(prefix);
    listedObjects.Contents = listedObjects.Contents?.filter(
      ({ Key }) => Key && Key !== prefix,
    );

    if (!listedObjects?.Contents?.length) {
      return;
    }

    const objectsToDelete = [] as { Key: string }[];

    listedObjects.Contents.forEach(({ Key }) => {
      if (Key) {
        objectsToDelete.push({ Key });
      }
    });

    await this.s3
      .deleteObjects({
        Bucket: process.env.S3_BUCKET,
        Delete: { Objects: objectsToDelete },
      })
      .promise();

    if (listedObjects.IsTruncated) {
      await this.emptyDirectory(prefix);
    }
  };
}

export default new S3Manager();
