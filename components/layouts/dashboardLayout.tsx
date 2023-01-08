import React, { useEffect } from "react";
import store from "../../redux/store";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/ecommerceSlicer";
import { getCookie } from "cookies-next";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const DashboardLayout = ({ children }: any) => {
  const dispatch = useDispatch();
  const token = getCookie("ut");

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.post(
        "http://localhost:4313/user/me",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            auth: `ut ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      dispatch(setCurrentUser(res.data));
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <>
      <Provider store={store}>
        <main>{children}</main>
      </Provider>
    </>
  );
};

export default DashboardLayout;
