import React, { useState, useEffect } from "react";
//import CryptoJS from "crypto-js";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Carousel from "react-bootstrap/Carousel";
import { Image } from "antd";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import { Progress } from "antd";
import { useNavigate } from "react-router-dom";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { auth } from "./Login_reg/Fire";
import TextField from "@mui/material/TextField";
import { Cascader } from "antd";
//key 1 the class
//key 2 is on /off the arduino py code
//key3 count of the data
function Gescoustom() {
  const navigate = useNavigate();

  const alphab = [];

// ASCII code for 'A' is 65 and for 'Z' is 90
for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i);
  alphab.push({
    code: letter,
    name: letter,
  });
}

const specialCharacters = ['+', '-', '*', '->', '<-', '/', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'uparr', 'downarr','`','esc'];

specialCharacters.forEach(char => {
  alphab.push({
    code: char,
    name: char,
  });
});
  const command = [
    {
        value: "NONE",
        label: "NONE",
      },
    {
      value: "Ctrl",
      label: "Ctrl",
    },
    {
      value: "Fn",
      label: "Fn",
    },
    {
      value: "Win",
      label: "Win",
    },
    {
      value: "alt",
      label: "alt",
    },

  ];

  const options = [
    {
      value: "Switch",
      label: "Switch desktops",
    },
    {
      value: "Mute",
      label: "Mute the sound",
    },
    {
      value: "sdown",
      label: "Scroll down",
    },
    {
      value: "sup",
      label: "Scroll up",
    },
    {
      value: "rclick",
      label: "Right click",
    },
  ];



  
const optionssec = [
  {
    code: "NONE",
    name: "NONE",
  },

  {
    code: "Ctrl",
    name: "Ctrl",
    items: [
      {
        code: "NONE",
        name: "NONE",
        items: alphab,
      },
      {
        code: "Ctrl",
        name: "Ctrl",
        items: alphab,
      },
      {
        code: "Fn",
        name: "Fn",
        items: alphab,
      },
      {
        code: "Win",
        name: "Win",
        items: alphab,
      },
      {
        code: "alt",
        name: "alt",
        items: alphab,
      },
    ],
  },

  {
    code: "Fn",
    name: "Fn",
    items: [
      {
        code: "NONE",
        name: "NONE",
        items: alphab,
      },
      {
        code: "Ctrl",
        name: "Ctrl",
        items: alphab,
      },
      {
        code: "Fn",
        name: "Fn",
        items: alphab,
      },
      {
        code: "Win",
        name: "Win",
        items: alphab,
      },
      {
        code: "alt",
        name: "alt",
        items: alphab,
      },
    ],
  },
  {
    code: "Win",
    name: "Win",
    items: [
      {
        code: "NONE",
        name: "NONE",
        items: alphab,
      },
      {
        code: "Ctrl",
        name: "Ctrl",
        items: alphab,
      },
      {
        code: "Fn",
        name: "Fn",
        items: alphab,
      },
      {
        code: "Win",
        name: "Win",
        items: alphab,
      },
      {
        code: "alt",
        name: "alt",
        items: alphab,
      },
    ],
  },
  {
    code: "alt",
    name: "alt",
    items: [
      {
        code: "NONE",
        name: "NONE",
        items: alphab,
      },
      {
        code: "Ctrl",
        name: "Ctrl",
        items: alphab,
      },
      {
        code: "Fn",
        name: "Fn",
        items: alphab,
      },
      {
        code: "Win",
        name: "Win",
        items: alphab,
      },
      {
        code: "alt",
        name: "alt",
        items: alphab,
      },
    ],
  },
];
  const onChange = (value,aa) => {
    console.log(value+"adf"+aa);
    const firebaseUrl =
    "https://btpf-fdea3-default-rtdb.asia-southeast1.firebasedatabase.app/";

    const data = {};
    data[aa] = value;

  try {
     fetch(`${firebaseUrl}/${sessionStorage.getItem("token")}/gestures.json`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    console.log("Data successfully sent to Firebase.");

    // Start checking for changes
    // checkForChanges();
  } catch (error) {
    console.error("Error sending data to Firebase:", error);
  }
  
  };
  // const [tokenPresent, setTokenPresent] = useState(true);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");

  //   if (!token) {
  //     // Redirect to login if token is not present
  //     navigate('/login');
  //     setTokenPresent(false);
  //   }
  // }, [navigate]);

  useEffect(() => {
    // Get the UID from sessionStorage
    const storedUID = sessionStorage.getItem("token");

    // Check if there's a user currently signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        if (user.uid === storedUID) {
          // The stored UID matches the current user's UID
          console.log("User exists");
        } else {
          // UID mismatch - User does not match the stored UID
          console.log("User does not exist");
          navigate("/login");
        }
      } else {
        // No user is signed in
        console.log("No user signed in");
        navigate("/login");
      }
    });

    return () => {
      // Unsubscribe the auth listener to avoid memory leaks
      unsubscribe();
    };
  }, []);

  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
  // const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const [isActive, isa] = useState(0);

  const sendDataToFirebase = (input, val) => async (e) => {
     e.preventDefault();
console.log("hi")
    const firebaseUrl =
      "https://btpf-fdea3-default-rtdb.asia-southeast1.firebasedatabase.app/";

      const data = {};
      data[input] = "val";

    try {
      await fetch(`${firebaseUrl}/${sessionStorage.getItem("token")}/gestures.json`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      console.log("Data successfully sent to Firebase.");

      // Start checking for changes
      // checkForChanges();
    } catch (error) {
      console.error("Error sending data to Firebase:", error);
    }
  };

  const [st, setst] = useState();
  const [ston, setstom] = useState();


  return (
    <div className="das">
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <div>
            <AppBar
              position="static"
              style={{
                backgroundColor: isHover
                  ? "rgba(159, 90, 253, 0.25)"
                  : "rgba(159, 90, 253, 0)",
              }}
              sx={{
                position: "absolute",
                zindex: 1,
                borderRadius: 5,

                top: 0,
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <h className="bodyhead" style={{ color: "red" }}>
                    Hand gesture recognition
                  </h>
                </Typography>
                <Button color="inherit" variant="outlined" onClick={()=>{navigate('/Login/Dashbord')}}>
                  <h className="bodyhead">Back</h>
                </Button>
              
                <div style={{ marginLeft: 10 }}></div>
                <div className="vl"></div>
                <div style={{ marginLeft: 10 }}></div>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  <h className="bodyhead">Logout</h>
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </Box>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-7">
            <Box
              sx={{
                height: 550,
                //  margin: 4.5,
                //  marginLeft: 2,
                borderRadius: 5,
                border: "red",
                backgroundColor: "rgba(0,0,0,0.3)",
                opacity: 0.95,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0,0.6)",
                  opacity: 0.99,
                  boxShadow: "2px 3px 10px #F4AAB9",
                },
              }}
            >
              <div class="col-sm-15 text-white" style={{ borderRadius: 10 }}>
                <center>
                  <h5 className="cursivefont ">Gesture Samples</h5>
                  <Carousel activeIndex={index} onSelect={handleSelect} fade>
                    <Carousel.Item>
                      <h5>closed Fist </h5>
                      <Image
                        width={590}
                        height={450}
                        src="https://cdn.pixabay.com/photo/2017/09/01/11/56/hand-2704013_1280.jpg"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <h5>Wrist elongation</h5>
                      <Image
                        width={590}
                        height={450}
                        src="https://assets-global.website-files.com/647888ca92d03e3fca3f1e9b/647888ca92d03e3fca3f2188_stretch%205.png"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <h5>Wrist flexion</h5>
                      <Image
                        width={590}
                        height={450}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1NdETUkHnlD3U15rM265PEh7PT_HT_ui-T-UPdoo2jDt9xccowf6xCXMeTqoxPe2Wto&usqp=CAU"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <h5>Free hand</h5>
                      <Image
                        width={590}
                        height={450}
                        src="https://st2.depositphotos.com/10614052/49034/i/450/depositphotos_490349742-stock-photo-male-hand-white-background.jpg"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <h5>Rock first hand gesture</h5>
                      <Image
                        width={590}
                        height={450}
                        src="https://c8.alamy.com/comp/2D3FCY5/male-hand-on-a-black-background-two-fingers-pointing-and-little-finger-raised-up-goat-gesture-2D3FCY5.jpg"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <h5> hand gesture finger tap</h5>
                      <Image
                        width={590}
                        height={450}
                        src="https://ilglobo.com/media/listing_images/2019/11/13/hand_gestures_2_pexels.jpeg"
                      />
                    </Carousel.Item>
                  </Carousel>
                </center>
              </div>
            </Box>
          </div>
          <div class="col-sm-5">
            <Box
              sx={{
                height: 550,
                //  margin: 4.5,
                //  marginLeft: 2,
                borderRadius: 5,
                border: "red",
                backgroundColor: "white",
                opacity: 0.55,
                "&:hover": {
                  backgroundColor: "white",
                  opacity: 0.89,
                },
              }}
            >
              <div>
                <br></br>
                <center>
                  <h className="cursivefont ">
                    Select the commands for the gestures
                  </h>
                </center>
                <br></br>
                <div style={{ marginLeft: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>

                    <h className="cursivefont " style={{ fontWeight: "bold" }}>
                      Closed Fist{" "}
                    </h>{" "}
                    <Cascader
                      style={{ marginLeft: 140 }}
                      options={options}
                      onChange={(value)=>{onChange(value,0)}}
                      placement="bottomRight"
                      defaultValue={['NONE']}
                      placeholder="Please select"
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>

                    <h className="cursivefont " style={{ fontWeight: "bold" }}>
                      Wrist elongation{" "}
                    </h>
                    <Cascader
                      style={{ marginLeft: 100 }}
                      options={options}
                      onChange={(value)=>{onChange(value,1)}}
                      defaultValue={['NONE']}
                      placement="bottomRight"
                      placeholder="Please select"
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>

                    <h className="cursivefont " style={{ fontWeight: "bold" }}>
                      Wrist flexion{" "}
                    </h>
                    <Cascader
                      style={{ marginLeft: 125 }}
                      options={options}
                      onChange={(value)=>{onChange(value,2)}}
                      defaultValue={['NONE']}
                      placement="bottomRight"
                      placeholder="Please select"
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>

                    <h className="cursivefont " style={{ fontWeight: "bold" }}>
                      Rock first hand gesture{" "}
                    </h>
                    <Cascader
                      style={{ marginLeft: 40 }}
                      options={options}
                      defaultValue={['NONE']}
                      onChange={(value)=>{onChange(value,3)}}
                      placement="bottomRight"
                      placeholder="Please select"
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>

                    <h className="cursivefont " style={{ fontWeight: "bold" }}>
                      Hand gesture finger tap{" "}
                    </h>
                    <Cascader
                      style={{ marginLeft: 40 }}
                      options={options}
                      defaultValue={['NONE']}
                      onChange={(value)=>{onChange(value,4)}}
                      placement="bottomRight"
                      placeholder="Please select"
                    />
                  </div>
                  <br></br>
                  <br></br>
                  <div style={{ display: "flex", alignItems: "center" }}>
                  <h className="cursivefont " style={{ fontWeight: "bold" }}>
                      Coustom gesture 1{" "}
                    </h>
                   <Cascader
                      style={{ marginLeft: 20 }}
                      fieldNames={{
                        label: "name",
                        value: "code",
                        children: "items",
                      }}
                      defaultValue={['NONE']}
                      options={optionssec}
                      onChange={(value)=>{onChange(value,5)}}
                      // placement="bottomRight"
                      placeholder="Please select"
                    />
                  </div>
                  <br></br>
                  <div style={{ display: "flex", alignItems: "center" }}>
                  <h className="cursivefont " style={{ fontWeight: "bold" }}>
                      Coustom gesture 2{" "}
                    </h>
                       <Cascader
                        defaultValue={['NONE']}
                      style={{ marginLeft: 20 }}
                      fieldNames={{
                        label: "name",
                        value: "code",
                        children: "items",
                      }}
                      options={optionssec}
                      onChange={(value)=>{onChange(value,6)}}
                      // placement="bottomRight"
                      placeholder="Please select"
                    />
                  </div>
                  <br></br>
                  <div style={{ display: "flex", alignItems: "center" }}>
                  <h className="cursivefont " style={{ fontWeight: "bold" }}>
                      Coustom gesture 3{" "}
                    </h>
                    <Cascader
                     defaultValue={['NONE']}
                      style={{ marginLeft: 20 }}
                      fieldNames={{
                        label: "name",
                        value: "code",
                        children: "items",
                      }}
                      options={optionssec}
                      onChange={(value)=>{onChange(value,7)}}
                      // placement="bottomRight"
                      placeholder="Please select"
                    />
      
                  </div>
                  <br></br>
                  <div style={{ display: "flex", alignItems: "center" }}>
                  <h className="cursivefont " style={{ fontWeight: "bold" }}>
                      Coustom gesture 4{" "}
                    </h>
                    <Cascader
                     defaultValue={['NONE']}
                      style={{ marginLeft: 20 }}
                      fieldNames={{
                        label: "name",
                        value: "code",
                        children: "items",
                      }}
                      options={optionssec}
                      onChange={(value)=>{onChange(value,8)}}
                      // placement="bottomRight"
                      placeholder="Please select"
                    />
      
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gescoustom;
