import React, { useEffect, useState } from "react";
import styles from "./KpiForm.module.scss";
import Button from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../utils/Notifications";
import Dropdown from "../../Dropdown/Dropdown";
import { TextareaAutosize } from "@mui/material";
import {
  patchKpiInfo,
  postKpi,
  postPublications,
} from "../../../service/PublicationService";
import EmployeeSelectAllUserId from "../../../hooks/EmployeeSelect/EmployeeSelectAllUserId";
import KpiDirectionSelect from "../../../hooks/EmployeeSelect/KpiSelect/KpiDirectionSelect";
import KpiSemesterSelect from "../../../hooks/EmployeeSelect/KpiSelect/KpiSemestr";
import { Category } from "@material-ui/icons";
import { ScaleLoader } from "react-spinners";
import StarIcon from "@mui/icons-material/Star";
import userInfo from "../../../utils/userInfo";
import Country from "../../../utils/Country/Country";



function KpiForm({ setRender, setState }) {
  //UseState

  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState('');
  const [doi, setDoi] = useState("");
  const [issn, setIssn] = useState("");
  const [isni, setIsni] = useState("");
  const [wikipedia_url, setWiki] = useState("");
  const [wikidata, setWikiData] = useState("");
  const [published, setDateCreate] = useState("");
  const [country, setCountry] = useState("");
  const [authors, setSelectedEmployee] = useState([]);
  const [direction, setDirection] = useState("");
  const [category, setSemester] = useState("");

  const [loader, setLoader] = useState(false);
  const [isDirector, setIsDirector] = useState(false);
  const user = userInfo();

  //Const & Lets

  const [selectedFiles, setSelectedFiles] = useState([]);
  const onFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);
  const getUserIdArray = (data) => {
    const userIdArray = data?.map((item) => item.user_id);
    return userIdArray;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (direction === "") {
      setNotify({
        isOpen: true,
        message: "Ошибка! Вы не выбрали критерию",
        type: "warning",     sound: 'warning'
      });
    } else if (category === "") {
      setNotify({
        isOpen: true,
        message: "Ошибка! Вы не выбрали катергорию",
        type: "warning",     sound: 'warning'
      });
    } else if (title === "") {
      setNotify({
        isOpen: true,
        message: "Ошибка! Вы не написали заголовок",
        type: "warning",     sound: 'warning'
      });
    } else if (country === "") {
      setNotify({
        isOpen: true,
        message: "Ошибка! Вы не выбрали страну",
        type: "warning",     sound: 'warning'
      });
    } else if (published === "") {
      setNotify({
        isOpen: true,
        message: "Ошибка! Вы не указали дату создание",
        type: "warning",     sound: 'warning'
      });
    } else if (authors?.length === 0) {
      setNotify({
        isOpen: true,
        message: "Ошибка! Выберите сотрудника",
        type: "warning",     sound: 'warning'
      });
    } else if (link === '' && selectedFiles.length === 0) {
      setNotify({
        isOpen: true,
        message: "Ошибка! Выберите ссылку либо загрузите файл",
        type: "warning",     sound: 'warning'
      });
    } else {
      try {
        setLoading(true);
        let kpi_authors = getUserIdArray(authors);

        let response = await postKpi({
          category,
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
          position: isDirector === true ? "Заведуйший кафедры" : "ППС",
          kpi_authors,
          status: "В ожидании",
        });

        if (selectedFiles.length !== 0) {
          const formData = new FormData();
          formData.append("status", "В ожидании");
          for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files", selectedFiles[i]);
          }
          let response2 = await patchKpiInfo(response.data.id, formData);
        }

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
      } finally {
        setLoading(false);
      }
    }
  };

  const changeRole = () => {
    setIsDirector(!isDirector);
    setLoader(true)
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    setTitle("");
    setDescription("");
    setLink("");
    setDoi("");
    setIsni("");
    setIssn("");
    setWiki("");
    setWikiData("");
    setDateCreate("");
    setCountry("");
    setSelectedEmployee([]);
    setDirection("");
    setSemester("")
  }

  useEffect(() => {
    setSemester('')
  }, [direction])

  return (
    <div>
      <div className={styles.qr_wrapper}>
        {user?.is_head_of === true ? (
          <>
            <div className={styles.qr_head}>
              {user ? (
                <>
                  <div>
                    <h3>{isDirector ? "Заведующий" : "Сотрудник"}</h3>
                  </div>
                  <div className={styles.qr_controls}>
                    <button
                      className={styles.qr_btn}
                      onClick={changeRole}
                    >
                      {isDirector
                        ? "Заполнить как преподаватель"
                        : "Заполнить как заведующий"}
                    </button>
                  </div>
                </>
              ) : null}
            </div>
            <div className={styles.qr_body}>
              {
                loader ?
                  (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                      }}
                    >
                      <ScaleLoader color="grey" size={30} />{" "}
                      {/* Используйте нужные вам свойства для настройки загрузочного индикатора */}
                    </div>
                  ) : (
                    <div className={styles.qr_inputs}>
                      <div className={styles.requiredField}>
                        <h3>Критерий</h3>
                        <span className={styles.required_img}>*</span>
                      </div>
                      <KpiDirectionSelect
                        setDirection={setDirection}
                        isDirector={isDirector}
                      />
                      <div className={styles.requiredField}>
                        <h3>Категория</h3>
                        <span className={styles.required_img}>*</span>
                      </div>
                      <KpiSemesterSelect
                        id={direction}
                        setSemester={setSemester}
                        isDirector={isDirector}
                      />
                      <div className={styles.requiredField}>
                        <h3>Заголовок</h3>
                        <span className={styles.required_img}>*</span>
                      </div>
                      <TextareaAutosize
                        id="text"
                        name="text"
                        required
                        className={styles.discription_required}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={"Заголовок"}
                      />
                      <h3>Краткое описание</h3>
                      <TextareaAutosize
                        id="description"
                        name="description"
                        className={styles.discription_input}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Краткое описание"
                      />
                      <div className={styles.requiredField}>
                        <h3>Ссылка</h3>
                        <span style={{ color: "orange" }}>*</span>
                      </div>
                      <TextareaAutosize
                        id="link"
                        name="link"
                        className={styles.discription_required}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Ссылка"
                      />
                      <h3>DOI</h3>
                      <TextareaAutosize
                        id="DOI"
                        name="DOI"
                        className={styles.discription_input}
                        value={doi}
                        onChange={(e) => setDoi(e.target.value)}
                        placeholder="DOI"
                      />
                      <h3>ISSN</h3>
                      <TextareaAutosize
                        id="ISSN"
                        name="ISSN"
                        className={styles.discription_input}
                        value={issn}
                        onChange={(e) => setIssn(e.target.value)}
                        placeholder="ISSN"
                      />
                      <h3>ISNI</h3>
                      <TextareaAutosize
                        id="ISNI"
                        name="ISNI"
                        className={styles.discription_input}
                        value={isni}
                        onChange={(e) => setIsni(e.target.value)}
                        placeholder="ISNI"
                      />
                      <h3>Wiki</h3>
                      <TextareaAutosize
                        id="Wiki"
                        name="Wiki"
                        className={styles.discription_input}
                        value={wikipedia_url}
                        onChange={(e) => setWiki(e.target.value)}
                        placeholder="WikipediaURL"
                      />
                      <h3>WikiData</h3>
                      <TextareaAutosize
                        id="Wiki"
                        name="Wiki"
                        className={styles.discription_input}
                        value={wikidata}
                        onChange={(e) => setWikiData(e.target.value)}
                        placeholder="WikiData"
                      />
                      <div className={styles.requiredField}>
                        <h3>Страна</h3>
                        <span className={styles.required_img}>*</span>
                      </div>
                      <Country title={"Страна"} setStateCountry={setCountry} />
                      <div className={styles.requiredField}>
                        <h3>Дата издания:</h3>
                        <span className={styles.required_img}>*</span>
                      </div>
                      <input
                        type="date"
                        placeholder="Дата создания"
                        className={styles.discription_input}
                        onChange={(e) => setDateCreate(e.target.value)}
                      />
                      <div className={styles.requiredField}>
                        <h3>Сотрудник</h3>
                        <span className={styles.required_img}>*</span>
                      </div>
                      <EmployeeSelectAllUserId
                        selectedEmployee={setSelectedEmployee}
                        placehold={"Выберите издателя"}
                        isMulti={true}
                      />
                      <div className={styles.requiredField}>
                        <h3>Файл</h3>
                        <span style={{ color: "orange" }}>*</span>
                      </div>
                      <input
                        type="file"
                        name="file_upload"
                        accept="application/pdf"
                        multiple
                        onChange={onFileChange}
                        className={styles.file_padding_left}
                      />
                    </div>
                  )
              }

              <div className={styles.qr_footer}>
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <ScaleLoader color="grey" size={30} />
                  </div>
                ) : (
                  <Button className={styles.btn1} onClick={handleSubmit}>
                    Отправить
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.qr_body}>
            <div className={styles.qr_inputs}>
              <div className={styles.requiredField}>
                <h3>Критерий</h3>
                <span className={styles.required_img}>*</span>
              </div>
              <KpiDirectionSelect
                setDirection={setDirection}
                isDirector={isDirector}
              />
              <div className={styles.requiredField}>
                <h3>Категория</h3>
                <span className={styles.required_img}>*</span>
              </div>
              <KpiSemesterSelect
                id={direction}
                setSemester={setSemester}
                isDirector={isDirector}
              />
              <div className={styles.requiredField}>
                <h3>Заголовок</h3>
                <span className={styles.required_img}>*</span>
              </div>
              <TextareaAutosize
                id="text"
                name="text"
                required
                className={styles.discription_required}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Заголовок"}
              />
              <h3>Краткое описание</h3>
              <TextareaAutosize
                id="description"
                name="description"
                className={styles.discription_input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Краткое описание"
              />
              <div className={styles.requiredField}>
                <h3>Ссылка</h3>
                <span style={{ color: "orange" }}>*</span>
              </div>
              <TextareaAutosize
                id="link"
                name="link"
                className={styles.discription_required}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Ссылка"
              />
              <h3>DOI</h3>
              <TextareaAutosize
                id="DOI"
                name="DOI"
                className={styles.discription_input}
                value={doi}
                onChange={(e) => setDoi(e.target.value)}
                placeholder="DOI"
              />
              <h3>ISSN</h3>
              <TextareaAutosize
                id="ISSN"
                name="ISSN"
                className={styles.discription_input}
                value={issn}
                onChange={(e) => setIssn(e.target.value)}
                placeholder="ISSN"
              />
              <h3>ISNI</h3>
              <TextareaAutosize
                id="ISNI"
                name="ISNI"
                className={styles.discription_input}
                value={isni}
                onChange={(e) => setIsni(e.target.value)}
                placeholder="ISNI"
              />
              <h3>Wiki</h3>
              <TextareaAutosize
                id="Wiki"
                name="Wiki"
                className={styles.discription_input}
                value={wikipedia_url}
                onChange={(e) => setWiki(e.target.value)}
                placeholder="WikipediaURL"
              />
              <h3>WikiData</h3>
              <TextareaAutosize
                id="Wiki"
                name="Wiki"
                className={styles.discription_input}
                value={wikidata}
                onChange={(e) => setWikiData(e.target.value)}
                placeholder="WikiData"
              />
              <div className={styles.requiredField}>
                <h3>Страна</h3>
                <span className={styles.required_img}>*</span>
              </div>
              <Country setStateCountry={setCountry} />
              <div className={styles.requiredField}>
                <h3>Дата издания:</h3>
                <span className={styles.required_img}>*</span>
              </div>
              <input
                type="date"
                placeholder="Дата создания"
                className={styles.discription_input}
                onChange={(e) => setDateCreate(e.target.value)}
              />
              <div className={styles.requiredField}>
                <h3>Сотрудник</h3>
                <span className={styles.required_img}>*</span>
              </div>
              <EmployeeSelectAllUserId
                selectedEmployee={setSelectedEmployee}
                placehold={"Выберите издателя"}
                isMulti={true}
              />
              <div className={styles.requiredField}>
                <h3>Файл</h3>
                <span style={{ color: "orange" }}>*</span>
              </div>
              <input
                type="file"
                name="file_upload"
                accept="application/pdf"
                multiple
                onChange={onFileChange}
                className={styles.file_padding_left}
              />
            </div>
            <div className={styles.qr_footer}>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <ScaleLoader color="white" size={30} />
                </div>
              ) : (
                <Button className={styles.btn1} onClick={handleSubmit}>
                  Отправить
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default KpiForm;
