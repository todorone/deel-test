import { useCallback, useState } from 'react'

let counter = 0

export function useForceUpdate() {
  const [, setState] = useState(0)
  return useCallback(() => setState(++counter), [])
}
