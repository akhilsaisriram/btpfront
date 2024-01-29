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
import TextField from "@mui/material/TextField";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Progress } from "antd";
import "./noun-steps-79241.png";
import Table from "react-bootstrap/Table";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import StraightenIcon from "@mui/icons-material/Straighten";
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import { auth, firebase } from "./Login_reg/Fire";

function Analasis() {
  const [showProgress, setShowProgress] = useState(true);

  const navigate = useNavigate();
    
  const [tokenPresent, setTokenPresent] = useState(true);

  const checkUidValidity = async () => {
    try {
      // Fetch user data based on the UID
      const userRecord = await auth.getUser(sessionStorage.getItem("token"));

      if (userRecord) {
     
        console.log('User exists');
      } else {
        console.log('User does not exist');
      }
    } catch (error) {
      console.error('Error checking UID validity:', error);
    }
  };

  // useEffect(() => {
  //   // const token = sessionStorage.getItem("token");

  //   // if (!token) {
  //   //   // Redirect to login if token is not present
  //   //   navigate('/login');
  //   //   setTokenPresent(false);
  //   // }
  //   checkUidValidity();

  // }, [navigate]);
  const [userExists, setUserExists] = useState(null);

  useEffect(() => {
    // Get the UID from sessionStorage
    const storedUID = sessionStorage.getItem('token');

    // Check if there's a user currently signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        if (user.uid === storedUID) {
          // The stored UID matches the current user's UID
          setUserExists(true);
          console.log('User exists');
        } else {
          // UID mismatch - User does not match the stored UID
          setUserExists(false);
          console.log('User does not exist');
          navigate('/login');
        }
      } else {
        // No user is signed in
        setUserExists(false);
        console.log('No user signed in');
        navigate('/login');
      }
    });

    return () => {
      // Unsubscribe the auth listener to avoid memory leaks
      unsubscribe();
    };
  }, []);
  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
  const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };
  const [isHover, setIsHover] = useState(false);

  const [countstep, setcountst] = useState(0);
  const [dist, setdist] = useState(0);
  const [cal, setcal] = useState(0);
  const [wt, setwt] = useState(75);
  const [ht, setht] = useState(5.5);
  const [step, setstp] = useState(6000);
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const calculateDistanceAndCalories = () => {
    // Convert height from feet to meters
    const heightInMeters = parseFloat(ht) * 0.3048; // 1 foot = 0.3048 meters

    // Calculate stride length (average stride length)
    const strideLength = heightInMeters * 0.415; // Average stride length formula

    // Calculate distance covered from step count
    const distance = parseFloat(step) * strideLength;
    setDistanceCovered(distance.toFixed(2)); // Set distance covered with 2 decimal places

    // Calculate calories burned based on distance covered (assumed walking with a MET value of 3.5)
    const MET = 3.5;
    const weightInKg = parseFloat(wt);

    // Convert distance from meters to kilometers for MET calculation
    const distanceInKm = distance / 1000; // 1 kilometer = 1000 meters

    // Calculate calories burned using MET formula
    const calories = MET * weightInKg * distanceInKm;

    const caloriesPerStep = 0.04; // Calories burned per step
    const stepsPerMinute = step / (time * 60); // Calculate steps per minute
    const caloriesBurned = stepsPerMinute * caloriesPerStep * time * 60;

    setCaloriesBurned(500); // Set calories burned with 2 decimal places
  };

  useEffect(() => {
    calculateDistanceAndCalories();
  }, [step, wt, ht]);
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const [time, settime] = useState();
  async function fetchDataFromFirebase() {
    try {
      const firebaseUrl =
        "https://btpf-fdea3-default-rtdb.asia-southeast1.firebasedatabase.app/";
      const response = await fetch(`${firebaseUrl}/${sessionStorage.getItem("token")}/step.json`);

      const responsea = await fetch(`${firebaseUrl}/${sessionStorage.getItem("token")}/time.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const fetchedData = await response.json();
      const fetchedDataa = await responsea.json();
      console.log(fetchedData); // Access the specific data (change "key3" to your desired key)
      setcountst(fetchedData);
      settime(fetchedDataa);
      console.log("Data successfully fetched from Firebase.");

      const heightInMeters = parseFloat(ht) * 0.3048;
      const strideLength = heightInMeters * 0.415; // Average stride length formula

      // Calculate distance covered from step count
      const distance = parseFloat(fetchedData) * strideLength;
      setdist(distance.toFixed(2));
      const MET = 3.5;
      const weightInKg = parseFloat(wt);

      // Convert distance from meters to kilometers for MET calculation
      const distanceInKm = distance / 1000; // 1 kilometer = 1000 meters

      // Calculate calories burned using MET formula
      const calories = MET * weightInKg * distanceInKm;

      const caloriesPerStep = 0.04; // Calories burned per step
      const stepsPerMinute = fetchedData / (time * 60); // Calculate steps per minute
      const caloriesBurned = stepsPerMinute * caloriesPerStep * time * 60;
      setcal(caloriesBurned.toFixed(2));
      // Start checking for changes or perform additional operations here
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  }
  const [tsleep, setst] = useState(0);
  const [dsleep, setsd] = useState(0);
  const [lsleep, setsl] = useState(0);
  async function fetchDataFromFirebasea() {
    try {
      const firebaseUrl =
        "https://btpf-fdea3-default-rtdb.asia-southeast1.firebasedatabase.app/";
      const response = await fetch(`${firebaseUrl}/${sessionStorage.getItem("token")}/sleep.json`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const fetchedData = await response.json();

      console.log(fetchedData.total); // Access the specific data (change "key3" to your desired key)
      // setcountst(fetchedData);
      setst(fetchedData.total);
      setsl(fetchedData.light);
      setsd(fetchedData.deep);
      console.log("Data sleep successfully fetched from Firebase.");

      // Start checking for changes or perform additional operations here
    } catch (error) {
      console.error("Error sleep fetching data from Firebase:", error);
    }
  }

  const MINUTE_MS = 2000;
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDataFromFirebase();
      console.log(dist, cal);
      setShowProgress(false)
    }, MINUTE_MS);
   
    return () => clearInterval(interval);
  }, []);

  const MINUTE_MSa = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDataFromFirebasea();
    }, MINUTE_MSa);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="analy">
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
                  <h1 className="bodyhead" style={{ color: "red" }}>
                    Analysis
                  </h1>
                </Typography>
                <Button color="inherit" variant="outlined" onClick={()=>{navigate('/Login/Dashbord')}}>
                  <h className="bodyhead">Back</h>
                </Button>
                <div style={{ marginLeft: 10 }}></div>
                <div className="vl"></div>
                <div style={{ marginLeft: 10 }}></div>
                <Button color="inherit" variant="outlined" onClick={()=>{sessionStorage.removeItem('token');navigate('/')}}>
                  <h className="bodyhead">Logout</h>
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </Box>
      </div>

      <div class="container-fluid" style={{ marginTop: 100 }}>
      {showProgress && (
       
          <LinearProgress color="secondary" />
         
        
      )}
      
        <div class="row">
          <div className="col-sm-6">
       
            <Box
              sx={{
                height: 559,
                //  margin: 4.5,
                //  marginLeft: 2,
                borderRadius: 5,
                border: "red",
                backgroundColor: "rgba(0,0,0,0.3)",
                opacity: 0.95,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0,0.3)",
                  opacity: 0.99,
                  boxShadow: "2px 3px 10px #F4AAB9",
                },
              }}
            >
              <div style={{ marginLeft: 20 }}>
                <center>
                  <h5 className="cursivefont " style={{ color: "white" }}>
                    Steps Analysis
                  </h5>
                  <TextField
                    label="Target steps"
                    color="warning"
                    id="outlined-size-small"
                    defaultValue="6000"
                    size="small"
                    InputProps={{
                      style: { color: "white" }, // Set the color of the input text to white
                    }}
                    value={step}
                    onChange={(event) => {
                      setstp(event.target.value);
                    }}
                    focused
                  />{" "}
                  <TextField
                    label="Weight in Kg"
                    color="warning"
                    id="outlined-size-small"
                    defaultValue="75"
                    size="small"
                    InputProps={{
                      style: { color: "white" }, // Set the color of the input text to white
                    }}
                    value={wt}
                    onChange={(event) => {
                      setwt(event.target.value);
                    }}
                    focused
                  />{" "}
                  <TextField
                    label="Height in ft"
                    color="warning"
                    id="outlined-size-small"
                    defaultValue="5.5"
                    size="small"
                    InputProps={{
                      style: { color: "white" }, // Set the color of the input text to white
                    }}
                    value={ht}
                    onChange={(event) => {
                      setht(event.target.value);
                    }}
                    focused
                  />
                </center>
                <br></br>
                <h
                  className="cursivefont "
                  style={{ color: "white", marginLeft: 10 }}
                >
                  Duration :<h style={{ color: "orange" }}>{time}</h> minutes
                </h>
                <br></br>
                <h
                  className="cursivefont "
                  style={{ color: "white", marginLeft: 10 }}
                >
                  Steps:{" "}
                </h>

                <Progress
                  style={{ marginLeft: 100 }}
                  type="dashboard"
                  percent={(countstep / step) * 100}
                  format={(percent) => (
                    <h style={{ color: "white" }}>{countstep} </h>
                  )}
                  strokeColor={twoColors}
                  width={150} // Adjust the width of the progress component
                  strokeWidth={5}
                />
                <br></br>
                <h className="cursivefont " style={{ color: "white" }}>
                  Distance{" "}
                </h>
                <Progress
                  style={{ marginLeft: 90 }}
                  type="dashboard"
                  percent={(dist / distanceCovered) * 100}
                  format={() => (
                    <h style={{ color: "white" }}>
                      {dist}
                      <sub>mt</sub>{" "}
                      <StraightenIcon style={{ color: "orange" }} />
                    </h>
                  )}
                  strokeColor={twoColors}
                  width={150} // Adjust the width of the progress component
                  strokeWidth={5}
                />
                <br></br>
                <h className="cursivefont " style={{ color: "white" }}>
                  calories{" "}
                </h>
                <Progress
                  style={{ marginLeft: 90 }}
                  type="dashboard"
                  percent={(cal / caloriesBurned) * 100}
                  format={() => (
                    <h style={{ color: "white" }}>
                      {cal}
                      <sub>kcal</sub>{" "}
                      <LocalFireDepartmentIcon style={{ color: "red" }} />
                    </h>
                  )}
                  strokeColor={conicColors}
                  width={150} // Adjust the width of the progress component
                  strokeWidth={5}
                />
              </div>
            </Box>
          </div>
          <div className="col-sm-6">
            <Box
              sx={{
                height: 559,
                //  margin: 4.5,
                //  marginLeft: 2,
                borderRadius: 5,
                border: "red",
                backgroundColor: "rgba(0,0,0,0.3)",
                opacity: 0.95,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0,0.3)",
                  opacity: 0.99,
                  boxShadow: "2px 3px 10px #F4AAB9",
                },
              }}
            >
              <div style={{ marginLeft: 20 }}>
                <center>
                  <h5 className="cursivefont " style={{ color: "white" }}>
                    Sleep Analysis
                  </h5>
                </center>
                <div class="container-fluid">
                  <div class="row">
                    <div className="col-sm-6">
                      <Box
                        sx={{
                          marginLeft: -3,
                          //  margin: 4.5,
                          //  marginLeft: 2,
                          borderRadius: 5,
                          border: "red",

                          "&:hover": {
                            boxShadow: "2px 3px 10px #F4AAB9",
                          },
                        }}
                      >
                        <div style={{ marginLeft: 10 }}>
                          <br></br>
                          <h5
                            className="cursivefont "
                            style={{ color: "white" }}
                          >
                            Totlal light Sleep <NightlightRoundIcon /> :
                            <h style={{ color: "orange" }}>{lsleep}</h> minutes
                          </h5>
                          <br></br>

                          <h5
                            className="cursivefont "
                            style={{ color: "white" }}
                          >
                            Totlal Deep Sleep <DarkModeIcon /> :
                            <h style={{ color: "orange" }}>{dsleep}</h> minutes
                          </h5>
                          <br></br>

                          <h5
                            className="cursivefont "
                            style={{ color: "white" }}
                          >
                            Totlal Sleep :
                            <h style={{ color: "orange" }}>{tsleep}</h> minutes
                          </h5>
                          <br></br>
                        </div>
                      </Box>
                    </div>

                    <div className="col-sm-6">
                      <Box
                        sx={{
                          marginLeft: -3,
                          //  margin: 4.5,
                          //  marginLeft: 2,
                          borderRadius: 5,
                          border: "red",

                          "&:hover": {
                            boxShadow: "2px 3px 10px #F4AAB9",
                          },
                        }}
                      >
                        <br></br>
                        <div style={{ marginLeft: 15 }}>
                          <h5
                            className="cursivefont "
                            style={{ color: "orange" }}
                          >
                            About Sleep:
                          </h5>
                          <h
                            className="cursivefont "
                            style={{ color: "white" }}
                          >
                            Sleep is important for energy conservation, body
                            recovery, memory, emotional regulation, and hormone
                            secretion To get the best sleep, falling asleep and
                            waking up at the same time each day is important
                          </h>
                        </div>
                        <br></br>
                      </Box>
                    </div>
                  </div>
                </div>
                <br></br>
                <div class="container-fluid">
                  <div class="row">
                    <div className="col-sm-6">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th
                              className="cursivefont "
                              style={{ color: "orange" }}
                            >
                              Age Range
                            </th>
                            <th
                              className="cursivefont "
                              style={{ color: "orange" }}
                            >
                              Last Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              65+
                            </td>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              7-8 hours
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              18-64
                            </td>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              7-9 hours
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              14-17
                            </td>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              8-10 hours
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="col-sm-6">
                      {" "}
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th
                              className="cursivefont "
                              style={{ color: "orange" }}
                            >
                              Age Range
                            </th>
                            <th
                              className="cursivefont "
                              style={{ color: "orange" }}
                            >
                              Last Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              6-13
                            </td>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              9-11 hours
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              3-5
                            </td>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              10-13 hours
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              1-2
                            </td>
                            <td
                              className="cursivefont "
                              style={{ color: "white" }}
                            >
                              11-14 hours
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
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

export default Analasis;
