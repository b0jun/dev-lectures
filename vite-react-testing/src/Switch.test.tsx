import { expect, test } from 'vitest';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Switch } from './Switch';

test('OFF button is enabled initially', () => {
  render(<Switch />);

  const button = screen.getByRole('button');

  expect(button).toHaveAccessibleName('OFF');
  expect(button).toBeEnabled();
});

test('ON button does not appear initially', () => {
  render(<Switch />);
  // * queryByRole - 요소가 있을 수도 있고 없을 수도 있는 경우
  expect(screen.queryByRole('button', { name: /off/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /on/i })).not.toBeInTheDocument();
});

test('button is disabled once clicked', async () => {
  render(<Switch />);
  const user = userEvent.setup();
  const button = screen.getByRole('button');
  await user.click(button);
  expect(button).toBeDisabled();
});

// test.skip('ON button is enabled when clicked (fail)', async () => {
//   render(<Switch />);
//   const user = userEvent.setup();
//   await user.click(screen.getByRole('button'));
//   const button = screen.getByRole('button', { name: /on/i });
//   expect(button).toBeInTheDocument();
//   expect(button).toBeEnabled();
// });

// * findByRole - DOM에 나중에 나타나는 요소를 기다려줌
test('ON button is enabled when clicked', async () => {
  render(<Switch />);
  const user = userEvent.setup();
  await user.click(screen.getByRole('button'));
  const button = await screen.findByRole('button', { name: /on/i });
  expect(button).toBeInTheDocument();
  expect(button).toBeEnabled();
});

// * waitFor - 어떤 조건이 참이 될 때까지 기다리는 범용 유틸
test('ON button will be enabled when clicked (waitFor)#1', async () => {
  render(<Switch />);
  const user = userEvent.setup();
  await user.click(screen.getByRole('button'));
  const button = await waitFor(() => screen.getByRole('button', { name: /on/i }));
  expect(button).toBeInTheDocument();
  expect(button).toBeEnabled();
});

// * waitFor - 어떤 조건이 참이 될 때까지 기다리는 범용 유틸
test('ON button will be enabled when clicked (waitFor) #2', async () => {
  render(<Switch />);
  const button = screen.getByRole('button');
  expect(button).toHaveAccessibleName(/off/i);

  const user = userEvent.setup();

  await user.click(button);
  await waitFor(() => expect(button).toHaveAccessibleName(/on/i));

  await user.click(button);
  await waitFor(() => expect(button).toHaveAccessibleName(/off/i));
});

// * waitForElementToBeRemoved - 특정 DOM 요소가 사라질 때까지 기다리는 용도
test('OFF button will be removed when clicked (waitForElementToBeRemoved)', async () => {
  const user = userEvent.setup();
  render(<Switch />);

  expect(screen.getByRole('button', { name: /off/i })).toBeInTheDocument();

  await user.click(screen.getByRole('button'));
  await waitForElementToBeRemoved(() => screen.queryByRole('button', { name: /off/i }));
});

// * waitFor로 waitForElementToBeRemoved 기능 구현
test('OFF button will be removed when clicked (waitFor)', async () => {
  const user = userEvent.setup();
  render(<Switch />);

  await user.click(screen.getByRole('button'));
  await waitFor(() => expect(screen.queryByRole('button', { name: /off/i })).not.toBeInTheDocument());
});
