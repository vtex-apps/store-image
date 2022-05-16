import React, { FunctionComponent, useState } from 'react'
import { useQuery } from 'react-apollo'
import { Dropdown, Input, Button } from 'vtex.styleguide'
import GET_CUSTOMERCLASS from './graphql/getCustomerClass.gql'
import { SessionSuccess, useRenderSession } from 'vtex.session-client'
//import { useCssHandles } from 'vtex.css-handles'
//import { useDevice } from 'vtex.device-detector'

interface DropdownProps {
  label: string
}
const [customerClass, setCustomerClass] = useState('');
const { loading2, session, error2 } = useRenderSession()
let userId = "";
if (session) {
  const {
    namespaces: { profile },
  } = session as SessionSuccess

  userId = profile?.id?.value
  console.log("inside if(session) userId: ", userId)
  console.log("type of userId: ", typeof (userId))
}
if (loading2) {
  console.log('loading')
}
if (error2) {
  console.log('error: ', error2)
}
console.log("userId: ", userId)

const query = GET_CUSTOMERCLASS
function getDropdownOptions() {
  const { loading, error, data } = useQuery(query, {
    variables: { userId: userId },
    skip: !userId
  })
  let options = []
  if (loading) {
    console.log("Loading")
  }
  if (error) {
    console.log("Error: ", error)
  }
  if (data) {
    for (let idx = 0; idx < data.customerClassInfo.length; ++idx) {
      options.push(`${data.customerClassInfo[idx].customerClass}`)
      console.log('customerClass: ', data.customerClassInfo[idx].customerClass)
    }
    setCustomerClass(`${data.customerClassInfo[0].customerClass}`)
  }
  let uniqueOptions: string[] = [];
  options.forEach((c) => {
    if (!uniqueOptions.includes(c)) {
        uniqueOptions.push(c);
    }
});

  return uniqueOptions;
}
function handleChange(e: any) {
  setCustomerClass(e.target.value);
}
const CustomDropdown: FunctionComponent<DropdownProps> = ({ }) => {

  const dropdownOptions = getDropdownOptions()
  return (
    <div>
      <h1>Dropdown</h1>
      <Dropdown
        options={dropdownOptions}
        value={customerClass}
        onChange={handleChange}
      />
      <Input
        placeholder="Banner URL"
        label="url"
      />
      <div className="pt2">
        <Button size="small">
          Submit
        </Button>
      </div>
    </div>
  )
}

export default CustomDropdown