import { Avatar, Box, Button, Container, Flex, Heading, HStack, SimpleGrid, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { NextLink } from "../components/exportUtils"

const Hero = () => 
  <Stack
    spacing={{ base: 8, md: 12 }}
    py={{ base: 20, md: 36 }}
  >
    <Heading fontSize={{ base: '4xl', md: '6xl' }}>
      共同創造
      <Text color='purple.400'>
        下一個軟體獨角獸
      </Text>
    </Heading>
    <Text color='gray.500'>
      Aegis Venture 是一家專注於軟體新創的投資與孵化機構，我們可以帶來，跟別人不一樣的資源跟作戰方式，從點子發想、募資策略、商業模式、產品運營、客戶溝通、投資人人脈、技術與市場行銷、再到法務與團隊招募等，我們幫助創辦人們去完成他們的夢想。
    </Text>
    <HStack
      spacing='6'
      align='center'
      alignSelf='center'
    >
      <NextLink href='mailto:apply@aegis.tw'>
        <Button
          colorScheme='purple'
          bg='purple.400'
          rounded='full'
          px='6'
          _hover={{
            bg: 'purple.500',
          }}>
          與我們聯繫
        </Button>
      </NextLink>
      {/* <NextLink href='/venture'>
        <Button
          rounded='full'
          px='6'
          >
          了解更多
        </Button>
      </NextLink> */}
    </HStack>
  </Stack>

const Feature = () => 
  <Stack
    as={Box}
    spacing={{ base: 8, md: 8 }}
    py={{ base: 20, md: 36 }}
    >
    <Heading fontSize={{ base: 'xl', md: '4xl' }} lineHeight='1.5'>
      3 個月內，我們已協助 2 個台灣新創
      <br />
      調整商業模式，建立出海產品
      <br />
      取得國內外種子輪資金
    </Heading>
  </Stack>

type TestimonialCardProps = {
  name: string,
  content: string,
  avatar: string
}

const TestimonialCard = (props: TestimonialCardProps) => {
  const { name, content, avatar } = props
  
  return (
    <Flex
      boxShadow='xl'
      maxW='640px'
      width='full'
      rounded='xl'
      p='10'
      justifyContent='space-between'
      position='relative'
      bg={useColorModeValue('white', 'gray.800')}
      gap='2'
      _after={{
        content: '""',
        position: 'absolute',
        height: '21px',
        width: '29px',
        left: '35px',
        top: '-10px',
        backgroundSize: 'cover',
        backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`,
      }}
    >
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <Text
          pb={4}>
          {content}
        </Text>
        <Text>
          創辦人 - {name}
        </Text>
      </Flex>
      <Avatar
        src={avatar}
        size={{ base: 'lg' }}
      />
    </Flex>
  )
}

const Testimonials = () => 
  <VStack
    py={{ base: 20, md: 36 }}
  >
    <Box width={{ base: 'full', md: 'xl' }} margin='auto'>
      <Heading
        fontSize={{ base: 'xl' }}
        color='purple.400'>
        創辦人們的最佳夥伴
      </Heading>
      <Heading
        py='5'
        fontSize={{ base: '4xl', md: '6xl' }}
      >
        聽聽他們怎麼說
      </Heading>
    </Box>
    <SimpleGrid
      columns={{ base: 1 }}
      spacing='10'
      mx='auto'>
      <TestimonialCard 
        content='創業這條路，比我想像中困難多了，有你們這樣的角色協助，絕對比我自己摸索還要快。'
        name='Robert Chen'
        avatar='https://scontent-tpe1-1.xx.fbcdn.net/v/t1.6435-9/54458039_2353571887994464_8596815030823944192_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jWkQ-H07RIgAX8v_ywT&_nc_ht=scontent-tpe1-1.xx&oh=00_AT-TcKILigIKXgPbn3KsySovcpFuX87YKx-bKZ0YrJlztQ&oe=63412C49' 
      />
      <TestimonialCard 
        content='有太多事情是我三個月前難以想像的，還好有遇見你。'
        name='Sylvia Liu'
        avatar='https://scontent-tpe1-1.xx.fbcdn.net/v/t39.30808-6/274357498_4831101036945072_7760521993936565387_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gpuHmV-PSVQAX8mJrrb&_nc_ht=scontent-tpe1-1.xx&oh=00_AT-aR-t6siVGddrrS-QJWg_WYsZvOkGBJhFQG3E0H5IIiA&oe=631EE915' 
      />
      <TestimonialCard 
        content='感謝，每次討論都像開外掛打怪。'
        name='Bill Chou'
        avatar='https://scontent-tpe1-1.xx.fbcdn.net/v/t39.30808-6/301115969_10209609391588016_6553535689399909964_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NeIt4peRkxgAX_ZmKLp&_nc_ht=scontent-tpe1-1.xx&oh=00_AT9f-HQziega2cIkeoOO496KOK70wyc_v6RMuDUgt-hWKw&oe=631E660B' 
      />
    </SimpleGrid>
  </VStack>

const CTA = () =>
  <VStack py={{ base: 20, md: 36 }} spacing={{ base: 8, md: 14 }}>
    <Heading size='2xl'>創業是一條艱難且孤獨的路</Heading>
    <Text color='gray.500'>
      身為創辦人的你，有沒有這種感覺，這一路上有 90% 的人給你鼓勵，剩下 10% 的人給你冷水，但事實上，這些人都沒有辦法對你的事業產生影響力，而我們相信，只有創辦人才可以真正了解跟幫助創辦人，只有我們直接的一對一，才能真正降低你創業路途上的風險。
    </Text>
    <NextLink href='mailto:apply@aegis.tw'>
      <Button
        colorScheme='purple'
        bg='purple.400'
        rounded='full'
        px='6'
        _hover={{
          bg: 'purple.500',
        }}>
        與我們聯繫
      </Button>
    </NextLink>
  </VStack>

const Home = () => {
  return <Container maxW='3xl' textAlign='center'>
    <Hero />
    <Feature />
    <Testimonials />
    <CTA />
  </Container>
}

export default Home