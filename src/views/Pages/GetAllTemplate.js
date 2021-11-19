
import './MailChampEdit.css';
//import imgLogo from './image/dummylogo.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubCtrl from "../Subscription/subCtrl/subscriptionCtrl";
import swal from "sweetalert";
import { PinDropSharp } from '@material-ui/icons';
import config from '../../config/Config';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));


function GetAllTemplate(props) {
   const classes = useStyles();

    // const [data,setData] = useState([]);
    // var userId = localStorage.getItem("userId");
    // useEffect(()=>{
    //     SubCtrl.getAllTem(userId,(result) => {
    //         console.log("result", result)
    //         // if (result.data.status === true) {
    //         //     swal({
    //         //         title: "Congratulations!",
    //         //         text: "You are successfully updated Mailchimp template",
    //         //         icon: "success",
    //         //     });
    //         // }
    //     })
    // },[])

    const [data,setData] = useState([]);
    const [click,setClick] = useState(false);
    const [msg,setMsg] = useState('');
    
    var userId = localStorage.getItem("userId");

     const fetchData = ()=>{
      axios.get(config.baseUrl+`/mailchimp/getAllTemplatenew/${userId}`)
      .then(res2=>{
          console.log("hello",res2);
          if(res2.data.msgEmpty){
            console.log("hello",res2.data.msgEmpty);
            setMsg(res2.data.msgEmpty)
          }else{
            console.log("hello1",res2.data.dataa);
            setData(res2.data.dataa);
          }
      })
     }
     
     

      useEffect(()=>{
         fetchData()
      },[])

    const handleClick = (id)=>{
       //props.history.push('/home/user/updateTemplate/'+id)
      // var userId = localStorage.getItem("userId");
      //setClick(true)
       console.log("userrrrrrrrrrrrrrid",userId)
      props.history.push(`/home/user/updateTemplate/${id}/${userId}`)
    }
    
   const btnClick = ()=>{
       console.log("btn clicked",props)
       props.history.push('/home/user/mailchampEdit')
    }

    if(msg){
       return(
         <div>
            <div style={{marginTop:'10px',display:'flex',justifyContent:'center',backgroundColor:'#FFFFFF'}}>
               
               {/* <button className="fa fa-plus" style={{marginLeft:'20px',width:'150px',border:'none',height:'40px',borderRadius:'10px',backgroundColor:'#c2c0ba'}} onClick={btnClick}>Add new Template</button> */}
                 <div className={classes.root} style={{paddingTop:'6px'}}>
                   <Button variant="contained" onClick={btnClick} >Create New Template</Button>
                 </div>
             </div>

             <div style={{backgroundColor:'#FFFFFF',paddingBottom:'3px'}}>
                <p style={{color:'grey',textAlign:'center'}}>Note: You must share your MailChimp API key with us in the "Automation"</p>
              </div>
            <h3 style={{textAlign:'center',marginTop:'50px'}}>
               {msg}
            </h3>
         </div>
       )
    }else{
      return(
         <div>
              <div style={{marginTop:'10px',display:'flex',justifyContent:'center',backgroundColor:'#FFFFFF'}}>
               
                {/* <button className="fa fa-plus" style={{marginLeft:'20px',width:'150px',border:'none',height:'40px',borderRadius:'10px',backgroundColor:'#c2c0ba'}} onClick={btnClick}>Add new Template</button> */}
                  <div className={classes.root} style={{paddingTop:'6px'}}>
                    <Button variant="contained" onClick={btnClick} >Create New Template</Button>
                    
                  </div>
                  {/* https://lh3.googleusercontent.com/proxy/Dtm9AZXLWk745MzGYXASGvLlz-3W82SyLAdZfpyQ3ASIMSGzYmVCsytcfhX4rt18AT6jUOjRL9fNZVAYQghkRXCfmmME0Hw */}
           </div>
              <div style={{backgroundColor:'#FFFFFF',paddingBottom:'3px'}}>
                <p style={{color:'grey',textAlign:'center'}}>Note: You must share your MailChimp API key with us in the "Automation"</p>
              </div>
          
              <div style={{marginBottom:'10px'}}>
               { data.map( i=>{
                  return(
                        <div className="templateList" key={i.dbData.cid} onClick={()=>handleClick(i.dbData.cid)}>
                           {/* <div>
                           <img src = {i.mergerData[0].thumbnail} width="40px" height="60px"/>
                           </div> */}

                          <div>
                            {i.mergerData[0].thumbnail.length>0?<img src = {i.mergerData[0].thumbnail} width="40px" height="60px"/>:<img src="https://images.squarespace-cdn.com/content/v1/5582db64e4b09b3f6898ebef/1470165607653-ARNBWIVGMS8JPNG4G08M/ke17ZwdGBToddI8pDm48kH_abICRJFv0ptM-Cl6rZF97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmD3GJgI7_jN764QbmlaUTk-9pxDM3h2MXximiiGT1gAhLFWIRGvNMI4MAiccfwiRD/blank-staff-12" width="40px" height="60px" style={{border:"1px solid #EEEEEE" ,marginBottom:"2px"}}/>}
                           </div>
                        
                           <div style={{marginLeft:'10px'}}>
                              <h3>{i.mergerData[0].name}</h3>
                              <p style={{fontSize:'10px',fontWeight:'bold'}}>created on {i.mergerData[0].date_created} by {i.mergerData[0].created_by}</p>
                              <input type="hidden" name="userId" value={userId}/>
                           </div>
                        </div>
                  )
               })}
              </div>
         </div>
       )
    }
 }




export default GetAllTemplate;

