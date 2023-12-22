import React, { useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, DateCalendar } from '@mui/x-date-pickers';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import {  Drawer } from '@mui/material';
import SecondNav from '../components/SecondNav';

function fakeFetch(date, tdata, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const startOfMonth = date.startOf('month');
      const endOfMonth = date.endOf('month');

      const daysToHighlight = tdata
        .filter((item) =>
          dayjs(item.createAt.seconds * 1000).isSame(startOfMonth, 'month') ||
          dayjs(item.createAt.seconds * 1000).isSame(endOfMonth, 'month')
        )
        .map((item) => dayjs(item.createAt.seconds * 1000).date());

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

function ServerDay(props) {
  const { tdata, highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  const title = tdata.find(
    (item) => dayjs(item.createAt.seconds * 1000).date() === day.date()
  )?.title;
  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '✨' : undefined}
      title={title}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest({
  isDLDrawerOpen,
  setDLDrawerOpen,
  tdata,
}) {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const requestAbortController = useRef(null);  
  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, tdata, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(selectedDate);
    return () => requestAbortController.current?.abort();
  }, [selectedDate]);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <Drawer
      anchor="top"
      open={isDLDrawerOpen}
      onClose={() => setDLDrawerOpen(false)}
      PaperProps={{ style: { height: '100vh', background: '#FFF8FF' } }}
    >
      <SecondNav title={'Calender'} setDLDrawerOpen={setDLDrawerOpen} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: (props) => <ServerDay tdata={tdata} {...props} />,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
        />
      </LocalizationProvider>
    </Drawer>
  );
}