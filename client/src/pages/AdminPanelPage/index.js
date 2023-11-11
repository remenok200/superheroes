import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'redux/slices/userSlice';

const AdminPanelPage = () => {
  const dispatch = useDispatch();
  const { user, allUsers, isLoading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <h1>Admin Panel</h1>

      <table>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Email</th>
            <th>Role</th>
            <th>Ban Info</th>
          </tr>
        </thead>

        <tbody>
          {allUsers &&
            allUsers.map((user) => (
              <tr key={user.user._id}>
                <td>{user.user.nickname}</td>
                <td>{user.user.email}</td>
                <td>{user.user.role}</td>
                <td>{user.banInfo ? user.banInfo.reason : 'Not Banned'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminPanelPage;
