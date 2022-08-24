import { Box, Flex, Link } from "@chakra-ui/react"
import { NextLink } from "./exportUtils"

type TabItem = {
  icon?: string,
  title: string,
  href: string
}

const Tab = (props: { tabItem: TabItem }) => {
  const { tabItem } = props 
  return <NextLink href={tabItem.href} passHref>
    <Link>
      <Flex direction={{ base: 'row', lg: 'row' }} alignItems='center'>
        {tabItem.icon && <Box>{tabItem.icon}</Box>}
        <Box ml={1}>{tabItem.title}</Box>
      </Flex>
    </Link>
  </NextLink>
}

export { Tab }
export type { TabItem }

