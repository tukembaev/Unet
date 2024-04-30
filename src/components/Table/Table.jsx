import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getQr} from "./../../service/QrService"
import {setQr} from "./../../store/slices/QrSlice"
function Table({ head, listItem }) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      let response = await getQr(data);
      dispatch(
        setQr({
          qrs: response.data,
        })
      );

   
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const qr = useSelector((state) => state.qr.qrs);
 
  return (
    <table className={styles.wrapper}>
      <thead>
        <tr>
          {head.map((item) => {
            return <th>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {qr.map((item) => {
          return (
            <tr className={styles.row} onClick={()=>navigate(`/qrcode/${item.id}/`)}>
              <td>{item.korpus}</td>
              <td>{item.num_audit}</td>
              <td>{item.nameRU}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
