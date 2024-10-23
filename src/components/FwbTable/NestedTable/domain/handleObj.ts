export const handleObj = (obj: Record<string, any>, key: string) => {
  return key.split('.').reduce((o, i) => o[i], obj)
}
