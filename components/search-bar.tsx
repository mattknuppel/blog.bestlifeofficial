'use client';

import { Input } from './input';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  defaultValue?: string;
}

export function SearchBar({ placeholder = 'Search', onSearch, defaultValue = '' }: SearchBarProps) {
  return (
    <Input
      type="search"
      defaultValue={defaultValue}
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}
