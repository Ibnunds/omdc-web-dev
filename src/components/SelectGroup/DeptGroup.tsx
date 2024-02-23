import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { DEPT } from '../../api/routes';
import { API_STATES } from '../../constants/ApiEnum';

const DeptGroup = ({ value }: { value: (arg0: string) => void }) => {
  const [list, setList] = React.useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  React.useEffect(() => {
    value(selectedOption);
  }, [selectedOption]);

  React.useEffect(() => {
    getList();
  }, []);

  async function getList() {
    const { state, data, error } = await useFetch({
      url: DEPT + `?limit=100`,
      method: 'GET',
    });

    if (state == API_STATES.OK) {
      setList(data.rows);
    } else {
      setList([]);
    }
  }

  return (
    <div>
      <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
        Departemen
      </label>

      <div className="relative z-20">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-6 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Pilih Departemen
          </option>
          {list.map((item: any) => {
            return (
              <option
                value={item?.label}
                className="text-body dark:text-bodydark"
              >
                {item?.label}
              </option>
            );
          })}
        </select>

        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default DeptGroup;
