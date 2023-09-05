/* eslint no-nested-ternary: "error" */
import axios from "axios"
import { toast } from "react-toastify"
import { useState, useRef } from "react"
import { useMediaQuery, useWindowSize } from "usehooks-ts"
import Brands from "./sections/Brands"
import LandingContent from "./LandingContent"
import Layout from "../Layout"
import Footer from "../Footer"
import SectionContainer from "./SectionContainer"
import Character from "./Character"

const LandingPage = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const welcomeImageRef = useRef(null)
  const networkingImageRef = useRef(null)
  const profileImageRef = useRef(null)
  const openSoonImageRef = useRef(null)

  const isMobile = useMediaQuery("(max-width: 758px)")
  const isIphone = useMediaQuery("(max-width: 390px)")

  const { width } = useWindowSize()

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const handleClick = async (e: any) => {
    e.preventDefault()
    await axios.post("/api/newsletter", { email })
    toast.success("Subscribed!")
    setEmail("")
    setIsSubscribed(true)
  }

  return (
    <Layout type="base">
      <div className="relative h-[100vh] overflow-y-scroll overflow-x-hidden z-[1]">
        <div className="relative overflow-hidden">
          <div className="absolute z-[2] left-0 top-0 w-full">
            <div className="relative">
              <SectionContainer
                className="dark:bg-[url('/assets/Landing/backgrounds/overlook.png')]
                  z-[5]"
                style={{
                  backgroundSize:
                    // eslint-disable-next-line no-nested-ternary
                    !isMobile
                      ? `${width}px ${Number((width / 1439) * 975).toFixed(2)}px`
                      : !isIphone
                      ? "985px"
                      : "620px",
                  height:
                    // eslint-disable-next-line no-nested-ternary
                    !isMobile ? `${Number((width / 1439) * 975)}px` : !isIphone ? "625px" : "420px",
                }}
              >
                <Character
                  screenWidth={width}
                  bgImgWidth={1439}
                  bgImgHeight={975}
                  offsetX={0.19}
                  offsetY={0.14}
                  characterWidth={318}
                  characterHeight={670.72}
                  characterRef={welcomeImageRef}
                  characterUrl="/assets/Landing/creativity.svg"
                  xDirection="right"
                  yDirection="bottom"
                  isMobile={isMobile}
                />
              </SectionContainer>
              <SectionContainer
                className="dark:bg-[url('/assets/Landing/backgrounds/timessquare.png')] 
                  dark:bg-[center_bottom]
                  bg-cover 
                  h-[799px] md:h-[972px]
                  mt-[110px] xs:mt-[170px] md:mt-[0px]
                  z-[4]
                "
              />
              <SectionContainer
                className="dark:bg-[url('/assets/Landing/backgrounds/trainstation.png')] 
                  bg-[right_-50px_bottom] md:bg-[right_bottom]"
                style={{
                  backgroundSize: !isMobile
                    ? `${width}px ${Number((width / 1439) * 975).toFixed(2)}px`
                    : "985px",
                  height: !isMobile ? `${Number((width / 1439) * 975)}px` : "625px",
                  marginTop: isMobile ? `245px` : `0px`,
                }}
              >
                <Character
                  screenWidth={width}
                  bgImgWidth={1439}
                  bgImgHeight={975}
                  offsetX={0.18}
                  offsetY={0.13}
                  characterWidth={279.85}
                  characterHeight={560.57}
                  characterRef={networkingImageRef}
                  characterUrl="/assets/Landing/networking.svg"
                  xDirection="right"
                  yDirection="bottom"
                  isMobile={isMobile}
                />
                <Character
                  screenWidth={width}
                  bgImgWidth={1439}
                  bgImgHeight={975}
                  offsetX={0.05}
                  offsetY={0.38}
                  characterWidth={40}
                  characterHeight={59}
                  characterUrl="/assets/Landing/letter.svg"
                  xDirection="right"
                  yDirection="bottom"
                  isMobile={isMobile}
                />
              </SectionContainer>
              <SectionContainer
                className="dark:bg-[url('/assets/Landing/backgrounds/replicate.png')]"
                style={{
                  backgroundSize: !isMobile
                    ? `${width}px ${Number((width / 1439) * 973).toFixed(2)}px`
                    : "985px",
                  height: !isMobile ? `${Number((width / 1439) * 973)}px` : "665px",
                  marginTop: isMobile ? `380px` : `0px`,
                }}
              >
                <Character
                  screenWidth={width}
                  bgImgWidth={1439}
                  bgImgHeight={973}
                  offsetX={0.1}
                  offsetY={0.09}
                  characterWidth={337}
                  characterHeight={673}
                  characterRef={profileImageRef}
                  characterUrl="/assets/Landing/profile.svg"
                  xDirection="left"
                  yDirection="bottom"
                  isMobile={isMobile}
                />
              </SectionContainer>
              <SectionContainer className="md:dark:bg-[url('/assets/Landing/backgrounds/path.png')] mt-[-1px]">
                <Brands className="opacity-0" />
              </SectionContainer>
              <SectionContainer
                className="dark:bg-[url('/assets/Landing/backgrounds/factory.png')] 
                  bg-center"
                style={{
                  backgroundSize: !isMobile
                    ? `${width}px ${Number((width / 1439) * 1079).toFixed(2)}px`
                    : "910px",
                  height: !isMobile ? `${Number((width / 1439) * 1079)}px` : "625px",
                  marginTop: isMobile ? `-1px` : `0px`,
                }}
              >
                <Character
                  screenWidth={width}
                  bgImgWidth={1440}
                  bgImgHeight={1079}
                  offsetX={0.2}
                  offsetY={0.04}
                  characterWidth={478.97}
                  characterHeight={931}
                  characterRef={openSoonImageRef}
                  characterUrl="/assets/Landing/opensoon.svg"
                  xDirection="right"
                  yDirection="bottom"
                  isMobile={isMobile}
                />
                <Character
                  screenWidth={width}
                  bgImgWidth={1440}
                  bgImgHeight={1079}
                  offsetX={0.125}
                  offsetY={0.2}
                  characterWidth={73.91}
                  characterHeight={105.35}
                  characterRef={openSoonImageRef}
                  characterUrl="/assets/Landing/painter.svg"
                  xDirection="right"
                  yDirection="bottom"
                  isMobile={isMobile}
                />
              </SectionContainer>
              <div
                className="absolute left-0 top-0 
                dark:hidden w-full h-[calc(100%+500px)]
                bg-[url('/assets/Layout/whitepaper.svg')] bg-cover bg-[center_center]"
              />
            </div>
          </div>
          <div className="relative z-[2]">
            <LandingContent
              email={email}
              onChangeEmail={onChangeEmail}
              handleClick={handleClick}
              isSubscribed={isSubscribed}
              welcomImageRef={welcomeImageRef}
              networkingImageRef={networkingImageRef}
              profileImageRef={profileImageRef}
              openSoonImageRef={openSoonImageRef}
            />
            <Footer />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LandingPage
