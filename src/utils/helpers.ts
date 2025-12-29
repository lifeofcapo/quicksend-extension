export function waitForElement(selector: string, timeout = 5000) {
  return new Promise<HTMLElement>((resolve, reject) => {
    const start = Date.now()

    const check = () => {
      const el = document.querySelector(selector)
    if (el instanceof HTMLElement) {
        resolve(el)
        return
      }

      if (Date.now() - start > timeout) {
        reject(new Error(`Element ${selector} not found`))
      } else {
        requestAnimationFrame(check)
      }
    }

    check()
  })
}

export function findParentComposeWindow(element: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = element

    while (current) {
        if (
            current.classList.contains("AD") ||
            current.classList.contains("aSt")
        ) {
            return current
        }
        current = current.parentElement
    }

    return null
}
