import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Logo() {
  const { theme, setTheme } = useTheme()
  const [url, setUrl] = useState('')

  useEffect(() => {
    console.log(theme)
    if (theme == 'dark') setUrl('/pego_marketplace_white.png')
    if (theme == 'light') setUrl('/pego_marketplace_black.png')
  }, [theme])

  return <Image src={url} width={100} height={100} alt="logo" />
}
