import React from 'react'
import styles from './../components/Navbar/Navbar.module.scss'
import SlidingPane from "react-sliding-pane";
import './../styles/react-sliding-pane-custom.css'
import close from './../assets/icons/close.png'
const SlidingPaneUtil = ({children , state, setState , title , size }) => {

  return (
    <> 
    
        <SlidingPane
            className={styles.some_custom_class2}
            overlayClassName={styles.some_custom_overlay_class2}
            isOpen={state.isPaneOpen}
            title={title}
            
            width={size}
            hideHeader={true}
            shouldCloseOnEsc={true}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              setState({ isPaneOpen: false , } );
            }}
          >
            <div className = {styles.sliding_pane_header} >
             <img src={close} style={{width:'25px' , height:'25px' , cursor:'pointer' , marginTop:'20px'}} alt="" onClick={() => {
       setState({ isPaneOpen: false} );
     }}/>
 
            <h2 style={{color:'white',paddingTop:'15px'}}>{title}</h2>
            </div>
           {children}
          </SlidingPane>
    </>
  )
}

export default SlidingPaneUtil