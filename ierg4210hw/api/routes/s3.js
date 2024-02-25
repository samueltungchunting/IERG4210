require('dotenv').config()
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs').promises;
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3Client = new S3Client({
    reagin: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
})

async function uploadFileToS3(file, fileName) {
    try {
        // const fileContent = await fs.readFile(file.path);
        // file.buffer
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype, 
        };
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        return;
    } catch (error) {
        console.error('Error reading file content:', error);
        throw error;
    }
}

async function getFileFromS3(fileName) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
}

async function deleteFileFromS3(fileName) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    return
}

exports.uploadFileToS3 = uploadFileToS3;
exports.getFileFromS3 = getFileFromS3;
exports.deleteFileFromS3 = deleteFileFromS3;