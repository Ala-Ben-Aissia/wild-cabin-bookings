import supabase, { supabaseUrl } from './supabase'

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  })

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  return data // { user: {...}, session: {...} }
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  return data
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data: { user } = {}, error } = await supabase.auth.getUser()

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  return user
}

export async function updateCurrentUser({
  fullName,
  avatar,
  password,
}) {
  // 1. Update password | fullName
  let updates

  if (password) updates = { password }
  if (fullName) updates = { data: { fullName } } // meta_data

  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser(updates)

  if (error) {
    console.log({ error })

    throw new Error(error.message)
  }

  if (!avatar) return user

  // 2. Upload the avatar image
  const fileName = `avatar-${user.id}-${Math.random()}`

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar)

  if (storageError) {
    console.log({ storageError })
    throw new Error('Could not upload avatar!')
  }

  // 3. Update the avatar image
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`

  const { error: imageError } = await supabase.auth.updateUser({
    data: {
      avatar: avatarPath,
    },
  })

  if (imageError) {
    console.log({ imageError })
    throw new Error('Could not update avatar!')
  }

  return user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
    throw new Error('Could not logout!')
  }
}
