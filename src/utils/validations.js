export function validate(validations, value, inputId) {
  let status = true
  let error = null

  if (validations?.length) {
    for (const validation of validations) {
      if (validation.rule(value)) {
        error = null
        status = true
        continue
      }

      error = validation.message
      status = false
      break
    }
  }

  if (!inputId) return { status, error }

  const inputEl = document.getElementById(inputId)

  if (inputEl) {
    inputEl.dispatchEvent(
      new CustomEvent('validate', {
        detail: { key: inputId, value: status },
      })
    )
  }

  return { status, error }
}
