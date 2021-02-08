/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/******************************************
 *  Author : Suraj Sharma
 *  Created On : Mon Dec 28 2020
 *  File : Commons.jsx
 *******************************************/
import React from 'react';
import PropTypes from 'prop-types';
import Map from 'google-map-react';
import CustomMapJson from '../../assets/CustomMap.json';
import Images from '../../config/Images';
import './Commons.css';
import {Colors} from '../../styles';

/* -----CustomTextInput BEG-----*/
const CustomTextInput = ({
	type, 
	placeholder, 
	className, 
	onChange, 
	onFocus, 
	onBlur,
	timeStep,
	error,
	errorMessage,
	inputStyle
}) => {

	const popRef = React.useRef();
	React.useEffect(()=>{
		if(error){
			// $(popRef.current).popover('show');
			// console.log('open popover');
		}else{
			// $(popRef.current).popover('hide');			
			// console.log('close popover');
		}
	},[error])

	const onChangeHandler = (event) => {
		onChange(event);
	};

	const onLocalFocus = (e) => {
		if (onFocus != null) {
			onFocus(e);
		} else {
			e.currentTarget.type = type;
		}
	};

	const onLocalBlur = (e) => {
		if (onBlur != null) {
			onBlur(e);
		} else if(type!=='password') {
			e.currentTarget.type = 'text';
		}
	};

	return (
    <div className="form-group" style={ {display: 'flex', flexDirection: 'column', alignItems: 'center'} }>
        <input
			type="text"
			placeholder={ placeholder.toUpperCase() }
			className={ className }
			onChange={ onChangeHandler }
			onFocus={ onLocalFocus }
			onBlur={ onLocalBlur }
			step={ type === 'time' ? timeStep : null }
			style={ inputStyle }
		/>
        {
			error && (
				<span ref={ popRef } style={ {color:Colors.GOOGLE_RED, fontSize: 14, fontWeight: 'bold', letterSpacing: 0.8} }>
    				{errorMessage}
				</span>
			)
		}
    </div>
	);
};

CustomTextInput.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	timeStep: PropTypes.number,
	error: PropTypes.bool,
	errorMessage: PropTypes.string,
	inputStyle: PropTypes.instanceOf(Object)
};

CustomTextInput.defaultProps = {
	type: 'text',
	placeholder: 'PlaceHolder',
	className: null,
	onChange: (e) => console.log(e),
	onFocus: null,
	onBlur: null,
	timeStep: 60,
	error: false,
	errorMessage: 'Please fill the field!',
	inputStyle: {}
};

/* -----CustomTextInput END-----*/

/* -----CustomButton BEG-----*/
const CustomButton = ({name, className, onClick}) => {
	const onClickHandler = (event) => {
		onClick(event);
	};

	return (
    <button type="button" className={ className } onClick={ onClickHandler }>
        {name}
    </button>
	);
};

CustomButton.propTypes = {
	name: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

CustomButton.defaultProps = {
	name: 'Button',
	className: 'cmn-btn',
	onClick: (e) => console.log(e),
};

/* -----CustomButton END-----*/

/* -----CustomMarker START-----*/

const CustomMarker = ({isSelected, isAnimated, isCluster, clusterCount, onClick}) => {
	let imageSrc = '';
	if(isSelected){
		if(isAnimated){
			imageSrc = Images.markerSelectedAnim
		}else{
			imageSrc = Images.markerSelected
		}
	}
	else if(isAnimated) {
		imageSrc = Images.markerNormalAnim
	}
	else {
		imageSrc = Images.markerNormal
	}

	const onLocalClick = (e) => {
		onClick();
	}

	return(
		isCluster
		?
		<div 
			className="clusterContainer" 
			onClick={ onLocalClick } 
			role="button" 
			tabIndex={ 0 } 
			onKeyDown={ ()=>{} }
		>
			<div className="clusterSpan">
				{clusterCount}
			</div>
		</div>
		:
		<div
			onClick={ onLocalClick }
			role="button" 
			tabIndex={ 0 } 
			onKeyDown={ ()=>{} }
			style={ {cursor: 'pointer'} }
		>
			<img
				src={ imageSrc } 
				style={ {width: 43, height: 40} } 
				alt="Custom Marker"
			/>
		</div>
	);
}

CustomMarker.propTypes = {
	isSelected: PropTypes.bool,
	isAnimated: PropTypes.bool,
	isCluster: PropTypes.bool,
	clusterCount: PropTypes.number,
	onClick: PropTypes.func
};

CustomMarker.defaultProps = {
	isSelected: false,
	isAnimated: false,
	isCluster: false,
	clusterCount: 0,
	onClick: ()=>console.log('clicked')
};

/* -----CustomMarker END-----*/

/* -----CustomMap START-----*/

const CustomMap = ({
	mapRef,
	centerCoordinate,
	markerCoordinates,
	onClickMarker, 
	onMapReady,
	onChange,
	children
}) => {

	const createMapOptions = (maps) => ({
			styles: CustomMapJson,
			minZoom: 2,
			maxZoom: 22,
			panControl: false,
			mapTypeControl: false,
			fullscreenControl: false,
			zoomControl: false
		})
	
	const getCornerPoints = (map) => {
		onChange(map);
	}
	
	const onLocalMapReady = (map, maps) => {
		onMapReady(map, maps);
		/**
		 * TODO: mapRef.current.map_ === map
		 */
	}

	return (
    <div style={ { height: '100vh', width: '100%' } }>
        <Map
			yesIWantToUseGoogleMapApiInternals
			ref={ mapRef }
			bootstrapURLKeys={ { key: 'AIzaSyC1Lj_yyEYasJIe0g6Qlq6mIwYE-_wRzu4' } }
			defaultCenter={ centerCoordinate }
			defaultZoom={ 6 }
			onChange = { getCornerPoints }
			onGoogleApiLoaded={ ({map, maps}) => onLocalMapReady(map, maps) }
			options= { createMapOptions }
		>
            {children && children}
        </Map>
    </div>
	);
};

CustomMap.propTypes = {
	mapRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]),
	centerCoordinate: PropTypes.instanceOf(Object),
	markerCoordinates: PropTypes.instanceOf(Array),
	onClickMarker: PropTypes.func,
	onMapReady: PropTypes.func,
	onChange: PropTypes.func,
	children: PropTypes.node
};

CustomMap.defaultProps = {
	mapRef: {},
	centerCoordinate: {},
	markerCoordinates: [],
	onClickMarker: (e) => console.log(e),
	onMapReady: (e) => console.log(e),
	onChange: (e) => console.log(e),
	children: null
};

/* -----CustomMap END-----*/

/* -----CustomModal BEG-----*/

/**
 * 
 * @param modalRef
 * @param modalTitle
 * @param modalBody
 * @param showModalFooter
 * @param onClose
 * 
 * You can show/hide modal using `$(modalRef.current).modal('show');`
 */
const CustomModal = ({modalRef, modalTitle, children, showModalFooter, onClose}) => {
	const onLocalClose = (e) => {
		onClose(e);
	};

	return (
    <div className="modal" ref={ modalRef } tabIndex="-1" role="dialog" data-backdrop="static">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{modalTitle}</h5>
                    <button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							onClick={ onLocalClose }>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                {showModalFooter && (
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary">
                        Save changes
                    </button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                        Close
                    </button>
                </div>
					)}
            </div>
        </div>
    </div>
	);
};

CustomModal.propTypes = {
	modalRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	  ]),
	modalTitle: PropTypes.string,
	children: PropTypes.node,
	showModalFooter: PropTypes.bool,
	onClose: PropTypes.func,
};

CustomModal.defaultProps = {
	modalRef: null,
	modalTitle: 'This is Modal Title',
	children: null,
	showModalFooter: 'true',
	onClose: ()=>null,
};

/* -----CustomModal END-----*/

/* -----TreeCounter BEG-----*/

/**
 * 
 * @param message
 * @param enabledBtn
 * @param onClick
 * 
 */

const TreeCounter = ({message, enabledBtn, onClick}) => {
	const cursor = enabledBtn ? 'pointer' : 'default';
	const backgroundColor = enabledBtn ? '#7dffcd' : '#041a17';
	const color = enabledBtn ? '#242424' : '#ffffff';
	return(
		message && (
			<div className="counterContainer">
				<div 
					role="button"
					tabIndex={ 0 } 
					className="counter" 
					onKeyDown={ ()=>{} }
					onClick={ enabledBtn ? onClick : ()=>{} } 
					style={ {cursor, backgroundColor, color} }
				>
					<img src={ Images.markerSelectedAnim } alt="marker selected" style={ {width: 30, height: 30} } />
					<span className="counterMessage">{message}</span>
				</div>
			</div>
		)
	);
}

TreeCounter.propTypes = {
	message: PropTypes.string,
	enabledBtn: PropTypes.bool,
	onClick: PropTypes.func
};

TreeCounter.defaultProps = {
	message: '',
	enabledBtn: false,
	onClick: (e)=>console.log(e)
};

/* -----TreeCounter END-----*/

/* -----CustomNotification BEG-----*/

/**
 * 
 * @param notificationRef
 * @param notificationTitle
 * @param notificationMessage
 * @param onAcceptNotification
 * 
 * You can show/hide modal using `$(notificationRef.current).modal('show');`
 */
const CustomNotification = ({
	notificationRef, 
	notificationTitle, 
	notificationMessage, 
	onAcceptNotification
}) => {
	const onLocalAcceptNotification = (e) => {
		onAcceptNotification(e);
	};

	return (
    <div className="modal" ref={ notificationRef } tabIndex="-1" role="dialog" data-backdrop="static">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{notificationTitle}</h5>
                    <button
						type="button"
						className="close"
						data-dismiss="modal"
						aria-label="Close"
					>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {notificationMessage}
                </div>
                <div className="modal-footer">
					<button 
						type="button" 
						className="acceptButtonNotice" 
						onClick={ onLocalAcceptNotification }
						data-dismiss="modal"
					>
                        Yes
                    </button>
					<button 
						type="button" 
						className="rejectButtonNotice" 
						data-dismiss="modal"
					>
                        No
                    </button>
                </div>				
            </div>
        </div>
    </div>
	);
};

CustomNotification.propTypes = {
	notificationRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	  ]),
	notificationTitle: PropTypes.string,
	notificationMessage: PropTypes.string,
	onAcceptNotification: PropTypes.func,
};

CustomNotification.defaultProps = {
	notificationRef: null,
	notificationTitle: 'Warning',
	notificationMessage: null,
	onAcceptNotification: ()=>null,
};

/* -----CustomNotification END-----*/

/* -----CustomLoader BEG-----*/

/**
 * 
 * @param showLoader
 * 
 */

const CustomLoader = ({
	showLoader
}) => (
		showLoader && (
			<div className="loaderContainer">
				<div className="loader" />
			</div>			
		)
	);

CustomLoader.propTypes = {
	showLoader: PropTypes.bool,
};

CustomLoader.defaultProps = {
	showLoader: false,
};

/* -----CustomLoader END-----*/


export {
	CustomTextInput, 
	CustomButton, 
	CustomMap, 
	CustomMarker, 
	CustomModal, 
	TreeCounter, 
	CustomNotification,
	CustomLoader
};
