import { ChakraProvider } from "@chakra-ui/react";
import { Rensak } from "@/components/Rensak";
import { Title } from "@/components/Title";

export default function Home() {
  return (
    <main>
      <ChakraProvider>
        <Title />
        <Rensak />
      </ChakraProvider>
    </main>
  );
}
