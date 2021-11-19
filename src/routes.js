import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
//const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography/Typography.js'));
// const AddCounty = React.lazy(() => import('./views/Subscription/addCounty'));
const AddMailChimpPage = React.lazy(() => import('./views/Pages/addMailChimpPage'));
const MailChampEdit = React.lazy(() => import('./views/Pages/MailChampEdit'));
// const AddMailChimpPage = React.lazy(() => import('./views/Pages/addMailChimpPage'));
const ManageSubscriptionpage = React.lazy(() => import('./views/Subscription/manageSubscriptionpage'));
const NoCounty = React.lazy(() => import('./views/Theme/Typography/NoCounty'));
const UpdateTemplate = React.lazy(() => import('./views/Pages/UpdateTemplate'));
const GetAllTemplate = React.lazy(() => import('./views/Pages/GetAllTemplate'));

const routes = [
  { path: '/home', exact: true, name: "Home" },
  { path: '/home/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/home/user', exact: true, name: 'User', component: Colors },
  { path: '/home/user/user-management', name: 'User Subscription', component: Colors },
  { path: '/home/user/county', name: 'Leads', component: NoCounty },
  { path: '/home/user/leads/:county', name: 'Leads', component: Typography },
  { path: '/home/user/addMailchimp', name: 'MailChimp', component: AddMailChimpPage },
  { path: '/home/user/manageSubscription', name: 'MailChimp', component: ManageSubscriptionpage },
  { path: '/home/user/mailchampEdit', name: 'mailchamp Edit', component: MailChampEdit },
  // { path: '/home/user/updateTemplate/:id', name: 'update template', component: UpdateTemplate },
  { path: '/home/user/updateTemplate/:id/:uid', name: 'update template', component: UpdateTemplate },
 //{ path: '/home/user/updateTemplate', name: 'update template', component: UpdateTemplate },
  { path: '/home/user/getAllTemplate', name: 'get all template', component: GetAllTemplate }

];

export default routes;
