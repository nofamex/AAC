import tw from 'twin.macro'

const Container = tw.div`flex justify-center bg-red-50 h-screen items-center`
const Text = tw.h1`text-4xl font-mono text-center text-red-900`

function Home() {
  return (
    <Container>
      <Text>Changed into docker</Text>
    </Container>
  )
}

export default Home
