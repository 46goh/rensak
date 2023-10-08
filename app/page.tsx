import { ChakraProvider } from "@chakra-ui/react";
import { Rensak } from "@/components/Rensak";

export default function Home() {
  return (
    <main>
      <ChakraProvider>
        <Rensak />
      </ChakraProvider>
    </main>
  );
}
