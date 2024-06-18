import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('cabins could not be loaded!')
  }

  return data
}

export async function createUpdateCabin(cabin) {
  const isEditing = Boolean(cabin?.id)

  const hasImageUrl = cabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${cabin.image?.name}`

  const imageUrl = hasImageUrl
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

  let query = supabase.from('cabins')

  if (!isEditing) {
    query = query.insert([{ ...cabin, image: imageUrl }])
  } else {
    query = query
      .update({ ...cabin, image: imageUrl })
      .eq('id', cabin.id)
  }

  const { data, error } = await query.select().single()

  if (error) {
    console.log('whileCreating: ', { error })
    throw new Error('Could not create cabin!')
  }

  if (hasImageUrl) return data // no need to upload a new image

  const { error: storageError } = await supabase.storage
    .from('cabins-images')
    .upload(imageName, cabin.image)

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', cabin.id)
    console.log('whileUplaoding: ', { storageError })
    throw new Error("Couldn't add cabin due to image upload error!")
  }

  return data
}

export async function deleteCabin(id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.log(error)
    throw new Error('cabin could not be deleted!')
  }
}
