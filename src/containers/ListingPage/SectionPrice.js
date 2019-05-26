import React from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { formatMoney } from '../../util/currency';
import { InlineTextButton } from '../../components';

import css from './ListingPage.css';

const SectionPrice = props => {
		const { intl , priceInfo} = props
		const priceMorningAdultFormatted = formatMoney(intl, priceInfo.priceMorningAdult);
		const priceAfternoonAdultFormatted = formatMoney(intl, priceInfo.priceAfternoonAdult);
		const priceDayAdultFormatted = formatMoney(intl, priceInfo.priceDayAdult);
		const priceMorningChildFormatted = formatMoney(intl, priceInfo.priceMorningChild);
		const priceAfternoonChildFormatted = formatMoney(intl, priceInfo.priceAfternoonChild);
		const priceDayChildFormatted = formatMoney(intl, priceInfo.priceDayChild);
	
    return (
			<div className={css.sectionDescription}>
				<h2 className={css.descriptionTitle}>
					<FormattedMessage id="ListingPage.priceTitle" />
				</h2>

				<div className={css.priceContainer}>
					<div className={css.priceSection}>
						<div className={css.priceTabelLabel}>
							<FormattedMessage id="User.adult" />
						</div>
						<div className={css.priceTableValues}>
							<div className={css.priceRow}>
								<span className={css.priceLabel}><FormattedMessage id="Time.morning" /></span>
								<span>{priceMorningAdultFormatted}</span>
							</div>
							<div className={css.priceRow}>
								<span className={css.priceLabel}><FormattedMessage id="Time.afternoon" /></span>
								<span>{priceAfternoonAdultFormatted}</span>
							</div>
							<div className={css.priceRow}>
								<span className={css.priceLabel}><FormattedMessage id="Time.entireDay" /></span>
								<span>{priceDayAdultFormatted}</span>
							</div>
						</div>
					</div>
					<div className={css.priceSection}>
						<div className={css.priceTabelLabel}>
							<FormattedMessage id="User.child" />
						</div>
						<div className={css.priceTableValues}>
							<div className={css.priceRow}>
									<span className={css.priceLabel}><FormattedMessage id="Time.morning" /></span>
									<span>{priceMorningChildFormatted}</span>
								</div>
								<div className={css.priceRow}>
									<span className={css.priceLabel}><FormattedMessage id="Time.afternoon" /></span>
									<span>{priceAfternoonChildFormatted}</span>
								</div>
								<div className={css.priceRow}>
									<span className={css.priceLabel}><FormattedMessage id="Time.entireDay" /></span>
									<span>{priceDayChildFormatted}</span>
								</div>
						</div>
					</div>
				</div>


				{/* <table className={css.table}>
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
								<td>Adulto</td>
								<td><p className={css.description}>{priceMorningAdultFormatted}</p></td>
								<td><p className={css.description}>{priceAfternoonAdultFormatted}</p></td>
								<td><p className={css.description}>{priceDayAdultFormatted}</p></td>
							</tr>
							<tr>
								<td>Criança</td>
								<td><p className={css.description}>{priceMorningChildFormatted}</p></td>
								<td><p className={css.description}>{priceAfternoonChildFormatted}</p></td>
								<td><p className={css.description}>{priceDayChildFormatted}</p></td>
							</tr>
					</tbody>
				</table> */}
			</div>
    )
}


export default SectionPrice;