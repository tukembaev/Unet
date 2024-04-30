import React, { useEffect, useState } from "react";
import styles from "./FlowPage.module.scss";
import { Button, Layout } from "../../components";
import Notification from "../../utils/Notifications";
import { useDispatch, useSelector } from "react-redux";
import SlidingPaneUtil from "../../utils/SlidingPaneUtil";
import FlowForm from "../../components/Forms/FlowForm/FlowForm";
import { getFlows, getFlowsShedules } from "../../service/FlowService";
import { setFlows, setFlowsShedules } from "../../store/slices/FlowSlice";
import FlowPageTable from "./components/FlowPageTable/FlowPageTable";
import userInfo from "../../utils/userInfo";
import FlowPageInfo from "./components/FlowPageInfo";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
const FlowPage = () => {
  const user = userInfo();
  const [id, setId] = useState(null);
  const [openModal2, setOpenModal2] = useState({
    isOpen: false,
    subjectStreams: "",
  });

  const data = [];
  const [render, setRender] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      let response = await getFlows(data);

      dispatch(
        setFlows({
          allFlows: response.data,
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [render]);

  const myFlows = useSelector((state) => state.flow.allFlows);

  return (
    <Layout>
      {id === null ? (
        <div className={styles.wrapper}>
          <div className={styles.titile__wrapper}>
            <div className={styles.title}>Потоки</div>

            <div>
              <Button
                className="create__statement__btn"
                onClick={() => setState({ isPaneOpen: true })}
              >
                Создать поток
              </Button>
            </div>
          </div>

          <div style={{ padding: "0 15px 0 0" }}>
            <FlowPageTable
              data={myFlows}
              setId={setId}
              setOpenModal2={setOpenModal2}
            />
          </div>
          {width > 1000 ? (
            <>
              {/* <SlidingPaneUtil
                size="900px"
                title="Новый поток"
                state={state}
                setState={setState}
                onRequestClose={() => {

                  setState({ isPaneOpen: false });
                }}
              >
                {" "}
                <FlowForm setState={setState} setRender={setRender} />
       
              </SlidingPaneUtil> */}
              <BottomSheet
                title={"Новый поток"}
                isOpen={state.isPaneOpen}
                onClose={setState}
              >
                <FlowForm setState={setState} setRender={setRender} />
              </BottomSheet>
            </>
          ) : (
            <>
              <SlidingPaneUtil
                size="100%"
                title="Новый поток"
                state={state}
                setState={setState}
                onRequestClose={() => {
                  setState({ isPaneOpen: false });
                }}
              >
                {" "}
                <FlowForm setState={setState} setRender={setRender} />
              </SlidingPaneUtil>
            </>
          )}
        </div>
      ) : (
        <FlowPageInfo setId={setId} sheduleId={id} />
      )}

      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
};

export default FlowPage;
