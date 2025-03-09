import NextImage from "next/image";
import NextLink from "next/link";
import type { ComponentProps } from "react";

interface IProps extends ComponentProps<typeof NextLink> {
  src: string;
  alt: string;
}

export default function CollectionLink({
  children,
  src,
  alt,
  ...rest
}: IProps) {
  return (
    <NextLink {...rest} className="flex-col-center gap-3 group">
      <NextImage
        src={src}
        alt={alt}
        width={100}
        height={100}
        className="object-cover aspect-square w-full"
      />
      <h3 className="text-sm">{children}</h3>
    </NextLink>
  );
}
