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
				<div className={css.priceContainer}>
					<div className={css.priceSection}>
						<div className={css.priceTabelLabel}>
							<FormattedMessage id="Time.openTime" />
						</div>
						<div className={css.priceTableValues}>
							<div className={css.priceRow}>
								<span className={css.priceLabel}><FormattedMessage id="Time.morning" /></span>
								<span>{morningStartHourFormatted}</span>
							</div>
							<div className={css.priceRow}>
								<span className={css.priceLabel}><FormattedMessage id="Time.afternoon" /></span>
								<span>{afternoonStartHourFormatted}</span>
							</div>
							<div className={css.priceRow}>
								<span className={css.priceLabel}><FormattedMessage id="Time.entireDay" /></span>
								<span>{dayStartHourFormatted}</span>
							</div>
						</div>
					</div>
					<div className={css.priceSection}>
						<div className={css.priceTabelLabel}>
							<FormattedMessage id="Time.closeTime" />
						</div>
						<div className={css.priceTableValues}>
							<div className={css.priceRow}>
									<span className={css.priceLabel}><FormattedMessage id="Time.morning" /></span>
									<span>{morningEndHourFormatted}</span>
								</div>
								<div className={css.priceRow}>
									<span className={css.priceLabel}><FormattedMessage id="Time.afternoon" /></span>
									<span>{afternoonEndHourFormatted}</span>
								</div>
								<div className={css.priceRow}>
									<span className={css.priceLabel}><FormattedMessage id="Time.entireDay" /></span>
									<span>{dayEndHourFormatted}</span>
								</div>
						</div>
					</div>
				</div>
			</div>
    )
}


export default SectionTime;