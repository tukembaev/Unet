import React, { useEffect } from "react";
import { getUserInfo } from "../service/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../store/slices/UserSlice";
import userInfo from "./userInfo";

const DynamicUserInfo = React.memo(({ idEmployee, getDynamic }) => {
  const user = userInfo();
  const dispatch = useDispatch();

  const getUserDynamicInfo = async () => {
    let response = await getUserInfo(
      idEmployee === undefined ? user?.userId : idEmployee
    );

    dispatch(
      setUserInfo({
        userInfo: response.data,
      })
    );
  };

  useEffect(() => {
    getUserDynamicInfo();
  }, [idEmployee, dispatch]);

  const dynamicUserInfo = useSelector((state) => state.user);

  useEffect(() => {
    getDynamic(dynamicUserInfo.userInfo);
  }, [getDynamic, dynamicUserInfo.userInfo]);

  return <></>;
});

export default DynamicUserInfo;