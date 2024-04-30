import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./org-chart.json";
import { useCenteredTree } from "./CenteredTree.js";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import { Edit, AttachMoney, Accessible } from "@material-ui/icons";
import air from "./../../assets/img/air.jpg";
import Icon from '@mui/material/Icon';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getSubTaskTree, getTaskTree } from "../../service/TaskService";
import { setTaskTree } from "../../store/slices/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import styles from './../../components/Forms/ChatForm/ChatForm.module.scss'
import './custom-tree.css';
 const backgroundImage =  localStorage.getItem("bacground")
const containerStyles = {
  width: "100vw",
  height: "100vh",
  
  backgroundImage:`url(${backgroundImage})` , objectFit: 'cover'
};

const useStyles = makeStyles(
  createStyles({
    button: {
      fontFamily: "Nunito",
      fontWeight: "800",
      position: "relative",
      width: "250px",
      borderRadius: "15px",
    
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
      fontSize: "12px",
      borderBottom: "1px solid black",
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
      paddingLeft:'155px',
      color:"green"
    }

  })
);

// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.


export default function TaskTree() {
  const classes = useStyles();
  const [data , setData] = useState({})
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 300, y: 250 };
  const separation = { siblings: 2, nonSiblings: 2 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -125 , y: -55 };
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isSubtasks = location.state?.isSubtasks;
  const getData = async () => {
    try {
     if (isSubtasks) {
      let response = await getSubTaskTree(id, data);
      dispatch(
        setTaskTree({
          task_tree: response.data,
        })
      );
    setData(response.data)

     }
     else{
      let response = await getTaskTree(id, data);
      dispatch(
        setTaskTree({
          task_tree: response.data,
        })
      );
    setData(response.data)

     }
      

  
    } catch (error) {
      
  
    }
  };
  const treeData = useSelector((state) => state?.task?.task_tree);
  useEffect(() => {
    getData();
    const button = document.querySelector('foreignObject button');
    const firstParagraph = button.querySelector('p:first-of-type');
    firstParagraph.style.display = 'none';
  }, []);

  const buttonStyle = {
    background: 'rgba(219, 32, 32, 0.64)',
    border: 'none',
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
    fontFamily: '"Nunito", sans-serif',
    fontSize: '14px',
    borderRadius: '6px',
    transition: '0.3s',
    marginTop:'15px',
    marginLeft:'15px',
    "&:hover": {
      background: "#d1f071"
    }
  };
  
  

  return (
    <div   style={containerStyles} ref={containerRef}>
      <Button onClick={() => navigate(-1)} style={buttonStyle}> Назад </Button>
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
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, classes , navigate , isSubtasks})
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
  navigate, 
  isSubtasks
}) => {

  return(
  <>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    
    
    <foreignObject {...foreignObjectProps}>
      <Button
        className={classes.button}
        variant="contained"
        onClick={toggleNode}
      >
        <p className={classes.open} onClick={() => navigate(`/subtask/${nodeDatum.id}/`)}>Открыть</p>
        <div className={classes.name}>{nodeDatum?.name}</div>
        <div className={classes.name_emp}>{nodeDatum?.attributes?.instructor}</div>
        {nodeDatum?.attributes?.status === "Завершена" ? (
          <div className={classes.statusTextCompleted}>
            Статус: {nodeDatum?.attributes?.status}
          </div>
        ) : nodeDatum?.attributes?.status === "В процессе выполнения" ? (
          <div className={classes.statusTextPending}>
            Статус: {nodeDatum?.attributes?.status}
          </div>
        ) : (
          <div className={classes.statusText}>
            Статус: {nodeDatum?.attributes?.status}
          </div>
        )}
      
      </Button> 
    </foreignObject>
  </>
)

};