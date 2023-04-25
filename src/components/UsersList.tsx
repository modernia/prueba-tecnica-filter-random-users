
import { ORDERBY, type User } from '../types.d'

interface Props {
  users: User[]
  showColor: boolean
  deleteUser: (email: string) => void
  sortedUsersBy: (orderBy: ORDERBY) => void
}

export default function UsersList ({ users, showColor, deleteUser, sortedUsersBy }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr style={{ backgroundColor: '#111' }}>
          <td>Foto</td>
          <td className='pointer' onClick={() => { sortedUsersBy(ORDERBY.NAME) }}>Nombre</td>
          <td className='pointer' onClick={() => { sortedUsersBy(ORDERBY.LAST) }}>Apellido</td>
          <td className='pointer' onClick={() => { sortedUsersBy(ORDERBY.COUNTRY) }}>Pais</td>
          <td>Borrar</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const styleColor = index % 2 === 0 ? '#222' : '#555'
          const color = showColor ? styleColor : ''
          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td><img src={user.picture.thumbnail} alt={user.name.first} /></td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td><button onClick={() => { deleteUser(user.email) }}>Borrar</button></td>
            </tr>

          )
        })}
      </tbody>

    </table>
  )
}
