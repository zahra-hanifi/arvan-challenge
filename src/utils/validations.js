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

export function isNullOrUndefined(value) {
  return value === undefined || value === null
}

export function hasValue(value) {
  return !isNullOrUndefined(value) && !!value.length
}

export function isEmail(value) {
  const reg = /^[a-zA-Z0-9._%-]+@\w+([.-]?\w+)*(\.\w{2,20})+$/
  return reg.test(value)
}
