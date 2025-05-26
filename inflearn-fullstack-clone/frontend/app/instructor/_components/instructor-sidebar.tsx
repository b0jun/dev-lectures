'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const sidebarItems = [
  { label: '대시보드', href: '/instructor' },
  { label: '새 강의 만들기', href: '/create_courses' },
  { label: '강의 관리', href: '/instructor/courses' },
  { label: '미션 관리', href: '/instructor#', isPreparing: true },
  { label: '멘토링 관리', href: '/instructor#', isPreparing: true },
  { label: '강의 질문 관리', href: '/instructor#', isPreparing: true },
  { label: '수강평 리스트', href: '/instructor#', isPreparing: true },
  { label: '새소식 관리', href: '/instructor#', isPreparing: true },
  { label: '수익 확인', href: '/instructor#', isPreparing: true },
  { label: '쿠폰 관리', href: '/instructor#', isPreparing: true },
];

export default function InstructorSidebar() {
  const pathname = usePathname();

  const handlePreparingClick = () => {
    alert('준비중입니다.');
  };

  return (
    <aside className="w-64 p-4 border-r bg-white min-h-screen">
      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.label}
              variant="link"
              className={`justify-start w-full text-base font-medium ${
                isActive ? 'text-[#1dc078] font-bold' : 'text-gray-700'
              }`}
              asChild={!item.isPreparing}
              onClick={item.isPreparing ? handlePreparingClick : undefined}
            >
              {item.isPreparing ? <span>{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
