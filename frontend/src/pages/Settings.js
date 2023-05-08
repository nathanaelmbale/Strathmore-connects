import React from 'react'
import DeleteAccount from '../components/DeleteAccount'
import ChangePassword from '../components/ChangePassword'
import RemoveUserFromCommunity from '../components/RemoveUserFromCommunity'
import EditCommunity from '../components/EditCommunity'
import UserAdmin from '../components/UserAdmin'
import { useAuthContext } from '../hooks/useAuthContext'
import AddUserToCommunity from '../components/AddUserToCommunity'


const Settings = () => {
  const { user } = useAuthContext()
  return (
    <>
      <div className='container '>
        <div className='m-9 '>
          <h2 className='text-3xl m-4 font-semibold'>Settings </h2>
          <div className='shadow-sm border my-5 p-5 rounded-xl md:m-6 bg-white'>
            <div className='student card-body'>
              <div className='functionalities'>
                <div >
                  <ChangePassword></ChangePassword>
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
            <div className=''>
              <div className='community-admin '>
                <div className='functionalities'>
                  <div className='card rounded'>
                    <div className='shadow-sm border my-5 p-5 rounded-xl md:m-6 bg-white'>
                      <AddUserToCommunity></AddUserToCommunity>

                    </div>
                  </div>
                  <div className='card rounded mt-3'>
                    <div className='shadow-sm border my-5 p-5 rounded-xl md:m-6 bg-white'>
                      <RemoveUserFromCommunity></RemoveUserFromCommunity>
                    </div>
                  </div>
                </div>
              </div>
            </div> : null
          }


          {user && user.admin === true ?
            <div className='admin card my-3'>
              <div >
                <div className='shadow-sm border my-5 p-5 rounded-xl md:m-6 bg-white'>
                  <UserAdmin></UserAdmin>
                </div>
                <div className='shadow-sm border my-5 p-5 rounded-xl md:m-6 bg-white'>
                  <EditCommunity></EditCommunity>
                </div>

              </div>
            </div>
            : null
          }

          <div className='shadow-sm border my-5 p-5 rounded-xl md:m-6 bg-white'>
            <DeleteAccount></DeleteAccount>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings