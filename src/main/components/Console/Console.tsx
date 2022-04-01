import React from 'react';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import { ClearConsole } from '../Icons/Editor.icons';

import './Console.styles.scss';

type ConsoleProps = {
  code: string;
};

export const Console: React.FC<ConsoleProps> = ({ code }) => {
  const debounce = useDebounce(code, 1500);

  const [result, setResult] = React.useState<string[]>([]);

  React.useEffect(() => {
    try {
      const res = eval(code);
      console.log(res);
      setResult((prevResult) => [...prevResult, res]);
    } catch (error) {
      const k: Error = error as any;
      console.log(k.name, k.message);
    }
  }, [debounce]);

  return (
    <section className="console">
      <ClearConsole onClick={() => setResult([])} />
      {result.map((str) =>
        str ? (
          <p>
            {'>>> '}
            {str}
          </p>
        ) : null,
      )}
    </section>
  );
};
