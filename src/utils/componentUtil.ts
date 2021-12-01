export function getComponentProps<T extends Recordable, U extends T>(
  props: U,
  componentProps: T
): T {
  const cKeys = Object.keys(componentProps)
  return Object.keys(props).reduce((cProps: T, propKey: keyof T) => {
    if (cKeys.includes(propKey as string)) {
      return {
        ...cProps,
        [propKey]: props[propKey]
      }
    } else {
      return cProps
    }
  }, {} as T)
}
