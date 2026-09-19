'use client'

let isAnimating = false

export function isScrollAnimating(): boolean {
  return isAnimating
}

/**
 * Custom smooth scroll with configurable duration and luxury easing curve
 * Slows down the transition between sections for a calm, cinematic feel.
 */
export function smoothScrollTo(
  target: string | HTMLElement,
  duration = 1200,
  onComplete?: () => void
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }

    const element =
      typeof target === 'string'
        ? document.getElementById(target) || document.querySelector(target)
        : target

    if (!element) {
      resolve()
      return
    }

    const targetY = (element as HTMLElement).offsetTop
    const startY = window.scrollY
    const diff = targetY - startY

    if (Math.abs(diff) < 2) {
      resolve()
      return
    }

    isAnimating = true

    const html = document.documentElement
    const prevSnap = html.style.scrollSnapType
    const prevBehavior = html.style.scrollBehavior

    // Temporarily release CSS scroll-snap and instant-smooth so JS animation is in full control
    html.style.scrollSnapType = 'none'
    html.style.scrollBehavior = 'auto'

    const startTime = performance.now()

    // Smooth cubic bezier easing: slow start, gentle acceleration, prolonged slow deceleration
    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOutCubic(progress)

      window.scrollTo(0, startY + diff * eased)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        window.scrollTo(0, targetY)
        // Wait a moment before re-engaging scroll snap to prevent backward jump
        setTimeout(() => {
          html.style.scrollSnapType = prevSnap || 'y mandatory'
          html.style.scrollBehavior = prevBehavior || 'smooth'
          isAnimating = false
          if (onComplete) onComplete()
          resolve()
        }, 60)
      }
    }

    requestAnimationFrame(step)
  })
}
