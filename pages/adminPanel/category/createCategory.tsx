import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../redux/ecommerceSlicer";
import { getCookie } from "cookies-next";
import { Typography } from "@mui/material";
import CategoryForm from "../../../components/forms/categoryForm";
import Box from "@mui/material/Box";

interface INFO {
  id: string;
  name: string;
  variables: {
    cpu: {
      type: string; // select
      options: []; // only if it is select
    };
    moreInfo: {
      type: string; // text
    };
    ports: {
      type: string; // multiselect
      options: string[]; // ['usb', 'hdmi', 'wifi']
    };
  };
}

const CreateCategory = () => {
  const dispatch = useDispatch();
  const token = getCookie("ut");
  const [name, setName] = useState<string>("");
  const [info, setInfo] = useState<INFO>({
    id: "",
    name: "",
    variables: {
      cpu: {
        type: "",
        options: [],
      },
      moreInfo: {
        type: "",
      },
      ports: {
        type: "",
        options: [],
      },
    },
  });
  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  };
  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.post(
        "http://localhost:4313/category/create",
        info,
        customConfig
      );
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <CategoryForm />
    </Box>
  );
};

export default CreateCategory;
