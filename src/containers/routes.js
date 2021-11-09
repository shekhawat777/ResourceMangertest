import React from 'react';

const Dashboard = React.lazy(() => import('../views/Dashboard'));

const NewAllocation = React.lazy(() => import('../components/NewAllocation'));
const Allocation = React.lazy(() => import('../views/Allocation'));

const NewManageItem = React.lazy(() => import('../components/NewManageItem'));
const ManageItem = React.lazy(() => import('../views/ManageItem'));

const NewProject = React.lazy(() => import('../components/NewProject'));
const Project = React.lazy(() => import('../views/Project'));

const NewEmployee = React.lazy(() => import('../components/NewEmployee'));
const Employee = React.lazy(() => import('../views/Employee'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/allocations', exact: true, name: 'All Allocations', component: Allocation },
  { path: '/items', exact: true, name: 'Items', component: ManageItem },
  { path: '/projects', exact: true, name: 'Projects', component: Project },
  { path: '/users', exact: true, name: 'Users', component: Employee },
  { path: '/allocations/create', name: 'New Allocation', component: NewAllocation },
  { path: '/items/create', name: 'New Item', component: NewManageItem },
  { path: '/projects/create', name: 'New Project', component: NewProject },
  { path: '/users/create', name: 'New User', component: NewEmployee },
];

export default routes;
