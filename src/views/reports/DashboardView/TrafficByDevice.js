import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

const useStyles = makeStyles(() => ({
  root: {
    
  }
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [1, 15, 22],
        backgroundColor: [
          '#BD0A07',"#259E1A","#FBF269",
         
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Rejected', 'Validated', 'Waiting Validation']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Rejected',
      value: 63,
      icon: LaptopMacIcon,
      color: '#BD0A07'
    },
    {
      title: 'Validated',
      value: 15,
      icon: TabletIcon,
      color:"#259E1A"
    },
    {
      title: 'Waiting Validation',
      value: 23,
      icon: PhoneIcon,
      color: "#FBF269"
    }
  ];

  return (
   <div>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Traffic by Device" />
      
      <CardContent>
        <Box
          height={200}
          display=" static"
          justifyContent="center"
        >
          <Doughnut
            data={data}
            options={options}
          />
          
        </Box>
        
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
           
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
             
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Traffic by Device" />
      <CardContent>
        <Box
          height={200}
          display="flex"
          justifyContent="center"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={1}
        >
          {devices.map(({
            color,
           
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
             
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
    </div>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;
