import {
  Stack,
  Pagination,
  Button,
  Radio, 
  RadioGroup,  
  FormControlLabel, 
  FormControl, 
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid ,
  useMediaQuery }  from '@mui/material';
import { useDispatch ,  useSelector  } from "react-redux";
import { AddFilters , GetFilters } from "../Redux/actions";
import { useEffect , useState } from "react";
import { getAllBrand , getAllCategories  } from "../Redux/actions";
import { useTheme, } from "@material-ui/core/styles";


export default function Menu() {

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('xs'))

  const filter = 
    {
    category:"",
    brand:"", 
    name:"", 
    pricemin:"", 
    pricemax:"",
    page:1
  }
  
  const dispatch = useDispatch();
  const [input,setInput] = useState(filter);
  const [hiddenMenu,setHiddenMenu] = useState(true)
  const { categories ,  brands  ,pages} = useSelector((state) => state);

  useEffect(() => {
      dispatch(getAllBrand())
      dispatch(getAllCategories())
  }, []);


 const handleFilter= (e)  => {
  
  const newFilter = {
    ...input,
    [e.target.name]: e.target.value, page: 1}

   setInput(newFilter)

    // dispatch(AddFilters(newFilter))
    dispatch(GetFilters(newFilter))   
 }


 const handlePage = (event, value) => {


  let newPage = {
      ...input,
      page: value
  }
  
  setInput(newPage)

  dispatch(AddFilters(newPage))
  dispatch(GetFilters(newPage))

}



 const clearFilter  = (e) => {

  console.log(input)
  console.log('target' ,e.target.pricemin)



   const cleanFilter = {
      [input.category]:"",
      [input.brand]:"", 
      [input.name]:"", 
      [input.pricemin]:null, 
      [input.pricemax]:null,
      page:1
   }
   
  setInput(cleanFilter)
  dispatch(GetFilters(cleanFilter))
  dispatch(AddFilters(clearFilter))
 }




return (
 <div>
{ !isMatch ? 
<div>
   {hiddenMenu == false ?     
  <Grid container sm={12}  sx={{padding:"1em"}}> 
    <Grid container sm = {12}  direction="row"  sx={{marginLeft:"21em"}}>
          <TextField
              color="secondary"
              name='pricemin'
              size="small"
              id="lower"
              label="Min Price"
              variant="outlined"
              // type="number"
              value={input.pricemin}
              onChange={handleFilter}
              onBlur={handleFilter}
          />
          <TextField
              color="secondary"
              name='pricemax'
              size="small"
              id="upper"
              label="Max Price"
              variant="outlined"
              // type="number"
              value={input.pricemax}
              onChange={handleFilter}
          />  
        </Grid>


        <Grid container sm = {12} direction="row">
        <FormControl fullWidth>
        <InputLabel id="categories-select-label">Categories</InputLabel>
        <Select
          color="secondary"
          name='category'
          labelId="categories-select-label"
          id="categories-select"
          value={input.category}
          label="category"
          onChange={handleFilter}
        >
        {categories.map((name) => (
          <MenuItem
          key={name}
          value={name}
          >
          {name}
          </MenuItem>
          ))}
        </Select>
        </FormControl>

        <FormControl fullWidth>
        <InputLabel id="brands">brands</InputLabel>
        <Select
          color="secondary"
          name='brand'
          labelId="brand"
          id="brands"
          value={input.brand}
          label="Brand"
          onChange={handleFilter}
        >
        {brands.map((name) => (
          <MenuItem
          key={name}
          value={name}
          >
          {name}
          </MenuItem>
          ))}
        </Select>
        </FormControl> 
      </Grid>
      
      <Grid container sm = {12}  direction="row"   sx={{marginLeft:"20em"}} >
        <FormControl>
          <FormLabel id="filter-buttons-group-label">Sort by..</FormLabel>
          <RadioGroup
            row
            aria-labelledby="filter-buttons-group-label"
            name="name"
          >
            <FormControlLabel
            color="secondary"
            value="pasc" 
            control={<Radio />} 
            label="Price Asc"
            onClick={handleFilter}
            />

            <FormControlLabel
            color="secondary"
            value="pdesc" 
            control={<Radio />} 
            label="Price dsc"
            onClick={handleFilter}
            />

          <FormControlLabel 
            color="secondary"
            value="nasc" 
            control={<Radio />} 
            label="Name A/Z"
            onClick={handleFilter}
            />

          <FormControlLabel 
            color="secondary"
            value="ndesc" 
            control={<Radio />} 
            label="Name Z/A"
            onClick={handleFilter}
            />
          </RadioGroup>
        </FormControl>
        <Button onClick={clearFilter} sx={{padding:"2em"}}  color="secondary"> clear filter </Button>
        <Button onClick={() => setHiddenMenu(true)}> hide menu </Button>
      </Grid>
    </Grid>: null}

      {hiddenMenu == false ?  null :  <Button onClick={() => setHiddenMenu(false)} > Display filter menu</Button>}

    
  <Stack >
      <Pagination style={{ alignSelf: "center", marginBottom: "20px" }}
          count={pages}
          name="page"
          page={input.page}
          onChange={(event, value) => handlePage(event, value)}
          size="large"
      />
  </Stack>
          
    </div>
  : 
  //VERSION MOVILE
  <div>
  {hiddenMenu == false ?  
  <Grid container sm={12}  sx={{padding:"1em"}}> 
  <Grid container sm = {12}  direction="row"  sx={{marginLeft:"2em"}}>
        <TextField
            color="secondary"
            name='pricemin'
            size="small"
            id="lower"
            label="Min Price"
            variant="outlined"
            // type="number"
            value={input.pricemin}
            onChange={handleFilter}
            onBlur={handleFilter}
        />
        <TextField
            color="secondary"
            name='pricemax'
            size="small"
            id="upper"
            label="Max Price"
            variant="outlined"
            // type="number"
            value={input.pricemax}
            onChange={handleFilter}
        />  
      </Grid>


      <Grid container sm = {12} direction="row">
      <FormControl fullWidth>
      <InputLabel id="categories-select-label">Categories</InputLabel>
      <Select
        color="secondary"
        name='category'
        labelId="categories-select-label"
        id="categories-select"
        value={input.category}
        label="category"
        onChange={handleFilter}
      >
      {categories.map((name) => (
        <MenuItem
        key={name}
        value={name}
        >
        {name}
        </MenuItem>
        ))}
      </Select>
      </FormControl>

      <FormControl fullWidth>
      <InputLabel id="brands">brands</InputLabel>
      <Select
        color="secondary"
        name='brand'
        labelId="brand"
        id="brands"
        value={input.brand}
        label="Brand"
        onChange={handleFilter}
      >
      {brands.map((name) => (
        <MenuItem
        key={name}
        value={name}
        >
        {name}
        </MenuItem>
        ))}
      </Select>
      </FormControl> 
    </Grid>
    
    <Grid container sm = {12}  direction="row"   sx={{marginLeft:"2em"}} >
      <FormControl>
        <FormLabel id="filter-buttons-group-label">Sort by..</FormLabel>
        <RadioGroup
          row
          aria-labelledby="filter-buttons-group-label"
          name="name"
        >
          <FormControlLabel
          color="secondary"
          value="pasc" 
          control={<Radio />} 
          label="Price Asc"
          onClick={handleFilter}
          />

          <FormControlLabel
          color="secondary"
          value="pdesc" 
          control={<Radio />} 
          label="Price dsc"
          onClick={handleFilter}
          />

        <FormControlLabel 
          color="secondary"
          value="nasc" 
          control={<Radio />} 
          label="Name A/Z"
          onClick={handleFilter}
          />

        <FormControlLabel 
          color="secondary"
          value="ndesc" 
          control={<Radio />} 
          label="Name Z/A"
          onClick={handleFilter}
          />
        </RadioGroup>
      </FormControl>
      <Button onClick={clearFilter} sx={{padding:"2em"}}  color="secondary"> clear filter </Button>
      <Button onClick={() => setHiddenMenu(true)}> hide menu </Button>
    </Grid>
  </Grid> : null }

    {hiddenMenu == false ?  null :  <Button onClick={() => setHiddenMenu(false)} > Display filter menu</Button>}

  
<Stack >
    <Pagination style={{ alignSelf: "center", marginBottom: "20px" }}
        count={pages}
        name="page"
        page={input.page}
        onChange={(event, value) => handlePage(event, value)}
        size="large"
    />
</Stack>
</div>
  }
  </div>
  )
}
