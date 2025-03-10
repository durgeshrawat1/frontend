import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={<SpeedIcon />}
              title="API Performance"
            />
            <CardContent>
              <Typography variant="h6">98%</Typography>
              <Typography color="textSecondary">
                Average Response Time: 120ms
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={<StorageIcon />}
              title="Model Usage"
            />
            <CardContent>
              <Typography variant="h6">1.2M</Typography>
              <Typography color="textSecondary">
                Requests This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={<SecurityIcon />}
              title="Security Status"
            />
            <CardContent>
              <Typography variant="h6">Active</Typography>
              <Typography color="textSecondary">
                All Systems Operational
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 