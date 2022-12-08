import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";

const Selector = ({ name, options, setter }: any) => {
  
  const [selectedOption, setSelectedOption] = useState<string>('');

  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  useEffect(() => {
    setCurrentOptions(options);
  }, [])

  const filter = (value: string) => {
    if(value === '') setCurrentOptions(options)
    else setCurrentOptions(currentOptions.filter((options: string) => options.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
  }

  return (
    <div className="flex flex-col w-full">
      <Combobox value={selectedOption} onChange={setSelectedOption}>
        <Combobox.Input
          placeholder={name}
          onChange={(event: any) => filter(event.target.value)}
          className={`w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-2 px-3 transition-colors duration-200 ease-in-out`}
        />
        <Combobox.Options
          className={`max-h-48 overflow-y-auto mb-12 absolute z-50 mt-12`}
        >
          {currentOptions.length > 0 ? (
            currentOptions.map((option: string, index: number) => (
              <Combobox.Option
                key={index}
                value={option}
                className="cursor-pointer flex items-center space-x-2 px-2 py-1 rounded-md bg-black hover:bg-indigo-900 text-white"
                onClick={() => setter(option)}
              >
                <p className="text-md font-semibold ">{option}</p>
              </Combobox.Option>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default Selector;
