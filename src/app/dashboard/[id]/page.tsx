'use client';
import { Loading } from '@/app/components';
import { axios } from '@/app/components/axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaAngleRight } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const TextArea = ({
  value,
  title,
}: {
  value: string | undefined;
  title: string;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const handleCopy = () => {
    const copyValue = ref.current?.innerText as string;
    navigator.clipboard.writeText(copyValue);
  };
  return (
    <div className="md:mr-5">
      <p className="text-white py-5">{title}</p>
      <div className="relative border border-[var(--blue-light)] w-[400px] md:w-[450px] rounded-[5px]">
        <div className="h-[200px] m-5 overflow-hidden">
          <p
            ref={ref}
            className="text-white w-[95%] h-[250px] text-sm whitespace-normal break-words line-clamp-[10] text-ellipsis overflow-hidden"
          >
            {value ?? ''}
          </p>
        </div>
        <BiCopy
          onClick={handleCopy}
          size={20}
          color="var(--blue-light)"
          className="absolute right-5 top-5 cursor-pointer active:brightness-[60%]"
        />
      </div>
    </div>
  );
};

const MultiStep = ({
  commands,
  domainConfig,
  sslConfig,
  sslCerts,
}: {
  commands?: boolean;
  domainConfig?: boolean;
  sslConfig?: boolean;
  sslCerts?: boolean;
}) => {
  // Check if all props are defined
  const isDefined =
    commands !== undefined &&
    domainConfig !== undefined &&
    sslConfig !== undefined &&
    sslCerts !== undefined;

  const InsideContent = ({
    value,
    state,
  }: {
    value: string;
    state: boolean;
  }) => {
    return (
      <div className="p-3 text-[var(--blue-light)] flex items-center">
        {state ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 var(--blue-light)"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p className="ml-2">{value}</p>
          </>
        ) : (
          <div className="flex items-start">
            <MdOutlineKeyboardArrowRight size={24} className="" />
            <Loading value={`${value}...`} classes="h-fit ml-2" />
          </div>
        )}
      </div>
    );
  };

  const renderInsideContent = (value: string, state?: boolean) =>
    state !== undefined && <InsideContent value={value} state={state} />;

  return (
    <div className="multistep border-t md:border-t-0   md:border-l border-[#686868e2] p-5 h-[500px]">
      {isDefined ? (
        <>
          {renderInsideContent('Modifying Domain Configurations', domainConfig)}
          {renderInsideContent(
            'Updating SSL Configurations',
            domainConfig ? sslConfig : undefined
          )}
          {renderInsideContent(
            'Uploading SSL Certificate',
            sslConfig ? sslCerts : undefined
          )}
          {renderInsideContent('Enabling SSL', sslCerts ? commands : undefined)}
          {renderInsideContent(
            'Restarting Services',
            sslCerts ? commands : undefined
          )}
        </>
      ) : (
        <Loading value="Loading..." />
      )}
    </div>
  );
};

const Details = ({ params }: { params: { id: string } }) => {
  const { status, data: session } = useSession();
  const [cert, setCert] = useState(() => {
    return session?.certificates?.find((i) => i._id === atob(params.id));
  });

  const fetchSteps = () => {
    axios.get('/api/automate/domain_config').then(() => {
      
    })
  }

  // useEffect(() => {
  //   if(cert?.automatic){
  //     fetchSteps()
  //   }
  // },[cert])

  return (
    <div className="min-h-screen p-10">
      <div className="flex items-center">
        <Link
          href="/dashboard"
          className="text-white my-5 text-md md:text-2xl astro-font hover:text-[var(--blue-light)] transition-all duration-75"
        >
          Dashboard
        </Link>
        <FaAngleRight className="md:h-[30px] md:w-[30px]" color="white" />
        <p className="text-white my-5 text-md md:text-2xl astro-font">
          {cert?.dns.identifier.value}
        </p>
      </div>

      <div className="flex flex-wrap">
        <div className="flex flex-wrap w-full md:w-[70%] mb-10 md:mb-0">
          <TextArea title="Full Chain" value={cert?.privateKey} />
          <TextArea title="Private Key" value={cert?.salt} />
          <TextArea
            title="Certificate Signing Request (CSR)"
            value={cert?.key_authorization}
          />
        </div>
        {cert?.automatic && (
          <MultiStep
            commands={cert?.CommandsExecuted}
            domainConfig={cert?.DomainConfigCompletion}
            sslConfig={cert?.SSLConfigCompletion}
            sslCerts={cert?.SSlCertificatesUploaded}
          />
        )}
      </div>
    </div>
  );
};

export default Details;
