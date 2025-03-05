import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

// Verificar se as variáveis de ambiente necessárias estão definidas
const hasRequiredEnvVars = 
  process.env.DO_SPACES_ENDPOINT && 
  process.env.DO_SPACES_KEY && 
  process.env.DO_SPACES_SECRET && 
  process.env.DO_SPACES_BUCKET && 
  process.env.DO_SPACES_REGION;

// Configurar o cliente do Spaces (compatível com S3) apenas se as variáveis estiverem definidas
let s3;
let upload;

if (hasRequiredEnvVars) {
  try {
    const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
    s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.DO_SPACES_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET,
      region: process.env.DO_SPACES_REGION
    });

    // Configurar o upload com multer
    upload = multer({
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
  } catch (error) {
    console.error('Erro ao configurar cliente S3:', error);
  }
}

// Função para gerar URL pública
export function getPublicUrl(key) {
  if (!hasRequiredEnvVars) {
    console.warn('Variáveis de ambiente do DigitalOcean Spaces não configuradas');
    return '';
  }
  return `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${key}`;
}

// Função para excluir arquivo
export async function deleteFile(key) {
  if (!hasRequiredEnvVars || !s3) {
    console.warn('Cliente S3 não configurado');
    return false;
  }
  
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

// Exportar o upload apenas se estiver configurado
export { upload }; 