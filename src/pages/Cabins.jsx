import React from 'react'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import CabinTable from '../features/cabins/CabinTable'
import { useCabins } from '../features/cabins/useCabins'
import AddCabin from '../features/cabins/AddCabin'
import CabinTableOperations from '../features/cabins/CabinTableOperations'

function Cabins() {
  const { error } = useCabins()

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  )
}

export default Cabins
