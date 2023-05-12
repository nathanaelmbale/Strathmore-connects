import React from 'react'
import iphone from '../images/iphone.png'
import wave from '../images/bottom-svg.png'
import bottomWave from '../images/top-svg.png'
import university from '../images/university.jpg'
import Mongo from '../images/mongodb.svg'
import Express from '../images/express.svg'
import Firebase from '../images/firebase.svg'
import Nodejs from '../images/nodejs.svg'
import ReactIcon from '../images/react.svg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <body className='bg-white'>
      <div className='max-w-[2000px]  dark:bg-neutral-800
    bg-white h-full  text-black'>
        <section id='welcome' className='mt-10'>

          <div className='flex flex-col lg:flex-row w-10/12 mx-auto my-3 lg:my-32 lg:z-40'>
            <div className='lg:m-10 my-auto lg:my-28'>
              <h1 className='text-blue-900 font-bold text-4xl  my-3'>Built for Strathmore students</h1>
              <p className='font-light text-xl text-gray-700 my-3'>WE CONNECT YOU WITH OTHER STRATHMORE STUDENTS.</p>
              <Link role='menuitem' to='/home'
                className='hover:bg-blue-900 lg:my-10 py-2.5 px-6 mt-10 focus:outline-none w-full lg:w-3/4
             focus-visible:ring-2 bg-blue-600  rounded-md shadow-lg hover:shadow-none
             transition-colors text-white font-bold ring-blue-400 lg:shadow-md'>
                Get started
              </Link>
            </div>
            <img src={iphone} alt='demo'
              className='mx-auto relative bottom-12 left-20  h-96 z-20
             lg:bottom-16 my-7 lg:h-[500px]' />
          </div>

        </section>
        <div className='bottom-svg  relative bottom-36 z-10 lg:bottom-80' >
          <img src={wave} height="20px" alt='wavy lines' className='w-screen m-0 p-0' />
          <img src={bottomWave} height="20px" alt='wavy lines' className='w-screen m-0 p-0' />

        </div>
        <section id='about' className='relative bottom-28 w-10/12 lg:bottom-72 mx-auto'>
          <h1 className='text-blue-900 text-4xl font-bold font-mono'>About us</h1>
          <div className='flex flex-col lg:flex-row'>
            <div className='w-full  my-3 lg:w-[800px]'>
              <img src={university} alt='university' className=' ' />
            </div>

            <div className='lg:w-2/3 lg:m-5'>
              <span className='text-black'>
                <h2 className='text-2xl font-bold my-3'>Strathmore university</h2>
                Strathmore University is facing a significant challenge in effectively communicating information about clubs and societies to its students. The current system relies heavily on email, which has proven to be inadequate in providing timely and relevant updates to the university community. Consequently, students are missing out on essential information such as registration deadlines for extracurricular activities, resulting in reduced participation and engagement in these activities.
                <br></br>
                <h2 className='text-2xl font-bold my-3'>Proposed problem</h2>

                Furthermore, the process of connecting students with similar interests is time-consuming, as students are required to visit the clubs office at specific times to learn about the different clubs and their eligibility criteria. As a result, there is a need for an exclusive application that is only available to Strathmore students, which can provide the Strathmore experience beyond academic activities.
                <br></br>

              </span>

            </div>
          </div>
          <h2 className='text-2xl font-bold my-3'>Solution</h2>
          This application would enable students to connect with like-minded individuals with just a click of a button and receive real-time updates on activities happening in the communities they have subscribed to. This would also help new students feel more at home by facilitating connections with other students who share similar interests.

        </section>
        <section className='relative bottom-28 w-10/12 lg:bottom-64 mx-auto'>
          <h2 id="qualities" class="sr-only">Our Qualities</h2>
          <div
            class="container
            mx-auto
            max-w-5xl
            flex
            gap-12
            flex-wrap
            items-start
            justify-center
            md:justify-between
      ">
            <div
              class="
              grid
              gap-4
              justify-items-center
              text-center
              md:flex-1
            ">
              <div
                class="
                rounded-full
                border-8
                border-amber-300
                p-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold">Safe</h3>
              <p>Our site are secure and private and has different levels of access</p>
            </div>
            <div
              class="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1
        ">
              <div
                class="
          rounded-full
          border-8
          border-amber-300
          p-4
          ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold">Efficient</h3>
              <p>
                We help you connect with other students and teachers
              </p>
            </div>
            <div
              class="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1
        ">
              <div
                class="
          rounded-full
          border-8
          border-amber-300
          p-4
          ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold">User friendly</h3>
              <p>
                Easy to pick up
              </p>
            </div>
          </div>
        </section>

        <section className='relative bottom-28 w-10/12 lg:bottom-64 mx-auto'>
          <h1 className='text-blue-900 text-4xl font-bold font-mono my-4'>Scope of projects</h1>

          <h2 className='text-2xl font-bold my-3'>Technologies used</h2>
          <ol className='
          container
          flex
          flex-wrap
          lg:flex-row
          items-start
          justify-center'>
            <a href='https://www.mongodb.com' rel='noreferrer' target='_blank'>
              <li className='shadow-lg rounded-xl p-4 m-2 hover:scale-105 '>
                <img src={Mongo} alt='wavy lines' className='inline w-44 h-32 m-0 p-0' />
                <p className='text-center font-bold text-xl'>MongoDB</p>
                <p className='text-center'>a noSQL database</p>
              </li>
            </a>

            <a href='https://firebase.google.com/?gad=1&gclid=Cj0KCQjwpPKiBhDvARIsACn-gzDJLa9yYgc2inb9Qnvm3HBjrIROG4HVdufD9ScTIg9T67r868zPtmAaAjICEALw_wcB&gclsrc=aw.ds' rel='noreferrer' target='_blank'>
              <li className='shadow-lg rounded-xl p-4 m-2 hover:scale-105 '>
                <img src={Firebase} alt='wavy lines' className='inline w-44 h-32 m-0 p-0' />
                <p className='text-center font-bold text-xl'>Firebase</p>
                <p className='text-center '>Used for image storage</p>
              </li>
            </a>

            <a href='https://react.dev' rel='noreferrer' target='_blank'>
              <li className='shadow-lg rounded-xl p-4 m-2 hover:scale-105 '>
                <img src={ReactIcon} alt='wavy lines' className='inline w-44 h-32 m-0 p-0' />
                <p className='text-center font-bold text-xl'>React</p>
                <p className='text-center '>Frontend library</p>
              </li>
            </a>

            <a href='https://expressjs.com' rel='noreferrer' target='_blank'>
              <li className='shadow-lg rounded-xl p-4 m-2 hover:scale-105 '>
                <img src={Express} alt='wavy lines' className='inline w-44 h-32 m-0 p-0' />
                <p className='text-center font-bold text-xl'>Express</p>
                <p className='text-center '>Serves the app</p>
              </li>
            </a>

            <a href='https://nodejs.org/en' rel='noreferrer' target='_blank'>
              <li className='shadow-lg rounded-xl p-4 m-2 hover:scale-105 '>
                <img src={Nodejs} alt='wavy lines' className='inline w-44 h-32 m-0 p-0' />
                <p className='text-center font-bold text-xl'>Node JS</p>
                <p className='text-center '>Javascript on the backend</p>
              </li>
            </a>

          </ol>

          <h2 className='text-2xl font-bold my-4 h-fit'>Functionalities</h2>
          <p className='text-lg my-4'>
            There are three levels of access:
          </p>
          <div className='flex flex-col lg:flex-row gap-5'>
            <div className='border border-grey-100 p-4 shadow-sm'>
              <h3 className='text-2xl font-bold font-sans'>Normal user</h3>
              <ul>

                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to create an account
                  </span></li>

                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete their account
                  </span></li>

                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to join a community they desire
                  </span></li>


                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to receive notifications from the community they joined
                  </span></li>

                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete notifications
                  </span></li>

                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to make a comment
                  </span></li>


                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete comment they have made
                  </span></li>

              </ul>
            </div>

            <div className='border border-grey-100 p-4 shadow-sm'>
              <h3 className='text-2xl font-bold font-sans'>Community admin</h3>
              <ul>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to create an account</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to join a community they desire</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to unjoin a community they are part of</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete notifications</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to receive notifications from the community they joined</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete notifications from the community they joined</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to create a post</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete posts they made</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to make a comment </span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete comment they have made or people have made</span></li>

                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to Remove a user from a community</span></li>
              </ul>
            </div>

            <div className='border border-grey-100 p-4 shadow-sm'>
              <h3 className='text-2xl font-bold font-sans'>Main admin</h3>
              <ul>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to create posts</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete a post</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to create a community</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete a community</span></li>

                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete posts</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to create comments</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete  comments</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to make one a community admin</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to remove one as a community admin</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete their community</span></li>
                <li className='flex my-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#31B42E" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className='mx-1'>Should be able to delete people’s accounts</span></li>

              </ul>
            </div>
          </div>

        </section>
      </div>

      <footer class="bg-gray-900 ">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
              <a href="https://flowbite.com/" class="flex items-center">
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Strathmore connects</span>
              </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                <ul class="text-gray-600 font-medium">
                  <li class="mb-4">
                    <a href="https://github.com/nathanaelmbale" class="hover:underline ">Github</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/nathanael-mbale-806ba9204/" class="hover:underline">LinkedIn</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                <ul class="text-gray-600 font-medium">
                  <li class="mb-4">
                    <a href="/" class="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/" class="hover:underline">Terms &amp; Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
            </span>
            <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a href="https://github.com/nathanaelmbale" target='_blank' rel='noreferrer' class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                <span class="sr-only">GitHub account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </body>
  )
}

export default Home