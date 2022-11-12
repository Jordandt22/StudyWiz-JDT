import React from "react";

// MUI
import { Container, Box } from "@mui/material";

// Components
import RecentSetsWrapper from "./dashboard/RecentSetsWrapper";
import CommunitySets from "./dashboard/CommunitySets";
import ScheduleList from "./dashboard/ScheduleList";

function Dashboard() {
  return (
    <Container className="dashboard-container">
      {/* Recent Sets */}
      <RecentSetsWrapper />

      <Box className="dashboard-section-2">
        {/* Community Sets */}
        <CommunitySets />

        {/* Schedule List */}
        <ScheduleList />
      </Box>
    </Container>
  );
}

export default Dashboard;
