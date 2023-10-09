"use client";

import { Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Disclaimer = () => {
  return (
    <Wrapper>
      <Heading as="h2" size="md">
        注意事項
      </Heading>
      <ul>
        <Li>
          <Text fontSize="sm">
            本アプリは、ブラウザ・外部サーバ等にデータを保存しません。データのバックアップはご利用者自身で行ってください。
          </Text>
        </Li>
        <Li>
          <Text fontSize="sm">
            本アプリは無料で使用できますが、本アプリを使用したことによるいかなる損害に対しても、本アプリ制作者は補償しません。
          </Text>
        </Li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 8px;
`;

const Li = styled.li`
  margin-left: 24px;
`;
