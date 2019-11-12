import React, { useState, useEffect } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const onSideDrawerToggleClicked = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    const onSideDrawerClosed = () => {
        setShowSideDrawer(false);
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            if(showSideDrawer) {
                onSideDrawerClosed();
            }
        })
    })
    

    return (
        <React.Fragment>
            <Toolbar sidedrawerToggleClicked={onSideDrawerToggleClicked} />
            <SideDrawer show={showSideDrawer} closed={onSideDrawerClosed} userToken={props.auth.userToken} />
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout;
