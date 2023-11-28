import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';
import harsh from "../assets/harsh.jfif"
import lovepreet from "../assets/lovepreet.jfif"
import tushar from "../assets/tushar.jfif"
import yatharth from "../assets/yatharth.jfif"
import reeshav from "../assets/reeshav.gif"
import auser from '../assets/auser.png'

export default function DevTeam() {
  return (
   
    <Stack spacing={{ xs: 1, sm: 2, md: 4 }}
       direction={{ xs: 'column', sm: 'row' }}
       useFlexGap flexWrap="wrap"
       alignItems="center"
       justifyContent="center"
    >
    <Card className="stickyCard" sx={{ maxWidth: 360, height: '100%', width: '100%', flexBasis: '30%', minHeight: 400,maxHeight:400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
         className='stickyButton w-full bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mt-4'>
          Linkedin
        </button>
      </CardActions>
    </Card>
    <Card className='stickyCard' sx={{ maxWidth: 360, height: '100%', width: '100%', flexBasis: '30%', minHeight: 400,maxHeight:400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardActionArea style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
        <CardMedia
          component="img"
          // height="10"
          image={lovepreet}
          alt="Harsh Shah"
          style={{ height:140,width:140 ,borderRadius:'50%',zIndex:'0'}}
        />
        <CardContent height='300'>
          <Typography gutterBottom variant="h5" component="div">
            Lovepreet Singh
          </Typography>
          <Typography variant="body2" color="text.secondary">
          MERN stack developer 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <button 
         onClick={() => window.location.href = 'https://www.linkedin.com/in/lovepreet-singh1223/'}
         className='stickyButton w-full bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mt-4'>
          Linkedin
        </button>
      </CardActions>
    </Card>
    <Card className='stickyCard' sx={{ maxWidth: 360, height: '100%', width: '100%', flexBasis: '30%', minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardActionArea style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
        <CardMedia
          component="img"
          // height="10"
          image={tushar}
          alt="Harsh Shah"
          style={{ height:140,width:140,borderRadius:'50%',zIndex:'0'}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Tushar Parwani
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Student
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <button 
         onClick={() => window.location.href = 'https://www.linkedin.com/in/tushar-parwani-342813257/'}
         className='stickyButton w-full bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mt-4'>
          Linkedin
        </button>
      </CardActions>
    </Card>
    <Card className='stickyCard' sx={{ maxWidth: 360, height: '100%', width: '100%', flexBasis: '30%', minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardActionArea style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
        <CardMedia
          component="img"
          // height="10"
          image={yatharth}
          alt="Harsh Shah"
          style={{ height:140,width:140 ,borderRadius:'50%',zIndex:'0'}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Yatharth Jagdhari
           
          </Typography>
          <Typography variant="body2" color="text.secondary">
          PreFinal Year Student at LNMIIT || Machine Learning Enthusiast
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <button 
         onClick={() => window.location.href = 'https://www.linkedin.com/in/yatharth-jagdhari-8763001bb/'}
         className='stickyButton w-full bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mt-4'>
          Linkedin
        </button>
      </CardActions>
    </Card>
    <Card className='stickyCard' sx={{ maxWidth: 360, height: '100%', width: '100%', flexBasis: '30%', minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardActionArea style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
        <CardMedia
          component="img"
          // height="10"
          image={auser}
          alt="Harsh Shah"
          style={{ height:140,width:140 ,borderRadius:'50%',zIndex:'0'}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Reeshav Mohapatra
          </Typography>
          <Typography variant="body2" color="text.secondary">

          Student at The LNM Institute of Information Technology
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <button 
         onClick={() => window.location.href = 'https://www.linkedin.com/in/reeshav-mohapatra-b0aa57241/'}
         className='stickyButton w-full bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mt-4'>
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
  );
}
