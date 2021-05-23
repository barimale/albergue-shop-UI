import Header from "../molecules/Header";
import { Footer } from "../molecules/Footer";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const MainLayout = (props : any) =>  {
    const [paddingTop, setPaddingTop] = useState<number>(10);
    const { innerHeight: height } = window;
    const isPortrait = useMediaQuery({ orientation: 'portrait' });
    const prevVal = usePrevious(isPortrait);
    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
      history.replace(location.pathname);
    }, [window.screen.width, window.screen.height]);

    useEffect(()=>{
      if(prevVal === undefined){
        return;
      }

      if(isPortrait !== prevVal){
        history.replace(location.pathname);
      }
    }, [isPortrait, prevVal]);

    return (
    <>
        <Header onSize={(size: any)=>{
            setPaddingTop(size.height || 0);
        }} />
        <div className="main-layout" style={{
            height: height - paddingTop,
            width: '100%',
            paddingTop: paddingTop,
            display: 'inline-flex',
            background: '#252526',
            justifyContent: 'center'}}>
            {props.children}
        </div>
        <Footer/>
    </>
    );
}

export const ContentLayout = (props: any) => {
    return (
      <div style={{
          height: 'inherit',
          width:'inherit',
          display: 'inline-flex',
          alignItems: 'center', 
          justifyContent: 'center'
          }}>
        {props.children}
      </div>
    );
}

export const ContentLayout2 = (props: any) => {
    return (
      <div style={{
        display: 'flex', 
        flexDirection:'column', 
        width:'inherit',
        alignItems: 'stretch', 
        justifyContent: 'stretch',
        backgroundColor: 'white'
        }}>
        {props.children}
      </div>
    );
}