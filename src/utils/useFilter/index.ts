import * as React from 'react'

type AnyObject = { [K: string]: unknown }
function useFilter<Item extends AnyObject>(
  dataset: Item[],
  filterFn: (collection: Item[], searchValue: string) => Item[],
) {
  const [filtered, setFiltered] = React.useState(dataset)

  React.useEffect(() => {
    setFiltered(dataset)
  }, [dataset])

  const updateFilter = React.useCallback(
    (filterValue: string) => {
      setFiltered(filterFn(dataset, filterValue))
    },
    [dataset, filterFn],
  )

  return [filtered, updateFilter] as const
}

export default useFilter
