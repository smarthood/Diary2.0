import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import SecondNav from '../components/SecondNav';
import { Drawer } from '@mui/material';
import ALbg from '../images/albg.png'

const AutoPlaySwipeableViews = SwipeableViews;
function Album({isALDrawerOpen,setALDrawerOpen,tdata}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tdata.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    
    <Drawer anchor='bottom' open={isALDrawerOpen} onClose={()=>setALDrawerOpen(false)} PaperProps={{style: { height: "100vh",background:"white",display:"flex",justifyContent:"center",alignItems:"center"} }}>
    <Box sx={{ maxWidth:{xs:"100%",md:400} , flexGrow: 1,background:"white" }}>
      <SecondNav setALDrawerOpen={setALDrawerOpen} title={"Album"} />
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        >
        {tdata.length === 0 ? (
            <Box sx={{display:"flex",flexDirection: "column",alignItems: "center",width: "100%",height: "100vh",background:"rgba(255, 255, 255, 0)"}}>
              <Box component="img" src={ALbg} alt="nothing" width="350px" mt="60px" loading='lazy'></Box>
            <Typography >Not written anything yet? 😶</Typography>
            </Box>
            ):(tdata.map((items, index) => (
          <div key={items.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box id="text_wrap_alt"  maxWidth="500px" flex={4}>
              <Box component="div" className="lines" sx={{minHeight:"80vh"}}>
              <Typography sx={{margin:{sm: "15px 15px 0 0",color: "black"},textAlign: "right"}}>{items.createAt.toDate().toLocaleDateString("ta-IN")}</Typography>
              <Typography sx={{fontFamily: 'Edu VIC WA NT Beginner',fontSize:"30px",textAlign:"center",textTransform:"capitalize"}}>{items.title}</Typography>
              <Box component="div" sx={{display: "flex",justifyContent:"center"}}>
              <div className="img-tape img-tape--2">
            <Box
                component="img"
                sx={{
                  height: "auto",
                  width: 250,
                  border: "5px solid white",
                  marginInline:5
                }}
                alt="The house from the offer."
                src={items.image}
                />
                </div>
                </Box>
              <Box sx={{marginLeft:"15%"}}>
            <Typography sx={{fontFamily:"Shadows Into Light",fontSize:"20px",marginTop:"10px"}}>{items.description}</Typography>
              </Box>
                </Box>
            </Box>
            ) : null}
          </div>
        )))}
      </AutoPlaySwipeableViews>
        {tdata.length !==0 &&
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />}
    </Box>
    </Drawer>
  );
}

export default Album;
