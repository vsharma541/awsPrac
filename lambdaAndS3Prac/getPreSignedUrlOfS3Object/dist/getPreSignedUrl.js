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
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3Client = new client_s3_1.S3Client({
    region: 'us-east-1'
});
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const bucket = 'my-buck145';
    const file = 'index.html';
    const getCommand = new client_s3_1.GetObjectCommand({
        Bucket: bucket,
        Key: file
    });
    const getObjUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, getCommand);
    console.log('my obj url - ', getObjUrl);
});
exports.handler = handler;
