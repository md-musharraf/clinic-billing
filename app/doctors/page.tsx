"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { db } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import {
  Stethoscope,
  Plus,
  Search,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Building,
  GraduationCap,
} from 'lucide-react';
import { inputCls, labelCls, btnPrimary, btnGhost, card, th, td, Modal, Field, useToast, ToastView } from '@/components/kit';

export default function DoctorsPage() {
  const [toast, showToast] = useToast();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('MBBS, MD');
  const [specialization, setSpecialization] = useState('General Physician');
  const [hospital, setHospital] = useState('City Clinic');
  const [mobile, setMobile] = useState('');
  const [consultationFee, setConsultationFee] = useState(300);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const data = await db.query('doctor', 'findMany', {
        orderBy: { name: 'asc' },
      });
      setDoctors(data || []);
    } catch (e: any) {
      showToast(e.message || 'Failed to load doctors', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const openAddModal = () => {
    setEditingDoc(null);
    setName('');
    setQualification('MBBS, MD');
    setSpecialization('General Physician');
    setHospital('City Clinic');
    setMobile('');
    setConsultationFee(300);
    setIsModalOpen(true);
  };

  const openEditModal = (doc: any) => {
    setEditingDoc(doc);
    setName(doc.name);
    setQualification(doc.qualification || '');
    setSpecialization(doc.specialization || 'General Physician');
    setHospital(doc.hospital || '');
    setMobile(doc.mobile || '');
    setConsultationFee(doc.consultationFee || 300);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Doctor name is required', 'error');
      return;
    }

    try {
      if (editingDoc) {
        await db.query('doctor', 'update', {
          where: { id: editingDoc.id },
          data: {
            name: name.trim(),
            qualification: qualification.trim(),
            specialization: specialization.trim(),
            hospital: hospital.trim(),
            mobile: mobile.trim(),
            consultationFee: Number(consultationFee || 0),
          },
        });
        showToast('Doctor details updated', 'success');
      } else {
        await db.query('doctor', 'create', {
          data: {
            name: name.trim(),
            qualification: qualification.trim(),
            specialization: specialization.trim(),
            hospital: hospital.trim(),
            mobile: mobile.trim(),
            consultationFee: Number(consultationFee || 0),
          },
        });
        showToast('Doctor added successfully', 'success');
      }
      setIsModalOpen(false);
      loadDoctors();
    } catch (e: any) {
      showToast(e.message || 'Failed to save doctor', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this doctor?')) return;
    try {
      await db.query('doctor', 'delete', { where: { id } });
      showToast('Doctor removed', 'success');
      loadDoctors();
    } catch (e: any) {
      showToast(e.message || 'Failed to delete doctor', 'error');
    }
  };

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    (d.specialization && d.specialization.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AppLayout
      title="Doctors & Consultants"
      subtitle="Manage internal clinicians and referring doctors with fee schedules"
      actions={
        <button onClick={openAddModal} className={btnPrimary}>
          <Plus className="h-4 w-4" />
          + Add Doctor
        </button>
      }
    >
      <ToastView toast={toast} />

      <div className="space-y-5">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Doctor Name or Specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputCls} pl-10 h-10`}
            />
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {filtered.length} Doctors
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr>
                  <th className={th}>Doctor Name</th>
                  <th className={th}>Specialization</th>
                  <th className={th}>Qualification</th>
                  <th className={th}>Hospital / Clinic</th>
                  <th className={th}>Contact</th>
                  <th className={`${th} text-right`}>OPD Consultation Fee</th>
                  <th className={`${th} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                    <td className={`${td} font-bold text-foreground text-sm`}>{doc.name}</td>
                    <td className={td}>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary">
                        {doc.specialization || 'General Physician'}
                      </span>
                    </td>
                    <td className={`${td} text-muted-foreground`}>{doc.qualification || '—'}</td>
                    <td className={`${td} text-muted-foreground`}>{doc.hospital || '—'}</td>
                    <td className={`${td} font-medium`}>{doc.mobile || '—'}</td>
                    <td className={`${td} text-right font-bold text-sm text-foreground`}>
                      {formatCurrency(doc.consultationFee || 300)}
                    </td>
                    <td className={`${td} text-right`}>
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(doc)}
                          className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-muted-foreground">
                      No doctors registered yet. Click "+ Add Doctor" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal title={editingDoc ? 'Edit Doctor Profile' : 'Add New Doctor'} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Field label="Doctor Full Name *">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Priya Singh"
                className={inputCls}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Specialization">
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. Cardiologist, Pediatrician"
                  className={inputCls}
                />
              </Field>
              <Field label="Qualification">
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. MBBS, MD, DNB"
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="OPD Consultation Fee (₹) *">
                <input
                  type="number"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(parseFloat(e.target.value) || 0)}
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Mobile Phone">
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Affiliated Hospital / Chamber">
              <input
                type="text"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className={inputCls}
              />
            </Field>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={btnGhost}
              >
                Cancel
              </button>
              <button type="submit" className={btnPrimary}>
                {editingDoc ? 'Save Changes' : 'Register Doctor'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AppLayout>
  );
}
