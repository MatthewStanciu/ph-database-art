import { useState } from 'react'

const Submit = () => {
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    let submission = await fetch('/api/new', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (submission.ok) {
      submission = await submission.json()
      setMessage('')
      setSubmitting(false)
      setDone(true)
      setTimeout(() => setDone(false), 3000)
    } else {
      setSubmitting(false)
      setError('Something went wrong')
    }
  }

  return (
    <div className="flex flex-col items-left bg-gray-200 p-4 shadow-lg rounded container max-w-sm">
      <h1 className="mb-4 font-bold text-2xl">Submit a Message</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col xs:flex-row items-left gap-y-2 xs:gap-x-2 mb-1"
      >
        <textarea
          name="message"
          id="message"
          value={message}
          placeholder="Your Message"
          onChange={(e) => setMessage(e.target.value)}
          className="rounded border-none outline-none p-2 resize-none"
        ></textarea>
        <button
          type="submit"
          className="bg-amber-400 dark:bg-amber-500 rounded-md shadow-md dark:shadow-black/25 py-2 xs:px-2 font-bold hover:scale-105 transform transition
        disabled:opacity-50 disabled:hover:scale-100 dark:text-black"
          disabled={message.length === 0}
        >
          {submitting ? '•••' : 'Submit'}
        </button>
      </form>
      {error && (
        <p role="alert" className="text-red-500 text-sm">
          Something went wrong! ${error}
        </p>
      )}
      {done && (
        <p role="status" className="text-green-500 text-sm">
          Submitted!
        </p>
      )}
    </div>
  )
}

export default Submit
