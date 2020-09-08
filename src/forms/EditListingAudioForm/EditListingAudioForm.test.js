import React from 'react'
import { renderShallow } from '../../util/test-helpers'
import { fakeIntl } from '../../util/test-data'
import { EditListingAudioFormComponent } from './EditListingAudioForm'

const noop = () => null

describe('EditListingAudioForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingAudioFormComponent
        initialValues={{ country: 'US', images: [] }}
        intl={fakeIntl}
        dispatch={noop}
        onImageUpload={(v) => v}
        onSubmit={(v) => v}
        saveActionMsg="Save photos"
        onUpdateImageOrder={(v) => v}
        stripeConnected={false}
        updated={false}
        ready={false}
        updateInProgress={false}
        disabled={false}
        ready={false}
        onRemoveImage={noop}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
