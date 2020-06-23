import React from 'react';
import loadable from '@loadable/component';

// const Interactions = loadable(() => import('@fullcalendar/interaction'));
// const ListPlugin = loadable(() => import('@fullcalendar/list'));
//const DayGrid = loadable(() => import('@fullcalendar/daygrid'));
//const TimeGrid = loadable(() => import('@fullcalendar/timegrid'));

// import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const FullCalendar = loadable(() => import('@fullcalendar/react'), { ssr: false });

const CalendarWrapper = ({header, defaultView, selectable, editable, events, eventClick, select, eventDrop, eventResize}) => {
    
    return typeof window !== 'undefined' && typeof Element !== 'undefined' && typeof document !== 'undefined' && (
    <FullCalendar 
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        defaultView={defaultView} 
        header={header}
        selectable={selectable}
        editable={editable}
        events={events}
        eventClick={eventClick}
        select={select}
        eventDrop={eventDrop}
        eventResize={eventResize}
        selectOverlap={false}
        eventOverlap={false}
    />
    );
  };
  
  export default CalendarWrapper;
