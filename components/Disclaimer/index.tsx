"use client";

import { Heading, Text, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Disclaimer = () => {
  return (
    <section>
      <Heading as="h2" size="xl">
        免責事項
      </Heading>
      <Ul>
        <Li>
          <Text textStyle="sm">
            本サービスは、外部サーバ等にデータを保存しないため、本サービス運営者は入力されたデータ内容を取得できません。データのバックアップはご利用者自身で行ってください。
          </Text>
        </Li>
        <Li>
          <Text textStyle="sm">
            本サービスは無料で使用できますが、本サービスを使用したことによるいかなる損害に対しても、本サービス運営者は補償しません。
          </Text>
        </Li>
        <Li>
          <Text textStyle="sm">
            本サービスの仕様および免責事項は、予告なく変更することがあります。また、本サービスの提供を終了する場合も、事前の予告を行わない場合があります。
          </Text>
        </Li>
        <Li>
          <Text textStyle="sm">
            ご意見・ご要望・不具合の連絡は{" "}
            <Link
              color="teal.solid"
              href="https://twitter.com/46goh"
              target="_blank"
            >
              @46goh
            </Link>{" "}
            までお願いします。
          </Text>
        </Li>
      </Ul>
    </section>
  );
};

const Ul = styled.ul`
  padding-left: 0;
  list-style: disc;
`;

const Li = styled.li`
  margin-left: 24px;
`;
