import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Stream } from 'stream';
const s3Client: S3Client = new S3Client({
    region: 'us-east-1'
});

// old method for converting s3 object data to utf-8 form
const streamResult = (stream: Stream) => {
    const chunks: Uint8Array[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (data: any) => chunks.push(data));
        stream.on('error', (err: any) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
}

const handler = async (event: any) => {
    try {
        const bucket: string = 'my-buck145';
        const key: string = 'cardNums.txt';
        const readCommand: GetObjectCommand = new GetObjectCommand({
            Bucket: bucket,
            Key: key
        });
        const result: any = await s3Client.send(readCommand);

        // old method for converting s3 object data to utf-8 form
        // const finalResult1 = await streamResult(result.Body);

        const finalResult: string = await result.Body.transformToString();
        console.log(finalResult);
    } catch (error) {
        console.error('Error in reading s3 object');
        console.log(JSON.stringify(error, ['message']));
    }
};
// handler('123');
export {handler};