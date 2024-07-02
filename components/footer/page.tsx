import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col items-center space-y-8 justify-center mx-auto m-12'>
        <div className="social flex flex-row space-x-12 items-center">
            <a href="https://www.facebook.com" target="_blank">
                <img src="/images/fa-brands_facebook-square.svg" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com" target="_blank">
                <img src="/images/fa-brands_instagram.svg" alt="Instagram" />
            </a>
            <a href="https://www.twitter.com" target="_blank">
                <img src="/images/fa-brands_twitter.svg" alt="Twitter" />
            </a>
            <a href="https://www.twitter.com" target="_blank">
                <img src="/images/fa-brands_youtube.svg" alt="Twitter" />
            </a>
        </div>
        <div className='flex flex-col md:flex-row items-center md:space-x-8'>
            <p>Conditions of Use</p>
            <p>Privacy & Policy</p>
            <p>Press Room</p>
        </div>
    </div>
  )
}
