import { ChakraProvider } from "@chakra-ui/react";
import { Rensak } from "@/src/Rensak";

export default function Home() {
  return (
    <main>
      <ChakraProvider>
        <Rensak />
      </ChakraProvider>
    </main>
  );
}
