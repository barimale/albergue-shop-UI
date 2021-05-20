import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      width: 'auto',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
      overflowX: 'auto',
      scrollbarColor: `#636362 #010306`,
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      paddingTop: '10px',
      paddingBottom: '0px'
    },
  }),
);

const images = ['/am/2m.jpg','/am/1m.jpg','/am/3m.jpg','/am/certificate.jpg', '/am/certificate2.jpg','/am/certificate3.jpg','/am/certificate4.jpg'];

const content = `Nazywam się Elżbieta Dzierzęga. Jestem mamą dwóch małych Cudów świata. Zawodowo jestem nauczycielem matematyki, pedagogiem specjalnym i trenerem TUS. Nauczanie jest dla mnie pasją, sposobem na połączenie życia zawodowego i macierzyńskiego oraz okazją do spotykania młodych, cudownych ludzi.
Ukończyłam <a href='https://szkolaodwagi.pl/' target='_blank' style='color: white !important;'>Szkołę Odwagi Magdy Kluszczyk</a>. Było to dla mnie niesamowite przeżycie, uwalniające, pouczające, dające gigantyczną świadomość siebie, swoich emocji, pragnień i potrzeb. Praktykując odwagę poczułam chęć spełnienia tego, co od zawsze we mnie kiełkowało – pracy trenerskiej i szkoleniowej. Stąd wziął się pomysł na certyfikowanie Podróży Bohaterki. Ta właśnie podróż i udział w warsztacie Terapeutyczna Moc Fotografii skłoniły mnie do stworzenia własnych kart rozwojowych. 
Podczas własnej pracy rozwojowej oczarowała mnie metafora jako forma przekazu. Praca z fotografią stała się elementem życia codziennego. 
Chciałabym, żeby w mojej pracy trenerskiej towarzyszyły mi czułość, życie w prawdzie i nadzieja.`;

export default function AboutMeScreenContent(){
    const classes = useStyles();
    const isWideDevice = useMediaQuery({ minDeviceWidth: 444 });

    return (
    <DeviceContextConsumer>
        {context => 
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: context === DeviceType.isDesktopOrLaptop ? 'center' : 'flex-start',
            flexDirection: 'column',
            width: '90%',
            height: '100%'}}>
            <div style={{
                paddingTop: context === DeviceType.isDesktopOrLaptop ? '0px' : '10px',
                width: context === DeviceType.isDesktopOrLaptop ? '70%' : '100%',
                }}>
                <GridList 
                    spacing={10}
                    cellHeight={context === DeviceType.isDesktopOrLaptop ? window.innerHeight*0.48 : window.innerHeight*0.38}
                    className={classes.gridList} 
                    cols={context === DeviceType.isDesktopOrLaptop ? 2.5: (isWideDevice === true ? 2.5 : 1.75)}>
                        {images.map((tile: string, index: number) => (
                            <GridListTile key={index} cols={1}>
                                <img
                                alt={tile}
                                style={{
                                    objectFit: context === DeviceType.isDesktopOrLaptop ? 'scale-down' : 'scale-down',
                                    maxHeight: '100%'
                                }}
                                src={tile}
                                />
                            </GridListTile>
                        ))}
                </GridList>
            </div>
            <div style={{
                textAlign: 'left',
                width: context === DeviceType.isDesktopOrLaptop ? '70%' : '100%',
            }}>
                <h2 style={{
                fontFamily: 'Montserrat',
                color: 'white'
                }}>{`O mnie...`}</h2>
            </div>
                <div 
                dangerouslySetInnerHTML={{ __html: content }} 
                style={{
                width: context === DeviceType.isDesktopOrLaptop ? '70%' : '100%',
                paddingBottom: context === DeviceType.isDesktopOrLaptop ? '54px': '54px',
                scrollbarColor:  context === DeviceType.isDesktopOrLaptop ? '#636362 #010306' : 'unset',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : (isWideDevice === true ? '14px' : '10px'),
                textAlign: 'justify',
                maxHeight: context === DeviceType.isDesktopOrLaptop ? window.innerHeight*0.24 : window.innerHeight*0.24,
                color: 'white',
                overflowY: 'auto'}}>
                </div>
            </div>
        }
    </DeviceContextConsumer>
    );
}