import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Modifier({ elmement, setMiseAjour }) {
  const [open2, setOpen2] = useState(false);
  const [admineAmodifier, setAdmineAmodifier] = useState(elmement?.username);

  const handleOpen = () => setOpen2(true);
  const handleClose = () => setOpen2(false);
  const ModifierAdmine = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: admineAmodifier }),
    };
    fetch(`http://localhost:5000/put/${elmement?.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMiseAjour(data);
        setOpen2(false);
      });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Modify
      </Button>
      <Modal
        open={open2}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            modifer
          </Typography>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={admineAmodifier}
            onChange={(e) => {
              setAdmineAmodifier(e.target.value);
            }}
          />
          <Button variant="contained" onClick={ModifierAdmine}>
            modifer
          </Button>
        </Box>
      </Modal>
    </>
  );
}
