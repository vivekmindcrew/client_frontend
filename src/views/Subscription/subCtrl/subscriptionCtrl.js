// import series from 'async/series';
import swal from 'sweetalert';

import axios from 'axios';
import config from '../../../config/Config';

const subscrptiondataObject = {
    getSubscription: async (callback) => {
        axios({
            method: 'POST',
            url: config.baseUrl + '/subscription/stripe/listOfPlans',
            data: {

            }
        }).then(response => {
            return callback(response);
        })
            .catch(err => {
                console.log(err);
            });
    },
    userLogin: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/login/login",
            data: data,
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    userLogout: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/login/logout",
            data: data
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err);
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        })
    },
    userRegister: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/login/register",
            data: data,
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    resetPassword: async (data, callback) => {
        axios({
            method: 'POST',
            url: config.baseUrl + '/login/forgetPassword',
            data: data
        }).then(response => {
            return callback(response);
        })
            .catch(err => {
                console.log(err);
                swal("Please check internet connection or try again", {
                    icon: "error",
                });
            });
    },
    submitPassword: async (data, callback) => {
        axios({
            method: 'POST',
            url: config.baseUrl + '/login/submitPassword',
            data: data
        }).then(response => {
            return callback(response);
        })
            .catch(err => {
                console.log(err);
                swal("Please check internet connection or try again", {
                    icon: "error",
                });
            });
    },
    createCustomer: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/subscription/createcustomer",
            data: data,
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    addCard: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/subscription/addcard",
            data: data,
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    getLeads: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/login/leads",
            data: data
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    addNewCounty: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/login/addNewCounty",
            data: data,
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    getCountyName: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/login/getAllCounty",
            data: data
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    checkCoupon: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/subscription/retrivecoupon",
            data: data
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    getCustomers: async (callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/subscription/getallcustomers",
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    getAllSubscribedUsers: async (callback) => {
        axios({
            method: "GET",
            url: config.baseUrl + "/subscription/getallsubscriptions",
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    getTileData: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/login/getTileData",
            data: data
        }).then((response) => {
            console.log(response);
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    downloadLeads: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/login/leadsDownload",
            data: data
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    cancelSubscription: async (subId, callback) => {
        axios({
            method: 'POST',
            url: config.baseUrl + '/subscription/stripe/cancelSubscription/' + subId + '',
            data: {

            }
        }).then(response => {
            return callback(response);
        })
            .catch(err => {
                console.log(err);
            });
    },
    addMailchimpIdFun: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/mailchimp/addAudience",
            data: data,
        }).then((response) => {
            // console.log(response.data.status);
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    addTemplateFun: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/mailchimp/addTemplate",
            data: data,
        }).then((response) => {
            // console.log(response.data.status);
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    addContactFun: async (userData, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/mailchimp/addContact",
            data: userData,
        }).then((response) => {
            // console.log(response,"contact res");
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    cancelSubscription: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/subscription/stripe/cancelSubscription",
            data: data
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    createTem: async (data, callback) => {
        axios({
            method: "POST",
            url: config.baseUrl + "/mailchimp/addTemplatenew",
            data: data,
            // headers:{"content-type":"multipart/form-data"}
        }).then((response) => {
            return callback(response);
        }).catch((err) => {
            console.log(err)
            swal("Please check internet connection or try again", {
                icon: "error",
            });
        });
    },
    // updateTem: async (data, callback) => {
    //     axios({
    //         method: "POST",
    //         url: config.baseUrl + "/mailchimp/updateTemplatenew",
    //         data: data
    //     }).then((response) => {
    //         return callback(response);
    //     }).catch((err) => {
    //         console.log(err)
    //         swal("Please check internet connection or try again", {
    //             icon: "error",
    //         });
    //     });
    // },
}
export default subscrptiondataObject;