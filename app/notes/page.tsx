import { redirect } from 'next/navigation'

const Notes = async () => {
  redirect('/notes/filter/All')
}

export default Notes