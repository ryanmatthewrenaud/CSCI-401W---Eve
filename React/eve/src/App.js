import React from 'react'
import './App.css';
import Navbar from './components/nav/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Premium from './pages/Premium';
import ForgotPassword from './components/forms/ForgotPassword';
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from './stores/store';
import { login, logout } from './stores/slices/userSlice';
import jwtDecode from 'jwt-decode';
import GroupList from './pages/GroupList';
import InviteCodeTable from './components/tables/InviteCodeTable';
import GroupDetail from './pages/GroupDetail';
import { useEffect } from 'react';
import TokenService from './api/services/token.service';
import CalendarComponent from './components/FullCalendar';
import ConflictTable from './components/tables/ConflictTable';
import GroupMemberTable from './components/tables/GroupMembersTable';
import TopicTable from './components/tables/TopicTable';
import GroupForm from './components/forms/GroupForm';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user.userID);
  useEffect(() => {
    const user_access = localStorage.getItem("access_token");
    const user_refresh = localStorage.getItem("refresh_token");
    if (user_access !== null) {
      let verify = TokenService.verify({ token: user_access });
      if (verify) {
        store.dispatch(login(jwtDecode(user_access)));
      } else {
        if (user_refresh !== null) {
          TokenService.refresh({ refresh: user_refresh });
        } else {
          store.dispatch(logout());
        }
      }
    }
  }, [user]);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user !== null ? "/groups" : "/login"} />} />
        <Route path='/groups/:id' element={<GroupDetail />}>
          <Route path='calendar' element={<CalendarComponent />} />
          <Route path="members" element={<GroupMemberTable />} />
          <Route path="topics" element={<TopicTable />} />
          <Route path="invite-codes" element={<InviteCodeTable />} />
          <Route path='conflicts' element={<ConflictTable />} />
          <Route path='settings' element={<GroupForm mode={1} />} />
        </Route>
        <Route path='/groups' element={<GroupList />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/premium' element={<Premium />} />
        <Route path='/login' element={user !== null ? <Navigate to="/groups" /> : <LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

      </Routes>
    </div>
  );
}

export default App;