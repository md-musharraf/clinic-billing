"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { db } from '@/lib/db';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Users,
  Search,
  Plus,
  Eye,
  Phone,
  Calendar,
  User,
  HeartPulse,
  Receipt,
  FileText,
} from 'lucide-react';
import { inputCls, labelCls, btnPrimary, btnGhost, card, th, td, Modal, Field, useToast, ToastView } from '@/components/kit';
import Link from 'next/link';

export default function PatientsPage() {
  const [toast, showToast] = useToast();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  // New Patient Form
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState<number | ''>(35);
  const [gender, setGender] = useState('MALE');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [referredDoctor, setReferredDoctor] = useState('Dr. Rajesh Verma');

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await db.query('patient', 'findMany', {
        orderBy: { registeredAt: 'desc' },
        take: 100,
        include: { bills: true },
      });
      setPatients(data || []);
    } catch (e: any) {
      showToast(e.message || 'Failed to load patients', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Patient name is required', 'error');
      return;
    }

    try {
      // Patient ID (MED-YYYY-00001) is assigned by the backend.
      await db.query('patient', 'create', {
        data: {
          name: name.trim(),
          mobile: mobile.trim(),
          age: Number(age || 0),
          gender,
          address: address.trim(),
          bloodGroup,
          referredDoctor,
        },
      });

      showToast(`Patient ${name} registered successfully!`, 'success');
      setIsAddModalOpen(false);
      setName('');
      setMobile('');
      loadPatients();
    } catch (e: any) {
      showToast(e.message || 'Failed to create patient', 'error');
    }
  };

  const filteredPatients = patients.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.mobile && p.mobile.includes(q)) ||
      p.id.toLowerCase().includes(q)
    );
  });

  return (
    <AppLayout
      title="Patient Directory"
      subtitle="Comprehensive medical records, contact profiles, and past billing history"
      actions={
        <button onClick={() => setIsAddModalOpen(true)} className={btnPrimary}>
          <Plus className="h-4 w-4" />
          + Register Patient
        </button>
      }
    >
      <ToastView toast={toast} />

      <div className="space-y-5">
        {/* Search */}
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Patient Name, Phone Number, or Patient ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputCls} pl-10 h-10`}
            />
          </div>
          <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
            {filteredPatients.length} Patients
          </span>
        </div>

        {/* Patient Table */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr>
                  <th className={th}>Patient ID</th>
                  <th className={th}>Full Name</th>
                  <th className={th}>Age / Gender</th>
                  <th className={th}>Mobile</th>
                  <th className={th}>Blood Group</th>
                  <th className={th}>Doctor</th>
                  <th className={th}>Total Visits</th>
                  <th className={th}>Registered</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className={`${td} font-mono font-bold text-primary`}>{p.id}</td>
                    <td className={`${td} font-semibold text-foreground text-sm`}>{p.name}</td>
                    <td className={`${td} text-muted-foreground`}>
                      {p.age} Yrs / {p.gender}
                    </td>
                    <td className={`${td} font-medium`}>{p.mobile || '—'}</td>
                    <td className={td}>
                      <span className="inline-block px-2 py-0.5 rounded font-bold text-[10px] bg-destructive/10 text-destructive">
                        {p.bloodGroup || '—'}
                      </span>
                    </td>
                    <td className={`${td} text-muted-foreground`}>{p.referredDoctor || 'Self'}</td>
                    <td className={td}>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-muted font-bold text-[11px]">
                        {p.bills?.length || 0} bills
                      </span>
                    </td>
                    <td className={`${td} text-muted-foreground`}>{formatDate(p.registeredAt)}</td>
                    <td className={`${td} text-right`}>
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedPatient(p)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          History
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-xs text-muted-foreground">
                      No patients found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Register Patient Modal */}
      {isAddModalOpen && (
        <Modal title="Register New Patient" onClose={() => setIsAddModalOpen(false)}>
          <form onSubmit={handleCreatePatient} className="space-y-4">
            <Field label="Full Name *">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anjali Sharma"
                className={inputCls}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Mobile Number">
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10-digit phone"
                  className={inputCls}
                />
              </Field>
              <Field label="Blood Group">
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className={inputCls}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Age (Years)">
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                  className={inputCls}
                />
              </Field>
              <Field label="Gender">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={inputCls}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </Field>
            </div>

            <Field label="Consultant Doctor">
              <input
                type="text"
                value={referredDoctor}
                onChange={(e) => setReferredDoctor(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Residential Address">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, City"
                className={inputCls}
              />
            </Field>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className={btnGhost}
              >
                Cancel
              </button>
              <button type="submit" className={btnPrimary}>
                Register Patient
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Patient History Modal */}
      {selectedPatient && (
        <Modal
          title={`Patient Medical & Billing History: ${selectedPatient.name}`}
          onClose={() => setSelectedPatient(null)}
          wide
        >
          <div className="space-y-5">
            <div className="rounded-xl bg-muted/40 p-4 border border-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Patient ID</span>
                <span className="font-mono font-bold text-primary">{selectedPatient.id}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Age / Gender</span>
                <span className="font-semibold text-foreground">{selectedPatient.age} Yrs / {selectedPatient.gender}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Phone Number</span>
                <span className="font-semibold text-foreground">{selectedPatient.mobile || '—'}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Blood Group</span>
                <span className="font-semibold text-destructive">{selectedPatient.bloodGroup || '—'}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
                <Receipt className="h-4 w-4 text-primary" />
                Past Invoices & Treatments ({selectedPatient.bills?.length || 0})
              </h4>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-2.5 font-bold">Bill No</th>
                      <th className="p-2.5 font-bold">Date</th>
                      <th className="p-2.5 font-bold">Doctor</th>
                      <th className="p-2.5 font-bold">Payment</th>
                      <th className="p-2.5 font-bold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {selectedPatient.bills?.map((b: any) => (
                      <tr key={b.id} className="hover:bg-muted/30">
                        <td className="p-2.5 font-mono font-bold text-primary">{b.billNo}</td>
                        <td className="p-2.5 text-muted-foreground">{formatDate(b.createdAt)}</td>
                        <td className="p-2.5">{b.doctorName || 'Self'}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600">
                            {b.paymentMethod}
                          </span>
                        </td>
                        <td className="p-2.5 text-right font-bold text-foreground">{formatCurrency(b.totalAmount)}</td>
                      </tr>
                    ))}
                    {(!selectedPatient.bills || selectedPatient.bills.length === 0) && (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-muted-foreground">
                          No past bills found for this patient.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className={btnGhost}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
}
