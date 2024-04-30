import React, { useEffect, useState } from "react";
import styles from "./EmployeeForm.module.scss";
import Button from "../../../Button/Button";
import Notification from "../../../../utils/Notifications";
import { TextareaAutosize } from "@mui/material";
import { patchKpiInfo , postKpi} from "../../../../service/PublicationService";

import EmployeeSelectAllUserId from "../../../../hooks/EmployeeSelect/EmployeeSelectAllUserId";
import EmployeeFormCreteria from "./components/EmployeeFormCreteria";
import EmployeeFormCategory from "./components/EmployeeFormCategory";
import { Category } from "@material-ui/icons";
import { ScaleLoader } from "react-spinners";
import userInfo from "../../../../utils/userInfo";
import Country from "../../../../utils/Country/Country";
import SimpleDropdown from "../../../SimpleDropdown/SimpleDropdown";
import KpiEmployeeSelect from "../../../../hooks/EmployeeSelect/KpiSelect/KpiEmployeeSelect";
import { getCurrentDate } from "../../../../utils/todayDateForInput";

function EmployeeForm({ setRender, setState }) {
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
  const [authors, setSelectedEmployee] = useState([]);
  const [direction, setDirection] = useState("");
  const [category, setSemester] = useState("");

  const [loader, setLoader] = useState(false);
  const user = userInfo();
  
  // exrtra inputs
  const [addExtra , setAddExtra] = useState({
    Doi: false,
    Issn:false,
    Isni:false,
    Wiki:false,
    WikiData:false,
  });
  
  // extra options 
  const [options , setOptions] = useState(["DOI" , "ISSN" , "ISNI" , "WikipediaURL" , "WikiData"]);
  const [selected , setSelected] = useState("");


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
    const userIdArray = data?.map((item) => item?.value);
    return userIdArray;
  };


  const handleTilte = (e) =>{
    const maxLength = 255;
    if(e.target.value.length <= maxLength){
      setTitle(e.target.value)
    }else{
      setNotify({
        isOpen: true,
        message: "Ошибка! Максимальная  длина заголовка 255 символов",
        type: "warning",     sound: 'warning'
      });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (direction === "") {
      setNotify({
        isOpen: true,
        message: "Вы не выбрали критерий",
        type: "warning",     sound: 'warning'
      });
    } else if (category === "") {
      setNotify({
        isOpen: true,
        message: "Вы не выбрали катергорию",
        type: "warning",     sound: 'warning'
      });
    } else if (title === "") {
      setNotify({
        isOpen: true,
        message: "Вы не ввели наименование",
        type: "warning",     sound: 'warning'
      });
    } else if (country === "") {
      setNotify({
        isOpen: true,
        message: "Вы не выбрали страну",
        type: "warning",     sound: 'warning'
      });
    } else if (published === "") {
      setNotify({
        isOpen: true,
        message: "Вы не указали дату издания",
        type: "warning",     sound: 'warning'
      });
    } else if (authors?.length === 0) {
      setNotify({
        isOpen: true,
        message: "Выберите автора",
        type: "warning",     sound: 'warning'
      });
    } else if (link === "" && selectedFiles.length === 0) {
      setNotify({
        isOpen: true,
        message: "Укажите ссылку либо выберите файл",
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
          position: "Сотрудника",
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
  
  useEffect(() => {

    if(selected === "DOI"){
      setAddExtra({...addExtra , Doi:true});
      setSelected("");
    }else if(selected === "ISSN" ){
      setAddExtra({...addExtra , Issn:true});
      setSelected("");
    }else if(selected === "ISNI"){
      setAddExtra({...addExtra , Isni:true});
      setSelected("");
    }else if(selected === "WikipediaURL"){
      setAddExtra({...addExtra , Wiki:true});
      setSelected("");
    }else if(selected === "WikiData"){
      setAddExtra({...addExtra , WikiData:true});
      setSelected("");
    }
  } , [selected])

  useEffect(() => {
    setSemester("");
  }, [direction]);

  return (
    <div>
      <div className={styles.qr_wrapper}>
      <div className={styles.qr_body}>
            <div className={styles.qr_inputs}>
              <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Критерий <span className={styles.required_img}>*</span></h3>
              </div>
              <EmployeeFormCreteria
                setDirection={setDirection}
              />
              </div>
              <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Категория <span className={styles.required_img}>*</span></h3>
              </div>
              <EmployeeFormCategory
                id={direction}
                setSemester={setSemester}
              />
              </div>
              <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Наименование <span className={styles.required_img}>*</span></h3>
              </div>
              <TextareaAutosize
                id="text"
                name="text"
                required
                className={styles.discription_required}
                value={title}
                onChange={handleTilte}
                placeholder={"Наименование"}
              />
              </div>
              <div className={styles.flex__wrap}>
              <h3>Краткое описание</h3>
              <TextareaAutosize
                id="description"
                name="description"
                className={styles.discription_input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Краткое описание"
              />
              </div>
              <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Ссылка <span style={{ color: "orange" }}>*</span></h3>
              </div>
              <TextareaAutosize
                id="link"
                name="link"
                className={styles.discription_required}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Ссылка"
              />
              </div>
              {addExtra?.Doi ? (
                    <div className={styles.flex__wrap}>
                    <h3>DOI</h3>
                    <TextareaAutosize
                      id="DOI"
                      name="DOI"
                      className={styles.discription_input}
                      value={doi}
                      onChange={(e) => setDoi(e.target.value)}
                      placeholder="DOI"
                    />
                    </div>
                  ) : null}
                  {addExtra?.Issn ? (
                    <>
                    <div className={styles.flex__wrap}>
                    <h3>ISSN</h3>
                  <TextareaAutosize
                    id="ISSN"
                    name="ISSN"
                    className={styles.discription_input}
                    value={issn}
                    onChange={(e) => setIssn(e.target.value)}
                    placeholder="ISSN"
                  />
              </div>
                    </>
                  ) : null}
                   {addExtra?.Isni ? (
                    <>
                      <div className={styles.flex__wrap}>
                      <h3>ISNI</h3>
                      <TextareaAutosize
                        id="ISNI"
                        name="ISNI"
                        className={styles.discription_input}
                        value={isni}
                        onChange={(e) => setIsni(e.target.value)}
                        placeholder="ISNI"
                      />
              </div>
                    </>
                  ) : null}
                   {addExtra?.Wiki ? (
                    <>
                       <div cl assName={styles.flex__wrap}>
                       <h3>Wiki</h3>
                  <TextareaAutosize
                    id="Wiki"
                    name="Wiki"
                    className={styles.discription_input}
                    value={wikipedia_url}
                    onChange={(e) => setWiki(e.target.value)}
                    placeholder="WikipediaURL"
                  />
              </div>

                    </>
                  ) : null}
                   {addExtra?.WikiData ? (
                    <>
                    <div className={styles.flex__wrap}>
                    <h3>WikiData</h3>
                  <TextareaAutosize
                    id="Wiki"
                    name="Wiki"
                    className={styles.discription_input}
                    value={wikidata}
                    onChange={(e) => setWikiData(e.target.value)}
                    placeholder="WikiData"
                  />
              </div>
                    </>
                  ) : null}
                     <div className={styles.flex__wrap}>
                     <h3>Дополнительные поля</h3>
                    <SimpleDropdown selected={selected} setSelected={setSelected} title={" Выберите дополнительные поля"} options={options}/>
              </div>
              <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Страна <span className={styles.required_img}>*</span></h3>
              </div>
              <Country title={"Страна"} setStateCountry={setCountry} />
              </div>

              <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Дата издания <span className={styles.required_img}>*</span></h3>
              </div>
              <input
                type="date"
                placeholder="Дата создания"
                className={styles.discription_input}
                onChange={(e) => setDateCreate(e.target.value)}
                max={getCurrentDate()}
                maxLength={10}
              />
              </div>

              <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Авторы  <span className={styles.required_img}>*</span></h3>
              </div>
              <KpiEmployeeSelect
                   selectedEmployee={setSelectedEmployee}
                   isMulti={true}
                  />
              </div>

              <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Файл   <span style={{ color: "orange" }}>*</span></h3>
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
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default EmployeeForm;
