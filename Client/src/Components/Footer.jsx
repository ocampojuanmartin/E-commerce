import { Grid ,Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer(){

    const useStyles = makeStyles((theme) => ({
        root: {
            position:"fixed",
            left:"0",
            bottom:"0",
            right:"0",
            backgroundColor: 'Black',
            color: 'white',
            padding:"0.5em",
        },
        offSet:{

            minHeight:"100px"
        }
    }));
    const classes = useStyles()

    return (<div>
           
        <div className={classes.offSet}></div>

        <footer className={classes.root}>
            <Grid container  direction="row" >
                <Grid item  sm={2} >
                    <Typography variant="h7">SportsMarket™</Typography>
                </Grid>

                <Grid container  sm={9} direction="row-reverse"  >
                    <Grid>
                        <FacebookIcon/>
                        <InstagramIcon/>
                        <TwitterIcon/>
                   </Grid>
                    <Grid sx={{marginBottom:"0.2em"}}>
                        <Typography variant="h7"> FollowUS: </Typography> 
                    </Grid>
                </Grid>

            </Grid>  
        </footer>
    </div>
    )
}