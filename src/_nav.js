
var firmname = localStorage.getItem("firmname");
var countiesName = [];
var countiesButtons = {};
var user = [];
var countyPracticeN = localStorage.getItem("SubscribedCounties");
var countyPracticeNames = '';

if (countyPracticeN !== '' && countyPracticeN !== undefined && countyPracticeN !== null && countyPracticeN !== 'undefined') {
  console.log(countyPracticeNames);
  countyPracticeNames = JSON.parse(countyPracticeN);
  countiesButtons = countyPracticeNames.map((c, i) => {
    // console.log("map", c.countypractice);
    countiesName.push(c.countypractice);
    return ({
      name: c.countypractice,
      url: '/home/user/leads/' + c.countypractice,
      icon: 'icon-list',
      value: c.countypractice
    })
  })
  user = [
    {
      title: true,
      name: "WELCOME " + [firmname],
      wrapper: {
        element: '',
        attributes: { color: "Black" }
      },
      class: ''
    },
    ...countiesButtons,
    {
      title: true,
      name: "",
      wrapper: {
        element: '',
        attributes: { color: "Black" }
      },
      class: ''
    },
    {
      name: "Automation",
      url: '/home/user/addMailchimp',
      icon: 'fa fa-cog',
    },

    {
      name: "Email Templates (Beta)",
      url: '/home/user/getAllTemplate',
       icon: 'fa fa-file-text',
    },

    // {
    //   title: true,
    //   name: "",
    //   wrapper: {
    //     element: '',
    //     attributes: { color: "Black" }
    //   },
    //   class: ''
    // },
    {
      name: "Manage Subscription",
      url: '/home/user/manageSubscription',
      icon: 'icon-plus',
    },
    // {
    //   name: "Update Template",
    //   url: '/home/user/updateTemplate',
    //    icon: 'icon-plus',
    // },
  ];
} else {
  //alert("else")
}


var admin = [
  {
    title: true,
    name: 'Admin',
    wrapper: {
      element: '',
      attributes: {}
    },
  },
  {
    name: 'User Subscription',
    url: '/home/user/user-management',
    icon: 'fa fa-play',
  },
];

var match_token = localStorage.getItem("ADMIN");
var usableRoute = [];
// console.log("match_token:::::", match_token);

if (match_token === 'true') {
  usableRoute = admin;
}
else {
  usableRoute = user;

}

export default {

  items: usableRoute
};