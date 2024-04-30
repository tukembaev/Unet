import { useState } from "react";
import React from "react";
import styles from "./ChangePublick.module.scss";
import { TextareaAutosize } from "@mui/material";
import {
  patchKpiInfo,
  patchKpiInfoJson,
} from "../../../../../../service/PublicationService";
import Notification from "../../../../../../utils/Notifications";
import EmployeeSelectAllUserId from "../../../../../../hooks/EmployeeSelect/EmployeeSelectAllUserId";
import { useNavigate } from "react-router-dom";
import Country from "../../../../../../utils/Country/Country";
import KpiEmployeeSelect from "../../../../../../hooks/EmployeeSelect/KpiSelect/KpiEmployeeSelect";

export default function ChangeAlerts({ data, setClose, setRender }) {
  // states
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [link, setLink] = useState(data?.link || "");
  const [doi, setDoi] = useState(data?.doi);
  const [issn, setIssn] = useState(data?.issn || "");
  const [isni, setIsni] = useState(data?.isni || "");
  const [wikipedia_url, setWiki] = useState(data?.wikipedia_url || "");
  const [wikidata, setWikiData] = useState(data?.wikidata || "");
  const [eid, setEid] = useState(data?.eid || "");
  const [country, setCountry] = useState(data?.country || "");
  const [file, setFile] = useState(data?.file || null);
  const [authors, setSelectedEmployee] = useState(data?.kpi_authors || []);
  const [selectedFiles, setSelectedFiles] = useState(data?.files || []);
  const navigate = useNavigate();
  const onFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  // other states
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // functions

  // const onFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const getUserIdArray = (data) => {
    const userIdArray = data?.map((item) => item.user_id);
    return userIdArray;
  };
  const handleSubmit = async (e, id) => {
    
    e.preventDefault();
     if(
      title.trim() === data?.title && 
      description.trim() === data?.description && 
      link.trim() === data?.link && 
      doi.trim() === data?.doi && 
      issn.trim() === data?.issn && 
      isni.trim() === data?.isni && 
      wikipedia_url.trim() === data?.wikipedia_url && 
      wikidata.trim() === data?.wikidata && 
      eid === data?.eid && 
      authors === data?.kpi_authors && 
      selectedFiles === data?.files
    ){
      
      setNotify({
        isOpen: true,
        message: " Вы не ввели никаких изменений",
        type: "warning",     sound: 'warning'
      });
    }
    else if (title === "") {
      setNotify({
        isOpen: true,
        message: " Укажите наименование",
        type: "warning",     sound: 'warning'
      });
    } 
    else if (country === "") {
      setNotify({
        isOpen: true,
        message: " Вы не выбрали страну",
        type: "warning",     sound: 'warning'
      });
    } else if (authors?.length === 0) {
      setNotify({
        isOpen: true,
        message: " Выберите автора",
        type: "warning",     sound: 'warning'
      });
    } 
    
    else {

    try {
        let kpi__authors = getUserIdArray(authors);

        let response = await patchKpiInfoJson(id, {
          title: title === "" ? data?.title : title,
          link: link === "" ? data?.link : link,
          kpi_authors:
            kpi__authors.length === 0 ? data?.kpi__authors : kpi__authors,
          issn: issn === "" ? data?.issn : issn,
          wikidata: wikidata === "" ? data?.wikidata : wikidata,
          description: description === "" ? data?.description : description,
          isni: isni === "" ? data?.isni : isni,
          wikipedia_url:
            wikipedia_url === "" ? data?.wikipedia_url : wikipedia_url,
          eid: eid === "" ? data?.eid : eid,
          country: country === "" ? data?.country : country,
          status: "Изменить",
  

        });
        if (selectedFiles) {
          const formData = new FormData();
          formData.append("status", "Изменить");
          for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files", selectedFiles[i]);
          }
          let response2 = await patchKpiInfo(response.data.id, formData);
        }



       
        setRender(true);

        setNotify({
          isOpen: true,
          message: " Успешно изменено",
           type: "success", sound : "success"
        });
        setClose(false);
        setRender(true);
        setTimeout(() => navigate(-1) , 2000)
      
   
    } catch (error) {
      
      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };
}
  return (
    <>
      <div className={styles.container__wrapper}>
        <div className={styles.change__box}>
          <div className={styles.change__item}>
            <div className={styles.requiredField}>
              <h3 className={styles.change__title}>Наименование</h3>
              <span className={styles.required_img}>*</span>
            </div>
            <TextareaAutosize
              id="text"
              name="text"
              className={styles.discription_input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Наименование"
            />
          </div>

          <div className={styles.change__item}>
            <h3 className={styles.change__title}>Краткое описание</h3>
            <TextareaAutosize
              id="description"
              name="description"
              className={styles.discription_input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Краткое описание:"
            />
          </div>

          <div className={styles.change__item}>
            <div className={styles.requiredField}>
              <h3 className={styles.change__title}>Ссылка</h3>
              <span style={{ color: "orange" }}>*</span>
            </div>
            <TextareaAutosize
              id="link"
              name="link"
              className={styles.discription_input}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Ссылка:"
            />
          </div>

          <div className={styles.change__item}>
            <h3 className={styles.change__title}>DOI</h3>
            <TextareaAutosize
              id="DOI"
              name="DOI"
              className={styles.discription_input}
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
              placeholder="DOI:"
            />
          </div>

          <div className={styles.change__item}>
            <h3 className={styles.change__title}>ISSN</h3>
            <TextareaAutosize
              id="ISSN"
              name="ISSN"
              className={styles.discription_input}
              value={issn}
              onChange={(e) => setIssn(e.target.value)}
              placeholder="ISSN:"
            />
          </div>

          <div className={styles.change__item}>
            <h3 className={styles.change__title}>ISNI</h3>
            <TextareaAutosize
              id="ISNI"
              name="ISNI"
              className={styles.discription_input}
              value={isni}
              onChange={(e) => setIsni(e.target.value)}
              placeholder="ISNI:"
            />
          </div>

          <div className={styles.change__item}>
            <h3 className={styles.change__title}>WikipediaURL</h3>
            <TextareaAutosize
              id="Wiki"
              name="Wiki"
              className={styles.discription_input}
              value={wikipedia_url}
              onChange={(e) => setWiki(e.target.value)}
              placeholder="WikipediaURL: "
            />
          </div>
          <div className={styles.change__item}>
            <h3 className={styles.change__title}>Wiki</h3>
            <TextareaAutosize
              id="Wiki"
              name="Wiki"
              className={styles.discription_input}
              value={wikidata}
              onChange={(e) => setWikiData(e.target.value)}
              placeholder="Wiki:"
            />
          </div>

          <div className={styles.change__item}>
            <div className={styles.requiredField}>
              <h3 className={styles.change__title}>Страна:</h3>
              <span className={styles.required_img}>*</span>
            </div>
            <Country title={"Страна"} setStateCountry={setCountry} />
          </div>
          <div className={styles.change__item}>
            <h3 className={styles.change__title}>Авторы</h3>
            <KpiEmployeeSelect
             selectedEmployee={setSelectedEmployee}
             isMulti={true}
            />
          </div>

          <div className={styles.change__item}>
            <div className={styles.requiredField}>
              <h3 className={styles.change__title}>Файл</h3>
              <span style={{ color: "orange" }}>*</span>
            </div>
            {data?.files !== 0 ? (
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                className={styles.publick_files}
              >
                {data?.files?.map((item) => {
                  // Extract the filename from the URL
                  const filename = decodeURIComponent(item?.file).substring(
                    item?.file.lastIndexOf("/") + 1
                  );

                  return (
                    <a
                      href={item?.file}
                      download
                      target="_blank"
                      key={data?.id}
                    >
                      {filename.split("").slice(0, 10).join("")}
                    </a>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            <input
              type="file"
              name="file_upload"
              accept="application/pdf"
              onChange={onFileChange}
              multiple
              className={styles.file_padding_left}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className={styles.publick__btn}
            onClick={() => {
      
              setClose(false);
            }}
          >
            Закрыть
          </button>
          <button
            className={styles.publick__btn}
            onClick={(e) => {
              handleSubmit(e, data.id);
            }}
          >
            Сохранить изменения
          </button>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
