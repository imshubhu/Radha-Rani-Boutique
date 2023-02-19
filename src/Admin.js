import "./styles.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import Stack from "@mui/material/Stack";

export default function Admin() {
  const [isLogin, isSetLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState([]);
  const [filePreview, setFilePreview] = useState([]);
  const [data, setData] = useState([]);

  const login = () => {
    if (username === "radharani" && password === "boutique") {
      isSetLogin(true);
    }
  };

  const imageUpload = async (event) => {
    const form = new FormData();
    form.append("title", title);
    for (let i = 0; i < event.target.files.length; i++) {
      form.append("image", event.target.files[i]);
    }
    const res = await axios.post(
      "https://kurta-backend-production.up.railway.app/uploadProfilePicture",
      form
    );
    if (res.data.success) {
      setFile([]);
      setFilePreview([]);
      setTitle("");
      getData();
    }
  };

  const getData = async () => {
    const res = await axios.get(
      "https://kurta-backend-production.up.railway.app/getImages"
    );
    if (res.data.success) {
      setData(res.data.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);


  const deleteData = async (id) => {
    const res = await axios.get(
      `https://kurta-backend-production.up.railway.app/delete?id=${id}`
    );
    console.log("data", res.data);
    if (res.data.success) {
      getData();
    }
  };

  return (
    <section>
      {!isLogin && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" onClick={login}>
            Submit
          </Button>
        </Box>
      )}
      {isLogin && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <h2>Upload Image</h2>
          <TextField
            id="outlined-basic"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={imageUpload}
            />
          </Button>

          <div className="form-group multi-preview">
            {(filePreview || []).map((url) => (
              <img width={"200px"} loading="lazy" src={url} alt="..." />
            ))}
          </div>
          {/*  */}
          <h2>List Of Image Data</h2>
          <table style={{width: '100%'}}>
            <thead>
              <tr>
                <th width={"20%"}>Title</th>
                <th width={"80%"}>Image</th>
                <th width={"10%"}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((e) => (
                  <tr key={e._id}>
                    <td width={"20%"}>{e.title}</td>
                    <td width={"80%"} style={{display: 'flex'}}>
                      {" "}
                      {e.images &&
                        e.images.map((f, i) => (
                          <Stack key={i} direction="row" spacing={2}>
                            {" "}
                            <img
                              src={`https://kurta-backend-production.up.railway.app/${f.filename}`}
                              width={"100px"}
                              alt={f.filename}
                            />{" "}
                          </Stack>
                        ))}{" "}
                    </td>
                    <td width={"10%"}>
                      <Button
                        variant="contained"
                        onClick={() => deleteData(e._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Box>
      )}
    </section>
  );
}
