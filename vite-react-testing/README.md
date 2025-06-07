### devDependencies

```bash
npm add vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event happy-dom -D
```

| 패키지                        | 용도                                              |
| ----------------------------- | ------------------------------------------------- |
| `vitest`                      | 테스트 러너                                       |
| `@testing-library/react`      | React 컴포넌트 테스트                             |
| `@testing-library/jest-dom`   | `toBeInTheDocument()` 등 커스텀 matcher           |
| `@testing-library/user-event` | 사용자 입력 시뮬레이션                            |
| `happy-dom`                   | 테스트용 가상 DOM (Node 환경에서 jsdom 대체 가능) |

### vite.config.ts

```ts
/// <reference types="vitest/config"/>
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
```

### 관련 포스팅

https://www.daleseo.com/react-testing-library/
https://www.daleseo.com/testing-library-user-agent/
https://www.daleseo.com/react-testing-library-async/
