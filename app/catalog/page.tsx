"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { db } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  Pill,
  Beaker,
  Stethoscope,
  HeartPulse,
  Sparkles,
} from 'lucide-react';
import { inputCls, labelCls, btnPrimary, btnGhost, btnDanger, card, th, td, Modal, Field, useToast, ToastView } from '@/components/kit';

const CATEGORIES = [
  'All Categories',
  'Medicine',
  'Lab Test',
  'Doctor Fee',
  'Procedure',
  'Room Charges',
  'Ambulance',
  'Miscellaneous',
];

export default function CatalogPage() {
  const [toast, showToast] = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'Medicine',
    defaultPrice: 10,
    costPrice: 0,
    unit: 'strip',
    taxPercent: 0,
    stock: 100,
  });

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await db.query('catalogItem', 'findMany', {
        orderBy: { name: 'asc' },
        take: 500,
      });
      setItems(data || []);
    } catch (e: any) {
      showToast(e.message || 'Failed to load catalog', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      code: `ITEM-${Date.now().toString().slice(-4)}`,
      name: '',
      category: 'Medicine',
      defaultPrice: 10,
      costPrice: 0,
      unit: 'strip',
      taxPercent: 0,
      stock: 100,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      code: item.code || '',
      name: item.name,
      category: item.category,
      defaultPrice: item.defaultPrice,
      costPrice: item.costPrice || 0,
      unit: item.unit || 'unit',
      taxPercent: item.taxPercent || 0,
      stock: item.stock || 100,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Item name is required', 'error');
      return;
    }

    try {
      if (editingItem) {
        await db.query('catalogItem', 'update', {
          where: { id: editingItem.id },
          data: {
            code: formData.code.trim() || null,
            name: formData.name.trim(),
            category: formData.category,
            defaultPrice: Number(formData.defaultPrice || 0),
            costPrice: Number(formData.costPrice || 0),
            unit: formData.unit,
            taxPercent: Number(formData.taxPercent || 0),
            stock: Number(formData.stock || 0),
          },
        });
        showToast('Item updated successfully', 'success');
      } else {
        await db.query('catalogItem', 'create', {
          data: {
            code: formData.code.trim() || null,
            name: formData.name.trim(),
            category: formData.category,
            defaultPrice: Number(formData.defaultPrice || 0),
            costPrice: Number(formData.costPrice || 0),
            unit: formData.unit,
            taxPercent: Number(formData.taxPercent || 0),
            stock: Number(formData.stock || 0),
            isCustom: true,
          },
        });
        showToast('New item added to catalog', 'success');
      }
      setIsModalOpen(false);
      loadItems();
    } catch (e: any) {
      showToast(e.message || 'Failed to save item', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this item from the catalog?')) return;
    try {
      await db.query('catalogItem', 'delete', { where: { id } });
      showToast('Item deleted', 'success');
      loadItems();
    } catch (e: any) {
      showToast(e.message || 'Failed to delete item', 'error');
    }
  };

  const filteredItems = items.filter((it) => {
    const matchesCat = selectedCategory === 'All Categories' || it.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch = it.name.toLowerCase().includes(q) || (it.code && it.code.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <AppLayout
      title="Item & Price Master Catalog"
      subtitle="Manage medicines, lab tests, doctor fees, procedures, and room tariffs"
      actions={
        <button onClick={openAddModal} className={btnPrimary}>
          <Plus className="h-4 w-4" />
          + Add New Item
        </button>
      }
    >
      <ToastView toast={toast} />

      <div className="space-y-5">
        {/* Controls: Search & Category Pills */}
        <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Medicine/Test Name or Code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputCls} pl-10 h-10`}
            />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Master Catalog Table */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr>
                  <th className={th}>Code</th>
                  <th className={th}>Item Name</th>
                  <th className={th}>Category</th>
                  <th className={th}>Unit</th>
                  <th className={`${th} text-right`}>Selling Price</th>
                  <th className={`${th} text-right`}>Stock</th>
                  <th className={th}>Source</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredItems.map((it) => (
                  <tr key={it.id} className="hover:bg-muted/30 transition-colors">
                    <td className={`${td} font-mono font-medium text-muted-foreground`}>{it.code || '—'}</td>
                    <td className={`${td} font-bold text-foreground text-sm`}>{it.name}</td>
                    <td className={td}>
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-primary/10 text-primary">
                        {it.category}
                      </span>
                    </td>
                    <td className={`${td} text-muted-foreground`}>{it.unit || 'unit'}</td>
                    <td className={`${td} text-right font-bold text-sm text-foreground`}>
                      {formatCurrency(it.defaultPrice)}
                    </td>
                    <td className={`${td} text-right font-medium`}>{it.stock ?? 100}</td>
                    <td className={td}>
                      {it.isCustom ? (
                        <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          Custom Added
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">Standard Master</span>
                      )}
                    </td>
                    <td className={`${td} text-right`}>
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(it)}
                          className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit Item"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(it.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-xs text-muted-foreground">
                      No items found in catalog matching "{search}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <Modal
          title={editingItem ? 'Edit Catalog Item' : 'Add New Item to Master Catalog'}
          onClose={() => setIsModalOpen(false)}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Item Code (Optional)">
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. MED-501"
                  className={inputCls}
                />
              </Field>
              <Field label="Category">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={inputCls}
                >
                  <option value="Medicine">Medicine</option>
                  <option value="Lab Test">Lab Test</option>
                  <option value="Doctor Fee">Doctor Fee</option>
                  <option value="Procedure">Procedure</option>
                  <option value="Room Charges">Room Charges</option>
                  <option value="Ambulance">Ambulance</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </Field>
            </div>

            <Field label="Item / Medicine / Service Name *">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Cefixime 200mg Tablet"
                className={inputCls}
                required
              />
            </Field>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Selling Price (₹) *">
                <input
                  type="number"
                  step="0.01"
                  value={formData.defaultPrice}
                  onChange={(e) => setFormData({ ...formData, defaultPrice: parseFloat(e.target.value) || 0 })}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Unit / Dosage">
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="strip / vial / test"
                  className={inputCls}
                />
              </Field>
              <Field label="Stock Qty">
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={btnGhost}
              >
                Cancel
              </button>
              <button type="submit" className={btnPrimary}>
                {editingItem ? 'Save Changes' : 'Add to Catalog'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AppLayout>
  );
}
