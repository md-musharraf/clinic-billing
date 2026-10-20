"use client";

import { forwardRef, useState } from 'react';
import { Search } from 'lucide-react';
import { inputCls } from '@/components/kit';
import { formatCurrency } from '@/lib/utils';
import { guessCategory } from '@/lib/billing-summary';

export type PickedItem = { name: string; category: string; price: number };

// Catalog search used by New Bill and Admissions: type, ↑↓ to choose, Enter adds. A name not in the catalog is
// added with a guessed category and price 0 (the caller then asks for its price).
export const ItemSearch = forwardRef<HTMLInputElement, { catalog: any[]; onAdd: (item: PickedItem) => void; placeholder?: string }>(
  function ItemSearch({ catalog, onAdd, placeholder }, ref) {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const q = search.trim().toLowerCase();
    const results = q ? catalog.filter((c) => c.name.toLowerCase().includes(q) || c.code?.toLowerCase().includes(q)).slice(0, 8) : [];

    const add = (item: PickedItem) => {
      onAdd(item);
      setSearch('');
      setActive(0);
    };
    const fromCatalog = (c: any) => add({ name: c.name, category: c.category, price: c.defaultPrice });

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === 'Escape') {
        setSearch('');
      } else if (e.key === 'Enter' && search.trim()) {
        e.preventDefault();
        if (results[active]) fromCatalog(results[active]);
        else add({ name: search.trim(), category: guessCategory(search), price: 0 });
      }
    };

    return (
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
        <input
          ref={ref}
          data-enter-native
          aria-label="Search items"
          autoComplete="off"
          placeholder={placeholder || 'Add medicine, test, USG, X-Ray or fee… ↑↓ to choose, Enter to add'}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className={`${inputCls} h-10 pl-10`}
        />
        {open && search.trim() && (
          <div className="absolute left-0 right-0 top-11 z-40 overflow-hidden rounded-xl border border-border bg-card py-1 shadow-2xl">
            {results.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => fromCatalog(r)}
                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm cursor-pointer ${i === active ? 'bg-primary/10' : ''}`}
              >
                <span>
                  <span className="font-semibold">{r.name}</span>
                  <span className="ml-2 text-[11px] text-muted-foreground">{r.category}</span>
                </span>
                <span className="font-mono font-bold text-primary">{formatCurrency(r.defaultPrice)}</span>
              </button>
            ))}
            {!results.length && (
              <p className="px-4 py-2 text-xs text-muted-foreground">
                Not in the catalog. <b>Enter</b> adds “{search.trim()}” as {guessCategory(search)}, then type its price.
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);
