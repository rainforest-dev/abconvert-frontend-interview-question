import NextLink from "next/link";

interface IProps {
  crumbs: { name: string; path?: string }[];
}

export default function Breadcrumb({ crumbs }: IProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex-row-center text-xs justify-center">
        {crumbs.map((crumb, index) => (
          <li key={index} className="text-gray-600 last:text-foreground">
            {crumb.path ? (
              <NextLink href={crumb.path}>{crumb.name}</NextLink>
            ) : (
              crumb.name
            )}
            {index !== crumbs.length - 1 && (
              <span className="mx-2 text-gray-400">&gt;</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
