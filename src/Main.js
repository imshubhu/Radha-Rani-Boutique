import "./styles.css";
import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Container from "@mui/material/Container";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Modal from "@mui/material/Modal";

const style = {
  height: '80vh',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function Main() {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState([]);
  const handleOpen = (e) => {
    setShowPreview(e);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setShowPreview([]);
  };

  const getData = async () => {
    const res = await axios.get(
      "https://kurta-backend-production.up.railway.app/getImages"
    );
    console.log("res", res.data);
    if (res.data.success) {
      setData(res.data.data);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <img src="/zyanna.jpg" alt="logo" width="100px"/>
        <h1>Radha-Rani Boutique</h1>
      </div>
      <Box sx={{ width: "auto", height: "auto" }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {data &&
            data.map((item) => (
              <ImageListItem key={item._id}>
                <img
                  src={`https://kurta-backend-production.up.railway.app/${item.images[0].filename}`}
                  srcSet={`https://kurta-backend-production.up.railway.app/${item.images[0].filename}`}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => handleOpen(item.images)}
                />
                {/* <ImageListItemBar
                    title={item.title}
                    subtitle={item.author}

                  /> */}
              </ImageListItem>
            ))}
        </ImageList>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Carousel dynamicHeight={true} style={{height: '80vh'}}>
            {showPreview &&
              showPreview.map((e, i) => (
                <div key={i}>
                  <img
                    loading="lazy"
                    src={`https://kurta-backend-production.up.railway.app/${e.filename}`}
                    alt={e.filename}
                  />
                </div>
              ))}
          </Carousel>
        </Box>
      </Modal>
    </Container>
  );
}
