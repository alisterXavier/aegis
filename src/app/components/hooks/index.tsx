import { useEffect, useState } from 'react';
import { Certificate } from '../../../../types/next-auth';

export const UseTable = ({
  certs,
}: {
  certs: Certificate[] | null;
}): {
  numberOfPages: number;
  data: Certificate[];
  pageChange: (x: number) => void;
} => {
  const eachPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Certificate[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  useEffect(() => {
    if (certs) {
      const calculateRange = () => {
        const x = Math.ceil(certs?.length / eachPage);
        setNumberOfPages(x);
      };

      const dataRange = () => {
        const end = eachPage * currentPage;
        const start = end - eachPage;
        setData(() => {
          const newRange = certs.filter(
            (i, index) => index >= start && index < end
          );

          return newRange;
        });
      };

      calculateRange();
      dataRange();
    }
  }, [certs, currentPage, data.length]);

  const pageChange = (x: number) => {
    setCurrentPage(x);
  };
  return { numberOfPages, data, pageChange: pageChange };
};
