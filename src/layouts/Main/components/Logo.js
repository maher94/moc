import React from 'react';
const usersession = JSON.parse(localStorage.getItem('user'));
const logopath=usersession!=null?usersession.sexe=="F"?"/images/logos/F.Gif":"/images/logos/M.Gif":"/images/logos/M.Gif"
const Logo = (props) => {
  return (
    <img
      
      src={logopath}
      {...props}
    />
  );
};

export default Logo;
