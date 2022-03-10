import React from 'react';

export const useField = (
  defaultValue: string,
): [string, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = React.useState(defaultValue);

  const onValueChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return [value, onValueChange];
};
