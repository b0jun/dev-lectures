import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LoginForm } from './LoginForm';
import userEvent from '@testing-library/user-event';

describe('<LoginForm />', () => {
  it('enables button when both email and password are entered', () => {
    render(<LoginForm onSubmit={() => null} />);

    const button = screen.getByRole('button', { name: /로그인/i });
    const email = screen.getByRole('textbox', { name: /이메일/i });
    const password = screen.getByLabelText(/비밀번호/i);

    expect(button).toBeDisabled();
    fireEvent.change(email, { target: { value: 'user@test.com' } });
    fireEvent.change(password, { target: { value: 'Test1234' } });
    expect(button).toBeEnabled();
  });

  it('submits form when button is clicked', () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const email = screen.getByRole('textbox', { name: /이메일/i });
    const password = screen.getByLabelText(/비밀번호/i);
    const button = screen.getByRole('button', { name: /로그인/i });

    fireEvent.change(email, { target: { value: 'user@test.com' } });
    fireEvent.change(password, { target: { value: 'Test1234' } });
    fireEvent.click(button);

    // expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith('user@test.com', 'Test1234');
  });

  // * 위와같은 fireEvent를 사용한 이벤트 방식은 권장하지 않음
  // * 아래와 같이 @testing-library/user-event를 사용

  it('enables button', async () => {
    render(<LoginForm onSubmit={() => {}} />);
    const user = userEvent.setup();
    const email = screen.getByRole('textbox', { name: /이메일/i });
    const password = screen.getByLabelText(/비밀번호/i);
    const button = screen.getByRole('button', { name: /로그인/i });

    expect(button).toBeDisabled();
    await user.type(email, 'user@test.com');
    await user.type(password, 'Test1234');
    expect(button).toBeEnabled();
  });

  it("can't submit form when button is disabled", async () => {
    const obSubmit = vi.fn();
    render(<LoginForm onSubmit={obSubmit} />);

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /로그인/i });
    await user.click(button);

    expect(obSubmit).not.toHaveBeenCalled();
  });

  it('submits form', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    const user = userEvent.setup();
    const email = screen.getByRole('textbox', { name: /이메일/i });
    const password = screen.getByLabelText(/비밀번호/i);
    const button = screen.getByRole('button', { name: /로그인/i });

    await user.type(email, 'user@test.com');
    await user.type(password, 'Test1234');
    await user.click(button);

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith('user@test.com', 'Test1234');
  });

  it('submits form using keyboard', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    const user = userEvent.setup();

    await user.tab();
    expect(screen.getByRole('textbox', { name: /이메일/i })).toHaveFocus();
    await user.keyboard('user@test.com');

    await user.tab();
    expect(screen.getByLabelText(/비밀번호/i)).toHaveFocus();
    await user.keyboard('Test1234');

    await user.keyboard('{Enter}');

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith('user@test.com', 'Test1234');
  });
});
