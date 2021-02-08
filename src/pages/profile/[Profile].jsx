/******************************************
 *  Author : Suraj Sharma
 *  Created On : Mon Feb 08 2021
 *  File : Profile.jsx
 *******************************************/
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from 'react-share';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionCreators from '../../store/ActionCreators';
import authStatuses from '../../config/constants/AuthConstants'
// import PostAuthMap from '../postAuthMap/PostAuthMap'
import Images from '../../config/Images'

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    user: state.customerInfoReducer,
	trees: state.treesReducer,
});

const mapDispatchTopProps = (dispatch) => bindActionCreators(ActionCreators, dispatch);

const connector = connect(mapStateToProps, mapDispatchTopProps);

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true // See the "fallback" section below
    };
}

export async function getStaticProps(context) {
    const requestOptionsget = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({           
            'email': context.params.Profile
        })
    };
    const response = await fetch('https://dev-greenstand.sustainably.run/auth-api/manage_user_public', requestOptionsget);
    const result = await response.json();
    return {
      props: {apires: result, email: context.params.Profile}, // will be passed to the page component as props
    }
}

const Profile = (props) => {
    const shareUrl = typeof window !== 'undefined' && encodeURI(window.location.href);
    const [state, setState] = useState({
        bio: '',
        firstName: '',
        lastName: '',
        loading: false,
        profileIcon: Images.avatarPlaceHolder
    });
    const {auth, trees, fetchPlantedTreeCount, fetchAllowedTreeCount,} = props;
    const { authStatus } = auth;
    const { plantedTree } = trees;

    useEffect(()=>{
        if(typeof props.apires !== 'undefined' && !state.loading){
            setState({
                ...state,
                bio: props.apires?.data?.bio ?? '',
                firstName: props.apires?.data?.first_name ?? '',
                lastName: props.apires?.data?.last_name ?? '',
                profileIcon: props.apires?.data?.url? props.apires?.data?.url : Images.avatarPlaceHolder,
                loading: true
            });
            fetchPlantedTreeCount(props.email);
            fetchAllowedTreeCount(props.email);
        }
    },[props])

    return (
        <div>
            <Head>
                <title>{props.email}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>            
            <section className={ `${ authStatus !== authStatuses.AUTHENTICATED ? 'banner-sec': ''} profile-sec` }>
                <div className='social-links'>
                    <FacebookShareButton className='pull-right mr-1 mt-2' url={ shareUrl }>
                        <img alt="Facebook" src="../images/facebook.svg" width='25px' />
                    </FacebookShareButton>
                    <TwitterShareButton className='pull-right mr-2 mt-2' url={ shareUrl }>
                        <img alt="Facebook" src="../images/twitter.svg" width='25px' />
                    </TwitterShareButton>
                    <LinkedinShareButton className='pull-right mr-2 mt-2' url={ shareUrl }>
                        <img alt="Facebook" src="../images/linkedin.svg" width='25px' />
                    </LinkedinShareButton>
                </div>
                <div className="container-wrap">
                    <div className="content-wrap">
                        <div className="pro-img">
                            <figure className="mb-0">
                                <img src={ state.profileIcon }
                                     className="img-fluid"
                                     alt="Not found" />
                            </figure>
                        </div>
                        <div classsName ="profile-bio-edit">
                            { state.loading 
                                ? 
                                <h4 style = { { textTransform: 'capitalize' } }>
                                    { state.firstName ? `${ state.firstName } ${ state.lastName }'s Bio`: '' }
                                </h4> 
                                : 
                                <h4>Loading...</h4> 
                            }
                        </div>
                        <p >{ state.bio }</p>     
                        {/* { isLoggedIn && <button  type='button' className='edit-btn'> <a href= '/bio'>
                            <img src='images/edit-icon.svg' alt='Edit' title='Edit' /> </a>
                            </button> }                   */}
                        <div className="circle green-cl">
                            { state.loading ? <h6>{ plantedTree }<span>TREES PLANTED</span></h6> :<h6>...</h6> }
                        </div>
                        
                    </div>
               
                </div>
            </section>



            {/* <section className="map-sec">
                <figure className="mb-0">
                    <PostAuthMap />
                </figure>
            </section> */}

            <section className="aboutTree-sec">
                <div className="container-wrap">
                    <div className="content-wrap">
                        <h4>About GiftTrees</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales purus eget viverra
                            facilisis.
                            Integer porttitor mauris non luctus rhoncus.</p>
                        <button type="button" className="cmn-btn">Learn More</button>
                    </div>
                </div>
            </section>

            <section className="img-sec">
                <figure className="mb-0">
                    <img src="../images/img-1.png" className="img-fluid" alt="Not found" />
                </figure>
            </section>

            <footer>
                <div className="container-wrap">
                    <div className="footer-top">
                        <div className="footer-menu">
                            <div className="footer-logo">
                                <figure className="mb-0">
                                    <a href="#">
                                        <img src="/images/logo.png" className="img-fluid" alt="Not found" />
                                    </a>
                                </figure>
                            </div>
                        </div>
                        <div className="footer-button">
                            <button type="button" className="cmn-btn">CHOOSE YOUR TREE</button>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <span>A Not-For-Profit Social Enterprise Limited by Guarantee (Reg. No. 07745907)</span>
                    </div>
                </div>
            </footer>
        </div>
    )
};

export default connector(Profile);
