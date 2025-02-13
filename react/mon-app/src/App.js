import "./App.css";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Modifier from "./Modifier";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function App() {
  const [listAdmine, setListAdmine] = useState([]);
  const [miseAjour, setMiseAjour] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newUsername, setNewUsername] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedUsername, setEditedUsername] = useState("");


  console.log("🚀 ~ App ~ listAdmine:", listAdmine)
  const getAdmine = () => {
    fetch("http://localhost:5000/get")
      .then((response) => response.json())
      .then((data) => setListAdmine(data));
  };
  const Delete = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then((data) => setMiseAjour(data));
  }
  
  const AddAdmine = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername }),
    };

    fetch("http://localhost:5000/post", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMiseAjour(data);
        setNewUsername("");
        handleClose();
      });
  };


  const Edit = (id, currentUsername) => {
    setEditingId(id); 
    setEditedUsername(currentUsername); 
    handleOpen(); 
  };

  const handleSaveEdit = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: editedUsername }),
    };

    fetch(`http://localhost:5000/put/${editingId}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setMiseAjour(data); 
        setEditingId(null); 
        setEditedUsername(""); 
        handleClose(); 
      });
  };

  useEffect(() => {
    getAdmine()
  }, [miseAjour]);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Add</Button>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editingId ? "Edit Admin" : "Add Admin"}
          </Typography>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={editingId ? editedUsername : newUsername}
            onChange={(e) => {
              editingId ? setEditedUsername(e.target.value) : setNewUsername(e.target.value);
            }}
          />
          <Button variant="contained" onClick={editingId ? handleSaveEdit : AddAdmine}>
            {editingId ? "Save Changes" : "Add"}
          </Button>
        </Box>
</Modal>
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">username</th>
            <th class="border border-gray-300 px-4 py-2">Delete</th>
            <th class="border border-gray-300 px-4 py-2">Modify</th>
          </tr>
        </thead>
        <tbody>
         {
           listAdmine.map((elmement) => {
            return (
                <tr>
                <td className="border border-gray-300 px-4 py-2">{elmement.username}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button variant="contained"
                  onClick={() => {
                    Delete(elmement.id)
                  }
                  }
                  >Delete</Button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                
                    <Modifier {...{elmement,setMiseAjour}}/>
                </td>
              </tr>
            )
             
           }
           ) 
         }
        
        </tbody>
      </table>
    </div>
  );
}

export default App;
