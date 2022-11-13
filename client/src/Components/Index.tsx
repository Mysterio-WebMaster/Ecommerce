import React from 'react'


export default function Index() {
  return (
    <div>
        <h3>Cryptonex</h3>
        <hr />
        <br />
        <button onClick={e=> {window.location.href="/register"}}>Registeration</button>
        <button onClick={e=> {window.location.href="/login"}}>Login</button>
    </div>
  )
}
