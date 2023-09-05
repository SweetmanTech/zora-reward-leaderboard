import { useEffect } from "react"
import { useRouter } from "next/router"
import BaseLayout from "./BaseLayout"
import ContainedLayout from "./ContainedLayout"
import { ILayout } from "./types"
import { useTheme } from "../../providers/ThemeProvider"

const layoutContainers = {
  base: BaseLayout,
  contained: ContainedLayout,
}

interface ILayoutFactory extends ILayout {
  type: keyof typeof layoutContainers
}

function Layout({ children, type }: ILayoutFactory) {
  const { onChangeThemeConfig } = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (router.pathname.includes("/mint")) {
      onChangeThemeConfig("light")
      return
    }

    onChangeThemeConfig("dark")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Container = layoutContainers[type]

  return <Container>{children}</Container>
}

export default Layout
