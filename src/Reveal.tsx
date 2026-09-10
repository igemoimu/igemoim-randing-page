import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

const RevealGroupContext = createContext<boolean | null>(null)

type RevealGroupProps = {
  children: ReactNode
  className?: string
}

export function RevealGroup({ children, className = '' }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )
  const [active, setActive] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const sync = () => setDesktop(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!desktop) return

    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -16% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [desktop])

  return (
    <RevealGroupContext.Provider value={desktop ? active : null}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </RevealGroupContext.Provider>
  )
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const groupActive = useContext(RevealGroupContext)
  const inGroup = groupActive !== null
  const [selfVisible, setSelfVisible] = useState(false)
  const visible = inGroup ? groupActive : selfVisible

  useEffect(() => {
    if (inGroup) return

    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSelfVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSelfVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inGroup])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
