import Link from 'next/link';

export default function Layout({
  children,
  feed,
  sidebar,
}: {
  children: React.ReactNode;
  feed: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Link href={'/parallel'}>parallel</Link>
        &nbsp;
        <Link href={'/parallel/setting'}>parallel/setting</Link>
      </div>
      <br />
      {sidebar}
      {feed}
      {children}
    </div>
  );
}
