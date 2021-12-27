import React from "react";

// MUI
import { Box } from "@material-ui/core";

function MinimalScheduleCard(props) {
  const { title, subject, dueDate, daysLeft } = props;

  return (
    <Box className="minimal-schedule-card">
      <Box className="main between-row">
        <Box className="schedule-info">
          <h3>{title}</h3>
          <p>{subject}</p>
        </Box>

        <p className="due-date">{dueDate}</p>
      </Box>

      {/* Days Left */}
      <p className="days-left">{daysLeft}</p>
    </Box>
  );
}

export default MinimalScheduleCard;
