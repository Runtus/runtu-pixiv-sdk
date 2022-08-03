import oss from 'ali-oss';

// 暂时不需要oss 
const client = new oss({
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: '',
});

client.useBucket('');

export default client;
