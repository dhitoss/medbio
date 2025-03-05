import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

// Configurar o cliente do Spaces (compatível com S3)
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
  region: process.env.DO_SPACES_REGION
});

// Configurar o upload com multer
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.DO_SPACES_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      const fileExtension = file.originalname.split('.').pop();
      cb(null, `uploads/${Date.now()}-${uuidv4()}.${fileExtension}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Função para gerar URL pública
export function getPublicUrl(key) {
  return `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${key}`;
}

// Função para excluir arquivo
export async function deleteFile(key) {
  try {
    await s3.deleteObject({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: key
    }).promise();
    return true;
  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    return false;
  }
} 