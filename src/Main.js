import "./styles.css";
import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Container from "@mui/material/Container";
import axios from "axios";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
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
    <>
    <div style={{background: '#FFEBCD'}}>      
      <div style={{ display: "flex", justifyContent: 'space-between', background: '#e6e5ff' }}>
        <img src="/zyanna.jpg" alt="logo" width="100px"/>
        <h1>Zyanna</h1>
        <span></span>
      </div>
      <Container >
      <Box sx={{ width: "auto", height: "auto" }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {data &&
            data.map((item) => (
              <ImageListItem key={item._id}>
              {
                item.images.length > 0 && 
                <img
                  src={`https://kurta-backend-production.up.railway.app/${item.images[0].filename}`}
                  srcSet={`https://kurta-backend-production.up.railway.app/${item.images[0].filename}`}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => handleOpen(item.images)}
                />
              }
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
    </div>
    <footer style={{background: '#000', color: '#fff'}}>
        <Box py={6} display="flex" flexWrap="wrap" alignItems="center" style={{margin: '0 30px', justifyContent: 'space-between'}}>
          <img src="/zyanna.jpg" alt="logo" width="100px"/>
          <div>
            <h4>CONTACT US</h4>
            <p>9974446247</p>
            <p>9574991916</p>
            <p>chirenb@gmail.com</p>
            <p>UG-145, Vikaram Nagar Soc., Opp. Trikam Nagar-2, Above Radharani Boutique, Nr. Bombay Market, L.H. Road, Surat.</p>
          </div>
          <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false} style={{color: '#fff'}}>© 2023 Zyanna All rights reserved.</Typography>
        </Box>
    </footer>
    </>
  );
}
