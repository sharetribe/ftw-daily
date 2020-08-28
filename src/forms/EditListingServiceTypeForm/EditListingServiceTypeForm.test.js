import React from 'react'
import { renderDeep } from '../../util/test-helpers'
import { fakeIntl } from '../../util/test-data'
import EditListingServiceTypeForm from './EditListingServiceTypeForm'

const noop = () => null

describe('EditListingServiceTypeForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <EditListingServiceTypeForm
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={(v) => v}
        saveActionMsg="Save description"
        updated={false}
        updateInProgress={false}
        disabled={false}
        ready={false}
        categories={[
          { key: 'cat1', label: 'Cat 1' },
          { key: 'cat2', label: 'Cat 2' },
        ]}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
