import { redirect } from 'next/navigation';
import InstructorPageName from './_components/instructor-page-name';
import InstructorSidebar from './_components/instructor-sidebar';
import { auth } from '@/auth';

export default async function InstructorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/signin');
  }
  return (
    <div className="flex flex-col">
      {/* 제목 */}
      <InstructorPageName />
      <div className="flex w-6xl mx-auto">
        <InstructorSidebar />
        {children}
      </div>
    </div>
  );
}
