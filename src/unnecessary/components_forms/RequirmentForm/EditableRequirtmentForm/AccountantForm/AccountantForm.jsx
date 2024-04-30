import React from "react";
import { useState } from "react";
import Button from "../../../../../../Button/Button";
import styles from "./../../RequirmentForm.module.scss";
import { Fragment } from "react";
import { createRequirement } from "../../../../../../../service/StatementsService";
import { useDispatch } from "react-redux";
import { postRequirment } from "../../../../../../../store/slices/StatementsSlice";
import RequirmentRowEditable from "../../RequirmentRow/RequirmentRowEditable";
import AccountantReqEdit from "./AccountantReqEdit";

const AccountantForm = ({plp, setChangeList}) => {
  const [requirmentList, setRequirmentList] = useState(plp);
  const dispatch = useDispatch();
  const [editFormData, setEditFormData] = useState({
    
    sub_account: "",
    analytical: "",
    name_grade_size_brand : "",
    nomenclature_number: "",
    code: "",
    name: "",
    requested: "",
    released: "",
 
 
  });

  const [editRequirmentId, setEditRequirmentId] = useState(null);
  setChangeList(requirmentList);

  const handleEditClick = (event, requirment) => {
    
    event.preventDefault();

    setEditRequirmentId(requirment.id);
 
    const formValues = {
      id: requirment.id,
      sub_account : requirment.sub_account ,
      analytical: requirment.analytical,
      name_grade_size_brand: requirment.name_grade_size_brand 
,
      nomenclature_number: requirment.nomenclature_number,
      code: requirment.code,
      name: requirment.name,
      requested: requirment.requested,
      released: requirment.released,
      price:requirment.price,
      ordinal:requirment.ordinal,
      number_record_warehouse_file:requirment.number_record_warehouse_file
   
    };

    setEditFormData(formValues);
    
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    
    
    const editedRequirment = {
      ...editFormData,
    };

    const newList = [...requirmentList ];
   
    const index = requirmentList.findIndex(
      (item) => item.id === editRequirmentId
    );

    newList[index] = editedRequirment;
    setRequirmentList(newList);
    setChangeList(newList)
   
    setEditRequirmentId(null);
  };

  const handleCancelClick = () => {
    setEditRequirmentId(null);
  };

  const handleConfirmClick = () => {
    const requirData = {
      purchaselistproducts: requirmentList,
    };
  };

  const handleSubmit = async (event) => { 
    event.preventDefault();
    try {
      let response = await createRequirement( {
        purchaselistproducts: requirmentList
      }   
      );
      dispatch(
        postRequirment({
      purchaselistproducts: requirmentList,
        })
      );
  
  
     
    } catch (error) {
      
    }
  };

  return (
      <div>
        <table className={styles.requirment__table}>
          <thead>
            <tr>
              <th colSpan={2}>Корреспондирущий счет</th>
              <th colSpan={2}>Материальные ценности</th>
              <th colSpan={2}>Единица измерения</th>
              <th colSpan={2}>Количество</th>
              <th rowSpan={2}>Цена</th>
              <th rowSpan={2}>Сумма</th>
              <th rowSpan={2}>
                Порядковый номер записи по складской картотеке
              </th>
              <th className={styles.del} rowSpan={2} colSpan={2}></th>
            </tr>
            <tr>
              <th>Счет, суб-счет</th>
              <th>Код аналитического учета</th>
              <th>Наименование,сорт, размер, марка</th>
              <th>Код (номенклатурный номер)</th>
              <th>Код</th>
              <th>Наименование</th>
              <th>Затребовано</th>
              <th>Отпущено</th>
            </tr>
          </thead>
          <tbody>
            {requirmentList.map((item) => (
              <Fragment>
                {editRequirmentId === item.id ? (
                  <AccountantReqEdit
                  editFormData={editFormData}
                  setEditFormData={setEditFormData}
                  handleEditFormSubmit={handleEditFormSubmit}
                  handleCancelClick={handleCancelClick}
                />
                ) : (
                  <RequirmentRowEditable
                    requirmentItem={item}
                    handleEditClick={handleEditClick}
                    isDelete = {false}
                    
                 
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      
      </div>
  );
};
export default AccountantForm;
