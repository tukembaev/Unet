import React, { useEffect, useState } from "react";
import styles from "./PublicationForm.module.scss";
import Button from "../../Button/Button";

import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../utils/Notifications";
import Dropdown from "../../Dropdown/Dropdown";
import { TextareaAutosize } from "@mui/material";
import {
  patchPublicationInfo,
  postPublications,
} from "../../../service/PublicationService";
import EmployeeSelectAllUserId from "../../../hooks/EmployeeSelect/EmployeeSelectAllUserId";

function PublicationForm({ setRender, setState }) {
  //UseState

  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [doi, setDoi] = useState("");
  const [issn, setIssn] = useState("");
  const [isni, setIsni] = useState("");
  const [wikipedia_url, setWiki] = useState("");
  const [wikidata, setWikiData] = useState("");

  const [published, setDateCreate] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState("");
  const [authors, setSelectedEmployee] = useState([]);
  //Const & Lets

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const getUserIdArray = (data) => {
    const userIdArray = data.map((item) => item.user_id);
    return userIdArray;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title === "") {
      setNotify({
        isOpen: true,
        message: " Вы не написали заголовок публикации",
        type: "warning",     sound: 'warning'
      });
    } else if (type === "") {
      setNotify({
        isOpen: true,
        message: " Вы не выбрали вид публикации",
        type: "warning",     sound: 'warning'
      });
    } else if (link === "" && file === "") {
      setNotify({
        isOpen: true,
        message: " Ссылка или файл обязательны",
        type: "warning",     sound: 'warning'
      });
    } 
    else if (authors.length === 0) {
      setNotify({
        isOpen: true,
        message: " Выберите одного сотрудника",
        type: "warning",     sound: 'warning'
      });
    
    }
    else {
      try {
        let user_id_authors = getUserIdArray(authors);

        let response = await postPublications(
          title,
          description,
          type,
          link,
          doi,
          issn,
          isni,
          wikipedia_url,
          wikidata,
          country,
          published,
          user_id_authors
        );

        let response2 = await patchPublicationInfo(response.data.id, {
          file: file,
        });


        setNotify({
          isOpen: true,
          message: "Успешно опубликовано",
           type: "success", sound : "success"
        });
        setState({ isPaneOpen: false });
        setRender(true);
      } catch (error) {
        
        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
      }
    }
  };

  return (
    <div>
      <div className={styles.qr_wrapper}>
        <div className={styles.qr_body}>
          <div className={styles.qr_inputs}>
            <h2 style={{ paddingBottom: "15px" }}>Публикация:</h2>
            {type === '' ? null : <span>Вид</span>}
            <TextareaAutosize
              id="type"
              name="type"
              className={styles.discription_input}
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Вид:"
            />
   {title === '' ? null : <span>Заголовок</span>}
            <TextareaAutosize
              id="text"
              name="text"
              className={styles.discription_input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Заголовок:"
            />
               {description === '' ? null : <span>Краткое описание</span>}
            <TextareaAutosize
              id="description"
              name="description"
              className={styles.discription_input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Краткое описание:"
            />
              {link === '' ? null : <span>Ссылка</span>}
            <TextareaAutosize
              id="link"
              name="link"
              className={styles.discription_input}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Ссылка (необязательно):"
            />
              {doi === '' ? null : <span>DOI</span>}
            <TextareaAutosize
              id="DOI"
              name="DOI"
              className={styles.discription_input}
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
              placeholder="DOI:"
            />
              {issn === '' ? null : <span>ISSN</span>}
            <TextareaAutosize
              id="ISSN"
              name="ISSN"
              className={styles.discription_input}
              value={issn}
              onChange={(e) => setIssn(e.target.value)}
              placeholder="ISSN:"
            />
              {isni === '' ? null : <span>ISNI</span>}
            <TextareaAutosize
              id="ISNI"
              name="ISNI"
              className={styles.discription_input}
              value={isni}
              onChange={(e) => setIsni(e.target.value)}
              placeholder="ISNI:"
            />
  {wikipedia_url === '' ? null : <span>Ссылка на Wikipedia</span>}
            <TextareaAutosize
              id="Wiki"
              name="Wiki"
              className={styles.discription_input}
              value={wikipedia_url}
              onChange={(e) => setWiki(e.target.value)}
              placeholder="WikipediaURL:"
            />
  {wikidata === '' ? null : <span>WikiData</span>}
            <TextareaAutosize
              id="Wiki"
              name="Wiki"
              className={styles.discription_input}
              value={wikidata}
              onChange={(e) => setWikiData(e.target.value)}
              placeholder="WikiData:"
            />
              {country === '' ? null : <span>Страна</span>}
            <TextareaAutosize
              id="country"
              name="country"
              className={styles.discription_input}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Страна:"
            />
            <p>Дата издания:</p>
            <input
              type="date"
              placeholder="Дата создания"
              className={styles.discription_input}
              onChange={(e) => setDateCreate(e.target.value)}
            />
            <EmployeeSelectAllUserId
              selectedEmployee={setSelectedEmployee}
              placehold={"Выберите издателя"}
              isMulti={true}
            />
            <input
              type="file"
              name="file_upload"
              accept="application/pdf"
              onChange={onFileChange}
              className={styles.file_padding_left}
            />
          </div>

          <div className={styles.qr_footer}>
            <Button className={styles.btn1} onClick={handleSubmit}>
              Отправить
            </Button>
          </div>
        </div>

     
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default PublicationForm;
