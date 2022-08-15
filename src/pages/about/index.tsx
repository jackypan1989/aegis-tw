import { Box } from '@chakra-ui/react'
import { getI18nProps } from '../../utils/getI18nProps'
import MDX from './index.mdx'

const About = () => {
  return <Box p={{ base: 4, lg: 8 }}>
    <MDX />
  </Box>
}

export default About

export const getStaticProps = getI18nProps