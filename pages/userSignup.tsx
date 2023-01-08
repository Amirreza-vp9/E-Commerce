import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Snackbar, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { setCookie } from "cookies-next";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface USER_INFO {
  phone: string;
  name: string;
}

interface VALIDATION_INFO {
  phone: string;
  code: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  textAlign: "center",
};

const userSignup = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openValidationError, setOpenValidationError] =
    useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [validationInfo, setValidationInfo] = useState<VALIDATION_INFO>({
    code: "",
    phone: "",
  });
  const keyArray: number[] = [1, 2, 3, 4];
  const inputRef: any = useRef([]);
  const [userInfo, setUserInfo] = useState<USER_INFO>({ name: "", phone: "" });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (userInfo: USER_INFO) => {
      return await axios.post(
        "http://localhost:4313/user/sign-up-one",
        userInfo
      );
    },
    onSuccess: (res) => {
      console.log(res);
      setOpen(false);
      setValidationInfo({ ...validationInfo, phone: userInfo.phone });
    },
    onError: () => {
      setOpen(true);
    },
  });
  const valiadtion = useMutation({
    mutationFn: async (validationInfo: VALIDATION_INFO) => {
      return await axios.post(
        "http://localhost:4313/user/sign-up-two",
        validationInfo
      );
    },
    onSuccess: (res) => {
      console.log(res);
      setCookie("ut", res.data.token, {});
      router.push("/");
    },
    onError: () => {
      setOpenValidationError(true);
      setValidationInfo({
        ...validationInfo,
        code: "",
      });
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseValidationError = () => {
    setOpenValidationError(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutation.mutate(userInfo);
  };

  useEffect(() => {
    if (mutation.data) {
      setOpenModal(true);
    }
  }, [mutation]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onKeyPress = (e: any, i: number) => {
    if (i < 3 && e.key !== "Backspace") return inputRef.current[i + 1].focus();
    if (e.key === "Backspace" && 0 < i) return inputRef.current[i - 1].focus();
    if (validationInfo.code.length === 4)
      return valiadtion.mutate(validationInfo);
  };

  return (
    <>
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            this user already exists
          </Alert>
        </Snackbar>
      )}
      {openValidationError && (
        <Snackbar
          open={openValidationError}
          autoHideDuration={6000}
          onClose={handleCloseValidationError}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            validation code is wrong
          </Alert>
        </Snackbar>
      )}
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(../images/login.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoFocus
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Name"
                  type="name"
                  id="name"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Modal
          hideBackdrop
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <Box sx={{ display: "flex", gap: ".25em" }}>
              {keyArray.map((_, i) => {
                return (
                  <TextField
                    variant="standard"
                    key={i}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                      onKeyUp: (e) => onKeyPress(e, i),
                    }}
                    inputRef={(ref) => (inputRef.current[i] = ref)}
                    onChange={(e) => {
                      setValidationInfo({
                        ...validationInfo,
                        code: validationInfo.code + e.target.value,
                      });
                    }}
                  ></TextField>
                );
              })}
            </Box>
            <Typography color="primary" sx={{ mt: 2 }}>
              Enter the code that we have sent to your phone number
            </Typography>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default userSignup;
