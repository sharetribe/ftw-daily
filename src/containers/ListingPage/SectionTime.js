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
					<FormattedMessage id="ListingPage.priceTitle" />
				</h2>
				<table >
					<thead>
						<tr>
							<td></td>
							<td>Manhã</td>
							<td>Tarde</td>
							<td>Dia</td>
						</tr>
					</thead>
					<tbody>
							<tr>
								<td>Abertura</td>
								<td><p className={css.description}>{morningStartHourFormatted}</p></td>
								<td><p className={css.description}>{afternoonStartHourFormatted}</p></td>
								<td><p className={css.description}>{dayStartHourFormatted}</p></td>
							</tr>
							<tr>
								<td>Fecho</td>
								<td><p className={css.description}>{morningEndHourFormatted}</p></td>
								<td><p className={css.description}>{afternoonEndHourFormatted}</p></td>
								<td><p className={css.description}>{dayEndHourFormatted}</p></td>
							</tr>
					</tbody>
				</table>
			</div>
    )
}


export default SectionTime;