class FileBuffer {
    static async buffer(file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          const buffer = reader.result;
          const fileBuffer = String.fromCharCode.apply(null, new Uint8Array(buffer));
          resolve(fileBuffer);
        };
        reader.onerror = () => {
          reject(reader.error);
        };
      });
    }
  }
  
  export default FileBuffer;
  