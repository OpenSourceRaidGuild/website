export default function Contact() {
  return (
    <form name="contact" method="POST" data-netlify="true">
      <p>
        <label>
          Your Name: <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Your Role:
          <select name="role">
            <option value="">--Please choose an option--</option>
            <option value="Maintainer">Maintainer</option>
            <option value="Contributor">Contributor</option>
            <option value="Guild Member">Guild Member</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="message"></textarea>
        </label>
      </p>
      <p>
        <button
          type="submit"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          Send
        </button>
      </p>
    </form>
  )
}
