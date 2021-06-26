import { MuiThemeProvider, createMuiTheme, hexToRgb, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

const primaryMain = "#a81916";
const secondaryMain = "#ffffff";
export const thirdMain = "#252526";
export const fourthMain = "#929292";
export const fifthMain = "#b4b4b4";
export const blueColor = "#0a66c2";
export const greenColor = "#09884c";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryMain,
    },
    secondary: {
      main: secondaryMain,
    }
  },
  typography: {
    fontFamily: [
      'Signoria-Bold', 'Arial', 'sans-serif'
    ].join(','),
    button: {
      textTransform: 'none'
    }
  },
  overrides: {
    MuiTableContainer: {
      root: {
        overflowX: 'unset'
      },
    },
    MuiMenu: {
      paper: {
        borderRadius: '0px',
        boxShadow: 'unset',
        border: `2px solid ${hexToRgb(primaryMain)}`,
        backgroundColor: `${RGBToRGBA(hexToRgb(thirdMain), 1)}`,
        scrollBehavior: 'smooth',
      }
    },
    MuiTabs: {
      root:{
        fontFamily: 'Signoria-Bold',
        backgroundColor: `${RGBToRGBA(hexToRgb(fourthMain), 1)}`,
        color: 'black'
      },
      indicator:{
        backgroundColor: `${primaryMain}`,
        height: '3px'
      }
    }
  },
});

export const StyledCategoryTabs = withStyles({
  root:{
    fontFamily: 'Signoria-Bold',
    backgroundColor: `transparent`
  },
  indicator:{
    backgroundColor: `grey`,
    height: '0px'
  },
  scrollButtons:{
    color: `${primaryMain}`,
  }
})(Tabs);

const CustomMuiThemeProvider = (props: any) => {
    return (
    <MuiThemeProvider theme={theme}>
        {props.children}
    </MuiThemeProvider>
    );
}

export default CustomMuiThemeProvider;

export const cacheImages = async (srcArray: Array<string>) =>{
  const promises = await srcArray.map((src: string) => {
    return new Promise(function (resolve, reject) {
      const img = new Image();

      img.src = src;
      img.onload =  () => resolve(true);
      img.onerror = () => reject();
    });
  });

  await Promise.all(promises);
};

export function RGBToRGBA(rgb: any, alpha: any) {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substr(4).split(")")[0].split(sep);

  return "rgba(" + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alpha + ")";
};