import { createTheme } from '@mui/material/styles';


const primaryColor = '#000000';

const CustomTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      darker: '#053e85',
    },
    secondary:{
        main:'#000000',
    },
     navBtnColor: {
      main:'#00000',
      darker:'#424242',
      contrastText:"White",
    },
  },
  components:{
    MuiCardHeader:{
      styleOverrides: {
        root:{     
       maxHeight:"8vh",
       minHeight:"8vh" 
      }
      },
    },
    MuiCardContent:{
      styleOverrides: {
        root:{     
       maxHeight:"5.5vh",
       minHeight:"5.5vh" 
      }
      },
    }
  }
}); 

export default CustomTheme