import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'
import Empty from '../../ui/Empty'

function CabinTable() {
  const { cabins, isLoading } = useCabins()
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get('discount') || 'all'

  if (isLoading) return <Spinner />

  if (!cabins.length) return <Empty resource={'cabins'} />

  const filteredCabins =
    filterValue === 'no-discount'
      ? cabins.filter((c) => c.discount === 0)
      : filterValue === 'with-discount'
      ? cabins.filter((c) => c.discount)
      : cabins

  const sortBy = searchParams.get('sortBy') || 'name-asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1

  const sortedCabins = filteredCabins.sort(
    (a, b) => modifier * (a[field] - b[field])
  )

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>
      {/* <Table.Body>
        {cabins.map((cabin) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        ))}
      </Table.Body> */}
      {/* OR using RRP which is prettier in this case 😊 */}
      <Menus>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          )}
        />
      </Menus>
    </Table>
  )
}

export default CabinTable
