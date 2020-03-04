declare module 'vtex.list-context' {
  export function useListContext():
    | undefined
    | { list: Array<string | JSX.Element> }
  export const ListContextProvider: any
}
