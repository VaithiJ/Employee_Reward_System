import React from 'react'


const EmpButton = ({connect, styles}) => {

    console.log(connect)
  return (
    <div><button style={{
        color: styles.color,
        fontSize: styles.fontSize,
        position: styles.position,
        // add other styles here as required
      }}  onClick={connect}>EmpButton</button></div>
  )
}

export default EmpButton