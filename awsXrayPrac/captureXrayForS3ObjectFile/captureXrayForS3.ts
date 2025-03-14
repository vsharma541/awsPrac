import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import * as AWSXRay from 'aws-xray-sdk';
const s3Client: S3Client = new S3Client({
    region: 'us-east-1'
});
const xrayS3Client = AWSXRay.captureAWSv3Client(s3Client);
const segment = AWSXRay.getSegment();

const subsegment = segment?.addNewSubsegment('MyCustomSubsegment');
subsegment?.addAnnotation('key', 'value');
subsegment?.addMetadata('namespace', { key: 'value' });
type ErrorType = Error | string;

const handler = async (event: any) => {
    try {
        const bucket: string = 'my-buck1451';
        const key: string = 'cardNums.txt';
        const readCommand: GetObjectCommand = new GetObjectCommand({
            Bucket: bucket,
            Key: key
        });
        const result: any = await xrayS3Client.send(readCommand);

        // old method for converting s3 object data to utf-8 form
        // const finalResult1 = await streamResult(result.Body);

        const finalResult: string = await result.Body.transformToString();
        subsegment.
        console.log(finalResult);
    } catch (error) {
        const err: ErrorType = <ErrorType> error;
        subsegment?.addError(err);
        console.error('Error in reading s3 object');
        console.log(JSON.stringify(error, ['message']));
    } finally {
        subsegment?.close();
    }
};
export {handler};