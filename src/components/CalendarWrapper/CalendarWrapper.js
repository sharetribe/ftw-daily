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

    async componentDidMount() {
        if(ssrCheck) {
            let calendar = await import('@fullcalendar/react')
            FullCalendar = calendar.default

            let daygrid = await import('@fullcalendar/daygrid')
            dayGridPlugin = daygrid.default
        
            let interaction = await import('@fullcalendar/interaction')
            interactionPlugin = interaction.default
           
            let timegrid = await import('@fullcalendar/timegrid')
            timeGridPlugin = timegrid.default
          
            let list = await import('@fullcalendar/list')
            listPlugin = list.default
           
            // Re-render for isomorphic purposes
            this.setState({ appIsMounted : true });
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
                    firstDay={1}
                    locale={'de'}
                    //dayNamesShort={['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']}
                />}
            </div>
        )
    }
  }
  
  export default FullCalendarWrapper;
