import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatTime } from '../../util/time';

import css from './ListingPage.css';

const SectionTime = props => {
		const { timeInfo } = props
		const morningStartHourFormatted = timeInfo.morningStartHour ? formatTime(timeInfo.morningStartHour): '-'
		const morningEndHourFormatted = timeInfo.morningEndHour ? formatTime(timeInfo.morningEndHour): '-'
		const afternoonStartHourFormatted = timeInfo.afternoonStartHour ? formatTime(timeInfo.afternoonStartHour): '-'
		const afternoonEndHourFormatted = timeInfo.afternoonEndHour ? formatTime(timeInfo.afternoonEndHour): '-'
		const dayStartHourFormatted = timeInfo.dayStartHour ? formatTime(timeInfo.dayStartHour): '-'
		const dayEndHourFormatted = timeInfo.dayEndHour ? formatTime(timeInfo.dayEndHour): '-'
	
    return (
			<div className={css.sectionDescription}>
				<h2 className={css.descriptionTitle}>
					<FormattedMessage id="ListingPage.dimensionsSchedule" />
				</h2>
				<div className={css.timeContainer}>
					<div className={css.dimensionsRow}>
						<p className={css.description}><b><FormattedMessage id="Time.morning" />:</b> {morningStartHourFormatted}-{morningEndHourFormatted}</p>
					</div>
					<div className={css.dimensionsRow}>
						<p className={css.description}><b><FormattedMessage id="Time.afternoon" />:</b> {afternoonStartHourFormatted}-{afternoonEndHourFormatted}</p>
					</div>
					<div className={css.dimensionsRow}>
						<p className={css.description}><b><FormattedMessage id="Time.entireDay" />:</b> {dayStartHourFormatted}-{dayEndHourFormatted}</p>
					</div>
				</div>
			</div>
    )
}


export default SectionTime;