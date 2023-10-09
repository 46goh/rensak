import { ChakraProvider } from "@chakra-ui/react";
import { Rensak } from "@/components/Rensak";
import { Title } from "@/components/Title";
import { Disclaimer } from "@/components/Disclaimer";

export default function Home() {
  return (
    <main>
      <ChakraProvider>
        <Title />
        <Rensak />
        <Disclaimer />
      </ChakraProvider>
    </main>
  );
}
