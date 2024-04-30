import React, { useEffect, useState } from "react";
import styles from "./OrderForm.module.scss";
import Button from "../../Button/Button";
import { createOrder, getPositionData, getTopPositionData, patchOrder } from "../../../service/OrderService";
import { postOrder, setPositionById, setTopPositionById } from "../../../store/slices/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../utils/Notifications";
import OrderSigner from "./components/OrderSigner";
import Agreement from "./components/Agreement";


import MultiFileFormData from "../../../utils/ForFileFormData/MultiFileFormData";
import { Document, Page } from "react-pdf";
import { setPatchedOrder } from "../../../store/slices/OrderSlice";
import { getEmployee } from "../../../service/TaskService";
import { setEmployee } from "../../../store/slices/TaskSlice";
import { ScaleLoader } from "react-spinners";
import { getMyMembers, getMyTeam } from "../../../service/CollectiveService";
import { setMyMembers, setMyTeam } from "../../../store/slices/CollectiveSlice";
import userInfo from "../../../utils/userInfo";



function OrderForm({ setRender , setState}) {
  //UseState
  const [id,setId] = useState('')
  const [data,setdata] = useState();

  const [order_name, setOrder_Name] = useState("");
  const [text, setText] = useState("");
   const [employee] = useState();
  const [signer ,setSigner] = useState(null)
  const [agreement_list ,setAgreement_list] = useState([])
  const [agreementOutPut ,setAgreementOutPut] = useState([])
  const [allAgreements , setAllAgreements] = useState()
  const [memberArrayOrder , setMemberArrayOrder] = useState([])
  const [file, setFile] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [order_file, setOrder_file] = useState([]);
  const [multi_File, setMulti_File] = useState([]);
  const [loader, setLoader] = useState(false);

  //Const & Lets
  const dispatch = useDispatch();


  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]))
  };
  
 
   //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

	const getData = async () => {
		try {
			let response = await getMyMembers(data);
	
			dispatch(
				setMyMembers({
					members: response.data,
			  })
			);
	
		} catch (error) {
		  
		}
	  };
	
	  useEffect(() => {
		getData();
		setRender(true)
	  }, []);
	
	const myTeam = useSelector((state) => state.collective.members);


	const dataRector = [myTeam];

  //Dispatch

 
 

  const filteredData = dataRector[0]?.filter((item) => {
    if (item.label === "Ректор" || item.label.includes('Проректор') )
      return item;
  });
  
  const user = userInfo()


  const handleSubmit = async (event) => {
    event.preventDefault();
     let addressee = signer

     if (file === '') {
      setNotify({
        isOpen: true,
        message: " Вы не выбрали файл",
        type: "warning",     sound: 'warning'
      });
     }
    else if(signer === null) {
      setNotify({
        isOpen: true,
        message: "Выберите подписующего",
        type: "warning",     sound: 'warning'
      });
     }
     else if (signer === user.userId) {
      setNotify({
        isOpen: true,
        message: " Адрессат является пользователем!",
        type: "warning",     sound: 'warning'
      });
    } 
     else
    try {
      setLoader(true);
      let response = await createOrder(file, order_file , addressee );
     


      memberArrayOrder.map((item) => delete item.id);
      let withAgreement = { ordermember: memberArrayOrder , status:response.data.status , user_id:addressee };
      let response1 = await patchOrder(response.data.id, withAgreement);


    
      
      setState(({ isPaneOpen: false } ))
      setRender(true);
    } catch (error) {
      
    
      setNotify({
        isOpen: true,
        message: "",
        type: "error",
      });
    } finally {
      setLoader(false);
    }
  };


  return (
    <div>
    <div className={styles.qr_wrapper}>
 
      <div className={styles.qr_body}>
        
        <div className={styles.qr_inputs}>
          <h2 style={{paddingBottom:'15px'}}>Проект приказа:</h2>
          <input
            type="file"
            name="file_upload"
            accept="application/pdf"
            onChange={onFileChange}
            className={styles.file_padding_left}
            // accept="image/& , .pdf"
          />
        {/* <SingleFileUpload setSingle_File = {setSingle_File} /> */}
        </div>
        {/* <div className={styles.qr_inputs}>
          <h2>Если есть, прикрипите приложение:</h2>
          <MultiFileFormData setMulti_File = {setMulti_File}/>    
          </div> */}
        <div className={styles.qr_inputs}>
          <OrderSigner text = {"Подписывает"} dataSigners = {dataRector[0]} setSigner = {setSigner}/>
        </div>
        <div className={styles.qr_inputs} >
           <Agreement setState = {setState} setRender = {setRender} dataSigners = {dataRector[0]} setMemberArrayOrder = {setMemberArrayOrder} setAgreementOutPut = {setAgreementOutPut} signer = {signer} /> 
 

        </div>
        <div className={styles.qr_footer}>
        {loader ? (
            <ScaleLoader color="white" size={30} />
          ) : (
          <Button className={styles.btn1} onClick={handleSubmit}>
            Отправить
          </Button>
          )}
        </div>
    
      </div>
      {filePreview === null ? '' :   <div className={styles.pdf_prew}>
        
        <iframe
          title="PDF Viewer"
          src={filePreview ?? []}
          className={styles.frame}
        />
      </div>}
   
      <Notification notify={notify} setNotify={setNotify} />
    </div>

    </div>
  );
}

export default OrderForm;
