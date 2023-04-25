import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import { ORDERBY, type User } from './types.d'

const URL = 'https://randomuser.me/api?results=100'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<ORDERBY>(ORDERBY.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null >(null)
  const origianlUsers = useRef<User[]>([])

  useEffect(() => {
    fetch(URL)
      .then(async res => await res.json())
      .then(data => {
        setUsers(data.results)
        origianlUsers.current = data.results
      })
  }, [])

  const toggleSortedCountry = () => {
    setOrderBy(orderBy === ORDERBY.COUNTRY ? ORDERBY.NONE : ORDERBY.COUNTRY)
  }

  const filteredUsers = useMemo(() => typeof filterCountry === 'string' && filterCountry.length > 0
    ? users?.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
    : users
  , [filterCountry, users])

  const sortedUsers = useMemo(() => {
    if (orderBy === ORDERBY.NONE) return filteredUsers
    const getProperty = (user: User) => {
      switch (orderBy) {
        case ORDERBY.NAME:
          return user.name.first
        case ORDERBY.LAST:
          return user.name.last
        case ORDERBY.COUNTRY:
          return user.location.country
      }
    }
    return filteredUsers?.toSorted((a, b) => getProperty(a).localeCompare(getProperty(b)))
  }, [filteredUsers, orderBy])

  const deleteUser = (email: string) => {
    const newUsers = users?.filter(user => user.email !== email)
    setUsers(newUsers)
  }

  const restoreUsers = () => { setUsers(origianlUsers.current) }
  const sortedUsersBy = (orderBy: ORDERBY) => { setOrderBy(orderBy) }

  if (users.length > 0) return (<h1>Cargando...</h1>)

  return (
    <>
      <h1>Hello Vite + React!</h1>
      <header>
        <button onClick={() => { setShowColor(!showColor) }}>Cambiar color</button>
        <button onClick={toggleSortedCountry}>
          {orderBy === ORDERBY.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais'}
        </button>
        <button onClick={restoreUsers}>
          Restaurar usuarios
        </button>

        <input type='text' onChange={(e) => { setFilterCountry(e.target.value) }} />
      </header>

      <main>
        <UsersList users={sortedUsers} showColor={showColor} deleteUser={deleteUser} sortedUsersBy={sortedUsersBy} />
      </main>
    </>
  )
}

export default App
