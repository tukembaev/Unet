import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "./CenteredTree.js";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './custom-tree.css';
import SlidingPaneUtil from "../../../../utils/SlidingPaneUtil";
import AddEmployeeForm from "../../../../components/Forms/StructureForm/AddEmployeeForm/AddEmployeeForm";
import userInfo from "../../../../utils/userInfo";

const containerStyles = {
  width: "80vw",
  height: "70vh",
};

const useStyles = makeStyles(
  createStyles({
    button: {
      fontFamily: "Nunito",
      fontWeight: "800",
      position: "relative",
      minWidth: "250px",
      borderRadius: "15px",
      minHeight:'100px',
      background: "white",
      color: "black",
      
      "& > span": {
        flexFlow: "column",
      },
      "& > p": {
        paddingLeft:'155px',
      },
      "&:hover": {
        background: "white",
      },
      "& > p:first-of-type": {
        display: "none",
      }
    },
    name: {
      fontSize: "16px",
      paddingBottom:'15px'
 
    },
    name_emp:{
      fontSize: "12px",
    },
    edit: {
      position: "absolute",
      fontSize: "12px",
      top: "5px",
      right: "15px",
      color: "#4BA083",
    },
    attributes: {
      position: "absolute",
      bottom: "5px",
      right: "10px",
    },
    statusTextCompleted: {
      display: "inline-block",
      color: "#131212",
      backgroundColor: "green",
      padding: "0 8px 0px 8px",
      fontSize: "10px",
      textDecoration: "none",
      fontWeight: "bold",
      borderRadius: "9px",
      border: "1px solid #e4e1e1",
    },
    statusTextPending: {
      display: "inline-block",
      color: "#131212",
      backgroundColor: "orange",
      padding: "0 8px",
      fontSize: "10px",
      textDecoration: "none",
      fontWeight: "bold",
      borderRadius: "9px",
      border: "1px solid #e4e1e1",
    },
    statusText: {
      display: "inline-block",
      color: "#131212",
      padding: "0 8px",
      fontSize: "10px",
      textDecoration: "none",
      fontWeight: "bold",


    },
    open:{
      marginLeft:'155px',
      color:"green"
    }

  })
);

// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.


export default function StructureTreeView({data , setRender}) {
  const classes = useStyles();

  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 300, y: 150 };
  const separation = { siblings: 2, nonSiblings: 2 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -125 , y: -55 };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
 
  const [state, setState] = useState({
   
    id:'',
    structure_name:'',
    title:'',
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isSubtasks = location.state?.isSubtasks;

  const handleOpen = () => {
    // Perform actions when the button is clicked
    setState({ isPaneOpen: true });
  };

  const buttonStyle = {
    background: 'rgba(219, 32, 32, 0.64)',
    border: 'none',
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
    fontFamily: '"Nunito", sans-serif',
    fontSize: '14px',
    borderRadius: '6px',
 
    marginTop:'15px',
    marginLeft:'15px',
  
  };
  

  return (
    <div style={containerStyles} ref={containerRef}>
 
        <Tree
        data={data ?? []}
        translate={translate}
        nodeSize={nodeSize}
        separation={separation}
        transitionDuration="1000"
        pathFunc="step"
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, classes , navigate , isSubtasks , setState ,width , state , setRender , data})
        }
        orientation="vertical"
      />
   
    </div>
  );
}

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  classes,
  setState,
  width,
  state,
  setRender,
  data,
  navigate, 
  isSubtasks
}) => {

  const user = userInfo()
  return(
  <>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    
    
    <foreignObject {...foreignObjectProps}>
      <Button
        className={classes.button}
        variant="contained"

      >
        {data.creator.includes(user.surName) ?  <p className={classes.open} onClick={() => setState({isPaneOpen: true , id:nodeDatum?.id , title:nodeDatum?.name, structure_name:nodeDatum?.structure_name })} >Добавить</p> : null}
      
        <p >{nodeDatum?.structure_name === 'organization' ? 'Организация' : nodeDatum?.structure_name === 'management' ? 'Управление' : nodeDatum?.structure_name === 'branch' ? 'Отдел' : 'Сектор'  }</p>
        <div className={classes.name}>{nodeDatum?.name}</div>
        
      
      
      </Button> 
    </foreignObject>
    {width > 1000 ? (
          <>
            <SlidingPaneUtil
              size="900px"
              title="Отдел кадров"
              state={state}
              setState={setState}
              onRequestClose={() => {
                // triggered on "<" on left top click or on outside click
                setState({ isPaneOpen: false });
              }}
            >
              {" "}

           <AddEmployeeForm data = {{id:state?.id , title:state?.title , structure_name:state?.structure_name }} setRender ={setRender} setState = {setState} />
            </SlidingPaneUtil>
           
          </>
        ) : (
          <>
            <SlidingPaneUtil
              size="100%"
              title="Отдел кадров"
              state={state}
              setState={setState}
              onRequestClose={() => {
                // triggered on "<" on left top click or on outside click
                setState({ isPaneOpen: false });
              }}
            >
              {" "}
              <AddEmployeeForm data = {{id:state?.id , title:state?.title , structure_name:state?.structure_name }} setRender ={setRender} setState ={setState}/>
            </SlidingPaneUtil>
     
          </>
        )}

  </>
)

};