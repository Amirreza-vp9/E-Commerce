import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
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

const adminSignup = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<USER_INFO>({ name: "", phone: "" });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (userInfo: USER_INFO) => {
      return await axios.post("http://localhost:4313/admin/create", userInfo);
    },
    onSuccess: (res) => {
      console.log(res);
      setOpen(false);
      setCookie("ut", res.data.token, {});
      // router.push('/adminPanel')
    },
    onError: () => {
      setOpen(true);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutation.mutate(userInfo);
  };

  return (
    <>
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            this admin already exists
          </Alert>
        </Snackbar>
      )}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Signup
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
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
                type="text"
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
        </Container>
      </ThemeProvider>
    </>
  );
};

export default adminSignup;
