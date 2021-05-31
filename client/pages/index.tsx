import tw from 'twin.macro'

const Container = tw.div`flex justify-center bg-red-50 h-screen items-center`
const Text = tw.h1`text-4xl font-mono text-center`

function Home() {
  return (
    <Container>
      <Text>Boiler Plate Code For Next + Tailwind + Twin.Macro + Linter + Emotion</Text>
    </Container>
  )
}

export default Home
