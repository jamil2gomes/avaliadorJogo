import React from "react";
import { styled } from "@mui/material/styles";
import Slider from '@mui/material/Slider';

interface SliderProp {
    trocarCor: () => string;
}


const SliderEstilizado = styled(Slider)<SliderProp>(({ trocarCor }) => ({
    color: trocarCor(),
    height: 15,
   
    "& .MuiSlider-thumb": {
      height: 30,
      width: 30,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit"
      },
      
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 14,
      background: "unset",
      padding: 0,
      width: 40,
      height: 40,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: trocarCor(),
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)"
      },
      "& > *": {
        transform: "rotate(45deg)"
      }
    }
  }));

export default SliderEstilizado;
  
