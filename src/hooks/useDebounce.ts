import { useEffect } from "react"
import useTimeout from "./useTimeout"

export default function useDebounce(callback: () => void, delay: number, dependencies: unknown[]) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, reset])
  useEffect(() => {
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
