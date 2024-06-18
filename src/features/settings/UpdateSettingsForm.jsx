import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSetting'
import Spinner from '../../ui/Spinner'

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingNights,
      maxBookingNights,
      maxBookingGuests,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings()

  const { isPending, updateSetting } = useUpdateSetting()

  function handleUpdate(event, settingField) {
    const { value } = event.target
    if (!value) return
    updateSetting({ [settingField]: value })
  }

  if (isLoading) return <Spinner />

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isPending}
          type="number"
          id="min-nights"
          defaultValue={minBookingNights}
          onBlur={(e) => handleUpdate(e, 'minBookingNights')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isPending}
          type="number"
          id="max-nights"
          defaultValue={maxBookingNights}
          onBlur={(e) => handleUpdate(e, 'maxBookingNights')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isPending}
          type="number"
          id="max-guests"
          defaultValue={maxBookingGuests}
          onBlur={(e) => handleUpdate(e, 'maxBookingGuests')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isPending}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
