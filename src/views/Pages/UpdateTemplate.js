
// import './MailChampEdit.css';
// //import imgLogo from './image/dummylogo.jpg';
// import React, { useState, useEffect, useHistory } from 'react';
// import axios from 'axios';
// import SubCtrl from "../Subscription/subCtrl/subscriptionCtrl";
// import swal from "sweetalert";
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { EditorState,ContentState ,convertFromHTML,convertToRaw} from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { Editor } from 'react-draft-wysiwyg';
// //const imgDemo = require('../../../public/assets/img/avatars/8.jpg');

// class UpdateTemplate extends React.Component {
//   constructor(props) {
//     super(props);
//     const html = '<p style="text-align:center;"></p><p style="text-align:left;"></p><p></p><img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014__340.jpg" alt="undefined" style="float:none;height: 10%;width: 50%"/><p style="text-align:center;"></p><p style="text-align:left;border: 1px solid">Hi *|FNAME|*, need legal assistance?&nbsp;</p><p style="text-align:left;">I found your name listed on the *|COUNTY|* Sheriff\'s database, where it was listed that you were recently arrested for a *|CHARGE|* charge. If you are already represented by an attorney or have resolved this matter, please disregard this email.<br><br>If not, don’t worry – ________Attorney at Law is here to help. You need a seasoned law firm that is going to care about you and the fight you are in. We\'ve represented people in your position, and worse, for __ years.<br><br>Schedule a consultation to discuss how we can tackle your defense and get you the best case result. <a href="http://" target="_blank">Schedule Attorney Consultation</a></p><p style="text-align:center;"></p><p style="text-align:left;">Our lawyers will listen to your side of the story, take time to understand your goals, and use their experience to help you navigate the often treacherous waters of our criminal justice system. We know what it takes to build and present a solid and compelling case, and that’s exactly what we do. Vigorously and earnestly, we tackle the most complex challenges and pursue your goals with creativity and determination.<br><br>We offer no-cost consultations over the phone, Zoom, or in our conveniently located offices. Let our firm help you get this matter dismissed or downgraded. Contact us today at (xxx) xxx-xxxx to discuss your case with one of our attorneys.</p><p><br>&nbsp;</p><p style="text-align:left;">Sincerely, <br>ATTORNEY NAME<br>LAW FIRM<br>ADDRESS<br><br>Copyright © 2021 LAW FIRM, All rights reserved.<br>Our mailing address is:<br>LAW FIRM ADDRESS<br>Want to change how you receive these emails?<br>You can <a href="*|UPDATE_PROFILE|*" target="_self">update your preferences</a> or <a href="*|UNSUB|*" target="_self">unsubscribe from this list</a>.</p>';
//     //const html = '<p style="text-align:center;"></p><img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014__340.jpg" alt="undefined" style="float:none;height: 30px;width: 40px"/><p></p><pre>Hi *|FNAME|*, need legal assistance? aaaaaa <br><br>I found your name listed on the *|COUNTY|* Sheriff\'s database, where it was listed that you were recently arrested for a *|CHARGE|* charge. If you are already represented by an attorney or have resolved this matter, please disregard this email. wwwwwwwwwwwwww<br><br>If not, don’t worry – ________Attorney at Law is here to help. You need a seasoned law firm that is going to care about you and the fight you are in. We\'ve represented people in your position, and worse, for __ years. wwwwwwwwwwwwwwwwwwww<br><br>Schedule a consultation to discuss how we can tackle your defense and get you the best case result. wwwwwwwwwww</pre><p style="text-align:center;"><a href="http:" target="_blank">Schedule Attorney Consultation</a></p><pre style="text-align:center;">Our lawyers will listen to your side of the story, take time to understand your goals, and use their experience to help you navigate the often treacherous waters of our criminal justice system. We know what it takes to build and present a solid and compelling case, and that’s exactly what we do. Vigorously and earnestly, we tackle the most complex challenges and pursue your goals with creativity and determination. q<br><br>We offer no-cost consultations over the phone, Zoom, or in our conveniently located offices. Let our firm help you get this matter dismissed or downgraded. Contact us today at (xxx) xxx-xxxx to discuss your case with one of our attorneys. <br><br>Sincerely sssss <br>ATTORNEY NAME pppp<br>LAW FIRM ddddd<br>ADDRESS fffff <br>&nbsp;</pre><pre>Copyright © 2021 LAW FIRM, All rights reserved.<br>Our mailing address is:<br>LAW FIRM ADDRESS<br>Want to change how you receive these emails?<br>You can update your preferences or unsubscribe from this list.</pre>'

//     this.state = {
//     //   editorState: EditorState.createEmpty(),
//         logo:'https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014__340.jpg',
//        editorState:EditorState.createWithContent(
//         ContentState.createFromBlockArray(
//           convertFromHTML(html)
//         )
//       ),
//     };

  
// }
  
//   handleSubmit = ()=>{
//     const userId = localStorage.getItem("userId");
//     // const newData = new FormData();
//     // newData.append("file",this.state.logo) ;
//     // newData.append("datanew1",draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
//     // newData.append("userId",userId)
   
//     const newData = {
//         file:this.state.logo,
//         datanew1:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
//         userId: userId
//     }
     
//       SubCtrl.updateTem(newData, (result) => {
//         console.log("result", result)
//         if (result.data.status === true) {
//           swal({
//             title: "Congratulations!",
//             text: "You are successfully connected to Mailchimp",
//             icon: "success",
//           });
//         }
//       })
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     const { editorState } = this.state;
    
    
//     //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
//     return (
//       <div>
//           <Editor
//             editorState={editorState}
//             wrapperClassName="demo-wrapper"
//             editorClassName="demo-editor"
//             onEditorStateChange={this.onEditorStateChange}
//          />
//          <div>
//              {/* {draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}
//              <button onClick={this.handleSubmit}>send data</button>
//          </div>
//       </div>
//     )
//   }
// }


// export default UpdateTemplate;






















import './MailChampEdit.css';
//import imgLogo from './image/dummylogo.jpg';
import React, { useState, useEffect, useHistory } from 'react';
import axios from 'axios';
import SubCtrl from "../Subscription/subCtrl/subscriptionCtrl";
import swal from "sweetalert";
import { PinDropSharp } from '@material-ui/icons';
import config from '../../config/Config';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function UpdateTemplate(props) {
    const classes = useStyles();
    //const [logo,setLogo] = useState('');
    const id  = props.match.params.id;
    const uid  = props.match.params.uid;
    console.log("id1",id);
    console.log("id2",uid);
    useEffect(()=>{
        axios.get(config.baseUrl+`/mailchimp/updateTemplatenew/${id}/${uid}`)
        .then(res2=>{
            console.log(res2.data)
            console.log(res2.data.dataaa);
            console.log(res2.data.imgURL);
           console.log(res2.data.dataaa.content)
            setUrl(res2.data.imgURL)
            setLogo({preview:res2.data.imgURL})
            setContent(res2.data.dataaa.content)
            setContent1(res2.data.dataaa.content1)
            setContent2(res2.data.dataaa.content2)
            setContent3(res2.data.dataaa.content3)
            setContent4(res2.data.dataaa.content4)
            setContent5(res2.data.dataaa.content5)
            setContent6(res2.data.dataaa.content6)
            setContent7(res2.data.dataaa.content7)
            setContent8(res2.data.dataaa.content8)
            setContent9(res2.data.dataaa.content9)
            setContent10(res2.data.dataaa.content10)
            setContent11(res2.data.dataaa.content11)

            setLinkUrl(res2.data.dataaa.linkUrl)
        })
    },[])
    const [url,setUrl] = useState("")
    const [logo, setLogo] = useState({ preview: "", raw: "" });

    const [open, setOpen] = useState(false);
    const [linkurl, setLinkUrl] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [content, setContent] = useState("");
    const [content1, setContent1] = useState("")
    const [content2, setContent2] = useState("");
    const [content3, setContent3] = useState("");
    const [content4, setContent4] = useState("");
    const [content5, setContent5] = useState("");

    const [content6, setContent6] = useState("");
    const [content7, setContent7] = useState("");
    const [content8, setContent8] = useState("");
    const [content9, setContent9] = useState("");
    const [content10, setContent10] = useState("");
    const [content11, setContent11] = useState("");

    var userId = localStorage.getItem("userId");
     
    const handleChange = e => {
        if (e.target.files.length) {
            console.log(e.target.files[0])
            setLogo({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    
    
    // const addmore = ()=>{   
    //   //console.log("hello props",history)
    //   props.history.push('/updateTemplate')
    // }


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
       
        datanew.append("url", linkurl);

        datanew.append("userId", userId);

        axios.post(config.baseUrl+`/mailchimp/updateTemplateById/${id}`,datanew)
        .then(res=>{
            console.log(res)
            swal({
                title: "Congratulations!",
                text: "Template successfully updated",
                icon: "success",
              });
              props.history.push('/home/user/getAllTemplate')
        })
        // SubCtrl.updateTem(datanew, (result) => {
        //     console.log("result", result)
        //     if (result.data.status === true) {
        //         swal({
        //             title: "Congratulations!",
        //             text: "You are successfully updated Mailchimp template",
        //             icon: "success",
        //         });
        //     }
        // })
       
        console.log("update button clicked")
    }
    // alert(props.match.params.id)
        return (


            <div className="MailChampEdit">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p className="headingtemp" style={{ textAlign: 'center', padding: '10px' }}>Edit your Template</p>
                    {/* <button onClick={handleSubmit}  style={{ width: "80px", marginTop: '10px', fontSize: '15px',border:'none',height:'40px',borderRadius:'10px',backgroundColor:'#c2c0ba' }}>Update</button> */}
                    <div className={classes.root} style={{paddingTop:'6px'}}>
                        <Button variant="contained" onClick={handleSubmit} >Update</Button>
                    </div>
                </div>


                <div className="templateHeader">
                
                    <div style={{width:'13%',margin:'auto',display:'flex',justifyContent:'center'}}>
                        <label htmlFor="upload-button">
                            {logo.preview ? (
                                // <div><img src={logo.preview} height="270px" width="650px" alt="dummy" /></div>
                                <div><img src={logo.preview} alt="dummy" className="logoimage"/></div>
                            ) : (
                                    <>
                                        <div style={{ margin: 'auto', width: '43%' }}><span className="fa fa-plus fa-4x" ></span></div>
                                        <p className="logotext text-center" style={{ color: '#3e5b77', fontSize: '12px', marginLeft: '10px' }}>Upload your Logo</p>
                                    </>
                                )}
                        </label>
                        <input
                            type="file"
                            id="upload-button"
                            style={{ display: "none", justifyContent: 'center' }}
                            onChange={handleChange}
                        />
                        <br />
                    </div>

                </div>



                <div style={{ marginTop: '30px' }}>
                    <div className="legalassistance">

                        <div style={{ marginLeft: '12px', marginTop: '6px' }}>
                            
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

                {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <a className='anchorbutton' href="" style={{fontSize:'14px'}} >Schedule Attorney Consultation</a>
                </div> */}
                
                {/* <h1>{linkurl}</h1> */}
               
                <div style={{ textAlign: 'center', marginTop: '20px' ,display:'flex',justifyContent:'center'}}>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen} className='anchorbutton'>
                        Schedule Attorney Consultation
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Schedule Attorney Consultation URL</DialogTitle>
                        <DialogContent>
                        {/* <DialogContentText>
                            Enter your url
                        </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter url"
                            type="email"
                            fullWidth
                            onChange={(e) => setLinkUrl(e.target.value)}
                            value={linkurl}
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
                            <textarea wrap='soft' value={content4} className="field5 textarea" style={{ fontSize: '10px' }} onChange={(e) => setContent4(e.target.value)}></textarea>
                        </div>

                        <div style={{ marginLeft: '12px', marginTop: '10px' }}>
                            <textarea wrap='soft' value={content5} className="field6 textarea" style={{ fontSize: "10px" }} onChange={(e) => setContent5(e.target.value)}></textarea>

                            <div style={{ marginTop: '10px' }}>
                                <textarea wrap='soft' value={content6} className="singleLine textarea" style={{ fontSize: '10px' }} onChange={(e) => setContent6(e.target.value)}></textarea>
                                <textarea wrap='soft' value={content7} className="singleLine textarea" style={{ fontSize: '10px' }} onChange={(e) => setContent7(e.target.value)}></textarea>
                                <textarea wrap='soft' value={content8} className="singleLine textarea" style={{ fontSize: '10px' }} onChange={(e) => setContent8(e.target.value)}></textarea>
                                <textarea wrap='soft' value={content9} className="singleLine textarea" style={{ fontSize: '10px' }} onChange={(e) => setContent9(e.target.value)}></textarea>
                            </div>

                        </div>
                    </div>

           
                    <div style={{ marginTop: '30px', backgroundColor: '#FFFFFF', paddingTop: '20px', paddingBottom: '20px' }}>
                        <div >
                            <hr style={{ border: '1px solid ' }} className="linehr"/>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            {/* <p style={{ textAlign: 'center', fontStyle: 'italic', lineHeight: '6px',fontSize:'12px'}}>Copyright © 2021 LAW FIRM, All rights reserved.</p> */}
                            <div style={{  marginTop: '10px' ,display:'flex',justifyContent:'center'}}>
                                 <textarea wrap='soft' value={content10} className="lastcontainer" style={{ textAlign:'center' ,color: '#3e5b77', backgroundColor: '#FFFFFF', border: 'none', padding: "10px" }} onChange={(e) => setContent10(e.target.value)}></textarea>
                             </div>
                            <p style={{ marginTop:'10px',textAlign: 'center', fontWeight: 'bold', lineHeight: '6px',fontSize:'12px' }} className="lastparagraph">Our mailing address is:</p>
                            {/* <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }}>LAW FIRM ADDRESS</p> */}
                            <div style={{  marginTop: '10px' ,display:'flex',justifyContent:'center'}}>
                                 <textarea wrap='soft' value={content11} className="lastcontainer" style={{ textAlign:'center' ,color: '#3e5b77', backgroundColor: '#FFFFFF', height: '40px', border: 'none', padding: "10px" }} onChange={(e) => setContent11(e.target.value)}></textarea>
                             </div>
                            <p style={{ textAlign: 'center',marginTop:'10px'}} className="lastparagraph">Want to change how you receive these emails?</p>
                            <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }} className="lastparagraph">You can update your preferences or unsubscribe from this list.</p>
                        </div>

                    </div>



                </div>
            </div>
        );
    }




export default UpdateTemplate;


























// import './MailChampEdit.css';
// //import imgLogo from './image/dummylogo.jpg';
// import React, { useState, useEffect, useHistory } from 'react';
// import axios from 'axios';
// import SubCtrl from "../Subscription/subCtrl/subscriptionCtrl";
// import swal from "sweetalert";
// import { PinDropSharp } from '@material-ui/icons';
// import config from '../../config/Config';

// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
//   }));

// function UpdateTemplate(props) {
//     const classes = useStyles();
//     //const [logo,setLogo] = useState('');
//     const id  = props.match.params.id;
//     const uid  = props.match.params.uid;
//     console.log("id1",id);
//     console.log("id2",uid);
//     useEffect(()=>{
//         axios.get(config.baseUrl+`/mailchimp/updateTemplatenew/${id}/${uid}`)
//         .then(res2=>{
//             console.log(res2.data)
//             console.log(res2.data.dataaa);
//             console.log(res2.data.imgURL);
//            console.log(res2.data.dataaa.content)
//             setUrl(res2.data.imgURL)
//             setLogo({preview:res2.data.imgURL})
//             setContent(res2.data.dataaa.content)
//             setContent1(res2.data.dataaa.content1)
//             setContent2(res2.data.dataaa.content2)
//             setContent3(res2.data.dataaa.content3)
//             setContent4(res2.data.dataaa.content4)
//             setContent5(res2.data.dataaa.content5)
//             setContent6(res2.data.dataaa.content6)
//             setContent7(res2.data.dataaa.content7)
//             setContent8(res2.data.dataaa.content8)
//             setContent9(res2.data.dataaa.content9)
//             setContent10(res2.data.dataaa.content10)
//             setContent11(res2.data.dataaa.content11)

//             setLinkUrl(res2.data.dataaa.linkUrl)
//         })
//     },[])
//     const [url,setUrl] = useState("")
//     const [logo, setLogo] = useState({ preview: "", raw: "" });

//     const [open, setOpen] = useState(false);
//     const [linkurl, setLinkUrl] = useState('');

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const [content, setContent] = useState("");
//     const [content1, setContent1] = useState("")
//     const [content2, setContent2] = useState("");
//     const [content3, setContent3] = useState("");
//     const [content4, setContent4] = useState("");
//     const [content5, setContent5] = useState("");

//     const [content6, setContent6] = useState("");
//     const [content7, setContent7] = useState("");
//     const [content8, setContent8] = useState("");
//     const [content9, setContent9] = useState("");
//     const [content10, setContent10] = useState("");
//     const [content11, setContent11] = useState("");

//     var userId = localStorage.getItem("userId");
     
//     const handleChange = e => {
//         if (e.target.files.length) {
//             console.log(e.target.files[0])
//             setLogo({
//                 preview: URL.createObjectURL(e.target.files[0]),
//                 raw: e.target.files[0]
//             });
//         }
//     };

    
    
//     // const addmore = ()=>{   
//     //   //console.log("hello props",history)
//     //   props.history.push('/updateTemplate')
//     // }


//     const handleSubmit = async () => {
//         const datanew = new FormData();

//         // datanew.append("file",logo) ;
//         datanew.append("file", logo.raw);
//         datanew.append("content", content);
//         datanew.append("content1", content1);
//         datanew.append("content2", content2);
//         datanew.append("content3", content3);
//         datanew.append("content4", content4);
//         datanew.append("content5", content5);

//         datanew.append("content6", content6);
//         datanew.append("content7", content7);
//         datanew.append("content8", content8);
//         datanew.append("content9", content9);
//         datanew.append("content10", content10);
//         datanew.append("content11", content11);
       
//         datanew.append("url", linkurl);

//         datanew.append("userId", userId);

//         axios.post(config.baseUrl+`/mailchimp/updateTemplateById/${id}`,datanew)
//         .then(res=>{
//             console.log(res)
//             swal({
//                 title: "Congratulations!",
//                 text: "Template successfully updated",
//                 icon: "success",
//               });
//               props.history.push('/home/user/getAllTemplate')
//         })
//         // SubCtrl.updateTem(datanew, (result) => {
//         //     console.log("result", result)
//         //     if (result.data.status === true) {
//         //         swal({
//         //             title: "Congratulations!",
//         //             text: "You are successfully updated Mailchimp template",
//         //             icon: "success",
//         //         });
//         //     }
//         // })
       
//         console.log("update button clicked")
//     }
//     // alert(props.match.params.id)
//         return (


//             <div className="MailChampEdit">
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     <p className="headingtemp" style={{ textAlign: 'center', padding: '10px' }}>Edit your Template</p>
//                     {/* <button onClick={handleSubmit}  style={{ width: "80px", marginTop: '10px', fontSize: '15px',border:'none',height:'40px',borderRadius:'10px',backgroundColor:'#c2c0ba' }}>Update</button> */}
//                     <div className={classes.root} style={{paddingTop:'6px'}}>
//                         <Button variant="contained" onClick={handleSubmit} >Update</Button>
//                     </div>
//                 </div>


               
              
   



//                 <div className="templateHeader">
                
//                     <div style={{width:'13%',margin:'auto',display:'flex',justifyContent:'center'}}>
//                         <label htmlFor="upload-button">
//                             {logo.preview ? (
//                                 // <div><img src={logo.preview} height="270px" width="650px" alt="dummy" /></div>
//                                 <div><img src={logo.preview} height="270px" width="650px" alt="dummy" style={{minHeight:'100px',maxHeight:'100px',width:'auto'}}/></div>
//                             ) : (
//                                     <>
//                                         <div style={{ margin: 'auto', width: '43%' }}><span className="glyphicon glyphicon-plus-sign" height="100px" ></span></div>
//                                         <h5 className="text-center" style={{ color: '#3e5b77', fontSize: '12px', marginLeft: '10px' }}>Upload your Logo</h5>
//                                     </>
//                                 )}
//                         </label>
//                         <input
//                             type="file"
//                             id="upload-button"
//                             style={{ display: "none", justifyContent: 'center' }}
//                             onChange={handleChange}
//                         />
//                         <br />
//                     </div>

//                 </div>


//                 <div style={{ marginTop: '30px' }}>
//                     <div className="legalassistance">

//                         <div style={{ marginLeft: '12px', marginTop: '6px' }}><textarea value={content} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', fontSize: '15px', fontWeight: 'bold', padding: "10px", width: "630px", height: "50px", border: 'none' }} onChange={(e) => setContent(e.target.value)}></textarea></div>
//                         <div style={{ marginLeft: '12px', marginTop: '10px' }}>

//                             <textarea wrap='soft' value={content1} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '95px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent1(e.target.value)}></textarea>
//                         </div>
//                         <div style={{ marginLeft: '12px', marginTop: '7px' }}>

//                             <textarea wrap='soft' value={content2} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '90px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent2(e.target.value)}></textarea>
//                         </div>
//                         <div style={{ marginLeft: '12px', marginTop: '7px' }}>

//                             <textarea wrap='soft' value={content3} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '80px', border: 'none', fontSize: '15px', fontWeight: 'bold', padding: "10px" }} onChange={(e) => setContent3(e.target.value)}></textarea>
//                         </div>
//                     </div>
//                 </div>

//                 {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>
//                     <a className='anchorbutton' href="" style={{fontSize:'14px'}} >Schedule Attorney Consultation</a>
//                 </div> */}
                
//                 {/* <h1>{linkurl}</h1> */}
               
//                 <div style={{ textAlign: 'center', marginTop: '20px' ,display:'flex',justifyContent:'center'}}>
//                     <Button variant="outlined" color="primary" onClick={handleClickOpen} className='anchorbutton'>
//                         Schedule Attorney Consultation
//                     </Button>
//                     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//                         <DialogTitle id="form-dialog-title">Schedule Attorney Consultation URL</DialogTitle>
//                         <DialogContent>
//                         {/* <DialogContentText>
//                             Enter your url
//                         </DialogContentText> */}
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             id="name"
//                             label="Enter url"
//                             type="email"
//                             fullWidth
//                             onChange={(e) => setLinkUrl(e.target.value)}
//                             value={linkurl}
//                         />
//                         </DialogContent>
//                         <DialogActions>
//                         <Button onClick={handleClose} color="primary">
//                             Cancel
//                         </Button>
//                         <Button onClick={handleClose} color="primary">
//                             Submit
//                         </Button>
//                         </DialogActions>
//                     </Dialog>
//                     </div>





//                 <div style={{ marginTop: '30px' }}>
//                     <div className="legalassistance">

//                         <div style={{ marginLeft: '12px', marginTop: '10px' }}>
//                             <textarea wrap='soft' value={content4} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '115px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent4(e.target.value)}></textarea>
//                         </div>

//                         <div style={{ marginLeft: '12px', marginTop: '10px' }}>
//                             <textarea wrap='soft' value={content5} style={{ color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '100px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent5(e.target.value)}></textarea>

//                             <div style={{ marginLeft: '12px', marginTop: '10px' }}>
//                                 <textarea wrap='soft' value={content6} style={{ color: '#3e5b77',marginLeft:"-10px", backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent6(e.target.value)}></textarea>
//                                 <textarea wrap='soft' value={content7} style={{ color: '#3e5b77',marginLeft:"-10px", backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent7(e.target.value)}></textarea>
//                                 <textarea wrap='soft' value={content8} style={{ color: '#3e5b77', marginLeft:"-10px",backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent8(e.target.value)}></textarea>
//                                 <textarea wrap='soft' value={content9} style={{ color: '#3e5b77', marginLeft:"-10px",backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent9(e.target.value)}></textarea>
//                             </div>

//                         </div>
//                     </div>

//                     <div style={{ marginTop: '30px', backgroundColor: '#FFFFFF', paddingTop: '20px', paddingBottom: '20px' }}>
//                         <div >
//                             <hr style={{ width: '650px', border: '1px solid ' }} />
//                         </div>

//                         <div style={{ marginTop: '20px' }}>
//                             {/* <p style={{ textAlign: 'center', fontStyle: 'italic', lineHeight: '6px',fontSize:'12px'}}>Copyright © 2021 LAW FIRM, All rights reserved.</p> */}
//                             <div style={{  marginTop: '10px' ,display:'flex',justifyContent:'center'}}>
//                                  <textarea wrap='soft' value={content10} style={{ textAlign:'center' ,color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent10(e.target.value)}></textarea>
//                              </div>
//                             <p style={{ marginTop:'10px',textAlign: 'center', fontWeight: 'bold', lineHeight: '6px',fontSize:'12px' }}>Our mailing address is:</p>
//                             {/* <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }}>LAW FIRM ADDRESS</p> */}
//                             <div style={{  marginTop: '10px' ,display:'flex',justifyContent:'center'}}>
//                                  <textarea wrap='soft' value={content11} style={{ textAlign:'center' ,color: '#3e5b77', backgroundColor: '#FFFFFF', width: "630px", height: '40px', border: 'none', fontSize: '14px', padding: "10px" }} onChange={(e) => setContent11(e.target.value)}></textarea>
//                              </div>
//                             <p style={{ textAlign: 'center', fontSize:'12px' ,marginTop:'10px'}}>Want to change how you receive these emails?</p>
//                             <p style={{ textAlign: 'center', lineHeight: '6px',fontSize:'12px' }}>You can update your preferences or unsubscribe from this list.</p>
//                         </div>

//                     </div>


//                 </div>
//             </div>
//         );
//     }




// export default UpdateTemplate;















