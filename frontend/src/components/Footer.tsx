'use client'

import { Link } from '@nextui-org/react'

export default function Footer() {
  return (
    <div className=" relative">
      <div className="radial-bg hidden lg:block"></div>

      {/* Social Space */}
      <div className="flex justify-between py-8 px-4 border-t border-t-lightblue">
        <div className="text-offwhite">
          <Link
            underline="hover"
            href="https://twitter.com/your_twitter_handle"
            target="_blank"
            className="mr-4"
          >
            Twitter
          </Link>
          <Link
            underline="hover"
            href="https://discord.gg/your_discord_invite"
            target="_blank"
          >
            Discord
          </Link>
        </div>

        {/* All Rights Reserved */}
        <h3 className="text-center text-offwhite">
          @2023 - All Rights Reserved by{' '}
          <Link
            underline="hover"
            href="https://github.com/lilyanB/marketplace"
            target="_blank"
          >
            {' '}
            Marketplace
          </Link>
        </h3>

        {/* Documentation Space */}
        <div className="text-offwhite">
          <Link
            underline="hover"
            href="https://your-documentation-link.com"
            target="_blank"
            className="mr-4"
          >
            Documentation
          </Link>
          <Link
            underline="hover"
            href="https://your-buildbox-link.com"
            target="_blank"
          >
            Buildbox
          </Link>
        </div>
      </div>
    </div>
  )
}
