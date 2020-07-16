import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { 
  getAcceptedAndActiveTransactionsData,
  getAcceptedTransactionSchedulingData,
  resetAcceptedAndActiveTransactionsData,
  createNewSchedulingDataTransaction,
  deleteSchedulingDataTransaction,
 } from './CalendarPage.duck.js';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ResponsiveImage,
  CalendarWrapper,
} from '../../components';
import { TopbarContainer } from '..';

import css from './CalendarPage.css';

const timeHelper = (d) => d.toLocaleString().split(", ").splice(1)

export class CalendarPageComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      acceptedTransactionSelected: false,
      acceptedTransactionId: null,

      isCurrentUserAcceptedTransactionCustomer: false,

      transcationStartDate: null,
      transcationEndDate: null,

      scheduledRidings: [],
      pendingRidings: [],
      pendingRidingIds: [],

      temporaryId: 'temporaryId',
      
      idHandledByNotification: null,

      notificationPopupVisible: false,
      notificationStartDate: null,
      notificationEndDate: null,
      notificationTitle: '',

      notificationState: null,
    };
    this.notificationPopup = React.createRef();
  }

  getStatusFromEventId = id => this.state.scheduledRidings.filter(_ => _.id === id)[0]

  checkOwner = owner => !owner.ownerId || owner.ownerId !== this.props.currentUserId

  checkTimeBoundaries = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const transcationStartDate = new Date(this.state.transcationStartDate)
    const transcationEndDate = new Date(this.state.transcationEndDate)
    return startDate < transcationStartDate || endDate < transcationStartDate || startDate > transcationEndDate || endDate > transcationEndDate 
  } 

  scheduleTime = (calendarEvent) => {
    const isDateAlreadySelected = this.handleNotificationCloseOnOutsideClick()
    
    if(isDateAlreadySelected) return
    if(!calendarEvent.startStr || !calendarEvent.endStr) return 
    const checkDate = new Date(calendarEvent.startStr)
    checkDate.setHours(checkDate.getHours() + 1)
    
    let startDate = calendarEvent.startStr
    let endDate = calendarEvent.endStr

    const isNotInsideTransactionTimeBoundaries = this.checkTimeBoundaries(startDate, endDate)
    if(isNotInsideTransactionTimeBoundaries) {
      console.log('impossible to appoint riding at time which goes beyond accepted transaction')
      return
    }
    
    if (checkDate > endDate) {
      endDate = checkDate
    }

    const newEvent = { 
      title: "Horse Deal 24",
      start: startDate, 
      end: endDate,
      backgroundColor: "lightgrey",//"#923395",
      id: this.state.temporaryId,
      status: 'temporary'
    }

    this.setState(() => ({
    }), this.addCalendarEvent(newEvent, calendarEvent))
  }

  callNotificationPopup = (ev) => {
    const { jsEvent } = ev
    const { target} = jsEvent
    const { event } = ev
    const { end, start, id: eventId, status } = event
    const { x, y } = target.getBoundingClientRect()
    const eventIdStatus = status ? status : this.getStatusFromEventId(eventId)
    if(!status && !eventIdStatus) {
      console.log('Expected status got: ', status)
      return
    }
    
    this.setState({
      notificationStartDate: timeHelper(start),
      notificationEndDate: timeHelper(end),
      notificationPopupVisible: true,
      idHandledByNotification: eventId,
      notificationState: status || eventIdStatus.status,
    })

    if(this.notificationPopup.current && typeof window !== 'undefined') {
      this.notificationPopup.current.style.left = x - 345 + 'px'
      this.notificationPopup.current.style.top = y + window.scrollY + 'px'
    }
  } 

  closeNotificationPopup = (forceClose = false, setCancelledStatus = false) => {
    if(this.state.idHandledByNotification === this.state.temporaryId || forceClose) {
      this.deleteCalendarEvent(this.state.idHandledByNotification, setCancelledStatus)
    }

    this.setState({
      notificationStartDate: null,
      notificationEndDate: null,
      notificationPopupVisible: false,
      idHandledByNotification: null,
    })
  }

  handleNotificationCloseOnOutsideClick = () => {
    if(this.state.idHandledByNotification) {
      this.closeNotificationPopup()
      return true
    } 
    return false
  }

  setNotificationTitle = (event) => {
    event.persist()
    this.setState({ notificationTitle: event.target.value || '' })
  }

  appointNewSchedulingItem = () => {
    const {acceptedTransactionId, scheduledRidings, temporaryId, notificationTitle} = this.state
    if(!acceptedTransactionId) {
      throw new Error('Expected acceptedTransactionId, received ', acceptedTransactionId)
    }
    const appointedData = {}
    scheduledRidings.forEach(riding => {
      if (riding.id === temporaryId) {
        const { start, end } = riding
        appointedData.title = notificationTitle
        appointedData.start = start
        appointedData.end = end
        appointedData.ownerId = this.props.currentUserId
        appointedData.acceptedTransactionId = acceptedTransactionId
      }
    })
   if(Object.keys(appointedData).length)  {
     this.closeNotificationPopup()
     this.props.onCreatingNewSchedulingDataTransaction(appointedData)
     .then(response => {
      appointedData.id = response.data.data.id.uuid
      appointedData.status = 'appointed'
      appointedData.backgroundColor = '#923395'
      this.setState(() => ({
        scheduledRidings: [...scheduledRidings.filter(e => e.id !== temporaryId), appointedData ]
      }), ()=> console.log(this.state))
     })
   }
  }
  
  returnBackPreviouslyChangedTime = (newAppointment = false) => {
    const {idHandledByNotification: eventId, /*notificationEndDate, notificationStartDate,*/ pendingRidings, scheduledRidings} = this.state
    const data = newAppointment ? scheduledRidings : pendingRidings
    const riding =  Object.assign({}, data.find(i => i.id === eventId))
    //const newId = 'appointed' + Math.random()
  
    if(!riding) {
      throw new Error('returnBackPreviouslyChangedTime: Expected riding data object, got ', riding)
    }
    this.closeNotificationPopup()

    this.setState({
      pendingRidings: this.state.pendingRidings.filter(i => i.id !== eventId),
      pendingRidingIds: this.state.pendingRidingIds.filter(i => i !== eventId)
    })

    if(!newAppointment) {
      this.setState({
        scheduledRidings: [...this.state.scheduledRidings.filter(i => i.id !== eventId), riding],      
      })
    }
    else {       
      this.deleteCalendarEvent(eventId, true).then(response => {
        this.props.onCreatingNewSchedulingDataTransaction(riding)
        .then(response => {
          riding.id = response.data.data.id.uuid
          riding.backgroundColor = '#923395'
          riding.status = 'appointed'
          this.setState(() => ({
            scheduledRidings: [...scheduledRidings.filter(e => e.id !== eventId), riding]
          }), ()=> console.log(this.state))
        })
      })
    }
  }

  changeScheduleTime = (ev) => {
    const { end, start, id } = ev.event
    const isNotTemporaryId = this.state.idHandledByNotification !== this.state.temporaryId
    const ownerData = this.getStatusFromEventId(id) || { ownerId: null }  
    
    if(isNotTemporaryId && this.checkOwner(ownerData)) {
      console.log('only the owner of scheduled ridings has right to change time ')
      ev.revert()
      return
    }
    
    const isNotInsideTransactionTimeBoundaries = this.checkTimeBoundaries(start, end)
    if(isNotInsideTransactionTimeBoundaries) {
      console.log('impossible to appoint riding at time which goes beyond accepted transaction')
      ev.revert()
      return
    }

    this.setState({
      notificationStartDate: timeHelper(start),
      notificationEndDate: timeHelper(end),
    })
  
    if(isNotTemporaryId) {
      let temporaryData = { backgroundColor: 'lightgrey', status: 'pending' }
      let pendingData

      this.setState({
        scheduledRidings: [...this.state.scheduledRidings.filter(riding => { 
          if(riding.id === id) {
            pendingData = {...riding}
            temporaryData = {...riding, ...temporaryData, start, end}
            return false
          }
          return true
         }), temporaryData],
      })
      
      if(pendingData && this.state.pendingRidingIds.indexOf(id) === -1) {
        this.setState({
          pendingRidings: [...this.state.pendingRidings, pendingData],
          pendingRidingIds: [...this.state.pendingRidingIds, id]
        })
      }
      console.log('pendingData ', this.state.pendingRidings)
    }
  }

  selectAcceptedTransaction = (acceptedTransaction) => {
    console.log('acceptedTransaction ', acceptedTransaction)
    
    this.setState(() => ({
       acceptedTransactionId: acceptedTransaction.id.uuid
      }), () => this.props.onAcceptedTransactionSelect(acceptedTransaction)
      .then(({ ridings, currentUserIsTransactionCustomer, transcationStartDate, transcationEndDate }) => {
        const scheduledRidings = ridings ? ridings : []
        console.log('scheduledRidings ', scheduledRidings)
        console.log('currentUserIsTransactionCustomer ', currentUserIsTransactionCustomer)
        this.setState({ 
          acceptedTransactionSelected: true,
          scheduledRidings: [...scheduledRidings],
          isCurrentUserAcceptedTransactionCustomer: currentUserIsTransactionCustomer,
          transcationStartDate,
          transcationEndDate,
        })
      })) 
  }

  resetAcceptedTransaction = () => {
    this.props.onAcceptedTransactionReset()
    this.setState({
      acceptedTransactionId: null,
      acceptedTransactionSelected: false, 
    }) 
  }

  addCalendarEvent = (newEvent, calendarEvent) => {
    this.handleNotificationCloseOnOutsideClick()
    this.setState(() => ({
      scheduledRidings: [...this.state.scheduledRidings, newEvent]
    }), this.callNotificationPopup({...calendarEvent, event: { end: calendarEvent.end, start: calendarEvent.start, id: this.state.temporaryId, status: 'temporary' } })) 
  }

  deleteCalendarEvent = (id, setCancelledStatus) => {
    this.setState({
      scheduledRidings: this.state.scheduledRidings.filter(e => e.id !== id)
    })
    if(setCancelledStatus) {
      console.log('onDeletingSchedulingDataTransaction', id)
      return this.props.onDeletingSchedulingDataTransaction(id).then(response => response)
    }
  }

  render() {
    const { 
      scheduledRidings,
      acceptedTransactionSelected,
      notificationPopupVisible,
      notificationStartDate,
      notificationEndDate,
      notificationState,
      isCurrentUserAcceptedTransactionCustomer,
      // acceptedTransactionId,
      //idHandledByNotification,
    } = this.state
    
  const {
    intl,
    currentUserIdError,
    acceptedAndActiveTransactions,
    acceptedAndActiveTransactionsError,
    scheduledRidingsForActiveTransactionsError,
    newSchedulingDataTransactionError,
    loadingStarted
  } = this.props;

  const title = intl.formatMessage({ id: 'Calendar.title' });
  
  const schedulingConfig = {
    'temporary': 
      (<div>
        <span className={css.closeNotification} onClick={() => this.closeNotificationPopup()}>+</span>
        <input placeholder="Kommentar..." id="addEventInput" type="text" maxLength={40} onChange={this.setNotificationTitle} className={css.addEventInput} />
         <div className={css.dateNotification}>Möchtest Du den Eigentümer darüber informieren, einen Ausritt mit dem Pferd zu machen?</div>
         <div className={css.dateNotification}>Von <strong>{notificationStartDate}</strong>  bis <strong>{notificationEndDate}</strong> Uhr</div>
         <div className={css.notificationActions}>
           <button className={css.buttonColorful} onClick={this.appointNewSchedulingItem}>Zeit planen</button>
         </div>
      </div>),
    'appointed':
      (<div>
        <span className={css.closeNotification} onClick={() => this.closeNotificationPopup()}>+</span>
         <div className={css.dateNotification}>Möchtest Du den Eigentümer darüber informieren, die geplante Zeit zu löschen?</div>
         <div className={css.notificationActions}>
           <button className={css.buttonColorful} onClick={() => {
            //  this.deleteCalendarEvent(idHandledByNotification)
             this.closeNotificationPopup(true, true)
           }}>Zeit löschen</button>
         </div>
      </div>),
    'pending':
      (<div>
        <div className={css.dateNotification}>Möchtest Du die Zeit ändern und den Eigentümer darüber informieren?</div>
        <div className={css.notificationActions}>
          <button onClick={() => this.returnBackPreviouslyChangedTime(true)}>Zeit ändern</button>
          <button className={css.buttonColorful} onClick={() => this.returnBackPreviouslyChangedTime(false)}>Abbrechen</button>
        </div>
      </div>)
  } 

  const notification = (
    <div ref={this.notificationPopup} className={css.calendarNotification}>
       {schedulingConfig[notificationState]}
    </div>
  )

  const calendar = (
    <div className={'main-calendar'}>
      <div className={css.calendarInfo}>
        <h5>Meine Kalender</h5>
        <div className={css.calendarInfoItem}>
          <span style={{'background': '#923395'}}></span>
          <span>Festgelegt</span>
        </div>
        <div className={css.calendarInfoItem}>
          <span style={{'background': 'lightgrey'}}></span>
          <span>Provisorisch</span>
        </div>
      </div>
      <CalendarWrapper 
        header={{
          left: "prev,next today",
          center: "",
          right: "title",
        }}
        defaultView="timeGridWeek" 
        editable={true} 
        selectable={true}
        events={scheduledRidings}
        eventClick={isCurrentUserAcceptedTransactionCustomer ? this.callNotificationPopup : () => {}}
        select={isCurrentUserAcceptedTransactionCustomer ? this.scheduleTime : () => {}}
        eventDrop={this.changeScheduleTime}
        eventResize={this.changeScheduleTime}
        />
    </div>    
  ) 

  class ListingImage extends Component {
    render() {
      return <ResponsiveImage {...this.props} />;
    }
  }

  const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

  const activeTransactionsList = acceptedAndActiveTransactions && acceptedAndActiveTransactions.map( (trs,index) => {
    try {
      const data = JSON.parse(trs.attributes.protectedData.providerData)
      const title = data.listingData.title
      const firstImage = data.listingData.img
        
      return (
        <div className={css.ridingList} onClick={() => this.selectAcceptedTransaction(trs)} key={index}>
          <LazyImage
              rootClassName={null}
              alt={title}
              image={firstImage}
              variants={['landscape-crop', 'landscape-crop2x']}
              sizes={"(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1920px) 31.25vw, 20.833333333333332vw"}
            />
            <div>
              <div className={css.ridingTitle}>
                {title}
              </div>
              <div className={css.ridingProvider}>
                Von {data.provider.split(" ").splice(0,1).join("")}
              </div>
            </div>
        </div>
      )
    }
    catch(e) {}
  })

  const noActiveTransactionsCalendar = (
    <div className={css.emptyCalenderWrapper}>
      {calendar}
        <div className={css.emptyCalenderInfo}>
          <div className={css.ridingTitle}>Du hast noch keine aktiven Verträge.</div>
        </div> 
    </div>
  ) 

  if(activeTransactionsList && !activeTransactionsList.length) {
    activeTransactionsList.push(noActiveTransactionsCalendar)
  }

  let transactionError = null

  if(acceptedAndActiveTransactionsError || scheduledRidingsForActiveTransactionsError || currentUserIdError || newSchedulingDataTransactionError) {
    console.log("Error", [acceptedAndActiveTransactionsError,scheduledRidingsForActiveTransactionsError, currentUserIdError, newSchedulingDataTransactionError])
    transactionError = (
      <div style={{'margin':'auto'}}>
        Sorry, an unexpected error occurred. Try to reload the page or visit it after a while.
      </div>
    )
  }

  let showLoading = null

  if(loadingStarted) {
    showLoading = (<h2 className={css.loading} style={{'margin':'auto'}}>Lade...</h2>)
  }
    return (
      <Page className={css.root} title={title} scrollingDisabled={false}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="CalendarPage" />
            <UserNav selectedPageName="CalendarPage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            {transactionError || (
                <div className={css.calendarWrapper}>
                {showLoading}
                <div style={{'filter': loadingStarted ? 'blur(4px)' : 'initial'}}>
                  <div className={css.pageTitleWrapper}>
                    <h1 className={css.calendarPageTitle}>
                      Zeitplan Deiner Pferde
                    </h1>
                    {acceptedTransactionSelected && ( <button className={css.contactButton} onClick={this.resetAcceptedTransaction}>Zurück zu den Angeboten</button> )}
                  </div>
                  {acceptedTransactionSelected ? calendar : activeTransactionsList}
                </div> 
              </div> 
              )
            }
            {notificationPopupVisible && notification}
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

const mapStateToProps = state => {
    const { 
      currentUserId,
      currentUserIdError,
      acceptedAndActiveTransactions, 
      acceptedAndActiveTransactionsError, 
      scheduledRidingsForActiveTransactionsError,
      newSchedulingDataTransactionError,
      loadingStarted,
     } = state.CalendarPage;

    return {
      currentUserId,
      currentUserIdError,
      acceptedAndActiveTransactions,
      acceptedAndActiveTransactionsError,
      scheduledRidingsForActiveTransactionsError,
      newSchedulingDataTransactionError,
      loadingStarted,
    };
  };

const mapDispatchToProps = dispatch => ({
  onAcceptedTransactionSelect: params => dispatch(getAcceptedTransactionSchedulingData(params)),
  onAcceptedTransactionReset: () => dispatch(resetAcceptedAndActiveTransactionsData()),
  onCreatingNewSchedulingDataTransaction: schedulingObj => dispatch(createNewSchedulingDataTransaction(schedulingObj)),
  onDeletingSchedulingDataTransaction: id => dispatch(deleteSchedulingDataTransaction(id)),
});

const CalendarPage = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    injectIntl)
(CalendarPageComponent);

CalendarPage.loadData = () => getAcceptedAndActiveTransactionsData()


export default CalendarPage;
