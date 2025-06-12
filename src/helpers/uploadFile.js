import {UploadUrls} from '../utils/serverURL'

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch(`${UploadUrls.uploadFile}`, {
      method: 'POST',
      body: formData,
    });
  
    const responseData = await response.json();
    return responseData;
  };
  
  export default uploadFile;
  