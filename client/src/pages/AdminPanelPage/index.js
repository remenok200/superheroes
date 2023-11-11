import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, banUser, unbanUser } from 'redux/slices/userSlice';

const AdminPanelPage = () => {
  const dispatch = useDispatch();
  const { user, allUsers, isLoading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleBanUser = async (userId) => {
    const reason = prompt('Enter the reason for banning the user: ');
    if (reason) {
      await dispatch(banUser({ userId, reason }));
      await dispatch(getAllUsers());
    }
  };

  const handleUnbanUser = async (userId) => {
    await dispatch(unbanUser(userId));
    await dispatch(getAllUsers());
  }

  if(isLoading) {
    return <h2>Please wait... loading</h2>
  }

  if(error) {
    return <h2>{error}</h2>
  }

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
                <td>
                  {user.banInfo ? (
                    <button onClick={() => handleUnbanUser(user.user._id)}>Unban</button>
                  ) : (
                    <button onClick={() => handleBanUser(user.user._id)}>Ban</button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminPanelPage;
