import React from 'react'
import DeleteAccount from '../components/DeleteAccount'
import ChangePassword from '../components/ChangePassword'
import RemoveUserFromCommunity from '../components/RemoveUserFromCommunity'
import EditCommunity from '../components/EditCommunity'
import UserAdmin from '../components/UserAdmin'
import { useAuthContext } from '../hooks/useAuthContext'


const Settings = () => {
  const { user } = useAuthContext()
  return (
    <>
      <div className='container '>
        <div className='container '>
          <h2>Settings </h2>
          <div className='card rounded my-3'>
            <div className='student card-body'>
              <div className='functionalities'>
                <div >
                  <ChangePassword></ChangePassword>
                </div>

                <div>
                  <DeleteAccount></DeleteAccount>
                </div>
              </div>
            </div>
          </div>


          {user && user.admin === false ?
            <div className='card rounded'>
              <div className='community-admin card-body'>
                <div className='functionalities'>
                  <div>
                    <RemoveUserFromCommunity></RemoveUserFromCommunity>
                  </div>
                </div>
              </div>
            </div> : null
          }

          {user && user.admin === true ?
            <div className='card rounded'>
              <div className='community-admin card-body'>
                <div className='functionalities'>
                  <div>
                    <RemoveUserFromCommunity></RemoveUserFromCommunity>
                  </div>
                </div>
              </div>
            </div> : null
          }

          {user && user.admin === true ?
            <div className='admin card my-3'>
              <div className='card-body'>
                <UserAdmin></UserAdmin>
                <div className='functionalities'>
                  <EditCommunity></EditCommunity>
                </div>
              </div>
            </div>
            : null
          }

        </div>
      </div>
    </>
  )
}

export default Settings