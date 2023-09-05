import Image from "next/image"
import { FC } from "react"
import { useMediaQuery } from "usehooks-ts"
import Link from "next/link"
import { useRouter } from "next/router"
import DesktopExplore from "../DesktopExplore"
import { useTheme } from "../../providers/ThemeProvider"
import DiscordIcon from "../DiscordIcon"
import CustomConnectWallet from "../CustomConnectWallet"
import DesktopCollections from "../DesktopCollections"
import { ToggleButton } from "../../shared/Button"
import MobileMenu from "../MobileMenu"

interface HeaderProps {
  connect?: boolean
}
const Header: FC<HeaderProps> = () => {
  const router = useRouter()
  const { onChangeThemeConfig, themeMode } = useTheme()

  const isMobile = useMediaQuery("(max-width: 850px)")
  const isLaptop = useMediaQuery("(max-width: 1082px)")

  const isMintPage = router.pathname.includes("mint")

  const isHidden = isMintPage || router.pathname.includes("/staking")

  const onToggle = () => {
    onChangeThemeConfig()
  }

  return (
    <nav
      className="fixed top-0 z-50 w-screen
      text-black bg-transparent 
      flex justify-center"
      id="header_nav_bar"
    >
      <div
        className={`flex flex-row items-center justify-between ${
          isMintPage ? "w-[1100px]" : "w-[1280px]"
        } 
        px-8 md:px-5 lg:px-16
        lg:pt-8 lg:pb-3
        md:pb-2 md:pt-6
        py-4`}
      >
        <span className="relative items-center flex-shrink-0 w-20 mr-6 cursor-auto lg:md:mt-6 lg:mt-0 lg:md:w-36 lg:flex">
          <Link href="/">
            <div className="relative">
              <Image
                src={`${
                  themeMode === "light" || isMintPage
                    ? "/CRE8ORS_LOGO.svg"
                    : "/assets/Header/white_logo.svg"
                }`}
                alt="cre8ors logo"
                width={87}
                height={16}
                className="cursor-pointer"
              />
            </div>
          </Link>
        </span>

        <div
          className="text-sm font-quicksand 
        flex flex-row items-center
        md:gap-x-[20px] xl:gap-x-[30px]"
        >
          {!isHidden && !isMobile && (
            <div className="flex items-center font-bold font-quicksand">
              {!isLaptop && (
                <button
                  type="button"
                  className="px-2 text-[#9C9C9C] cursor-pointer text-[15px] font-quicksand uppercase"
                  onClick={() => onChangeThemeConfig("light")}
                >
                  light
                </button>
              )}
              <ToggleButton
                onClick={onToggle}
                value={themeMode === "dark"}
                id="light_dark_switch"
              />
              {!isLaptop && (
                <button
                  type="button"
                  className="px-2 text-[#9C9C9C] cursor-pointer text-[15px] font-quicksand uppercase"
                  onClick={() => onChangeThemeConfig("dark")}
                >
                  dark
                </button>
              )}
            </div>
          )}
          {!isMobile && (
            <>
              {!isMintPage && (
                <Link href="/mint" target="_blank" rel="noreferrer">
                  <p
                    className="uppercase dark:text-white
                font-quicksand font-bold 
                cursor-pointer
                p-0"
                  >
                    Mint
                  </p>
                </Link>
              )}
              <DesktopExplore />
              <DesktopCollections />
              <DiscordIcon />
              <a href="https://twitter.com/Cre8orsNFT" target="_blank" rel="noreferrer">
                <div className="cursor-pointer ">
                  <Image
                    src={`${
                      themeMode === "dark" && !isMintPage
                        ? "/assets/Header/white_twitter.png"
                        : "/assets/Header/new_twitter.png"
                    }`}
                    width={19}
                    height={19}
                    alt="twitter"
                  />
                </div>
              </a>
              <CustomConnectWallet />
            </>
          )}
        </div>
        {isMobile && <MobileMenu />}
      </div>
    </nav>
  )
}

export default Header
