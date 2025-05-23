'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signUp } from '@/app/actions/auth-actions';
import { redirect } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const result = await signUp({
      email,
      password,
    });
    if (result?.status === 'ok') {
      redirect('/signin');
    }

    if (result?.message) {
      alert(result.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">회원가입</h1>
          <p className="text-gray-600">인프런에서 다양한 학습의 기회를 얻으세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="example@inflab.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm transition duration-150 ease-in-out"
          >
            회원가입
          </button>

          <div className="text-center">
            <Link href="/signin" className="text-sm text-green-600 hover:text-green-500 font-medium">
              로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
