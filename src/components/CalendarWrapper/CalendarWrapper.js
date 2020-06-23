import React, { Component } from 'react';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarWrapper = ({header, defaultView, selectable, editable, events, eventClick, select, eventDrop, eventResize}) => {
    return (
    <FullCalendar 
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}

        defaultView={defaultView} 
        header={header}
        selectable={selectable}
        editable={editable}
        events={events}

        eventClick={eventClick}
        select={select}
        eventDrop={eventDrop}
        eventResize={eventResize}
        // eventDragStart={this.changeScheduleTime}
        // dateClick={this.scheduleTime}
        selectOverlap={false}
        eventOverlap={false}
    />
    );
  };
  
  export default CalendarWrapper;