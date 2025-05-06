import { useUserInfo } from '@/hooks/useUser'
import { link } from 'fs'
import Image from 'next/image'
import React from 'react'

export function LinksSocialNetworks() {
    const {links} = useUserInfo()

    if (!links) return null

  return (
    <ul className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-3'>
      {links.map((link) => (
        <li key={link.id} >
            <a href={link.link || ""} target='_blank' rel='noreferrer'>
                <Image src={link.icon || ""} alt='Icon' width={40} height={40} />
            </a>
        </li>
      ))}
    </ul>
  )
}
