import React from 'react';

const Login = () => {
  return (
    <div style={{display: 'flex', flexDirection:'column'}}>
      <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-around'}}>
        <label htmlFor="login">user::</label>
        <input type="text" name="login" />
      </div>
      <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-around'}}>
        <label htmlFor="password">pass::</label>
        <input type="password" name="password" />
      </div>
      <div style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-start'}}>
        <label htmlFor="userName">name::</label>
        <input checked style={{ margin: '0 5px'}} type="radio" name="userName"/>
        <label htmlFor="userId">ID::</label>
        <input disabled={true} style={{ margin: '0 5px'}}  type="radio" name="userId"/>
      </div>
      <div style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-start'}}>
        <input type="submit" name="event" value="login"/>
      </div>
    </div>
  )
};

export default Login
