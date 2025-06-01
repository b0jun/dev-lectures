'use client';

import { usePathname } from 'next/navigation';

const pathTitleMap: Record<string, string> = {
  '/instructor': '대시보드',
  '/instructor/courses': '강의 관리',
};

export default function InstructorPageName() {
  const pathname = usePathname();
  const title = pathTitleMap[pathname] ?? '대시보드';

  return (
    <div className="w-full bg-gray-700">
      <div className="w-6xl mx-auto text-white text-2xl font-bold py-4 px-8">{title}</div>
    </div>
  );
}
