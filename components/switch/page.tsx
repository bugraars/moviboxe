'use client';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const onSelectChange = (locale: string) => {
    startTransition(() => {
      router.replace(`/${locale}`);
    });
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const options = [
    { locale: 'en', label: 'English' },
    { locale: 'de', label: 'Deutsch' },
  ];

  const availableOptions = options.filter(option => option.locale !== localActive);

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={toggleMenu}
        className="focus:outline-none"
      >
        <img src="/images/menu.svg" alt="menu" width={48} />
      </button>
      {isOpen && (
        <div id="dropdown" className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            {availableOptions.map(option => (
              <li key={option.locale}>
                <button
                  onClick={() => onSelectChange(option.locale)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
