import { FC, ReactNode } from "react"
import { useRouter } from "next/router"
import { Button } from "../../../shared/Button"

interface MintModalCTAButtonProps {
  id: string
  link?: string
  className?: string
  target?: string
  children?: ReactNode
  onClick?: () => void
}

const MintModalCTAButton: FC<MintModalCTAButtonProps> = ({
  id,
  link,
  className,
  target,
  children,
  onClick,
}) => {
  const router = useRouter()

  const goToLink = () => {
    if (!target) {
      router.push(link)
      return
    }

    window.open(link, target)
  }

  return (
    <Button
      id={id}
      className={`!p-0
              md:w-[250px] md:h-[60px]
              w-[150px] h-[40px]
              !font-eigerdals font-bold 
              text-[15px] md:text-[25px]  
              !rounded-[10px]
              !text-black
              !bg-white ${className || ""}`}
      onClick={onClick || goToLink}
    >
      {children}
    </Button>
  )
}

export default MintModalCTAButton
