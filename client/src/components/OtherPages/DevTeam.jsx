import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';
import harsh from "../../assets/harsh.jfif"

export default function DevTeam() {
  return (
    <div className='min-h-screen bg-zinc-300 p-5'>
    <Stack spacing={{ xs: 1, sm: 2, md: 4 }}
       direction={{ xs: 'column', sm: 'row' }}
       useFlexGap flexWrap="wrap"
       alignItems="center"
       justifyContent="center"
    >
    <Card className="stickyCard" sx={{ maxWidth: 560,minWidth:560, height: '100%', width: '100%', flexBasis: '30%', minHeight: 400,maxHeight:350, display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'center' }}>
      <CardActionArea style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
        <CardMedia
          component="img"
          // height="10"
          image={harsh}
          alt="Harsh Shah"
          style={{ height:140,width:140 ,borderRadius:'50%',zIndex:'0'}}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            Harsh Shah
          </Typography>
          <Typography variant="body2" color="text.secondary">
            MERN Stack Developer | LeetCode Problem Solver (350+ questions) | Max Rating 1816 | AWS Certified Cloud Practitioner
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <button 
         onClick={() => window.location.href = 'https://www.linkedin.com/in/harsh-shah-639552250/'}
         className='stickyButton w-[100px] h-[50px] bg-[#2c2c2c]  text-white font-bold py-3 px-5 rounded '>
          Linkedin
        </button>
      </CardActions>

    
    </Card>
    <style>
      {
        `
        .stickyCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Make sure the card takes 100% height */
}

.stickyButton {
  width: 100%;
  {/* background-color: teal; */}
  color: white;
  font-weight: bold;
  padding: 8px;
  border-radius: 4px;
  margin-top: auto; /* Push the button to the bottom of the card */
}

        `
      }
    </style>
    </Stack>
    </div>
  );
}
