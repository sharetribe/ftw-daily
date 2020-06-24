import React, {Component} from 'react';

const ssrCheck = typeof window !== 'undefined' && typeof Element !== 'undefined' && typeof document !== 'undefined'

let FullCalendar = null
let dayGridPlugin = null
let interactionPlugin = null
let timeGridPlugin = null
let listPlugin = null

class FullCalendarWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          appIsMounted: false,
        };
    }

    componentDidMount() {
        if(ssrCheck) {
            import ('@fullcalendar/react').then(calendar => FullCalendar = calendar.default)
            import ('@fullcalendar/daygrid').then(daygrid => dayGridPlugin = daygrid.default)
            import ('@fullcalendar/interaction').then(interaction => interactionPlugin = interaction.default)
            import ('@fullcalendar/timegrid').then(timegrid => timeGridPlugin = timegrid.default)
            import ('@fullcalendar/list').then(list => { 
                listPlugin = list.default
                // Re-render for isomorphic purposes
                this.setState({ appIsMounted : true });
             })
        }    
      }

      render() {
        const {appIsMounted } = this.state
        const {header, defaultView, selectable, editable, events, eventClick, select, eventDrop, eventResize} = this.props
        const componentCheck = FullCalendar && dayGridPlugin && interactionPlugin && timeGridPlugin && listPlugin
        
        if(!appIsMounted) return null
        
        return (
            <div>
                {componentCheck && <FullCalendar 
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
                />}
            </div>
            
            
        )
    }
  }
  
  export default FullCalendarWrapper;
