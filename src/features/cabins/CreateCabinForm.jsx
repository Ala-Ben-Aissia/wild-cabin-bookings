import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import { useCreateUpdateCabin } from './useCreateUpdateCabin'

function CreateCabinForm({ cabinToEdit, closeModal }) {
  const isEditing = Boolean(cabinToEdit)

  const { register, handleSubmit, reset, getValues, formState } =
    useForm({
      defaultValues: isEditing ? cabinToEdit : {},
    })
  const { errors } = formState

  const { isPending, createUpdateCabin } =
    useCreateUpdateCabin(cabinToEdit)

  function onSubmit(data) {
    if (!isEditing) {
      createUpdateCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: (data) => {
            console.log(data) // this data is the returned data (from the api) => the newly created one (contains id and createdAt...)
            reset()
            closeModal?.()
          },
        }
      )
      // data.image[0] => FileList (FileBody / imageFile)
    } else {
      createUpdateCabin(
        {
          ...data,
          image:
            typeof data.image === 'string'
              ? data.image
              : data.image[0],
        },
        {
          onSuccess: () => {
            reset()
            closeModal?.()
          },
        }
      )
    }
  }

  function onError(error) {
    console.log(error)
  }

  return (
    <Form
      type={closeModal ? 'modal' : 'regular'}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          disabled={isPending}
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required!',
          })}
          autoComplete='off'
        />
      </FormRow>

      <FormRow
        label={'Maximum capacity'}
        error={errors?.maxCapacity?.message}
      >
        <Input
          disabled={isPending}
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required!',
            min: {
              value: 1,
              message: 'capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label={'Regular price'}
        error={errors?.regularPrice?.message}
      >
        <Input
          disabled={isPending}
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required!',
            min: {
              value: 1,
              message: 'price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          disabled={isPending}
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required!',
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'discount should be less than regularPrice!',
            // validate: (value, fieldValues) =>
            //   value <= fieldValues.regularPrice ||
            //   'discount must be less than regularPrice!',
          })}
        />
      </FormRow>

      <FormRow
        label={'Description for website'}
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field is required!',
          })}
        />
      </FormRow>

      <FormRow label={'Cabin photo'} error={errors?.image?.message}>
        <FileInput
          disabled={isPending}
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditing ? false : 'This field is required!',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation='secondary'
          type='reset'
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditing ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
