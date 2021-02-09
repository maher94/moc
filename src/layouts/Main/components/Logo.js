import React from 'react';
const usersession = JSON.parse(localStorage.getItem('user'));
const logopath=usersession!=null?usersession.sexe=="F"?"https://moc.cleverapps.io/images/logos/F.Gif":"https://moc.cleverapps.io/images/logos/M.Gif":"https://moc.cleverapps.io/images/logos/M.Gif"
const Logo = (props) => {
  return (
    <img
      
      src={logopath}
      {...props}
    />
  );
};

export default Logo;
