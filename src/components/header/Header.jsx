/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import { postAuthPaths, preAuthPaths } from '../../config/constants/NavigationConstants';
import { CustomButton } from '../commons';
import { resetAuthState } from '../../store/authentication/ThunkActions';
// eslint-disable-next-line no-unused-vars
import {resetTreeState} from '../../store/trees/ThunkActions';

const Header = ({isLoggedIn, style}) => {

    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = React.useState({
        showSideMenu: false
    });
    
    const toggleSideMenu = () => {
        setState({
            showSideMenu: !state.showSideMenu
        })
    }

    // to be used for logging out user
    // if he is loggedIn
    const doLogout = async () => {
        // all the selected trees should be cleaned up
        // all the data fetched after this user had last logged in should be cleaned up
        dispatch(resetTreeState());
        dispatch(resetAuthState());
    }

    const { allowedTree } = useSelector((currentState) => currentState.treesReducer);
    const { credentials: { profileImage } } = useSelector((authState) => authState.authReducer);
    console.log(profileImage);

    if(!isLoggedIn){
        return (
            <header>
                <div className="header-wrap">
                    <div className="container-wrap">
                        <div className="header-logo">
                            <figure className="mb-0">
                                <Link to={ preAuthPaths.HOME }><img src="/images/logo.png" alt="" className="img-fluid" /></Link>
                            </figure>
                            <ul className="header-nav">
                                {/* <li>
                                    <Link to={ preAuthPaths.HOME }>HOME</Link>
                                </li>*/}
                                {/* <li>
                                    <Link to={ preAuthPaths.FOREST }>CHOOSE YOUR TREE</Link>
                                </li> */}
                            </ul>
                        </div>
                        <div className="header-menu">
                            <ul>
                                <li>
                                    <Link to={ preAuthPaths.LOGIN }>LOGIN</Link>
                                </li>
                                <li>
                                    <Link to={ preAuthPaths.SIGNUP }>SIGN-UP</Link>
                                </li>
                            </ul>
                            <Link to={ preAuthPaths.FOREST }>
                                <CustomButton name="CHOOSE YOUR TREES" />
                            </Link>
                            <div 
                                className="menu-bar" 
                                role="button" 
                                tabIndex={ 0 } 
                                onClick={ toggleSideMenu }
                                onKeyDown={ ()=>{} }
                            >
                                <img alt="Not Found" src="images/hamburger-menu.png" />
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className={ `responsive-wrap ${state.showSideMenu ? 'd-block' : 'd-none' }` }>
                    <div className="logo-wrap">
                        <figure className="mb-0">
                            <img src="images/white-logo.png" className="img-fluid" alt="" />
                        </figure>
                        <button type="button" className="close-btn" onClick={ toggleSideMenu }>
                            CLOSE X
                        </button>
                    </div>
                    <ul>
                        <li>
                            <Link to={ preAuthPaths.HOME } onClick={ toggleSideMenu }>HOME</Link>
                        </li>
                        <li>
                            <Link to={ preAuthPaths.FOREST } onClick={ toggleSideMenu }>CHOOSE YOUR TREE</Link>
                        </li>
                        <li className="pt-4">
                            <Link to={ preAuthPaths.LOGIN } onClick={ toggleSideMenu }>LOGIN</Link>
                        </li>
                        <li>
                            <Link to={ preAuthPaths.SIGNUP } onClick={ toggleSideMenu }>SIGN-UP</Link>
                        </li>
                    </ul>
                </div>
            </header>
          )
    }

    /**
     * if logged in then the header returned is different
     * as below
     */

    return (
        <div className="banner-header" style={ style }>
            <div className="container-wrap">
                <figure className="mb-0">
                    <Link to={ postAuthPaths.HOME }>
                        <img alt="Not Found" src="images/logo_black.png" className="img-fluid" />
                    </Link>
                </figure>
                <div 
                    className="menu-bar" 
                    role="button" 
                    tabIndex={ 0 } 
                    onClick={ toggleSideMenu }
                    onKeyDown={ ()=>{} }
                >
                    <img alt="Not Found" src="images/hamburger-menu.png" />
                </div>
            </div>

            <div className="responsive-wrap" style={ { display : state.showSideMenu ? 'block' : 'none' } }>
                <div className="logo-wrap">
                    <figure className="mb-0">
                        <img alt="Not Found" src="images/white-logo.png" className="img-fluid" />
                    </figure>
                    <button type="button" className="close-btn" onClick={ toggleSideMenu }>
                        CLOSE X
                    </button>
                </div>
                <ul>
                    <li>
                        <div className="pro-img">
                            <figure className="mb-0 menu-profile-image">
                                <img alt="Not Found" src={ profileImage } className="img-fluid" />
                            </figure>
                        </div>
                    </li>
                    <li>
                        <Link to={ postAuthPaths.HOME } onClick={ toggleSideMenu }>My Account</Link>
                    </li>
                    <li>
                        <Link to={ postAuthPaths.ABOUT } onClick={ toggleSideMenu }>About GiftTrees</Link>
                    </li>
                    <li onClick={ doLogout } onKeyDown={ ()=>{} }>
                        <Link to={ postAuthPaths.HOME }>
                            Log Out
                        </Link>
                    </li>
                    <li>
                        <div className="circle yellow-cl">
                            <h6>{ allowedTree }<span>TREES TO PLANT</span></h6>
                        </div>
                    </li>
                </ul>
            </div>
        </div>        
    );
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    style: PropTypes.instanceOf(Object)
};

Header.defaultProps = {
    isLoggedIn: false,
    style: {}
};

export default Header
