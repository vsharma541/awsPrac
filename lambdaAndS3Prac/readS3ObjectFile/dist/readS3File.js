"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Client = new client_s3_1.S3Client({
    region: 'us-east-1'
});
// old method for converting s3 object data to utf-8 form
const streamResult = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (data) => chunks.push(data));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
};
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bucket = 'my-buck145';
        const key = 'cardNums.txt';
        const readCommand = new client_s3_1.GetObjectCommand({
            Bucket: bucket,
            Key: key
        });
        const result = yield s3Client.send(readCommand);
        // old method for converting s3 object data to utf-8 form
        // const finalResult1 = await streamResult(result.Body);
        const finalResult = yield result.Body.transformToString();
        console.log(finalResult);
    }
    catch (error) {
        console.error('Error in reading s3 object');
        console.log(JSON.stringify(error, ['message']));
    }
});
exports.handler = handler;
