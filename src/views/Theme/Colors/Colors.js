import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loader from "react-loader";
import { Badge } from "reactstrap";
import subCtrl from "../../Subscription/subCtrl/subscriptionCtrl";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    marginTop: "2%",
    fontFamily: 'Poppins',
  },
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: "2%"
  }
});

export default function BasicTable() {

  const classes = useStyles();
  const [loader, setloader] = useState(false);
  const [rows, setrows] = useState([]);

  useEffect(() => {
    subCtrl.getCustomers((result) => {
      if (result.data.status === "true") {
        let data = [];
        subCtrl.getAllSubscribedUsers((result1) => {
          if (result1.data.status === "true") {
            result1.data.subscriptions.data.forEach((val) => {
              result.data.customers.data.forEach((id) => {
                if (id.id === val.customer) {
                  data.push({
                    name: id.name,
                    email: id.email,
                    state: id.address.state,
                    county: id.address.city,
                    id: val.customer,
                    amount: val.plan.amount,
                    nickname: val.plan.nickname
                  })
                }
              })
            })
            //console.log(data)
            setrows(data);

          }
        })

        setloader(true);

      } else {
        setloader(true);
        setrows([])
      }
    })

  }, [])

  return (
    <div className={classes.root}>
      <Loader loaded={loader} className="spinner">
        <h2 style={{ color: "#0d3559", fontSize: 30, marginTop: 30, textAlign: "center", fontWeight: "bolder" }}>Subscription Details</h2>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">State</TableCell>
                <TableCell align="center">County</TableCell>
                <TableCell align="center">Subscription Plan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.state}</TableCell>
                  <TableCell align="center">{row.county}</TableCell>
                  <TableCell align="center">
                    <Badge color="info">{row.nickname}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Loader>
    </div>
  );
}
