import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import WalletConnectButton from "../WalletConnectButton"
import Popover from "../../shared/Popover"

const DesktopExplore = () => {
  const router = useRouter()
  const { isConnected } = useAccount()

  const isMintPage = router.pathname.includes("/mint")

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItemClassName = `cursor-pointer text-white ${!isMintPage && "dark:text-[black]"}`

  return (
    <Popover id="explorer_menu_popover">
      {({ openModal }) => (
        <button
          type="button"
          className={`font-bold rounded-lg bg-[black] py-2 px-3 ${
            !isMintPage && "dark:text-[black] dark:bg-white"
          } text-white uppercase text-sm ${openModal && "shadow-md"} ${
            !openModal && `!bg-transparent ${!isMintPage && "dark:!text-[white]"} !text-[black]`
          }`}
          onClick={toggleMenu}
        >
          Explore&nbsp;
          {!openModal && <ChevronDownIcon className="inline w-4 h-5 align-middle" />}
          {openModal && <ChevronUpIcon className="inline w-4 h-5 align-middle" />}
        </button>
      )}
      {() => (
        <div
          className={`w-full
          flex flex-col items-start uppercase gap-y-4 p-4 
          bg-[black] ${!isMintPage && "dark:bg-white"}
          shadow-md rounded-lg  font-quicksand text-sm`}
        >
          <Link href="/manifesto" target="_blank" rel="noreferrer">
            <div className={menuItemClassName}>Manifesto</div>
          </Link>
          <Link
            href="https://mirror.xyz/sweetman.eth/gKpHCW-6wviwbQn_zzG7vQDZ-TxoV9GwWFdXaT_QzC4"
            target="_blank"
            rel="noreferrer"
          >
            <div className={menuItemClassName}>ERC721H</div>
          </Link>
          <Link href="/checkpassport" target="_blank" rel="noreferrer">
            <div className={menuItemClassName}>Check</div>
          </Link>
          <Link href="/claim" target="_blank" rel="noreferrer">
            <div className={menuItemClassName}>Claim</div>
          </Link>
          <a href="https://cre8ors.beehiiv.com/" target="_blank" rel="noreferrer">
            <div className={menuItemClassName}>Blog</div>
          </a>
          <Link href="/teams" target="_blank" rel="noreferrer">
            <div className={menuItemClassName}>Team</div>
          </Link>
          <Link href="/faq" target="_blank" rel="noreferrer">
            <div className={menuItemClassName}>FAQ</div>
          </Link>
          {isConnected ? (
            <Link href="/profile" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Profile</div>
            </Link>
          ) : (
            <WalletConnectButton>
              <div className={`${menuItemClassName} uppercase`}>Connect</div>
            </WalletConnectButton>
          )}
          <div className="text-gray-400 cursor-not-allowed">Warehouse</div>
        </div>
      )}
    </Popover>
  )
}

export default DesktopExplore
