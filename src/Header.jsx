import React from 'react';

const Header = (props) => {
    return (
        <div className="header" style={{backgroundColor: props.theme.palette.themePrimary, color : props.theme.palette.white, fontSize: props.theme.fonts.xLarge.fontSize, fontFamily: props.theme.fonts.xLarge.fontFamily}}>
            Business Process Automation Accelerator
        </div>
    )
}

export default Header