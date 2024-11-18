import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha, Theme, useTheme } from '@mui/material/styles';
import {Box,CssBaseline,Divider,Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText, OutlinedInput} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import InputIcon from '@mui/icons-material/Input';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


import { useTranslation } from 'react-i18next';
import '../i18n';
import i18n from '../i18n';

import InputMask from './inputMask'
import AdminOverview from './AdminOverview'


const drawerWidth = 240;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
	  backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
	  marginLeft: theme.spacing(1),
	  width: 'auto',
	},
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
	  padding: theme.spacing(1, 1, 1, 0),
	  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	  transition: theme.transitions.create('width'),
	  [theme.breakpoints.up('sm')]: {
		width: '12ch',
		'&:focus': {
		  width: '20ch',
		},
	  },
	},
  }));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const languages = [
  'EN',
  'GER',
  
];

function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const { t } = useTranslation();
  const theme = useTheme();


  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [language, setLanguage] = React.useState('EN');
  const [selectedComponent, setSelectedComponent] = React.useState(0)

  const [page, setPage] = React.useState(<InputMask/>)

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value.toLocaleLowerCase())
  };

  const handleChangeDrawerComponent = (component: any, indexOfSelectedComponent: number)=>{
    setPage(component)
    setSelectedComponent(indexOfSelectedComponent)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[{index: 0 , title: t('userInputMask'), component: <InputMask/>}, {index: 1, title: t('adminOverview'), component: <AdminOverview/>}].map((menuDrawer, index) => (
          <ListItem key={menuDrawer.index}   disablePadding>
            <ListItemButton onClick={()=>handleChangeDrawerComponent(menuDrawer.component, index)} style={selectedComponent  === index ?{backgroundColor: "#ECF2FF"}: {}}>
              <ListItemIcon >
                {menuDrawer.index % 2 === 0 ? <InputIcon /> : < DashboardIcon />}
              </ListItemIcon>
              <ListItemText primary={menuDrawer.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{width: "100%", backgroundColor: '#342BC2', display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
		     <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('searchPlaceholder')} 
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }} style={{color: 'white'}}>
          <Select
            displayEmpty
            value={language}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Languages</em>;
              }

              return selected;
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            style={{color: 'white'}}
          >
            <MenuItem disabled value="">
              <em>Placeholder</em>
            </MenuItem>
            {languages.map((language) => (
              <MenuItem
                key={language}
                value={language}
                style={getStyles(language, language, theme)}
              >
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {page}
      </Box>
    </Box>
  );
}
