import { cn } from '@/utils/server/ccn';

export const HexLoad = ({
  text = 'LOADING STUFF...',
}: {
  text: string | undefined;
}) => {
  return (
    <div className="loader JS_on">
      <span className="binary"></span>
      <span className="binary"></span>
      <span className="getting-there">{text}</span>
    </div>
  );
};

export const Loading = ({
  value = 'Loading...',
  classes,
}: {
  value?: string;
  classes?: string;
}) => {
  return (
    <div className={cn('terminal-loader', classes)}>
      <div className="text">{value}</div>
    </div>
  );
};

export const MultiStepLoader = () => (
  <div className="loader">
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
    <div className="bar4"></div>
    <div className="bar5"></div>
    <div className="bar6"></div>
    <div className="bar7"></div>
    <div className="bar8"></div>
    <div className="bar9"></div>
    <div className="bar10"></div>
    <div className="bar11"></div>
    <div className="bar12"></div>
  </div>
);
