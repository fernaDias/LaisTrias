import { Heading, type HeadingProps } from "@chakra-ui/react";
import type { MakeHeadingStyles } from "./styles";

export type HeadingVariantType = keyof (typeof MakeHeadingStyles)["variants"];

type MakeHeadingProps = HeadingProps & {
  children: React.ReactNode;
  variant?: HeadingVariantType;
};

export default function MakeHeading({
  children,
  variant,
  ...props
}: MakeHeadingProps) {
  return (
    <Heading variant={variant} {...props}>
      {children}
    </Heading>
  );
}
