import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
const s3Client: S3Client = new S3Client({
    region: 'us-east-1'
});

const readCardNumsFile = async (file: string) => {
    return await fs.readFileSync(file, { encoding: 'utf-8' });
}

const handler = async (event: any): Promise<any> => {
    try {
        const bucket: string = 'my-buck145';
        const file: string = 'cardNums.txt';

        // enable the following if working in local system
        // const filePath: string = '../cardNums.txt';

        // when running this code in AWS lambda
        const filePath: string = 'cardNums.txt';

        const putS3ObjectCommand: PutObjectCommand = new PutObjectCommand({
            Bucket: bucket,
            Key: file,
            Body: await readCardNumsFile(filePath)
        });
        const result: any = await s3Client.send(putS3ObjectCommand);
        console.log('file added into s3 bucket success!');
        console.log(result);
    } catch (error) {
        console.error('file not added into s3 bucket, failed!');
        console.log(JSON.stringify(error, ['message']));
    }
}

// uncomment below to run the file in local system
// handler({});

export {handler};