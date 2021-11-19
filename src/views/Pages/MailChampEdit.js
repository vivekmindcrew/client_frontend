import './MailChampEdit.css';
//import imgLogo from './image/dummylogo.jpg';
import React, { useState, useEffect, useHistory } from 'react';
import axios from 'axios';
import SubCtrl from "../Subscription/subCtrl/subscriptionCtrl";
import swal from "sweetalert";


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function MailChampEdit(props) {
  const classes = useStyles();

  //const [logo,setLogo] = useState('');
  const [logo, setLogo] = useState({ preview: "", raw: "" });

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [content, setContent] = useState("Hi *|FNAME|*, need legal assistance?");
  const [content1, setContent1] = useState("I found your name listed on the *|COUNTY|* Sheriffs database, where it was listed that you were recently arrested for a *|CHARGE|* charge. If you are already represented by an attorney or have resolved this matter, please disregard this email.")
  const [content2, setContent2] = useState("If not, don’t worry – ________Attorney at Law is here to help. You need a seasoned law firm that is going to care about you and the fight you are in. Weve represented people in your position, and worse, for __ years.");
  const [content3, setContent3] = useState("Schedule a consultation to discuss how we can tackle your defense and get you the best case result.");
  const [content4, setContent4] = useState("Our lawyers will listen to your side of the story, take time to understand your goals, and use their experience to help you navigate the often treacherous waters of our criminal justice system. We know what it takes to build and present a solid and compelling case, and thats exactly what we do. Vigorously and earnestly, we tackle the most complex challenges and pursue your goals with creativity and determination.");
  const [content5, setContent5] = useState("We offer no-cost consultations over the phone, Zoom, or in our conveniently located offices. Let our firm help you get this matter dismissed or downgraded. Contact us today at (xxx) xxx-xxxx to discuss your case with one of our attorneys.");

  const [content6, setContent6] = useState("Sincerely");
  const [content7, setContent7] = useState("ATTORNEY NAME");
  const [content8, setContent8] = useState("LAW FIRM");
  const [content9, setContent9] = useState("ADDRESS");
  const [content10, setContent10] = useState("Copyright © 2021 LAW FIRM, All rights reserved.");
  const [content11, setContent11] = useState("LAW FIRM ADDRESS");

  var userId = localStorage.getItem("userId");

  const handleChange = e => {
    if (e.target.files.length) {
      setLogo({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleSubmit = async () => {
    
    const datanew = new FormData();

    // datanew.append("file",logo) ;

    datanew.append("file", logo.raw);
    datanew.append("content", content);
    datanew.append("content1", content1);
    datanew.append("content2", content2);
    datanew.append("content3", content3);
    datanew.append("content4", content4);
    datanew.append("content5", content5);

    datanew.append("content6", content6);
    datanew.append("content7", content7);
    datanew.append("content8", content8);
    datanew.append("content9", content9);
    datanew.append("content10", content10);
    datanew.append("content11", content11);
     
    datanew.append("url", url);

    datanew.append("userId", userId);


    SubCtrl.createTem(datanew, (result) => {
      console.log("result", result)
          if (result.data.status === true) {
                swal({
                  title: "Congratulations!",
                  text: "Template created successfully ",
                  icon: "success",
                });
               
          }
          props.history.push('/home/user/getAllTemplate')    
    })
    
}


return (
  <div className="MailChampEdit">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <p className="headingtemp" style={{ textAlign: 'center', padding: '10px' }}>Add your Template</p>
      {/* <button onClick={handleSubmit} style={{ width: "80px",marginTop:'12px',fontSize: '15px',border:'none',height:'40px',borderRadius:'10px',backgroundColor:'#c2c0ba'}}>Save</button> */}
      <div className={classes.root} style={{paddingTop:'6px'}}>
        <Button variant="contained" onClick={handleSubmit} >Save</Button>
      </div>
    </div>
    {/* <div className="templateHeader">
     
    </div> */}

    <div className="templateHeader">

     <div style={{width:'13%',margin:'auto',display:'flex',justifyContent:'center'}}>
        <label htmlFor="upload-button">
                {logo.preview ? (
                  // <div><img src={logo.preview} alt="dummy"  height="270px" width="650px"/></div>
                  <div><img src={logo.preview} alt="dummy" className="logoimage" /></div>
                ) : (
                  <>
                    <div style={{margin:'auto',width:'43%'}}><span className="fa fa-plus fa-4x"  ></span></div>
                    <p className="logotext text-center" style={{color:'#3e5b77',fontSize:'12px',marginLeft:'10px'}}>Upload your Logo</p>
                  </>
                )}
              </label>
              <input
                type="file"
                id="upload-button"
                style={{ display: "none",justifyContent:'center'}}
                onChange={handleChange}
              />
          <br /> 
     </div>
     
    </div>


    <div style={{ marginTop: '30px'}}>
      <div className="legalassistance">

        <div style={{ marginLeft: '12px', marginTop: '6px'}}>

          <textarea value={content} className="field1 textarea" style={{fontWeight:'bold',fontSize: '12px'}} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div style={{ marginLeft: '12px', marginTop: '10px' }}>

          <textarea wrap='soft' value={content1} className="field2 textarea" style={{fontSize:'10px'}} onChange={(e) => setContent1(e.target.value)}></textarea>
        </div>
        <div style={{ marginLeft: '12px', marginTop: '7px' }}>

          <textarea wrap='soft' value={content2} className="field3 textarea" style={{fontSize:'10px'}} onChange={(e) => setContent2(e.target.value)}></textarea>
        </div>
        <div style={{ marginLeft: '12px', marginTop: '7px' }}>

          <textarea wrap='soft' value={content3} className="field4 textarea" style={{fontWeight:'bold',fontSize: '12px'}} onChange={(e) => setContent3(e.target.value)}></textarea>
        </div>
      </div>
    </div>
   {/* <h2>{url}</h2> */}
    <div style={{ textAlign: 'center', marginTop: '20px' ,display:'flex',justifyContent:'center'}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className='anchorbutton'>
          Schedule Attorney Consultation
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Schedule Attorney Consultation URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter url"
            fullWidth
            onChange={(e) => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>






    <div style={{ marginTop: '30px' }}>
      <div className="legalassistance">

        <div style={{ marginLeft: '12px', marginTop: '10px' }}>
          <textarea wrap='soft' value={content4} className="field5 textarea" style={{fontSize: '10px'}} onChange={(e) => setContent4(e.target.value)}></textarea>
        </div>

        <div style={{ marginLeft: '12px', marginTop: '10px' }}>
          <textarea wrap='soft' value={content5} className="field6 textarea" style={{fontSize: '10px'}} onChange={(e) => setContent5(e.target.value)}></textarea>

          <div style={{  marginTop: '10px' }}>
            <textarea wrap='soft' value={content6} className="singleLine textarea" style={{fontSize: '10px'}} onChange={(e) => setContent6(e.target.value)}></textarea>
            <textarea wrap='soft' value={content7} className="singleLine textarea" style={{fontSize: '10px'}} onChange={(e) => setContent7(e.target.value)}></textarea>
            <textarea wrap='soft' value={content8} className="singleLine textarea" style={{fontSize: '10px'}} onChange={(e) => setContent8(e.target.value)}></textarea>
            <textarea wrap='soft' value={content9} className="singleLine textarea" style={{fontSize: '10px'}} onChange={(e) => setContent9(e.target.value)}></textarea>
          </div>

        </div>
      </div>

      <div style={{ marginTop: '30px', backgroundColor: '#FFFFFF', paddingTop: '20px', paddingBottom: '20px' }}>
        <div >
          <hr style={{  border: '1px solid ' }} className="linehr"/>
        </div>

        <div style={{ marginTop: '20px' }}>
                          {/* <p style={{ textAlign: 'center', fontStyle: 'italic', lineHeight: '6px',fontSize:'12px'}}>Copyright © 2021 LAW FIRM, All rights reserved.</p> */}
                          <div style={{  marginTop: '10px' ,display:'flex',justifyContent:'center'}}>
                               <textarea wrap='soft' value={content10} className="lastcontainer" style={{ textAlign:'center' ,color: '#3e5b77', backgroundColor: '#FFFFFF',   border: 'none',  padding: "10px" }} onChange={(e) => setContent10(e.target.value)}></textarea>
                           </div>
                          <p style={{ marginTop:'10px',textAlign: 'center', fontWeight: 'bold', lineHeight: '6px',fontSize:'12px' }} className="lastparagraph">Our mailing address is:</p>
                          {/* <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }}>LAW FIRM ADDRESS</p> */}
                          <div style={{  marginTop: '10px' ,display:'flex',justifyContent:'center'}}>
                               <textarea wrap='soft' value={content11} className="lastcontainer" style={{ textAlign:'center' ,color: '#3e5b77', backgroundColor: '#FFFFFF',  height: '40px', border: 'none',  padding: "10px" }} onChange={(e) => setContent11(e.target.value)}></textarea>
                           </div>
                          <p style={{ textAlign: 'center' ,marginTop:'10px'}} className="lastparagraph">Want to change how you receive these emails?</p>
                          <p style={{ textAlign: 'center', lineHeight: '6px' }} className="lastparagraph">You can update your preferences or unsubscribe from this list.</p>
                      </div>

      </div>


    </div>
  </div>
);


}

export default MailChampEdit;













































// import './MailChampEdit.css';
// //import imgLogo from './image/dummylogo.jpg';
// import React, { useState, useEffect, useHistory } from 'react';
// import axios from 'axios';
// import SubCtrl from "../Subscription/subCtrl/subscriptionCtrl";
// import swal from "sweetalert";


// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
// //import TextField from '@material-ui/core/TextField';

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));


// function MailChampEdit(props) {
//   const classes = useStyles();

//   //const [logo,setLogo] = useState('');
//   const [logo, setLogo] = useState({ preview: "", raw: "" });

//   const [open, setOpen] = useState(false);
//   const [url, setUrl] = useState('');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const [content, setContent] = useState("Hi *|FNAME|*, need legal assistance?");
//   const [content1, setContent1] = useState("I found your name listed on the *|COUNTY|* Sheriffs database, where it was listed that you were recently arrested for a *|CHARGE|* charge. If you are already represented by an attorney or have resolved this matter, please disregard this email.")
//   const [content2, setContent2] = useState("If not, don’t worry – ________Attorney at Law is here to help. You need a seasoned law firm that is going to care about you and the fight you are in. Weve represented people in your position, and worse, for __ years.");
//   const [content3, setContent3] = useState("Schedule a consultation to discuss how we can tackle your defense and get you the best case result.");
//   const [content4, setContent4] = useState("Our lawyers will listen to your side of the story, take time to understand your goals, and use their experience to help you navigate the often treacherous waters of our criminal justice system. We know what it takes to build and present a solid and compelling case, and thats exactly what we do. Vigorously and earnestly, we tackle the most complex challenges and pursue your goals with creativity and determination.");
//   const [content5, setContent5] = useState("We offer no-cost consultations over the phone, Zoom, or in our conveniently located offices. Let our firm help you get this matter dismissed or downgraded. Contact us today at (xxx) xxx-xxxx to discuss your case with one of our attorneys.");

//   const [content6, setContent6] = useState("Sincerely");
//   const [content7, setContent7] = useState("ATTORNEY NAME");
//   const [content8, setContent8] = useState("LAW FIRM");
//   const [content9, setContent9] = useState("ADDRESS");
//   const [content10, setContent10] = useState("Copyright © 2021 LAW FIRM, All rights reserved.");
//   const [content11, setContent11] = useState("LAW FIRM ADDRESS");

//   var userId = localStorage.getItem("userId");

//   const handleChange = e => {
//     if (e.target.files.length) {
//       setLogo({
//         preview: URL.createObjectURL(e.target.files[0]),
//         raw: e.target.files[0]
//       });
//     }
//   };

//   const handleSubmit = async () => {
    
//     const datanew = new FormData();

//     // datanew.append("file",logo) ;

//     datanew.append("file", logo.raw);
//     datanew.append("content", content);
//     datanew.append("content1", content1);
//     datanew.append("content2", content2);
//     datanew.append("content3", content3);
//     datanew.append("content4", content4);
//     datanew.append("content5", content5);

//     datanew.append("content6", content6);
//     datanew.append("content7", content7);
//     datanew.append("content8", content8);
//     datanew.append("content9", content9);
//     datanew.append("content10", content10);
//     datanew.append("content11", content11);
     
//     datanew.append("url", url);

//     datanew.append("userId", userId);


//     SubCtrl.createTem(datanew, (result) => {
//       console.log("result", result)
//           if (result.data.status === true) {
//                 swal({
//                   title: "Congratulations!",
//                   text: "Template created successfully ",
//                   icon: "success",
//                 });
               
//           }
//           props.history.push('/home/user/getAllTemplate')    
//     })
    
// }


// return (
//   <div className="MailChampEdit">
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <h1 style={{ textAlign: 'center', padding: '10px' }}>Add your Template</h1>
//       {/* <button onClick={handleSubmit} style={{ width: "80px",marginTop:'12px',fontSize: '15px',border:'none',height:'40px',borderRadius:'10px',backgroundColor:'#c2c0ba'}}>Save</button> */}
//       <div className={classes.root} style={{paddingTop:'6px'}}>
//         <Button variant="contained" onClick={handleSubmit} >Save</Button>
//       </div>
//     </div>
//     {/* <div className="templateHeader">
     
//     </div> */}

//     <div className="templateHeader">

//      <div style={{width:'13%',margin:'auto',display:'flex',justifyContent:'center'}}>
//         <label htmlFor="upload-button">
//                 {logo.preview ? (
//                   // <div><img src={logo.preview} alt="dummy"  height="270px" width="650px"/></div>
//                   <div><img src={logo.preview} alt="dummy"  style={{minHeight:'100px',maxHeight:'100px',width:'auto'}}/></div>
//                 ) : (
//                   <>
//                     {/* <span className="fa-stack fa-2x mt-3 mb-2">
//                       <i className="fas fa-circle fa-stack-2x" />
//                       <i className="fas fa-store fa-stack-1x fa-inverse" />
//                     </span> */}
//                     <div style={{margin:'auto',width:'43%'}}><span className="fa fa-plus fa-4x"  ></span></div>
//                     <h5 className="text-center" style={{color:'#3e5b77',fontSize:'12px',marginLeft:'10px'}}>Upload your Logo</h5>
//                   </>
//                 )}
//               </label>
//               <input
//                 type="file"
//                 id="upload-button"
//                 style={{ display: "none",justifyContent:'center'}}
//                 onChange={handleChange}
//               />
//           <br /> 
//      </div>
     
//     </div>


//     <div style={{ marginTop: '30px' }}>
//       <div className="legalassistance">

//         <div style={{ marginLeft: '12px', marginTop: '6px',}}><textarea value={content} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', fontSize: '15px', fontWeight: 'bold', padding: "10px", width: "630px", height: "50px", border: 'none' }} onChange={(e) => setContent(e.target.value)}></textarea></div>
//         <div style={{ marginLeft: '12px', marginTop: '10px' }}>

//           <textarea wrap='soft' value={content1} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '95px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent1(e.target.value)}></textarea>
//         </div>
//         <div style={{ marginLeft: '12px', marginTop: '7px' }}>

//           <textarea wrap='soft' value={content2} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '90px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent2(e.target.value)}></textarea>
//         </div>
//         <div style={{ marginLeft: '12px', marginTop: '7px' }}>

//           <textarea wrap='soft' value={content3} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '80px', border: 'none', fontSize: '15px', fontWeight: 'bold', padding: "10px" }} onChange={(e) => setContent3(e.target.value)}></textarea>
//         </div>
//       </div>
//     </div>

//     {/* <div style={{ textAlign: 'center', marginTop: '20px' ,display:'flex',justifyContent:'center'}}>
//       <div style={{backgroundColor:'#FFFFFF',width:'400px'}} >
//         <a className='anchorbutton' href="" style={{fontSize:'14px'}}>Schedule Attorney Consultation</a>
//       </div>
//     </div> */}


//    {/* <h2>{url}</h2> */}
//     <div style={{ textAlign: 'center', marginTop: '20px' ,display:'flex',justifyContent:'center'}}>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen} className='anchorbutton'>
//           Schedule Attorney Consultation
//       </Button>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Schedule Attorney Consultation URL</DialogTitle>
//         <DialogContent>
//           {/* <DialogContentText>
//             Enter your url
//           </DialogContentText> */}
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Enter url"
//             fullWidth
//             onChange={(e) => setUrl(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>






//     <div style={{ marginTop: '30px' }}>
//       <div className="legalassistance">

//         <div style={{ marginLeft: '12px', marginTop: '10px' }}>
//           <textarea wrap='soft' value={content4} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '115px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent4(e.target.value)}></textarea>
//         </div>

//         <div style={{ marginLeft: '12px', marginTop: '10px' }}>
//           <textarea wrap='soft' value={content5} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '100px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent5(e.target.value)}></textarea>

//           <div style={{ marginLeft: '12px', marginTop: '10px' }}>
//             <textarea wrap='soft' value={content6} style={{ color: '#3e5b77',marginLeft:"-10px" ,backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent6(e.target.value)}></textarea>
//             <textarea wrap='soft' value={content7} style={{ color: '#3e5b77',marginLeft:"-10px", backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent7(e.target.value)}></textarea>
//             <textarea wrap='soft' value={content8} style={{ color: '#3e5b77',marginLeft:"-10px",backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent8(e.target.value)}></textarea>
//             <textarea wrap='soft' value={content9} style={{ color: '#3e5b77',marginLeft:"-10px", backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent9(e.target.value)}></textarea>
//           </div>

//         </div>
//       </div>

//       <div style={{ marginTop: '30px', backgroundColor: '#FFFFFF', paddingTop: '20px', paddingBottom: '20px' }}>
//         <div >
//           <hr style={{ width: '650px', border: '1px solid ' }} />
//         </div>

//         {/* <div style={{ marginTop: '50px' }}>
//           <p style={{ textAlign: 'center', fontStyle: 'italic', lineHeight: '6px' ,fontSize:'12px'}}>Copyright © 2021 LAW FIRM, All rights reserved.</p>
//           <p style={{ textAlign: 'center', fontWeight: 'bold', lineHeight: '6px',fontSize:'12px' }}>Our mailing address is:</p>
//           <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }}>LAW FIRM ADDRESS</p>
//           <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }}>Want to change how you receive these emails?</p>
//           <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }}>You can update your preferences or unsubscribe from this list.</p>
//         </div> */}
//         <div style={{ marginTop: '20px' }}>
//                           {/* <p style={{ textAlign: 'center', fontStyle: 'italic', lineHeight: '6px',fontSize:'12px'}}>Copyright © 2021 LAW FIRM, All rights reserved.</p> */}
//                           <div style={{  marginTop: '10px' ,display:'flex',justifyContent:'center'}}>
//                                <textarea wrap='soft' value={content10} style={{ textAlign:'center' ,color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent10(e.target.value)}></textarea>
//                            </div>
//                           <p style={{ marginTop:'10px',textAlign: 'center', fontWeight: 'bold', lineHeight: '6px',fontSize:'12px' }}>Our mailing address is:</p>
//                           {/* <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }}>LAW FIRM ADDRESS</p> */}
//                           <div style={{  marginTop: '10px' ,display:'flex',justifyContent:'center'}}>
//                                <textarea wrap='soft' value={content11} style={{ textAlign:'center' ,color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent11(e.target.value)}></textarea>
//                            </div>
//                           <p style={{ textAlign: 'center', fontSize:'12px' ,marginTop:'10px'}}>Want to change how you receive these emails?</p>
//                           <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }}>You can update your preferences or unsubscribe from this list.</p>
//                       </div>

//       </div>


//     </div>
//   </div>
// );


// }

// export default MailChampEdit;


























