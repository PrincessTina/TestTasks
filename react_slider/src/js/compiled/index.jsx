import React from 'react';
import ReactDOM from 'react-dom';

import Slider from "../components/Slider/Slider.jsx";

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        ReactDOM.render(
            <Slider/>,
            document.getElementsByClassName('root')[0]
        );
    }
};