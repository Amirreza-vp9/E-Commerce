import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface PROPS {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}

export default function CustomizedSnackbars({ open, setOpen, text }: PROPS) {
  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const vertical = "top";
  const horizontal = "left";

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1700}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
