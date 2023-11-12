"use client";

import { Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Disclaimer = () => {
  return (
    <section>
      <Heading as="h2" size="md">
        免責事項
      </Heading>
      <ul>
        <Li>
          <Text fontSize="sm">
            本サービスは、外部サーバ等にデータを保存しないため、本サービス運営者は入力されたデータ内容を取得できません。データのバックアップはご利用者自身で行ってください。
          </Text>
        </Li>
        <Li>
          <Text fontSize="sm">
            本サービスは無料で使用できますが、本サービスを使用したことによるいかなる損害に対しても、本サービス運営者は補償しません。
          </Text>
        </Li>
        <Li>
          <Text fontSize="sm">
            本サービスの仕様および免責事項は、予告なく変更することがあります。また、本サービスの提供を終了する場合も、事前の予告を行わない場合があります。
          </Text>
        </Li>
      </ul>
    </section>
  );
};

const Li = styled.li`
  margin-left: 24px;
`;
