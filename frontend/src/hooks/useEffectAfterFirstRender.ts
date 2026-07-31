import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * Hook này hoạt động giống useEffect nhưng bỏ qua lần render đầu tiên.
 * @param effect callback function
 * @param deps dependency array
 */
export function useEffectAfterFirstRender(effect: EffectCallback, deps: DependencyList) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    return effect();
  }, deps);
}
