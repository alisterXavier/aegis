'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { BarProps } from 'recharts';
import { cn } from '@/utils/server/ccn';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@nextui-org/checkbox';
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { signOut, useSession } from 'next-auth/react';
import { BiCaretRight, BiCopy, BiPlus } from 'react-icons/bi';
import { Charts, Globe, Overlay } from '../components';
import { AnimatePresence, motion } from 'framer-motion';
import { HexLoad, UseTable, FloatingNav } from '../components';
import { Loading } from '../components/loaders';
import { Certificate } from '../../../types/next-auth';
import { axios } from '../components/axios';

type chartType = {
  type: 'pie' | 'bar';
  certs: Certificate[];
};

const Navbar = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <FloatingNav>
      <Button
        className="bg-[var(--blue-light)] text-white absolute z-[1000]"
        radius="sm"
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </FloatingNav>
  );
};

const AddDomainModal = ({ handleToggle }: { handleToggle: () => void }) => {
  const router = useRouter();
  const { update } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [terms, setTerms] = useState(true);
  const [domain, setDomain] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const handleNext = () => {
    if (name && email && address && domain) {
      setLoading(true);
      const data = {
        name,
        email,
        address,
        domain,
      };
      axios.post('/api/certificate', data).then((res) => {
        update();
        setLoading(false);
        handleToggle();
        router.push(`/dashboard/test`);
      });
    }
  };

  return (
    <div className="top-0 left-0 fixed z-[1000] bg-[#00000072] w-screen h-screen flex items-center">
      <div className="px-5 py-10 bg-[var(--bg)] shadow-lg rounded-[5px] h-full md:h-[100%] w-full md:w-[35%] flex items-center justify-center flex-col relative mx-auto">
        {loading ? (
          <HexLoad text={'CREATING CERT...'} />
        ) : (
          <>
            <div className="w-[90%] flex justify-end cursor-pointer">
              <IoMdClose size={30} color="white" onClick={handleToggle} />
            </div>
            <div className="login p-5 flex flex-col justify-center items-center h-full w-full">
              <div className="w-full">
                <h1 className="text-[30px] login-header font-semibold"></h1>
              </div>
              <div className="w-full my-2 grid grid-cols-2 gap-2">
                <Input
                  isClearable
                  className="details-input col-span-2"
                  variant="underlined"
                  type="text"
                  label="Domain"
                  style={{
                    color: 'white',
                  }}
                  errorMessage="Please enter a valid domain"
                  value={domain}
                  onChange={(e) => setDomain(e.currentTarget.value)}
                />
                <Input
                  isClearable
                  className="details-input"
                  variant="underlined"
                  type="text"
                  label="Name"
                  style={{
                    color: 'white',
                  }}
                  errorMessage="Please enter a valid name"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
                <Input
                  isClearable
                  className="details-input"
                  variant="underlined"
                  type="text"
                  style={{
                    color: 'white',
                  }}
                  label="Address"
                  errorMessage="Please enter a valid address"
                  value={address}
                  onChange={(e) => setAddress(e.currentTarget.value)}
                />
                <Input
                  className="details-input col-span-2"
                  variant="underlined"
                  type="email"
                  style={{
                    color: 'white !important',
                  }}
                  label="Email"
                  errorMessage="Please enter a valid email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
              <div className="w-full my-2 grid grid-cols-2 gap-2">
                <RadioGroup
                  label="Select a method"
                  value={selected}
                  onValueChange={setSelected}
                >
                  <Radio value="manual" size="sm">
                    <span className="text-white text-">Manual</span>
                  </Radio>
                  <Radio value="automatic" size="sm">
                    <span className="text-white text-sm">Automatic</span>
                  </Radio>
                </RadioGroup>
              </div>
              <div className="w-full my-2 grid grid-cols-2 gap-2">
                <h1 className="w-full col-span-2 text-[#71717a]">
                  If automatic is selected please provide a username and
                  password for the server
                </h1>
                <Input
                  isClearable
                  className="details-input"
                  variant="underlined"
                  type="text"
                  label="Username"
                  style={{
                    color: 'white',
                  }}
                  errorMessage="JohnDoe"
                  value={domain}
                  onChange={(e) => setDomain(e.currentTarget.value)}
                />
                <Input
                  isClearable
                  className="details-input"
                  variant="underlined"
                  type="text"
                  label="Password"
                  style={{
                    color: 'white',
                  }}
                  errorMessage="****"
                  // value={name}
                  // onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
              <div className="w-full my-2">
                <Checkbox
                  isSelected={terms}
                  onValueChange={() => setTerms(!terms)}
                  size="sm"
                  radius="none"
                >
                  <span className="text-white text-xs">
                    Agree to the terms and conditions
                  </span>
                </Checkbox>
              </div>
              <div className="w-full mt-2 flex justify-end cursor-pointer">
                <div className="flex items-center" onClick={handleNext}>
                  <p className="text-white">Next</p>
                  <BiCaretRight size={20} color="white" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Table = ({
  certs,
  className,
  radial,
}: {
  certs: Certificate[] | null;
  className?: string;
  radial?: boolean;
}) => {
  const router = useRouter();
  const { update } = useSession();
  const [selected, setSelected] = useState<Certificate[]>([]);
  const [verificationModal, setVerificationModal] =
    useState<Certificate | null>();
  const { numberOfPages, data, pageChange } = UseTable({
    certs,
  });

  const handleRemove = () => {
    const ids = selected?.map((i) => i._id).join(',');
    axios
      .delete(`/api/certificate?id_list=${encodeURIComponent(ids)}`)
      .then((res) => update());
  };

  const EachRow = ({ item }: { item: Certificate }) => {
    let date = item.dateAdded ? new Date(item.dateAdded) : null;
    const status = item.dns.status;
    const value = item.dns.identifier.value;
    const expire = new Date(item.dns.expires);
    const daysUntilExpire = Math.ceil(
      (expire.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    );

    const formatDate = !date
      ? '-'
      : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const isSelected = selected.some((i) => i._id === item._id);

    const handleClick = () => {
      setSelected((prev: Certificate[]) => {
        if (!isSelected) return [...prev, item];
        return prev.filter((i) => i._id !== item._id);
      });
    };

    return (
      <tr
        className="border-b border-[var(--blue-light)] relative z-10 cursor-pointer h-[60px]"
        onClick={() => {
          if (status === 'pending') return setVerificationModal(item);
          // // else
          router.push(`/dashboard/${btoa(item._id)}`);
        }}
      >
        <td className="flex justify-center items-center h-[60px]">
          <Checkbox
            size="sm"
            radius="none"
            isSelected={isSelected}
            onValueChange={handleClick}
          ></Checkbox>
        </td>
        <td className="cert-data whitespace-nowrap text-sm md:text-md w-[150px]">
          {value}
        </td>
        <td className="cert-data whitespace-nowrap text-sm md:text-md">
          {formatDate}
        </td>
        <td
          className={`cert-data whitespace-nowrap text-sm md:text-md capitalize`}
        >
          <span
            className={`${
              status.toLocaleLowerCase() === 'pending'
                ? 'text-red-400'
                : 'text-green-400'
            }`}
          >
            {status}
          </span>
        </td>
        <td className="cert-data whitespace-nowrap text-sm md:text-md">
          {daysUntilExpire > 0 ? (
            `${daysUntilExpire} Days`
          ) : (
            <span className="text-red-400">Expired</span>
          )}
        </td>
        <td className="cert-data whitespace-nowrap text-sm md:text-md text-blue-300 capitalize">
          {status === 'pending' ? (
            <p onClick={() => setVerificationModal(item)} className="">
              View
            </p>
          ) : (
            <Link href={`/dashboard/${btoa(item._id)}`}>View</Link>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div
      className={cn(
        'relative bg-[var(--blue-dark)] overflow-hidden',
        className
      )}
    >
      <div
        className={`overflow-x-scroll relative z-[1] no-scroller m-5 ${
          radial && 'min-h-[450px]'
        }`}
      >
        <table className={`relative text-white w-full`}>
          <colgroup>
            <col span={1} style={{ width: '5%' }} />
            <col span={1} style={{ width: '35%' }} />
            <col span={1} style={{ width: '30%' }} />
            <col span={1} style={{ width: '10%' }} />
            <col span={1} style={{ width: '10%' }} />
            <col span={1} style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-[var(--blue-light)]">
              <th className="" style={{ width: '20px' }}></th>
              <th className="table_cert_head whitespace-nowrap text-sm md:text-md ">
                Domain Name
              </th>
              <th className="table_cert_head whitespace-nowrap text-sm md:text-md ">
                Created At
              </th>
              <th className="table_cert_head whitespace-nowrap text-sm md:text-md ">
                Status
              </th>
              <th className="table_cert_head whitespace-nowrap text-sm md:text-md ">
                Expires In
              </th>
              <th className="table_cert_head whitespace-nowrap text-sm md:text-md "></th>
            </tr>
          </thead>
          <tbody className="min-h-fit">
            {certs ? (
              data?.map((item, index) => <EachRow key={index} item={item} />)
            ) : (
              <tr className="border-b border-[var(--blue-light)] cursor-pointer h-[50px]">
                <td>
                  <HexLoad text={undefined} />
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                <div className="flex bg-[var(--blue-dark)] mt-3">
                  {numberOfPages > 0 &&
                    Array.from({ length: numberOfPages }).map(
                      (_, index: number) => (
                        <div key={index} className="py-5 cursor-pointer">
                          <p
                            className=" border-r-1 px-4 border-[var(--bg)]"
                            onClick={() => pageChange(index + 1)}
                          >
                            {index + 1}
                          </p>
                        </div>
                      )
                    )}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* For the gradient in the table  */}
      {radial && (
        <div className="absolute -top-[20rem] z-0 -right-[20rem] h-[40rem] w-[40rem] aspect-1 bg-[radial-gradient(ellipse_at_center,_black_0%,transparent_70%)]"></div>
      )}

      {/* If items are selected  */}
      {selected.length > 0 && (
        <div className="fixed bottom-5 right-24 cursor-pointer  h-[40px] w-[40px] flex items-center justify-center">
          <RiDeleteBack2Line size={20} color="red" onClick={handleRemove} />
        </div>
      )}

      {/* If Certificate is in pending status  */}
      {verificationModal && (
        <>
          <Overlay handleClose={() => setVerificationModal(null)}>
            <Verification cert={verificationModal} />
          </Overlay>
        </>
      )}
    </div>
  );
};

const Verification = ({ cert }: { cert: Certificate }) => {
  const { update } = useSession();
  const ref = useRef<HTMLInputElement>(null);
  const [verify, setVerify] = useState<boolean>(false);
  const handleCopy = () => {
    const copyValue = ref.current?.value as string;
    navigator.clipboard.writeText(copyValue);
  };

  const handleContinue = async () => {
    setVerify(true);
    try {
      await axios
        .get('/api/certificate/verify', {
          params: {
            id: cert._id,
          },
        })
        .then(() => {
          setVerify(false);
          update();
        });
    } catch (err) {
      setVerify(false);
    }
  };

  return (
    <div
      className="relative z-[10] flex flex-col items-center justify-center w-full h-[350px] border border-[var(--blue-light)] p-10 md:w-[50%] bg-[var(--bg)]"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-white w-full my-5">
        Please add the following text in your DNS with name{' '}
        <code className="text-[var(--blue-light)]">
          _acme-challenge.&lt;DOMAIN_NAME&gt;
        </code>
      </p>
      <div className="flex items-center w-full">
        <Input
          ref={ref}
          isClearable
          className="details-input col-span-2"
          variant="underlined"
          isDisabled
          type="text"
          style={{
            color: 'white',
          }}
          value={cert.key_authorization}
        />
        <BiCopy
          onClick={handleCopy}
          size={20}
          color="var(--blue-light)"
          className="cursor-pointer active:brightness-[60%]"
        />
      </div>
      <p className="my-2 text-[#71717a]">
        Please wait for a few hours for the records to be updated before
        continuing.
      </p>
      <div className="h-[50px] w-full flex items-end justify-end">
        {verify ? (
          <div className="w-full mt-3 flex justify-end">
            <Loading />
          </div>
        ) : (
          <p className="w-full text-end text-white cursor-pointer">
            <span onClick={handleContinue}>Continue</span>
          </p>
        )}
      </div>
    </div>
  );
};

const DashBoard = () => {
  const { data: session } = useSession();
  const [toggleAdd, setToggleAdd] = useState<boolean>(false);
  const [chart, setChart] = useState<'pie' | 'bar' | null>(null);

  const AnimateChartModal = ({ type, certs }: chartType) => {
    const [tableData, setTableData] = useState<Certificate[]>(certs);

    const handlePieHover = (props: string) => {
      setTableData((prev): Certificate[] => {
        const data = tableData.filter(
          (i, index) => i.dns.status === props.toLocaleLowerCase()
        );

        return data;
      });
    };

    const handleBarHover = (props: BarProps) => {
      const { name } = props;
      setTableData((prev): Certificate[] => {
        const data = certs.filter((i, index) => {
          const formatedData = new Date(i.dns.expires).toLocaleString(
            'default',
            {
              month: 'short',
              year: 'numeric',
            }
          );
          return name === formatedData;
        });
        return data;
      });
    };

    const renderChart = () =>
      type === 'pie' ? (
        <Charts type={'pie'} cert={certs} onHover={handlePieHover} />
      ) : (
        <Charts type={'bar'} cert={certs} onHover={handleBarHover} />
      );

    return (
      <motion.div
        layoutId={type}
        className="fixed z-[100] top-0 left-0 right-0 bottom-0 bg-[transparent]"
        onClick={() => setChart(null)}
      >
        <motion.div
          className=" p-5 absolute z-[100] md:top-[50%] md:left-[50%] md:!translate-x-[-50%] md:!translate-y-[-50%] w-screen md:w-[80vw] h-screen md:h-[90vh] bg-[var(--bg)] md:border-2 md:rounded-[5px] border-[var(--blue-light)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute w-[40px] h-[40px] top-10 right-5 z-[1] cursor-pointer">
            <IoMdClose size={30} color="white" onClick={() => setChart(null)} />
          </div>
          <div className="flex flex-wrap w-full h-full items-center justify-center">
            {session?.certificates && (
              <div className="w-full md:w-[40%] h-[300px]">{renderChart()}</div>
            )}
            <div className=" w-full md:w-[50%] h-[50%] md:h-full flex items-center">
              <Table className="bg-[var(--bg)] border-none" certs={tableData} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative z-[10] p-10">
      <Navbar />

      <div className="md:w-[85%] w-full">
        <div className="flex justify-between flex-wrap relative mb-10">
          {/* Pie Chart */}
          <motion.div
            layoutId="pie"
            className={`dashboard_table mb-10 md:m-0 w-full md:w-[36%] h-[300px] mr-10`}
            onClick={() => setChart('pie')}
          >
            <Charts cert={session?.certificates} type="pie" />
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            layoutId="bar"
            className="dashboard_table w-full md:w-[61%] h-[300px] flex flex-col justify-center items-start cursor-pointer"
            onClick={() => setChart('bar')}
          >
            <Charts cert={session?.certificates} type="bar" />
          </motion.div>
        </div>

        {/* Animate chart modal on click */}

        <AnimatePresence>
          {chart && (
            <Overlay handleClose={() => setChart(null)}>
              {chart && session?.certificates && (
                <AnimateChartModal type={chart} certs={session?.certificates} />
              )}
            </Overlay>
          )}
        </AnimatePresence>

        <div className="w-full flex justify-between flex-wrap">
          <div className="flex flex-col justify-between w-full md:w-[26%] h-auto mb-10 md:mb-0">
            {/* Total Certificates */}
            <motion.div
              layoutId="number"
              className="dashboard_table cursor-default w-full h-[250px] mb-10 md:h-[35%] flex flex-col items-center justify-center"
            >
              <p className="text-white text-md my-3">Total</p>
              <p className="text-white text-5xl">
                {session?.certificates ? session?.certificates?.length : '-'}
              </p>
              <p className="text-white text-md my-3">Certificates</p>
            </motion.div>
            {/* Globe */}
            <div className="globe w-full h-[280px] dashboard_table">
              {session?.certificates && <Globe certs={session?.certificates} />}
            </div>
          </div>

          {/* Table */}
          <div className="dashboard_table bg-[var(--bg)] w-full md:w-[71%] max-w-[100vw]">
            <Table
              certs={session?.certificates ? session?.certificates : null}
              radial
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-10  h-[40px] w-[40px] flex items-center justify-center">
        <BiPlus
          size={30}
          color="var(--blue-light)"
          className="cursor-pointer"
          onClick={() => setToggleAdd(true)}
        />
      </div>

      {toggleAdd && <AddDomainModal handleToggle={() => setToggleAdd(false)} />}
    </div>
  );
};

export default DashBoard;
