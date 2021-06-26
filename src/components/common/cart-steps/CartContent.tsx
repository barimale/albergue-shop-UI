import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";
import Button from '@material-ui/core/Button';
import { CountedItemDetails, useGroupedItems } from "../../../hooks/useGroupedItems";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { Path as HomePath } from '../../screens/ContactScreen';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { I18nextProvider, useTranslation } from "react-i18next";
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import externali18n from "../../../externali18n";
import useLanguages from "../../../hooks/useLanguages";

const useStyles = makeStyles((theme) => ({
    title: {
      marginTop: theme.spacing(2)
    }
  }));

export function CartContent(){
    const classes = useStyles();
    const { groupedItems, total } = useGroupedItems();
    const { remove, add, getCount, decrementByOne } = useContext(CartContext);
    const history = useHistory();
    const { t } = useTranslation();
    
    useEffect(()=>{
        if(getCount() === 0){
            history.push(HomePath);
        }

    }, [getCount]);

    
  const { languages } = useLanguages();
  const { i18n } = useTranslation('externals');
  const [llnngg, setLLnngg] = useState<string>(i18n.language.toLowerCase());

  i18n.on('languageChanged', (lng) => {
      console.log('ItemDetailsContent languageChanged externali' + lng);
      setLLnngg(lng);
  });
  i18n.on('loaded',  () => console.log('ItemDetailsContent loaded externali'));
  i18n.on('added',  () => console.log('ItemDetailsContent added externali'));

  useEffect(()=>{
    const loadTranslations = async () =>{
      if(languages.length > 0){
        languages.forEach(async p => {
          await externali18n.loadLanguages([p.toLowerCase()])
            .then(async ()=>{
              console.log("Language loaded: " + p.toLowerCase());
              await externali18n.reloadResources([p.toLowerCase(), 'externals'])
                .then(()=>{
                  console.log("Resource reloaded for: " + p.toLowerCase());
                })
                .catch((error: any) => console.log(error));
            })
            .catch((error: any) => console.log(error));
        });
      }
    };
    
    loadTranslations();
  }, [languages]);

    return (
    <DeviceContextConsumer>
    {context =>    
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            paddingLeft: context === DeviceType.isDesktopOrLaptop ? '0px' : '10px',
            paddingRight: context === DeviceType.isDesktopOrLaptop ? '0px' : '10px'
        }}>
            <TableContainer style={{maxHeight:window.innerHeight * 0.4}}>
                <Table 
                    style={{
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '20px': '12px',
                    }}
                    aria-label="cart content"
                    stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold', fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}} width="40%">{t('Products').toUpperCase()}</TableCell>
                            <TableCell style={{fontWeight: 'bold', fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}} align="center" width="15%">{t('Quantity').toUpperCase()}</TableCell>
                            <TableCell style={{fontWeight: 'bold', fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}} align="right" width="45%">{t('Price').toUpperCase()}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}}>
                        {groupedItems?.map((item: CountedItemDetails, index: number)=>{
                            return (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" style={{fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}}>
                                    <I18nextProvider i18n={externali18n}>
                                        <ItemName name={`${item.details.id || ""}.name`} llnngg={llnngg}/>
                                    </I18nextProvider>
                                </TableCell>
                                <TableCell align="center" style={{fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}}>
                                    <div 
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignContent: 'center',
                                            textAlign: 'center',
                                            alignSelf: 'center',
                                            width: '100%'
                                        }}>
                                        <ButtonGroup 
                                            size="small" 
                                            style={{
                                                display: 'flex', 
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                        }}>
                                            <IconButton
                                                onClick={()=>{
                                                    decrementByOne(item.details);
                                                }}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <Button
                                                disabled={true}
                                                style={{
                                                    color: 'black'}}
                                                    variant="text">
                                                {item.count}
                                            </Button>
                                            <IconButton
                                                onClick={()=>{
                                                    add(item.details);
                                                }}>
                                                <AddIcon/>
                                            </IconButton>
                                        </ButtonGroup>
                                        <Typography style={{
                                            paddingTop: context === DeviceType.isDesktopOrLaptop ? '10px' : '6px',
                                            width: '100%'
                                        }}>
                                            <a 
                                            className={"pointerOverEffect"}
                                            style={{
                                            cursor: 'pointer',
                                            color: 'rgba(206, 17, 38, 1)',
                                            width: '100%'
                                            }}
                                            onClick={()=>{
                                                remove(item.details)
                                            }}
                                            >
                                            {t('Remove').toUpperCase()}</a>
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="right" style={{fontSize: context === DeviceType.isDesktopOrLaptop ? '18px': '12px'}}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignContent: 'center',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center'
                                    }}>
                                        {item.details.price !== undefined && item.details.price.toFixed(2)}
                                        <EuroSymbolIcon style={{
                                            paddingLeft: '5px',
                                            height:'20px',
                                            width: 'auto'
                                        }}/>
                                    </div>
                                </TableCell>
                        </TableRow>);
                        })}
                        <TableRow>
                            <TableCell align="right">
                            <Typography 
                                variant={context === DeviceType.isDesktopOrLaptop ? "h4" : "h6"}
                                gutterBottom 
                                className={classes.title}
                                style={{
                                    fontWeight: 'bold'
                                }}>
                                {t("Total").toUpperCase()}
                            </Typography>
                            </TableCell>
                            <TableCell align="right" colSpan={2}>
                                <Typography 
                                    gutterBottom 
                                    className={classes.title}
                                    style={{
                                        fontWeight: 'normal',
                                        fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '24px'
                                    }}>
                                        <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignContent: 'center',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center'
                                    }}>
                                         {total().toFixed(2)}
                                        <EuroSymbolIcon style={{
                                            paddingLeft: '5px',
                                            height: context === DeviceType.isDesktopOrLaptop ? '44px' : '24px',
                                            width: 'auto'
                                        }}/>
                                    </div>
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }
    </DeviceContextConsumer>)
}

type ItemNameProps = {
    name: string;
    llnngg: string;
}
const ItemName = (props: ItemNameProps) =>{
    const { name } = props;
    const { t } = useTranslation('externals');

    useEffect(()=>{
        externali18n.changeLanguage(props.llnngg);
    },[props.llnngg]);

    return(
        <>
            {t(name)}
        </>
    );
}