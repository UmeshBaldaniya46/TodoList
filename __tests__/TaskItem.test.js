import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TaskItem from '../src/components/TaskItem';

describe('TaskItem', () => {
  const baseTask = {
    id: '1',
    text: 'tests1',
    createdAt: new Date().toISOString(),
    done: false,
  };

  it('renders task text and datetime', () => {
    const {getByText} = render(<TaskItem task={baseTask} onClick={() => {}} />);

    expect(getByText('tests1')).toBeTruthy();
    expect(
      getByText(new Date(baseTask.createdAt).toLocaleString()),
    ).toBeTruthy();
  });

  it('calls onClick when pressed', () => {
    const onClickMock = jest.fn();
    const {getByText} = render(
      <TaskItem task={baseTask} onClick={onClickMock} />,
    );

    fireEvent.press(getByText('tests1'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
