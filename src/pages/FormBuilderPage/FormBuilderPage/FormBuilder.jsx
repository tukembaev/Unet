// FormBuilder.js
import React, { useState } from 'react';
import { Layout } from '../../components';
import styles from './FormBuilder.module.scss'
import { TextareaAutosize } from '@material-ui/core';

const FormBuilder = () => {
  const [active, setActive] = useState(false)
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: 'text',
    text: '',
    options: ['Option 1'],
  });

  const addQuestion = () => {
    if (currentQuestion.text.trim() !== '') {
      setQuestions([...questions, { ...currentQuestion }]);
      setCurrentQuestion({ type: 'text', text: '', options: ['Option 1'] });
    }
  };

  const handleTypeChange = (type) => {
    setCurrentQuestion({ ...currentQuestion, type, options: ['Option 1'] });
  };

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, `Option ${currentQuestion.options.length + 1}`],
    });
  };


  

  const [title, setTitle] = useState('Новая форма');
  const [descr, setDescr] = useState("Описание")
  const [question, setQuestion] = useState("Вопрос без заголовка")

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDesr = (e) => {

    setDescr(e.target.value)
  }
  



  return (
    <Layout>

      <div  className={styles.wrapper}>
        <div className={styles.formBuilder}>
          <div onClick={() => setActive(true)} className={active? styles.header_title2 : styles.header_title}>
            <label>
              <TextareaAutosize type="text" className={styles.title_inp} value={title} onChange={handleTitleChange} />
            </label>
            <label>
              <TextareaAutosize type="text" className={styles.descr_inp} value={descr} onChange={handleDesr} />
            </label>
          </div>

          <div onClick={() => setActive(true)} className={styles.question_block}>
            <label>
              <TextareaAutosize type="text" className={styles.question_title_inp} value={question} onChange={(e) => setQuestion(e.target.value)} />
            </label>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FormBuilder;
