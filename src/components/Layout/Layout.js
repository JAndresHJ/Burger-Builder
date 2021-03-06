import React, {Component} from 'react';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer : false
        })
    }

    // Setting the state when it depends on the old state
    sideDrawerToogleHandler = () => {
        this.setState( ( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <>
                <Toolbar clicked={this.sideDrawerToogleHandler}/>
                <SideDrawer 
                    show={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>  
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default Layout