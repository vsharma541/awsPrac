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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = __importDefault(require("fs"));
const s3Client = new client_s3_1.S3Client({
    region: 'us-east-1'
});
const readCardNumsFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fs_1.default.readFileSync(file, { encoding: 'utf-8' });
});
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bucket = 'my-buck145';
        const file = 'cardNums.txt';
        // enable the following if working in local system
        // const filePath: string = '../cardNums.txt';
        // when running this code in AWS lambda
        const filePath = 'cardNums.txt';
        const putS3ObjectCommand = new client_s3_1.PutObjectCommand({
            Bucket: bucket,
            Key: file,
            Body: yield readCardNumsFile(filePath)
        });
        const result = yield s3Client.send(putS3ObjectCommand);
        console.log('file added into s3 bucket success!');
        console.log(result);
    }
    catch (error) {
        console.error('file not added into s3 bucket, failed!');
        console.log(JSON.stringify(error, ['message']));
    }
});
exports.handler = handler;
