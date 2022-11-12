import React from "react";

// MUI
import { Box } from "@mui/material";
import MinimalScheduleCard from "../../../templates/schedule/MinimalScheduleCard";

function ScheduleList() {
  const placeholderList = [
    {
      title: "Final Project: WWI",
      subject: "US History",
      dueDate: "12/8/21",
      daysLeft: "Tommorow",
    },
    {
      title: "Vocabulary Test",
      subject: "English",
      dueDate: "12/9/21",
      daysLeft: "Thursday",
    },
    {
      title: "Quiz on Ocean Life & Exploration",
      subject: "Marine Biology",
      dueDate: "12/10/21",
      daysLeft: "Friday",
    },
  ];

  return (
    <Box className="schedule-list">
      <h2>Your Upcoming Schedule</h2>

      {/* List */}
      {placeholderList.map((item) => {
        const { title, subject, dueDate, daysLeft } = item;

        return (
          <MinimalScheduleCard
            key={title + "-schedule-card"}
            title={title}
            subject={subject}
            dueDate={dueDate}
            daysLeft={daysLeft}
          />
        );
      })}

      {/* Placeholder Message */}
      <div className="placeholder-message">
        <p>
          All of these are examples and are here to showcase a future feature.
        </p>
        We plan to add a schedule planner soon, to help you plan your
        educational journey and make sure you stay on top of the things you need
        to do.
      </div>
    </Box>
  );
}

export default ScheduleList;
