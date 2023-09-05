import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import Popover from "../../shared/Popover"

const DesktopCollections = () => {
  const router = useRouter()

  const isMintPage = router.pathname.includes("/mint")

  const menuItemClassName = `cursor-pointer text-white ${!isMintPage && "dark:text-[black]"}`

  return (
    <Popover id="collections_menu_popover">
      {({ openModal }) => (
        <div
          className={`font-bold rounded-lg bg-[black] py-2 px-3 ${
            !isMintPage && "dark:text-[black] dark:bg-white"
          } text-white uppercase text-sm ${openModal && "shadow-md"} ${
            !openModal && `!bg-transparent ${!isMintPage && "dark:!text-[white]"} !text-[black]`
          }`}
        >
          Collections&nbsp;
          {!openModal && <ChevronDownIcon className="inline w-4 h-5 align-middle" />}
          {openModal && <ChevronUpIcon className="inline w-4 h-5 align-middle" />}
        </div>
      )}
      {() => (
        <div
          className={`w-full
                flex flex-col items-start uppercase gap-y-4 p-4 
                bg-[black] ${!isMintPage && "dark:bg-white"} 
                shadow-md rounded-lg  font-quicksand text-sm`}
        >
          <a href="https://opensea.io/collection/cre8orsaipeps" target="_blank" rel="noreferrer">
            <div className={menuItemClassName}>Cre8ors</div>
          </a>
          <a href="https://opensea.io/collection/cre8ors-dna" target="_blank" rel="noreferrer">
            <div className={menuItemClassName}>Dna cards</div>
          </a>
          <a
            href="https://opensea.io/collection/cre8ors-passports"
            target="_blank"
            rel="noreferrer"
          >
            <div className={menuItemClassName}>Passports</div>
          </a>
          <a
            href="https://opensea.io/collection/cre8ors-claim-tickets"
            target="_blank"
            rel="noreferrer"
          >
            <div className={menuItemClassName}>Tickets</div>
          </a>
          <a href="https://opensea.io/collection/cre8ors-relics" target="_blank" rel="noreferrer">
            <div className={menuItemClassName}>Relics</div>
          </a>
        </div>
      )}
    </Popover>
  )
}

export default DesktopCollections
