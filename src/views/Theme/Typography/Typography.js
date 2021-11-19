import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Card, CardBody, CardGroup, Col, Row } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import subsCtrl from './../../Subscription/subCtrl/subscriptionCtrl';
import Loader from "react-loader";
import Loader2 from "react-loader";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';

import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

import swal from "sweetalert";
import { useParams } from 'react-router-dom';

import './styles.css';
import commafy from 'commafy';
var states = require('us-state-codes');

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'fn', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'Charge', numeric: true, disablePadding: false, label: 'Charge' },
  { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'social', numeric: true, disablePadding: false, label: 'Social' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="headColor">
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              style={{ color: 'whitesmoke', fontSize: 16, fontFamily: "Poppins" }}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.light,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Nutrition
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: "1%",
    fontFamily: 'Poppins'
  },
  paper: {
    width: '100%',
    marginTop: 30,
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const history = useHistory();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('charge');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setrows] = useState([]);
  const [loader, setloader] = useState(false);
  const [loader2, setloader2] = useState(false);
  const [leads, setleads] = useState("");
  const [charge, setcharge] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // console.log("countyName", "bvhh");

  const handleSelectAllClick = (event) => {

    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  let params = useParams(); 
  let countyNm = params.county;
  console.log(countyNm);
      var stateName = countyNm.split(",");
      console.log(stateName[1]);
      var stateCode = states.getStateCodeByStateName(stateName[1]);
     
  useEffect(
    () => {
      let countyName = params.county;

      // console.log(countyName);   
      // console.log(countyName, "bvhh");

      var userId = localStorage.getItem("userId");

      let data = {
        "countyName": countyName,
        "userId": userId
      }

      subsCtrl.getLeads(data, (result) => {
        // console.log(result);

        if (result.data.status === "true") {
          setloader(true);
          // let countyL = localStorage.getItem("county");
          // setcounty(countyL)   
          // console.log(result.data.response)
          if (result.data.response.length < 0) {
            setcharge([]);
            setleads("");
          }
          setrows(result.data.response);
        } else {
          setrows([])
        }
      })

      subsCtrl.getTileData(data, (result) => {
        console.log(result.data.status);
        if (result.data.status === "true") {
          // console.log("result.data.status",result.data.status)
          if (result.data.responseLeads.length > 0) {
            console.log("if block",result.data.status);
            result.data.responseLeads.forEach((data) => {
              setleads(data.count)
              setloader2(true);
            })
          } else {
            console.log("else block",result.data.status);
            setleads("")
            setloader2(true);
          }
          if (result.data.responseCharge.length > 0) {
            setcharge(result.data.responseCharge);
            console.log("result.data.responseCharge",result.data.responseCharge)
          } else {
            setcharge([]);
            setloader2(true);
            console.log("result.data.responseCharge")
          }

        } else {
          console.log("result.data.status",result.data.status)
          setcharge([]);
          setleads("");
        }

      })

      // var userId = localStorage.getItem("userId");
      // // console.log(userId,"dfbdshfffffffffffff");
      // let userData = {
      //   "userId": userId
      // }

      // subsCtrl.addContactFun(userData, (result) => {
      //   const timer = setTimeout(() => {
      //     // console.log('This will run after 1 second!');
      //     if (result.data.status === true) {
      //       // console.log("Contact Added");

      //       if(result.data.contactAdded.length > 0){
      //         swal({
      //           title: "Congratulations!",
      //           text: result.data.contactAdded.length + " new lead added to mailchimp",
      //           icon: "success",
      //         }); 
      //       }
      //     }
      //     else if (result.data.msg === "Error") {
      //       swal({
      //         title: "Error!",
      //         text: "Error in connecting with server",
      //         icon: "error",
      //       });
      //     }
      //   }, 1000);
      //   return () => clearTimeout(timer);

      //  }else if (result.data.contactAdded.length === 0) {
      //   console.log("New leads sync", result.data.contactAdded); 
      //   console.log("New leads rejected", result.data.contactRejected); 
      //   swal({
      //     text: "No new lead available for you"
      //  });
      // } 
      //   if (result.data.msg === "User is not subscribed to Mailchimp.") {
      //   // console.log("User is not subscribed to Mailchimp.");
      //   swal({
      //     title: "Error!",
      //     text: "Please check your API KEY.",
      //     icon: "error",
      //   }); 
      // }
      //  else if (result.data.msg === "Please enter correct API Key") {
      //   // console.log("Please enter correct API Key");
      //   swal({
      //     title: "Error!",
      //     text: "Please enter correct API Key.",
      //     icon: "error",
      //   }); 

      // });

    },
    [params.county],
  )

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <h2 style={{ color: "#0d3559", fontFamily: "Poppins", fontSize: 35, marginBottom: 10, textAlign: "center", fontWeight: "bold" }}>
        {stateName[0]}, {stateCode}
      </h2>
      <Loader2 loaded={loader2} className="spinner">
        <Row >
          <Col lg="12" sm="12">
            {rows.length > 0 ? (
              <CardGroup>
                <Card className="l-container extra-con" style={{ fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#C6A780" }}>
                  <CardBody>
                    <AttachMoneyIcon className='tileicon' />
                    <div className="container pos">
                      <Typography variant="body2" component="p" style={{ marginBottom: "4px",height:'auto',fontSize: "22px" ,fontFamily: 'Poppins' }}>
                        ${commafy(leads * 3500) + ".00"}
                       
                      </Typography>
                      <Typography className="chargeTile"  variant="body2" component="p" style={{ fontFamily: "Poppins" }}>
                        case value in the past 7d*
                     </Typography>
                    </div>
                  </CardBody>
                </Card>
                <Card className="l-container" style={{
                  fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#808080",
                  color: "white"
                }}>
                  <CardBody>
                    <img src="/Subscription/handcuffs.svg" alt="handcuff" id='imgicon' className="png Imgtileicon" />
                    <div className="container pos2">
                      <span style={{ fontWeight: "bold",   fontFamily: "Poppins", lineHeight: "20px"  }}>
                        Top Charge
                      </span>
                      
                   {/* {charge.map((row, i) => ( 
                        <div key={i} className="chargeTile1" > 
                       
                      
                       
                          <span style={{ fontSize: "15px"}}>
                            <span style={{ paddingLeft: "0px", letterSpacing: "1px", fontFamily: "Poppins",fontWeight: 500 ,position:'relative'}}>
                            <br/>{row.Charge.toLowerCase().split(' ')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                             
                            
                         
                            </span>
                          </span><br />
                        </div>
                     ))}    */}
                   
                    </div>
                  </CardBody>
                </Card>
                <Card className="lastContainer" style={{ fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#4F5D75" }}>
                  <CardBody>
                    <PersonIcon className='tileicon' />
                    <div className="container pos3">
                      <Typography variant="body2" component="p" style={{ marginBottom: "4px",fontSize: "24px" ,fontFamily: "Poppins"}}>
                        {leads}
                      </Typography>
                      <Typography className="chargeTile"  variant="body2" component="p" style={{ fontFamily: "Poppins",fontSize:'13px' }}>
                        leads added in the past 7d
                      </Typography>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            ) : (
                <div></div>
              )}

          </Col>
        </Row>
      </Loader2>
      <Loader loaded={loader} className="spinner">
        <Paper className={classes.paper} style={{ borderRadius: "10px", fontFamily: "Poppins" }}>
          {(rows.length > 0) ? (
            <TableContainer style={{ borderRadius: "10px", fontFamily: "Poppins" }}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                style={{ borderRadius: "10px", fontFamily: "Poppins" ,paddingLeft:'20px'}}
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  aria-label="enhanced table"
                  rowCount={rows.length}
                />
                <TableBody className="editFonts">
                  {stableSort(rows, getComparator(order, orderBy))
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          key={row.id}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                          className="editFonts"
                        >
                          <TableCell padding="checkbox">

                          </TableCell>
                          <TableCell id={labelId} scope="row" padding="none" align="left" style={{ fontSize: 15, fontFamily: "Poppins" }}>
                            {row.fn + " "}{row.ln}
                          </TableCell>
                          <TableCell align="left" style={{ fontSize: 15, fontFamily: "Poppins" }}>{row.Charge}</TableCell>
                          <TableCell align="left" style={{ fontSize: 15, fontFamily: "Poppins" }}>{row.age}</TableCell>
                          <TableCell align="left" style={{ fontSize: 15, fontFamily: "Poppins" }}>{row.email} <br />
                            {row.email2} <br />
                            {row.email3}
                          </TableCell>
                          <TableCell align="left" style={{ color: "#0d3559", opacity: 3, fontSize: 30 }}>
                            {row.social.split(",")
                              .map((r, index) => {
                                return (
                                  <span key={index}>
                                    {(r.includes("facebook")) ? (<FacebookIcon onClick={event => window.location.href = r} />) : (" ")}
                                    {(r.includes("linkedin")) ? (<LinkedInIcon onClick={event => window.location.href = r} />) : (" ")}
                                    {(r.includes("twitter")) ? (<TwitterIcon onClick={event => window.location.href = r} />) : (" ")}
                                  </span>
                                )
                              })}

                          </TableCell>
                          <TableCell align="left" style={{ fontSize: 15, fontFamily: "Poppins" }}>
                            {new Date(row.date).toLocaleDateString('en-US')}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>) : (<div style={{ textAlign: "center", fontWeight: "bold" }}>No leads for this county</div>)}

        </Paper>
      </Loader>
    </div>
  );
}



