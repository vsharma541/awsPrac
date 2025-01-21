import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client: S3Client = new S3Client({
    region: 'us-east-1'
});

const handler = async (event: any) => {
    const bucket: string = 'my-buck145';
    const file: string = 'index.html';
    const getCommand: GetObjectCommand = new GetObjectCommand({
        Bucket: bucket,
        Key: file
    });
    const getObjUrl: string = await getSignedUrl(s3Client, getCommand);
    console.log('my obj url - ', getObjUrl);
};

export {handler};