/******************************************
 *  Author : Suraj Sharma
 *  Created On : Mon Jan 04 2021
 *  File : FooterNavigator.jsx
 *******************************************/
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { postAuthPaths } from '../../config/constants/NavigationConstants';

const FooterNavigator = () => {
    const { allowedTree } = useSelector((state) => state.treesReducer);

    return (
        <div className="floating-nav">
            {
                /* Navigation to Home Page */
            }
            <div className="tc tile">
                <Link to={ postAuthPaths.HOME }>
                    <figure className="mb-0">
                        <img alt="Not Found" src="images/menu-1.svg" className="img-fluid" />
                    </figure>
                </Link>
            </div>
            {
                /* Navigation to Hub Page */
            }
            <div className="tc tile">
                <Link to={ postAuthPaths.BIO }>
                    <figure className="mb-0">
                        <img alt="Not Found" src="images/menu-2.png" className="img-fluid" />
                    </figure>
                </Link>
            </div>
            {
                /* Navigation to Forest Page */
            }
            <div className="tc center-tile f2">
                <Link to={ postAuthPaths.FOREST } className="fab">
                    <span>
                        <figure className="mb-0">
                            <img alt="Not Found" src="images/menu-3.svg" className="img-fluid" />
                        </figure>
                    </span>
                    <span className="badge">{ allowedTree > 0 ? allowedTree: 0 }</span>
                </Link>
            </div>
            {
                /* Navigation to Vlog Page */
            }
            <div className="tc tile">
                <Link to="/" onClick={ (event) => event.preventDefault() }>
                    <figure className="mb-0">
                        <img alt="Not Found" src="images/menu-4.svg" className="img-fluid" />
                    </figure>
                </Link>
            </div>
            {
                /* Navigation to Diners Page */
            }
            <div className="tc tile">
                <Link to={ postAuthPaths.DINERS }>
                    <figure className="mb-0">
                        <img alt="Not Found" src="images/menu-5.svg" className="img-fluid" />
                    </figure>
                </Link>
            </div>
        </div>
    );
};

export default FooterNavigator;
