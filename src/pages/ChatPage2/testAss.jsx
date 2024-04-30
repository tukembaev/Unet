import React, { useState } from 'react';
import axios from 'axios';


function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [message, setMessage] = useState('');

  // Обработчик выбора файлов
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };


  // Обработчик отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFiles) {
      setMessage('Выберите файлы для загрузки.');
      return;
    }
    
    const formData = new FormData();
        formData.append('addressee',5830);
        formData.append('type', 'осас');
        formData.append('type_doc', 'AXP - 2023-02-071515');
        formData.append('text', '[5830,5829]');
       
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    //   console.log(123);
    // }

    // try {

    //   let response = await postBeksik(formData)
    //   // await axios.post('https://task.unet.kg/api/conversion/raportsforpost/', formData, {
    //   //   headers: {
    //   //     'Content-Type': 'multipart/form-data',
    //   //   },
    //   // });

    //   setMessage('Файлы успешно загружены!');
    // } catch (error) {
    //   setMessage('Произошла ошибка при загрузке файлов.');
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Загрузить</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default FileUpload;
