import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X, Minus, Square, Settings, FileText, BarChart3, Search, Baby, Heart,
  Trash2, UserPen, UserPlus, Printer, Save, FolderOpen, FilePlus,
  ZoomIn, ZoomOut, Move, RotateCcw, ChevronUp, ChevronLeft, ChevronRight,
  User, Phone, Mail, MapPin, Calendar, Home, Briefcase, HeartHandshake,
  Users, Pencil, Plus, Filter, LayoutGrid, Share2, Database, Eye, Clock,
  HardDrive, MousePointer, AlertCircle, Network, Check, List,
  Copy, ArrowUpDown, Download, FileType, GitBranch, File, Shield, Flag,
  Maximize2, ShieldCheck, MousePointer2, Sparkles, UserCheck, AlertTriangle,
  Info, FileJson, Image as ImageIcon, Link2, Crown, Star, LockKeyhole
} from 'lucide-react';

// ==================== TYPES ====================
type Gender = 'male' | 'female';
type ViewMode = 'tree' | 'grid' | 'list';
type ToastType = 'success' | 'error' | 'info';

interface Person {
  id: string;
  name: string;
  gender: Gender;
  birthYear: string;
  birthDate: string;
  birthPlace: string;
  job: string;
  nationality: string;
  generation: number;
  isDeceased: boolean;
  fatherId: string | null;
  motherId: string | null;
  spouseIds: string[];
  childrenIds: string[];
  familyId: string;
  phone: string;
  email: string;
  city: string;
  neighborhood: string;
  postalCode: string;
  photoUrl: string | null;
  notes?: string;
}

interface Family {
  id: string;
  name: string;
  color: string;
  memberIds: string[];
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface PersonFormData {
  name: string;
  gender: Gender;
  birthYear: string;
  birthDate: string;
  birthPlace: string;
  job: string;
  nationality: string;
  generation: number;
  isDeceased: boolean;
  familyId: string;
  phone: string;
  email: string;
  city: string;
  neighborhood: string;
  postalCode: string;
  photoUrl: string | null;
}

// ==================== HELPERS ====================
const genId = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36);

const calculateAge = (yearStr: string): number => {
  const y = parseInt(yearStr);
  if (!y || isNaN(y)) return 0;
  return new Date().getFullYear() - y;
};

const familyColors = ['blue', 'emerald', 'amber', 'purple', 'rose', 'cyan', 'indigo', 'teal', 'orange', 'fuchsia', 'lime', 'sky'] as const;

const initialFamilies: Family[] = [
  { id: 'fam-1', name: 'عائلة الأحمدي', color: 'blue', memberIds: [] },
  { id: 'fam-2', name: 'عائلة الزهراني', color: 'emerald', memberIds: [] },
  { id: 'fam-3', name: 'عائلة القحطاني', color: 'amber', memberIds: [] },
  { id: 'fam-4', name: 'عائلة العتيبي', color: 'purple', memberIds: [] },
  { id: 'fam-5', name: 'عائلة الغامدي', color: 'rose', memberIds: [] },
  { id: 'fam-6', name: 'عائلة الحربي', color: 'cyan', memberIds: [] },
  { id: 'fam-7', name: 'عائلة المطيري', color: 'indigo', memberIds: [] },
  { id: 'fam-8', name: 'عائلة السبيعي', color: 'teal', memberIds: [] },
  { id: 'fam-9', name: 'عائلة الرشيدي', color: 'orange', memberIds: [] },
  { id: 'fam-10', name: 'عائلة الشمري', color: 'fuchsia', memberIds: [] },
  { id: 'fam-11', name: 'عائلة العنزي', color: 'lime', memberIds: [] },
  { id: 'fam-12', name: 'عائلة الدوسري', color: 'sky', memberIds: [] },
];

const initialPersons: Person[] = [
  {
    id: 'p1', name: 'أحمد الأحمدي', gender: 'male', birthYear: '1925', birthDate: '15/01/1925',
    birthPlace: 'الرياض، السعودية', job: 'تاجر', nationality: 'سعودي', generation: 1,
    isDeceased: true, fatherId: null, motherId: null, spouseIds: ['p2'], childrenIds: ['p3', 'p5'],
    familyId: 'fam-1', phone: '+966 50 000 0001', email: 'ahmad.ahmadi@mail.com',
    city: 'الرياض', neighborhood: 'الملز', postalCode: '11461', photoUrl: null, notes: 'مؤسس العائلة'
  },
  {
    id: 'p2', name: 'مريم سالم', gender: 'female', birthYear: '1930', birthDate: '22/05/1930',
    birthPlace: 'جدة، السعودية', job: 'ربة منزل', nationality: 'سعودية', generation: 1,
    isDeceased: true, fatherId: null, motherId: null, spouseIds: ['p1'], childrenIds: ['p3', 'p5'],
    familyId: 'fam-1', phone: '+966 50 000 0002', email: 'maryam@mail.com',
    city: 'الرياض', neighborhood: 'الملز', postalCode: '11461', photoUrl: null
  },
  {
    id: 'p3', name: 'محمد بن أحمد الأحمدي', gender: 'male', birthYear: '1960', birthDate: '15/03/1960',
    birthPlace: 'الرياض، السعودية', job: 'مهندس مدني', nationality: 'سعودي', generation: 2,
    isDeceased: false, fatherId: 'p1', motherId: 'p2', spouseIds: ['p4'], childrenIds: ['p7', 'p8', 'p9'],
    familyId: 'fam-1', phone: '+966 50 123 4567', email: 'm.ahmadi@mail.com',
    city: 'الرياض', neighborhood: 'حي النخيل', postalCode: '12345', photoUrl: null
  },
  {
    id: 'p4', name: 'نورة الفاهمي', gender: 'female', birthYear: '1963', birthDate: '08/11/1963',
    birthPlace: 'الرياض، السعودية', job: 'معلمة', nationality: 'سعودية', generation: 2,
    isDeceased: false, fatherId: null, motherId: null, spouseIds: ['p3'], childrenIds: ['p7', 'p8', 'p9'],
    familyId: 'fam-1', phone: '+966 50 123 4568', email: 'nora@mail.com',
    city: 'الرياض', neighborhood: 'حي النخيل', postalCode: '12345', photoUrl: null
  },
  {
    id: 'p5', name: 'علي الأحمدي', gender: 'male', birthYear: '1963', birthDate: '12/07/1963',
    birthPlace: 'الرياض، السعودية', job: 'طبيب', nationality: 'سعودي', generation: 2,
    isDeceased: false, fatherId: 'p1', motherId: 'p2', spouseIds: ['p6'], childrenIds: ['p10'],
    familyId: 'fam-1', phone: '+966 50 123 4569', email: 'ali.ahmadi@mail.com',
    city: 'الرياض', neighborhood: 'العليا', postalCode: '12211', photoUrl: null
  },
  {
    id: 'p6', name: 'هند السالم', gender: 'female', birthYear: '1965', birthDate: '30/09/1965',
    birthPlace: 'الدمام، السعودية', job: 'محامية', nationality: 'سعودية', generation: 2,
    isDeceased: false, fatherId: null, motherId: null, spouseIds: ['p5'], childrenIds: ['p10'],
    familyId: 'fam-1', phone: '+966 50 123 4570', email: 'hind@mail.com',
    city: 'الرياض', neighborhood: 'العليا', postalCode: '12211', photoUrl: null
  },
  {
    id: 'p7', name: 'أحمد محمد', gender: 'male', birthYear: '1985', birthDate: '05/02/1985',
    birthPlace: 'الرياض، السعودية', job: 'مهندس برمجيات', nationality: 'سعودي', generation: 3,
    isDeceased: false, fatherId: 'p3', motherId: 'p4', spouseIds: [], childrenIds: [],
    familyId: 'fam-1', phone: '+966 50 123 4571', email: 'ahmad.m@mail.com',
    city: 'الرياض', neighborhood: 'الياسمين', postalCode: '13325', photoUrl: null
  },
  {
    id: 'p8', name: 'سارة محمد', gender: 'female', birthYear: '1988', birthDate: '18/06/1988',
    birthPlace: 'الرياض، السعودية', job: 'طبيبة', nationality: 'سعودية', generation: 3,
    isDeceased: false, fatherId: 'p3', motherId: 'p4', spouseIds: [], childrenIds: [],
    familyId: 'fam-1', phone: '+966 50 123 4572', email: 'sara.m@mail.com',
    city: 'الرياض', neighborhood: 'الياسمين', postalCode: '13325', photoUrl: null
  },
  {
    id: 'p9', name: 'عمر محمد', gender: 'male', birthYear: '1991', birthDate: '23/12/1991',
    birthPlace: 'الرياض، السعودية', job: 'طالب ماجستير', nationality: 'سعودي', generation: 3,
    isDeceased: false, fatherId: 'p3', motherId: 'p4', spouseIds: [], childrenIds: [],
    familyId: 'fam-1', phone: '+966 50 123 4573', email: 'omar.m@mail.com',
    city: 'الرياض', neighborhood: 'الياسمين', postalCode: '13325', photoUrl: null
  },
  {
    id: 'p10', name: 'يوسف علي', gender: 'male', birthYear: '1990', birthDate: '10/10/1990',
    birthPlace: 'الرياض، السعودية', job: 'مصمم', nationality: 'سعودي', generation: 3,
    isDeceased: false, fatherId: 'p5', motherId: 'p6', spouseIds: [], childrenIds: [],
    familyId: 'fam-1', phone: '+966 50 123 4574', email: 'youssef@mail.com',
    city: 'الرياض', neighborhood: 'العليا', postalCode: '12211', photoUrl: null
  },
];

initialFamilies[0].memberIds = initialPersons.map(p => p.id);

// ==================== STORAGE ====================
const STORAGE_KEY = 'arabic-family-tree-v3';

// ==================== COMPONENTS ====================

function ToastContainer({ toasts, remove }: { toasts: Toast[]; remove: (id: string) => void }) {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md border text-[12px] font-bold transition-all animate-[slideUp_0.3s_ease]`}
          style={{
            background: t.type === 'success' ? 'linear-gradient(145deg, #dcfce7, #bbf7d0)' :
              t.type === 'error' ? 'linear-gradient(145deg, #fee2e2, #fecaca)' :
                'linear-gradient(145deg, #dbeafe, #bfdbfe)',
            borderColor: t.type === 'success' ? '#86efac' : t.type === 'error' ? '#fca5a5' : '#93c5fd',
            color: t.type === 'success' ? '#14532d' : t.type === 'error' ? '#7f1d1d' : '#1e3a8a',
          }}>
          {t.type === 'success' ? <Check size={14} /> : t.type === 'error' ? <AlertCircle size={14} /> : <Info size={14} />}
          {t.message}
          <button onClick={() => remove(t.id)} className="ms-2 hover:opacity-70"><X size={14} /></button>
        </div>
      ))}
    </div>
  );
}

function TitleBar({ fileName, isSaved, onAction }: { fileName: string; isSaved: boolean; onAction: (m: string) => void }) {
  return (
    <div className="relative h-[28px] flex items-center select-none overflow-hidden shrink-0"
      style={{
        background: 'linear-gradient(to bottom, #4a8ec4 0%, #3d7db3 45%, #3570a5 100%)',
        borderBottom: '1px solid #264f7a',
      }}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30 pointer-events-none" />
      <div className="flex items-center h-full px-2.5 gap-2">
        <div className="relative w-[22px] h-[22px] rounded-[5px] flex items-center justify-center shadow-sm"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #e0eaf5)',
            border: '1px solid #2a5f8f',
            boxShadow: '0 1px 2px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,1)',
          }}>
          <GitBranch size={13} className="text-[#2563eb]" strokeWidth={2.5} style={{ transform: 'scaleX(-1)' }} />
          <div className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(to bottom, #ef4444, #b91c1c)', border: '1px solid white', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            <Shield size={6.5} className="text-white" strokeWidth={3} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-white font-bold text-[12px] tracking-tight" style={{ textShadow: '0 1px 1.5px rgba(0,0,0,0.4)' }}>شجرة العائلة</span>
          <div className="flex items-center gap-0.5 px-1 py-0 rounded-[3px] text-[8.5px] font-black text-white"
            style={{ background: 'linear-gradient(to bottom, #f59e0b, #d97706)', border: '1px solid #b45309', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }}>
            PRO
          </div>
        </div>
      </div>
      <div className="h-3.5 w-px bg-white/20 mx-0.5" />
      <div className="flex items-center gap-1.5 text-white/85 text-[11px] h-full">
        <File size={11} strokeWidth={1.8} className="text-white/70" />
        <span className="font-medium" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>{fileName}</span>
        <span className="text-white/50 text-[9.5px]">.familytree</span>
        <span className={`flex items-center gap-1 text-[9.5px] mr-1 font-bold ${isSaved ? 'text-green-300' : 'text-amber-200'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isSaved ? 'bg-green-400 shadow-[0_0_3px_#4ade80]' : 'bg-amber-300 shadow-[0_0_3px_#fbbf24] animate-pulse'}`}></span>
          {isSaved ? 'محفوظ' : 'غير محفوظ'}
        </span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center h-full">
        <TitleBarButton title="تصغير" onClick={() => onAction('تصغير النافذة غير متاح في المتصفح')}><Minus size={11} strokeWidth={1.8} /></TitleBarButton>
        <TitleBarButton title="تكبير" onClick={() => onAction('تكبير النافذة غير متاح في المتصفح')}><Square size={9} strokeWidth={1.8} /></TitleBarButton>
        <TitleBarButton title="إغلاق" close onClick={() => onAction('استخدم زر إغلاق المتصفح')}><X size={11} strokeWidth={1.8} /></TitleBarButton>
      </div>
    </div>
  );
}
function TitleBarButton({ children, title, close = false, onClick }: { children: React.ReactNode; title: string; close?: boolean; onClick?: () => void }) {
  return (
    <button title={title} onClick={onClick}
      className={`h-[28px] w-[40px] flex items-center justify-center transition-all duration-100 ${close ? 'hover:bg-[#e81123]' : 'hover:bg-white/20 active:bg-white/10'}`}
      style={{ color: 'white' }}>{children}</button>
  );
}

function TopInfoBar({ stats }: { stats: { total: number; families: number; generations: number; males: number; females: number } }) {
  return (
    <div className="relative h-[62px] flex items-center px-4 shadow-md shrink-0"
      style={{ background: 'linear-gradient(to bottom, #7ab0dc 0%, #63a0cf 50%, #5090c1 100%)', borderBottom: '1px solid #3a74a4' }}>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 relative z-10">
        <StatCard value={String(stats.total)} label="عدد الأشخاص" icon={<Users size={16} strokeWidth={1.8} />} accent="blue" />
        <StatCard value={String(stats.families)} label="عدد العائلات" icon={<Home size={16} strokeWidth={1.8} />} accent="emerald" />
        <StatCard value={String(stats.generations)} label="عدد الأجيال" icon={<GitBranch size={16} strokeWidth={1.8} style={{ transform: 'scaleX(-1)' }} />} accent="amber" />
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2.5 relative z-10">
        <div className="text-left leading-tight" dir="rtl">
          <h1 className="text-[22px] font-black leading-none text-white tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.25)' }}>شجرة العائلة</h1>
          <p className="text-[9.5px] text-white/90 font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>نظام إدارة الأنساب والعائلات • تفاعلي</p>
        </div>
        <div className="w-[44px] h-[44px] rounded-xl flex items-center justify-center relative"
          style={{ background: 'linear-gradient(145deg, #ffffff 0%, #dce9f5 100%)', boxShadow: '0 3px 8px rgba(0,0,0,0.18), inset 0 1.5px 3px rgba(255,255,255,1), inset 0 -1.5px 3px rgba(59,130,246,0.15)', border: '1.5px solid rgba(255,255,255,0.8)' }}>
          <Network size={22} className="text-[#2563eb]" strokeWidth={1.8} />
          <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(to bottom, #f59e0b, #d97706)', border: '1.5px solid white', boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }}>
            <Shield size={8} className="text-white" strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, icon, accent }: { value: string; label: string; icon: React.ReactNode; accent: 'blue' | 'emerald' | 'amber'; }) {
  const accentStyles = {
    blue: { iconBg: 'linear-gradient(145deg, #3b82f6, #2563eb)', iconColor: 'white', numberColor: '#1e40af', dot: '#3b82f6' },
    emerald: { iconBg: 'linear-gradient(145deg, #10b981, #059669)', iconColor: 'white', numberColor: '#065f46', dot: '#10b981' },
    amber: { iconBg: 'linear-gradient(145deg, #f59e0b, #d97706)', iconColor: 'white', numberColor: '#92400e', dot: '#f59e0b' },
  }[accent];
  return (
    <div className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg relative cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ background: 'linear-gradient(145deg, #ffffff 0%, #f0f6fc 100%)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 2px 6px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(255,255,255,0.3)', minWidth: '120px' }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md flex-shrink-0"
        style={{ background: accentStyles.iconBg, color: accentStyles.iconColor, boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)' }}>{icon}</div>
      <div className="flex flex-col">
        <div className="text-[22px] font-black leading-none tabular-nums" style={{ color: accentStyles.numberColor, lineHeight: 1 }}>{value}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="w-1 h-1 rounded-full" style={{ background: accentStyles.dot, boxShadow: `0 0 3px ${accentStyles.dot}` }} />
          <span className="text-[10px] font-semibold text-slate-600 leading-none">{label}</span>
        </div>
      </div>
    </div>
  );
}

function MenuBar({ onExport, onImport, fileInputRef }: { onExport: () => void; onImport: (e: React.ChangeEvent<HTMLInputElement>) => void; fileInputRef: React.RefObject<HTMLInputElement | null> }) {
  const menus = [
    { label: 'ملف', action: () => (document.getElementById('file-menu-trigger') as HTMLButtonElement)?.click() },
    { label: 'تحرير', action: () => {} },
    { label: 'عرض', action: () => {} },
    { label: 'الأشخاص', action: () => {} },
    { label: 'العائلة', action: () => {} },
    { label: 'التقارير', action: () => {} },
    { label: 'الإعدادات', action: () => {} },
    { label: 'المساعدة', action: () => {} },
  ];
  return (
    <div className="h-8 bg-gradient-to-b from-slate-100 to-slate-200 border-b border-slate-300 flex items-center justify-between px-2 shrink-0 relative">
      <div className="text-[11px] text-slate-600 flex items-center gap-1.5 px-2">
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e] animate-pulse"></div>
        <span className="font-medium">متصل • التخزين المحلي نشط</span>
      </div>
      <div className="flex items-center gap-0 h-full">
        {menus.map((m, i) => (
          <button key={i} onClick={m.action} className="menu-item h-full px-3 text-[12px] font-medium text-slate-700 flex items-center">{m.label}</button>
        ))}
      </div>
      <input ref={fileInputRef as any} type="file" accept=".json,.familytree" className="hidden" onChange={onImport} />
      <div id="file-menu-dropdown" className="hidden absolute top-8 right-2 z-50 bg-white rounded-lg shadow-xl border border-slate-200 py-1 min-w-[180px]">
        <button onClick={onExport} className="w-full text-right px-3 py-1.5 text-[12px] hover:bg-blue-50 flex items-center gap-2"><Download size={12} /> تصدير JSON</button>
      </div>
    </div>
  );
}

function Toolbar({
  onNew, onOpen, onSave, onPrint, onExport, onAddPerson, onSearch, onFilterChange, activeFilter,
  onAutoLayout, onDownload
}: {
  onNew: () => void; onOpen: () => void; onSave: () => void; onPrint: () => void; onExport: () => void;
  onAddPerson: () => void; onSearch: () => void; onFilterChange: (f: string) => void; activeFilter: string;
  onAutoLayout: () => void; onDownload: () => void;
}) {
  const ip = { size: 20, strokeWidth: 1.8 } as const;
  type ToolItem = { icon: React.ReactNode; label: string; variant?: 'primary' | 'danger' | 'default'; onClick?: () => void; active?: boolean };
  const groups: { title: string; items: ToolItem[] }[] = [
    {
      title: 'ملف', items: [
        { icon: <FilePlus {...ip} />, label: 'مشروع جديد', onClick: onNew },
        { icon: <FolderOpen {...ip} />, label: 'فتح', onClick: onOpen },
        { icon: <Save {...ip} />, label: 'حفظ', onClick: onSave },
        { icon: <Printer {...ip} />, label: 'طباعة', onClick: onPrint },
      ],
    },
    {
      title: 'الأشخاص', items: [
        { icon: <UserPlus {...ip} />, label: 'إضافة شخص', variant: 'primary', onClick: onAddPerson },
        { icon: <UserPen {...ip} />, label: 'تعديل', onClick: () => onSearch() },
        { icon: <Trash2 {...ip} />, label: 'تصدير', variant: 'default', onClick: onExport },
      ],
    },
    {
      title: 'العلاقات', items: [
        { icon: <Heart {...ip} />, label: 'إضافة زوج', onClick: onAddPerson },
        { icon: <Baby {...ip} />, label: 'إضافة ابن', onClick: onAddPerson },
      ],
    },
    {
      title: 'التقارير', items: [
        { icon: <Search {...ip} />, label: 'بحث', onClick: onSearch, active: activeFilter === 'search' },
        { icon: <BarChart3 {...ip} />, label: 'فلترة: الكل', onClick: () => onFilterChange(activeFilter === 'all' ? 'male' : activeFilter === 'male' ? 'female' : 'all') },
        { icon: <FileText {...ip} />, label: 'تحميل', onClick: onDownload },
      ],
    },
    {
      title: 'النظام', items: [
        { icon: <Settings {...ip} />, label: 'ترتيب', onClick: onAutoLayout },
      ],
    },
  ];
  return (
    <div className="relative px-2 py-1 flex items-stretch gap-0 overflow-x-auto shrink-0"
      style={{ background: 'linear-gradient(to bottom, #f8fafc 0%, #eef2f7 55%, #e4ebf3 100%)', borderBottom: '1px solid #cbd5e1', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 3px rgba(0,0,0,0.04)' }}>
      {groups.map((group, gi) => (
        <div key={gi} className="flex items-stretch">
          {gi > 0 && <div className="mx-1 self-stretch flex items-center"><div className="h-[70%] w-px bg-gradient-to-b from-transparent via-slate-400/60 to-transparent"></div></div>}
          <div className="flex flex-col items-stretch">
            <div className="flex items-start gap-0.5 px-1 pt-0.5">
              {group.items.map((btn, bi) => <ToolButton key={bi} icon={btn.icon} label={btn.label} variant={btn.variant} onClick={btn.onClick} active={btn.active} />)}
            </div>
            <div className="text-center text-[9px] font-semibold text-slate-500 pb-0.5 pt-0 leading-none">{group.title}</div>
          </div>
        </div>
      ))}
      <div className="flex-1" />
      <div className="flex items-center gap-1.5 px-2">
        <span className="text-[10px] text-slate-500 font-medium">الفلتر الحالي:</span>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
          {activeFilter === 'all' ? 'الكل' : activeFilter === 'male' ? 'ذكور' : activeFilter === 'female' ? 'إناث' : activeFilter}
        </span>
      </div>
    </div>
  );
}

function ToolButton({ icon, label, variant = 'default', onClick, active }: { icon: React.ReactNode; label: string; variant?: 'primary' | 'danger' | 'default'; onClick?: () => void; active?: boolean }) {
  const iconColor = variant === 'primary' ? 'text-white' : variant === 'danger' ? 'text-white' : active ? 'text-blue-700' : 'text-slate-700';
  const iconBg = variant === 'primary' ? 'linear-gradient(145deg, #3b82f6, #2563eb)' : variant === 'danger' ? 'linear-gradient(145deg, #ef4444, #dc2626)' : active ? '#dbeafe' : 'linear-gradient(145deg, #ffffff, #e2e8f0)';
  const iconBorder = variant === 'primary' ? '1px solid #1d4ed8' : variant === 'danger' ? '1px solid #b91c1c' : active ? '1px solid #93c5fd' : '1px solid #cbd5e1';
  const iconShadow = variant === 'primary' ? '0 2px 5px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.25)' : variant === 'danger' ? '0 2px 5px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.25)' : '0 1px 2px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)';
  return (
    <button onClick={onClick}
      className={`group flex flex-col items-center justify-center gap-1 px-1.5 py-0.5 rounded-lg transition-all duration-150 cursor-pointer border hover:border-slate-300 hover:bg-white/80 hover:-translate-y-0.5 ${active ? 'bg-white border-blue-300' : 'border-transparent'}`}
      style={{ minWidth: '54px' }}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 group-hover:shadow-md ${iconColor}`}
        style={{ background: iconBg, border: iconBorder, boxShadow: iconShadow }}>{icon}</div>
      <span className="text-[9.5px] font-semibold text-slate-700 leading-none text-center whitespace-nowrap">{label}</span>
    </button>
  );
}

// ==================== PERSON NODE ====================
function PersonNode({ person, selected, onSelect, onEdit, onDelete, onAddChild, onAddSpouse }: {
  person: Person; selected?: boolean; onSelect: () => void;
  onEdit: () => void; onDelete: () => void; onAddChild: () => void; onAddSpouse: () => void;
}) {
  const isMale = person.gender === 'male';
  const accent = isMale ? { border: '#3b82f6', bgGrad: 'linear-gradient(145deg, #60a5fa, #1d4ed8)', ring: 'rgba(37,99,235,0.5)', badge: 'linear-gradient(145deg, #3b82f6, #1d4ed8)' }
    : { border: '#ec4899', bgGrad: 'linear-gradient(145deg, #f472b6, #be185d)', ring: 'rgba(219,39,119,0.5)', badge: 'linear-gradient(145deg, #ec4899, #be185d)' };

  const [showActions, setShowActions] = useState(false);

  return (
    <div className="flex flex-col items-center relative group/node" onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
      <div onClick={onSelect}
        className={`tree-node relative w-[132px] rounded-2xl px-2.5 py-2.5 flex flex-col items-center transition-all duration-200 select-none
          ${selected ? 'selected scale-[1.02]' : 'hover:scale-[1.02]'} `}
        style={{
          background: person.isDeceased ? 'linear-gradient(145deg, #f1f5f9, #e2e8f0)' : 'linear-gradient(145deg, #ffffff, #f8fafc)',
          border: selected ? `2.5px solid ${accent.border}` : `2px solid ${isMale ? '#93c5fd' : '#f9a8d4'}`,
          boxShadow: selected ? `0 0 0 3px ${accent.ring}, 0 10px 25px -5px ${accent.ring}, inset 0 1px 0 rgba(255,255,255,1)` : '0 4px 10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)',
        }}>
        <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-black"
          style={{ background: accent.badge, border: '2px solid white', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>{person.generation}</div>
        {person.isDeceased && <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-600 border-2 border-white flex items-center justify-center shadow-md"><AlertCircle size={11} strokeWidth={2} className="text-white" /></div>}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 relative overflow-hidden ${person.isDeceased ? 'grayscale opacity-70' : ''}`}
          style={{ background: accent.bgGrad, border: '3px solid white', boxShadow: `0 4px 10px ${accent.ring}, inset 0 2px 4px rgba(255,255,255,0.3)` }}>
          {person.photoUrl ? <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" /> : <User size={28} className="text-white" strokeWidth={1.8} />}
        </div>
        <div className={`text-[12px] font-extrabold text-center leading-tight line-clamp-2 ${person.isDeceased ? 'text-slate-500' : 'text-slate-800'}`} style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>{person.name}</div>
        <div className="mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"
          style={{ background: isMale ? '#dbeafe' : '#fce7f3', color: isMale ? '#1e40af' : '#9d174d' }}>
          <Calendar size={9} strokeWidth={2.2} />{person.birthYear} • {calculateAge(person.birthYear)}س
        </div>
        {person.spouseIds.length > 0 && <div className="mt-1 flex items-center gap-0.5 text-[9px] text-pink-600 font-medium"><Heart size={9} className="fill-pink-200" /> {person.spouseIds.length} أزواج</div>}
      </div>

      {/* Hover actions */}
      <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full bg-white shadow-xl border border-slate-200 transition-all duration-200 ${showActions || selected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}>
        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center" title="تعديل"><Pencil size={12} /></button>
        <button onClick={(e) => { e.stopPropagation(); onAddSpouse(); }} className="w-7 h-7 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center" title="إضافة زوج"><Heart size={12} /></button>
        <button onClick={(e) => { e.stopPropagation(); onAddChild(); }} className="w-7 h-7 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center" title="إضافة ابن"><Baby size={12} /></button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center" title="حذف"><Trash2 size={12} /></button>
      </div>
    </div>
  );
}

// ==================== TREE CANVAS ====================
function TreeCanvas({
  persons, allPersons, selectedId, onSelect, onEdit, onDelete, onAddChild, onAddSpouse,
  zoom, setZoom, viewMode, setViewMode, searchQuery, setSearchQuery,
  selectedFamily, onAddPerson, filter
}: {
  persons: Person[]; allPersons: Person[]; selectedId: string | null;
  onSelect: (id: string) => void; onEdit: (id: string) => void; onDelete: (id: string) => void;
  onAddChild: (id: string) => void; onAddSpouse: (id: string) => void;
  zoom: number; setZoom: (z: number) => void;
  viewMode: ViewMode; setViewMode: (m: ViewMode) => void;
  searchQuery: string; setSearchQuery: (s: string) => void;
  selectedFamily: Family | null; onAddPerson: () => void;
  filter: string;
}) {
  const filtered = useMemo(() => {
    let list = persons;
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      list = list.filter(p => p.name.includes(q) || p.birthYear.includes(q) || p.job.includes(q));
    }
    if (filter === 'male') list = list.filter(p => p.gender === 'male');
    if (filter === 'female') list = list.filter(p => p.gender === 'female');
    if (filter === 'deceased') list = list.filter(p => p.isDeceased);
    if (filter === 'alive') list = list.filter(p => !p.isDeceased);
    return list;
  }, [persons, searchQuery, filter]);

  const grouped = useMemo(() => {
    const groups: Record<number, Person[]> = {};
    filtered.forEach(p => {
      if (!groups[p.generation]) groups[p.generation] = [];
      groups[p.generation].push(p);
    });
    return Object.entries(groups).sort((a, b) => Number(a[0]) - Number(b[0]));
  }, [filtered]);

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== 'tree') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  const getFamilyForPerson = (p: Person) => p.fatherId || p.motherId ? allPersons.find(x => x.id === (p.fatherId || p.motherId)) : null;

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col"
      style={{ background: `radial-gradient(circle at 25% 25%, rgba(147,197,253,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236,72,153,0.08) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #eff6ff 40%, #f1f5f9 100%)` }}>
      {/* Top Toolbar */}
      <div className="sticky top-0 z-30 px-3 py-2 flex items-center justify-between backdrop-blur-md shrink-0"
        style={{ background: 'linear-gradient(to bottom, rgba(248,250,252,0.95), rgba(241,245,249,0.9))', borderBottom: '1px solid #cbd5e1', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-2">
          <button onClick={onAddPerson}
            className="action-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[11px] font-bold shadow-md hover:shadow-lg hover:-translate-y-px transition-all"
            style={{ background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8)', border: '1px solid #1e40af', boxShadow: '0 2px 6px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.25)' }}>
            <Plus size={13} strokeWidth={2.2} /> إضافة شخص
          </button>
          <div className="h-6 w-px bg-slate-300 mx-1" />
          <div className="flex items-center rounded-lg p-0.5" style={{ background: '#e2e8f0' }}>
            {(['tree', 'grid', 'list'] as ViewMode[]).map(m => (
              <button key={m} onClick={() => setViewMode(m)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-bold transition ${viewMode === m ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-white/70'}`}>
                {m === 'tree' ? <Network size={11} strokeWidth={2} /> : m === 'grid' ? <LayoutGrid size={11} strokeWidth={2} /> : <List size={11} strokeWidth={2} />}
                {m === 'tree' ? 'شجرة' : m === 'grid' ? 'شبكة' : 'قائمة'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <ToolIconBtn><ChevronUp size={13} strokeWidth={2} /></ToolIconBtn>
          <ToolIconBtn><ArrowUpDown size={13} strokeWidth={2} /></ToolIconBtn>
          <ToolIconBtn active={isDragging}><Move size={13} strokeWidth={2} /></ToolIconBtn>
          <ToolIconBtn onClick={() => { setPan({ x: 0, y: 0 }); setZoom(100); }}><RotateCcw size={13} strokeWidth={2} /></ToolIconBtn>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="بحث..."
              className="w-[160px] rounded-lg pl-3 pr-8 py-1.5 text-[11px] bg-white border border-slate-200 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-200" />
            <Search size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="flex items-center rounded-lg overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)', border: '1px solid #cbd5e1', boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)' }}>
            <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="w-8 h-8 flex items-center justify-center hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition"><ZoomIn size={14} strokeWidth={2} /></button>
            <div className="px-2 text-[11px] font-bold text-slate-700 border-x border-slate-200 min-w-[48px] text-center tabular-nums">{zoom}%</div>
            <button onClick={() => setZoom(Math.max(30, zoom - 10))} className="w-8 h-8 flex items-center justify-center hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition"><ZoomOut size={14} strokeWidth={2} /></button>
          </div>
          <button onClick={() => { setPan({ x: 0, y: 0 }); setZoom(100); }} className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm" title="ملاءمة للشاشة"><Maximize2 size={13} strokeWidth={2} /></button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="px-4 py-1.5 flex items-center justify-between shrink-0" style={{ background: 'rgba(255,255,255,0.75)', borderBottom: '1px solid #e2e8f0' }}>
        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          <span className="flex items-center gap-1 font-semibold"><Users size={12} strokeWidth={2} className="text-blue-600" /> {filtered.length} أشخاص</span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 font-semibold"><Home size={12} strokeWidth={2} className="text-emerald-600" /> {selectedFamily ? selectedFamily.name : 'كل العائلات'}</span>
          {filter !== 'all' && <>
            <span className="text-slate-300">|</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
              فلتر: {filter === 'male' ? 'ذكور' : filter === 'female' ? 'إناث' : filter === 'deceased' ? 'متوفون' : filter === 'alive' ? 'أحياء' : filter}
            </span>
          </>}
        </div>
        <div className="flex items-center gap-1 text-[11.5px]" dir="rtl">
          {selectedId && allPersons.find(p => p.id === selectedId) && <>
            <span className="font-bold text-blue-700">{allPersons.find(p => p.id === selectedId)?.name}</span>
            <ChevronLeft size={11} strokeWidth={2} className="text-slate-400" />
          </>}
          <span className="font-medium">{selectedFamily?.name || 'العائلات'}</span>
          <ChevronLeft size={11} strokeWidth={2} className="text-slate-400" />
          <span className="text-slate-500">الرئيسية</span>
        </div>
      </div>

      {/* Content */}
      <div ref={canvasRef} className="flex-1 overflow-auto relative"
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : viewMode === 'tree' ? 'grab' : 'default' }}>

        {/* Mini Map (tree only) */}
        {viewMode === 'tree' && (
          <div className="absolute top-4 left-4 z-20 w-[132px] rounded-xl overflow-hidden hidden lg:block"
            style={{ background: 'linear-gradient(145deg, #ffffff, #f1f5f9)', border: '1px solid #cbd5e1', boxShadow: '0 6px 18px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)' }}>
            <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
              <List size={10} strokeWidth={2.2} className="text-slate-600" /><span className="text-[10px] font-bold text-slate-700">الخريطة المصغرة</span>
            </div>
            <div className="relative h-[100px] m-2 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
              {grouped.map(([gen, per], i) => (
                <div key={gen} className="absolute h-1 rounded opacity-60"
                  style={{ top: `${8 + i * 26}px`, right: '8px', left: '8px', background: `linear-gradient(to right, ${i % 2 === 0 ? '#60a5fa, #f472b6' : '#f472b6, #60a5fa'})` }}></div>
              ))}
              <div className="absolute border-2 border-blue-500 bg-blue-400/20 top-2 right-2 w-[60%] h-[40%] rounded-sm"></div>
            </div>
          </div>
        )}

        {/* Generation Badges (tree only) */}
        {viewMode === 'tree' && grouped.length > 1 && (
          <div className="absolute top-5 right-4 z-20 flex flex-col gap-5 hidden lg:flex pointer-events-none">
            {grouped.map(([gen]) => (
              <div key={gen} className="flex flex-col items-end">
                <div className="px-2.5 py-1 rounded-lg text-white text-[10px] font-black shadow-md"
                  style={{ background: 'linear-gradient(to bottom, #3b82f6, #2563eb)', border: '1px solid #1d4ed8', boxShadow: '0 2px 6px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.25)' }}>
                  الجيل {gen}
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5 font-semibold">{Number(gen) === 1 ? 'المؤسسون' : Number(gen) === 2 ? 'الأبناء' : 'الأحفاد'}</div>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-16 left-4 z-20 rounded-xl p-2.5 hidden lg:block"
          style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', backdropFilter: 'blur(8px)' }}>
          <div className="text-[10px] font-bold text-slate-700 mb-1.5">دليل الألوان</div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(145deg, #60a5fa, #1d4ed8)' }}></div><span className="text-[9.5px] text-slate-600 font-medium">ذكر</span></div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(145deg, #f472b6, #be185d)' }}></div><span className="text-[9.5px] text-slate-600 font-medium">أنثى</span></div>
            <div className="flex items-center gap-1.5"><div className="w-5 h-0 border-t-2 border-dashed border-pink-400"></div><span className="text-[9.5px] text-slate-600 font-medium">زواج</span></div>
            <div className="flex items-center gap-1.5"><div className="w-5 h-0 border-t-2 border-blue-500"></div><span className="text-[9.5px] text-slate-600 font-medium">نسب</span></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="min-h-full w-full" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`, transformOrigin: 'top center', transition: isDragging ? 'none' : 'transform 0.2s ease' }}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4"><Search size={28} className="text-slate-400" /></div>
              <h3 className="text-[16px] font-bold text-slate-700">لا يوجد نتائج</h3>
              <p className="text-[12px] text-slate-500 mt-1 max-w-[320px]">لم يتم العثور على أشخاص يطابقون البحث أو الفلتر. جرب تغيير كلمات البحث أو الفلاتر.</p>
              <button onClick={() => { setSearchQuery(''); }} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-bold">مسح البحث</button>
            </div>
          ) : viewMode === 'tree' ? (
            <div className="min-w-[1100px] px-16 py-14 flex flex-col items-center gap-0">
              {grouped.map(([genStr, personsInGen], genIdx) => {
                const gen = Number(genStr);
                // pair spouses
                const processed = new Set<string>();
                const couples: Array<{ a: Person; b?: Person }> = [];
                const singles: Person[] = [];

                personsInGen.forEach(p => {
                  if (processed.has(p.id)) return;
                  const spouseInSameGen = p.spouseIds.map(id => personsInGen.find(x => x.id === id)).find(Boolean) as Person | undefined;
                  if (spouseInSameGen && !processed.has(spouseInSameGen.id)) {
                    couples.push({ a: p, b: spouseInSameGen });
                    processed.add(p.id); processed.add(spouseInSameGen.id);
                  } else if (p.spouseIds.length === 0 || !personsInGen.some(x => p.spouseIds.includes(x.id))) {
                    singles.push(p);
                    processed.add(p.id);
                  } else {
                    // spouse not in this gen list (maybe filtered) -> single display
                    singles.push(p);
                    processed.add(p.id);
                  }
                });

                // Combine for display: couples + singles
                const allNodes = [...couples, ...singles.map(s => ({ a: s }))];

                return (
                  <React.Fragment key={gen}>
                    {/* Connector from previous */}
                    {genIdx > 0 && (
                      <>
                        <div className="w-0.5 h-8 bg-blue-400"></div>
                        <div className="relative w-full max-w-4xl">
                          <div className="absolute top-0 right-[10%] left-[10%] h-0.5 bg-blue-500/70"></div>
                        </div>
                        <div className="relative w-full max-w-4xl h-6">
                          {allNodes.map((_, i) => (
                            <div key={i} className="absolute top-0 w-0.5 h-full bg-blue-400" style={{ right: `${10 + (i * 80 / Math.max(1, allNodes.length - 1))}%` }}></div>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Generation Row */}
                    <div className={`flex items-start justify-center gap-8 flex-wrap max-w-6xl ${genIdx === 0 ? 'mt-2' : ''}`}>
                      {allNodes.map((node, idx) => {
                        if ('b' in node && node.b) {
                          // couple
                          return (
                            <div key={idx} className="flex items-start gap-0">
                              <PersonNode person={node.a} selected={selectedId === node.a.id} onSelect={() => onSelect(node.a.id)} onEdit={() => onEdit(node.a.id)} onDelete={() => onDelete(node.a.id)} onAddChild={() => onAddChild(node.a.id)} onAddSpouse={() => onAddSpouse(node.a.id)} />
                              <div className="flex items-center" style={{ marginTop: '62px' }}>
                                <div className="w-5 h-0 border-t-2 border-dashed border-pink-400"></div>
                                <Heart size={12} strokeWidth={1.8} className="text-pink-500 fill-pink-100 mx-0.5" />
                                <div className="w-5 h-0 border-t-2 border-dashed border-pink-400"></div>
                              </div>
                              <PersonNode person={node.b} selected={selectedId === node.b.id} onSelect={() => onSelect(node.b.id)} onEdit={() => onEdit(node.b.id)} onDelete={() => onDelete(node.b.id)} onAddChild={() => onAddChild(node.b.id)} onAddSpouse={() => onAddSpouse(node.b.id)} />
                            </div>
                          );
                        } else {
                          return (
                            <PersonNode key={idx} person={node.a} selected={selectedId === node.a.id} onSelect={() => onSelect(node.a.id)} onEdit={() => onEdit(node.a.id)} onDelete={() => onDelete(node.a.id)} onAddChild={() => onAddChild(node.a.id)} onAddSpouse={() => onAddSpouse(node.a.id)} />
                          );
                        }
                      })}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 max-w-[1400px] mx-auto">
              {filtered.map(p => (
                <PersonNode key={p.id} person={p} selected={selectedId === p.id} onSelect={() => onSelect(p.id)} onEdit={() => onEdit(p.id)} onDelete={() => onDelete(p.id)} onAddChild={() => onAddChild(p.id)} onAddSpouse={() => onAddSpouse(p.id)} />
              ))}
            </div>
          ) : (
            <div className="p-4 max-w-[1000px] mx-auto">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600">
                  <div className="col-span-4">الاسم</div>
                  <div className="col-span-1">الجنس</div>
                  <div className="col-span-1">الجيل</div>
                  <div className="col-span-2">الميلاد</div>
                  <div className="col-span-2">المهنة</div>
                  <div className="col-span-2">إجراءات</div>
                </div>
                {filtered.map(p => (
                  <div key={p.id} className={`grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-slate-100 items-center hover:bg-blue-50/50 cursor-pointer ${selectedId === p.id ? 'bg-blue-50' : ''}`} onClick={() => onSelect(p.id)}>
                    <div className="col-span-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                        style={{ background: p.gender === 'male' ? 'linear-gradient(145deg, #60a5fa, #2563eb)' : 'linear-gradient(145deg, #f472b6, #be185d)' }}>
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-slate-800">{p.name}</div>
                        <div className="text-[10px] text-slate-500">{p.city}</div>
                      </div>
                    </div>
                    <div className="col-span-1"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>{p.gender === 'male' ? 'ذكر' : 'أنثى'}</span></div>
                    <div className="col-span-1 text-[11px] font-bold text-amber-700">{p.generation}</div>
                    <div className="col-span-2 text-[11px] text-slate-600">{p.birthYear} • {calculateAge(p.birthYear)}س</div>
                    <div className="col-span-2 text-[11px] text-slate-700">{p.job}</div>
                    <div className="col-span-2 flex items-center gap-1">
                      <button onClick={(e) => { e.stopPropagation(); onEdit(p.id); }} className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"><Pencil size={12} /></button>
                      <button onClick={(e) => { e.stopPropagation(); onAddChild(p.id); }} className="w-6 h-6 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100"><Baby size={12} /></button>
                      <button onClick={(e) => { e.stopPropagation(); onDelete(p.id); }} className="w-6 h-6 rounded bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {viewMode === 'tree' && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-md z-20"
            style={{ background: 'rgba(255,255,255,0.95)', color: '#475569', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <MousePointer size={12} strokeWidth={2} className="text-blue-600" />
            اسحب للتنقل • عجلة الفأرة للتكبير • انقر لاختيار شخص
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 px-4 flex items-center justify-between z-30 shrink-0"
        style={{ background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)', borderTop: '1px solid #cbd5e1', boxShadow: '0 -2px 8px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-1.5">
          <button onClick={onAddPerson}
            className="action-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[11px] font-bold shadow-sm hover:shadow-md transition-all"
            style={{ background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8)', border: '1px solid #1e40af', boxShadow: '0 2px 5px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
            <Plus size={13} strokeWidth={2.2} /> إضافة شخص
          </button>
          <button onClick={() => setPan({ x: 0, y: 0 })} className="action-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-[11px] font-medium hover:bg-slate-50 shadow-sm"><Share2 size={12} strokeWidth={2} /> ترتيب تلقائي</button>
          <button onClick={() => { /* export */ }} className="action-btn hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-[11px] font-medium hover:bg-slate-50 shadow-sm"><Download size={12} strokeWidth={2} /> تصدير</button>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-500 font-medium hidden md:inline">عدد العرض: {filtered.length}</span>
          <button onClick={() => navigator.clipboard.writeText(JSON.stringify(filtered.map(p => p.name)).slice(0, 200))} className="action-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-700 shadow-sm" style={{ background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)', border: '1px solid #cbd5e1' }}><Copy size={12} strokeWidth={2} /> نسخ</button>
          <button onClick={() => selectedId && onDelete(selectedId)} disabled={!selectedId} className="action-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium shadow-sm disabled:opacity-50" style={{ background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)', border: '1px solid #cbd5e1', color: '#dc2626' }}><Trash2 size={12} strokeWidth={2} /> حذف المحدد</button>
        </div>
      </div>
    </div>
  );
}

function ToolIconBtn({ children, active = false, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${active ? 'bg-white text-blue-600 shadow-sm border border-blue-200' : 'text-slate-500 hover:bg-white/70 hover:text-slate-700 border border-transparent'}`}>
      {children}
    </button>
  );
}

// ==================== PROFILE HEADER ====================
function ProfileHeader({ person, onEditPhoto }: { person: Person; onEditPhoto?: () => void }) {
  const isMale = person.gender === 'male';
  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #ffffff 0%, #f0f6fd 100%)', border: '1px solid rgba(59,130,246,0.25)', boxShadow: '0 4px 14px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)' }}>
      <div className="relative h-[64px]"
        style={{ background: isMale ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)' : 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #fbcfe8 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
      </div>
      <div className="px-4 pb-4">
        <div className="relative -mt-[44px] flex items-end justify-between">
          <div className="relative">
            <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center relative overflow-hidden"
              style={{ border: '3.5px solid #ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(59,130,246,0.15)', background: person.photoUrl ? '#f1f5f9' : (isMale ? 'linear-gradient(145deg, #60a5fa, #1d4ed8)' : 'linear-gradient(145deg, #f472b6, #be185d)') }}>
              {person.photoUrl ? <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" /> : <User size={42} className="text-white" strokeWidth={1.6} />}
            </div>
            <div className="absolute -top-0.5 -left-0.5 w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-black"
              style={{ background: 'linear-gradient(145deg, #f59e0b, #d97706)', border: '2.5px solid #ffffff', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>{person.generation}</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: person.isDeceased ? 'linear-gradient(145deg, #64748b, #334155)' : 'linear-gradient(145deg, #22c55e, #16a34a)', border: '2.5px solid #ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
              {person.isDeceased ? <AlertCircle size={13} className="text-white" strokeWidth={2} /> : <Check size={13} className="text-white" strokeWidth={3} />}
            </div>
          </div>
          <button onClick={onEditPhoto}
            className="w-7 h-7 rounded-full flex items-center justify-center mt-1 hover:bg-slate-100 transition"
            style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid #e2e8f0', color: '#64748b', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }} title="تغيير الصورة"><Pencil size={12} strokeWidth={2} /></button>
        </div>
        <div className="mt-2.5">
          <h3 className="text-[15px] font-extrabold text-slate-800 leading-tight text-center">{person.name}</h3>
          <div className="flex items-center justify-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: isMale ? 'linear-gradient(to bottom, #dbeafe, #bfdbfe)' : 'linear-gradient(to bottom, #fce7f3, #fbcfe8)', color: isMale ? '#1e40af' : '#9d174d', border: `1px solid ${isMale ? '#93c5fd' : '#f9a8d4'}` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: isMale ? '#3b82f6' : '#ec4899' }} />
              {person.gender === 'male' ? 'ذكر' : 'أنثى'} • #{person.id.slice(-3)}
            </span>
            <span className="text-[10px] text-slate-500 font-medium truncate">{person.job}</span>
          </div>
        </div>
        <div className="my-3 h-px" style={{ background: 'linear-gradient(to left, transparent, #cbd5e1, transparent)' }} />
        <div className="grid grid-cols-3 gap-2">
          <PersonStat icon={<Heart size={14} strokeWidth={2} />} value={String(person.spouseIds.length)} label="الزوجات" color={isMale ? 'pink' : 'blue'} />
          <PersonStat icon={<Users size={14} strokeWidth={2} />} value={String(person.childrenIds.length)} label="الأبناء" color="blue" />
          <PersonStat icon={<Calendar size={14} strokeWidth={2} />} value={String(calculateAge(person.birthYear))} label="العمر" color="amber" />
        </div>
      </div>
    </div>
  );
}

// ==================== LEFT SIDEBAR ====================
function LeftSidebar({ person, allPersons, onEdit, onDelete, onSelect, onAddChild, onAddSpouse, onEditPhoto }: {
  person: Person | null; allPersons: Person[];
  onEdit: () => void; onDelete: () => void; onSelect: (id: string) => void;
  onAddChild: () => void; onAddSpouse: () => void; onEditPhoto: () => void;
}) {
  if (!person) {
    return (
      <div className="w-[272px] flex flex-col overflow-hidden shrink-0"
        style={{ background: 'linear-gradient(to bottom, #f5f8fc 0%, #eef2f7 100%)', borderRight: '1px solid #cbd5e1', boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.8)' }}>
        <div className="px-3 py-2.5 flex items-center justify-between shadow-md relative z-10"
          style={{ background: 'linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%)', borderBottom: '1px solid #1d4ed8' }}>
          <div className="w-7 h-7" />
          <div className="flex items-center gap-1.5">
            <h2 className="text-white font-bold text-[13px]">بطاقة الشخص</h2>
            <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center"><User size={13} strokeWidth={2} className="text-white" /></div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm"><User size={32} className="text-slate-300" /></div>
          <h3 className="text-[14px] font-bold text-slate-700">لم يتم اختيار شخص</h3>
          <p className="text-[11px] text-slate-500 mt-1">اختر شخصًا من الشجرة لعرض تفاصيله هنا</p>
          <div className="mt-6 p-3 rounded-xl bg-blue-50 border border-blue-100 text-[11px] text-blue-800 text-right leading-relaxed">
            <div className="font-bold flex items-center gap-1 mb-1"><Sparkles size={12} /> نصائح سريعة:</div>
            • انقر على أي شخص في الشجرة<br />
            • استخدم البحث للوصول السريع<br />
            • الأزرار التي تظهر عند المرور تتيح التعديل والربط
          </div>
        </div>
      </div>
    );
  }

  const father = person.fatherId ? allPersons.find(p => p.id === person.fatherId) : null;
  const mother = person.motherId ? allPersons.find(p => p.id === person.motherId) : null;
  const spouses = person.spouseIds.map(id => allPersons.find(p => p.id === id)).filter(Boolean) as Person[];
  const children = person.childrenIds.map(id => allPersons.find(p => p.id === id)).filter(Boolean) as Person[];

  return (
    <div className="w-[272px] flex flex-col overflow-hidden shrink-0"
      style={{ background: 'linear-gradient(to bottom, #f5f8fc 0%, #eef2f7 100%)', borderRight: '1px solid #cbd5e1', boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.8)' }}>
      <div className="px-3 py-2.5 flex items-center justify-between shadow-md relative z-10 shrink-0"
        style={{ background: 'linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%)', borderBottom: '1px solid #1d4ed8' }}>
        <button className="w-7 h-7 rounded-md flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition"><ChevronLeft size={15} strokeWidth={1.8} /></button>
        <div className="flex items-center gap-1.5">
          <h2 className="text-white font-bold text-[13px]">بطاقة الشخص</h2>
          <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center"><User size={13} strokeWidth={2} className="text-white" /></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <ProfileHeader person={person} onEditPhoto={onEditPhoto} />

        <InfoCard title="البيانات الأساسية" icon={<User size={13} strokeWidth={2} />} iconColor="#2563eb">
          <InfoRow icon={<Calendar size={14} strokeWidth={1.8} className="text-blue-500" />} label="تاريخ الميلاد" value={`${person.birthDate} (${calculateAge(person.birthYear)} سنة)`} />
          <InfoRow icon={<Home size={14} strokeWidth={1.8} className="text-emerald-600" />} label="مكان الميلاد" value={person.birthPlace} />
          <InfoRow icon={<Briefcase size={14} strokeWidth={1.8} className="text-amber-600" />} label="المهنة" value={person.job} />
          <InfoRow icon={<Flag size={14} strokeWidth={1.8} className="text-red-500" />} label="الجنسية" value={person.nationality} />
          {person.isDeceased && <InfoRow icon={<AlertCircle size={14} strokeWidth={1.8} className="text-slate-600" />} label="الحالة" value="متوفى - رحمه الله" />}
        </InfoCard>

        <InfoCard title="بيانات الاتصال" icon={<Phone size={13} strokeWidth={2} />} iconColor="#2563eb">
          <InfoRow icon={<Phone size={14} strokeWidth={1.8} className="text-blue-500" />} label="الهاتف" value={person.phone} />
          <InfoRow icon={<Mail size={14} strokeWidth={1.8} className="text-red-500" />} label="البريد" value={person.email} />
        </InfoCard>

        <InfoCard title="العنوان" icon={<MapPin size={13} strokeWidth={2} />} iconColor="#2563eb">
          <InfoRow icon={<MapPin size={14} strokeWidth={1.8} className="text-purple-500" />} label="المدينة" value={person.city} />
          <InfoRow icon={<Home size={14} strokeWidth={1.8} className="text-emerald-600" />} label="الحي" value={person.neighborhood} />
          <InfoRow icon={<FileText size={14} strokeWidth={1.8} className="text-slate-600" />} label="الرمز البريدي" value={person.postalCode} />
        </InfoCard>

        <InfoCard title="الروابط العائلية" icon={<HeartHandshake size={13} strokeWidth={2} />} iconColor="#ec4899">
          {father && <RelationRow label="الأب" name={father.name} gender={father.gender} onClick={() => onSelect(father.id)} />}
          {mother && <RelationRow label="الأم" name={mother.name} gender={mother.gender} onClick={() => onSelect(mother.id)} />}
          {spouses.map(s => <RelationRow key={s.id} label={s.gender === 'female' ? 'الزوجة' : 'الزوج'} name={s.name} gender={s.gender} onClick={() => onSelect(s.id)} />)}
          {father === null && mother === null && spouses.length === 0 && (
            <div className="text-[11px] text-slate-500 text-center py-2">لا توجد روابط آباء • يمكن إضافة أب وأم من خلال التعديل</div>
          )}
          {(children.length > 0 || true) && (
            <>
              <div className="h-px my-1" style={{ background: 'linear-gradient(to left, transparent, #e2e8f0, transparent)' }} />
              <div className="text-[10px] font-bold text-slate-600 mb-1">الأبناء ({children.length})</div>
              {children.length > 0 ? children.map(c => <RelationRow key={c.id} label={c.gender === 'male' ? 'ابن' : 'ابنة'} name={c.name} gender={c.gender} onClick={() => onSelect(c.id)} />)
                : <div className="text-[10px] text-slate-400 text-center py-1.5 bg-slate-50 rounded-lg border border-dashed border-slate-200">لا يوجد أبناء بعد</div>}
            </>
          )}
        </InfoCard>

        {person.notes && (
          <InfoCard title="ملاحظات" icon={<FileText size={13} strokeWidth={2} />} iconColor="#64748b">
            <div className="text-[11px] text-slate-700 leading-relaxed p-2 bg-amber-50 rounded-lg border border-amber-100">{person.notes}</div>
          </InfoCard>
        )}

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button onClick={onEdit}
            className="action-btn flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-[12px] font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(to bottom, #3b82f6 0%, #1d4ed8 100%)', border: '1px solid #1e40af', boxShadow: '0 3px 8px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.25)' }}>
            <Pencil size={14} strokeWidth={2} />تعديل البيانات
          </button>
          <button onClick={onDelete}
            className="action-btn flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-red-700 text-[12px] font-bold hover:shadow-md transition-all"
            style={{ background: 'linear-gradient(to bottom, #fef2f2, #fee2e2)', border: '1px solid #fca5a5', boxShadow: '0 2px 4px rgba(239,68,68,0.12), inset 0 1px 0 rgba(255,255,255,1)' }}>
            <Trash2 size={14} strokeWidth={2} />حذف
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={onAddSpouse}
            className="action-btn flex items-center justify-center gap-1.5 py-2 rounded-xl text-pink-700 text-[11px] font-bold hover:shadow-sm transition-all"
            style={{ background: 'linear-gradient(to bottom, #fdf2f8, #fce7f3)', border: '1px solid #f9a8d4' }}>
            <Heart size={12} />إضافة زوج/زوجة
          </button>
          <button onClick={onAddChild}
            className="action-btn flex items-center justify-center gap-1.5 py-2 rounded-xl text-emerald-700 text-[11px] font-bold hover:shadow-sm transition-all"
            style={{ background: 'linear-gradient(to bottom, #ecfdf5, #d1fae5)', border: '1px solid #6ee7b7' }}>
            <Baby size={12} />إضافة ابن
          </button>
        </div>
        <button
          className="action-btn w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-slate-700 text-[12px] font-bold"
          style={{ background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)' }}>
          <Eye size={14} strokeWidth={2} className="text-blue-600" />عرض التفاصيل الكاملة
        </button>
      </div>
    </div>
  );
}

function PersonStat({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: 'blue' | 'pink' | 'amber'; }) {
  const colors = {
    blue: { bg: 'linear-gradient(145deg, #dbeafe, #bfdbfe)', text: '#1e40af', icon: 'text-blue-600', dot: '#3b82f6' },
    pink: { bg: 'linear-gradient(145deg, #fce7f3, #fbcfe8)', text: '#9d174d', icon: 'text-pink-600', dot: '#ec4899' },
    amber: { bg: 'linear-gradient(145deg, #fef3c7, #fde68a)', text: '#92400e', icon: 'text-amber-600', dot: '#f59e0b' },
  }[color];
  return (
    <div className="flex flex-col items-center gap-0.5 py-2 rounded-lg"
      style={{ background: colors.bg, border: '1px solid rgba(255,255,255,0.7)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.04)' }}>
      <div className={`${colors.icon}`}>{icon}</div>
      <div className="text-[17px] font-black leading-none" style={{ color: colors.text }}>{value}</div>
      <div className="text-[9.5px] font-semibold text-slate-600 flex items-center gap-0.5"><span className="w-1 h-1 rounded-full" style={{ background: colors.dot }}></span>{label}</div>
    </div>
  );
}

function InfoCard({ title, icon, iconColor, children }: { title: string; icon: React.ReactNode; iconColor: string; children: React.ReactNode; }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(145deg, #ffffff, #f8fafc)', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)' }}>
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)', borderColor: '#e2e8f0' }}>
        <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${iconColor}15`, color: iconColor, border: `1px solid ${iconColor}30` }}>{icon}</div>
        <h3 className="text-[12px] font-bold text-slate-700">{title}</h3>
      </div>
      <div className="p-2.5 space-y-1.5">{children}</div>
    </div>
  );
}
function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors hover:bg-blue-50/50"
      style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
      <div className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[9.5px] text-slate-500 leading-tight font-medium">{label}</div>
        <div className="text-[11.5px] text-slate-800 font-bold leading-tight truncate">{value}</div>
      </div>
    </div>
  );
}
function RelationRow({ label, name, gender, onClick }: { label: string; name: string; gender: 'male' | 'female'; onClick?: () => void }) {
  const isMale = gender === 'male';
  return (
    <div onClick={onClick}
      className="flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-all hover:bg-blue-50/70 hover:border-blue-200"
      style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-sm"
        style={{ background: isMale ? 'linear-gradient(145deg, #60a5fa, #2563eb)' : 'linear-gradient(145deg, #f472b6, #db2777)', border: '2px solid white' }}>
        <User size={13} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0"><div className="text-[11.5px] font-bold text-slate-800 truncate leading-tight">{name}</div></div>
      <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: isMale ? '#dbeafe' : '#fce7f3', color: isMale ? '#1e40af' : '#9d174d' }}>{label}</span>
    </div>
  );
}

// ==================== RIGHT SIDEBAR ====================
const colorMap: Record<string, { bg: string; border: string; avatarBg: string; avatarShadow: string; text: string; countBg: string; countText: string }> = {
  blue: { bg: 'linear-gradient(145deg, #dbeafe, #bfdbfe)', border: '#93c5fd', avatarBg: 'linear-gradient(145deg, #3b82f6, #1d4ed8)', avatarShadow: '0 2px 5px rgba(37,99,235,0.35)', text: '#1e3a8a', countBg: '#ffffff', countText: '#1e40af' },
  emerald: { bg: 'linear-gradient(145deg, #d1fae5, #a7f3d0)', border: '#6ee7b7', avatarBg: 'linear-gradient(145deg, #10b981, #047857)', avatarShadow: '0 2px 5px rgba(5,150,105,0.35)', text: '#064e3b', countBg: '#ffffff', countText: '#065f46' },
  amber: { bg: 'linear-gradient(145deg, #fef3c7, #fde68a)', border: '#fcd34d', avatarBg: 'linear-gradient(145deg, #f59e0b, #b45309)', avatarShadow: '0 2px 5px rgba(180,83,9,0.35)', text: '#78350f', countBg: '#ffffff', countText: '#92400e' },
  purple: { bg: 'linear-gradient(145deg, #e9d5ff, #d8b4fe)', border: '#c4b5fd', avatarBg: 'linear-gradient(145deg, #a855f7, #6d28d9)', avatarShadow: '0 2px 5px rgba(109,40,217,0.35)', text: '#4c1d95', countBg: '#ffffff', countText: '#6d28d9' },
  rose: { bg: 'linear-gradient(145deg, #ffe4e6, #fecdd3)', border: '#fda4af', avatarBg: 'linear-gradient(145deg, #f43f5e, #9f1239)', avatarShadow: '0 2px 5px rgba(159,18,57,0.35)', text: '#881337', countBg: '#ffffff', countText: '#9f1239' },
  cyan: { bg: 'linear-gradient(145deg, #cffafe, #a5f3fc)', border: '#67e8f9', avatarBg: 'linear-gradient(145deg, #06b6d4, #0e7490)', avatarShadow: '0 2px 5px rgba(14,116,144,0.35)', text: '#083344', countBg: '#ffffff', countText: '#0e7490' },
  indigo: { bg: 'linear-gradient(145deg, #e0e7ff, #c7d2fe)', border: '#a5b4fc', avatarBg: 'linear-gradient(145deg, #6366f1, #3730a3)', avatarShadow: '0 2px 5px rgba(55,48,163,0.35)', text: '#312e81', countBg: '#ffffff', countText: '#3730a3' },
  teal: { bg: 'linear-gradient(145deg, #ccfbf1, #99f6e4)', border: '#5eead4', avatarBg: 'linear-gradient(145deg, #14b8a6, #0f766e)', avatarShadow: '0 2px 5px rgba(15,118,110,0.35)', text: '#042f2e', countBg: '#ffffff', countText: '#0f766e' },
  orange: { bg: 'linear-gradient(145deg, #ffedd5, #fed7aa)', border: '#fdba74', avatarBg: 'linear-gradient(145deg, #f97316, #9a3412)', avatarShadow: '0 2px 5px rgba(154,52,18,0.35)', text: '#7c2d12', countBg: '#ffffff', countText: '#9a3412' },
  fuchsia: { bg: 'linear-gradient(145deg, #fae8ff, #f5d0fe)', border: '#f0abfc', avatarBg: 'linear-gradient(145deg, #d946ef, #86198f)', avatarShadow: '0 2px 5px rgba(134,25,143,0.35)', text: '#701a75', countBg: '#ffffff', countText: '#86198f' },
  lime: { bg: 'linear-gradient(145deg, #ecfccb, #d9f99d)', border: '#bef264', avatarBg: 'linear-gradient(145deg, #84cc16, #3f6212)', avatarShadow: '0 2px 5px rgba(63,98,18,0.35)', text: '#365314', countBg: '#ffffff', countText: '#3f6212' },
  sky: { bg: 'linear-gradient(145deg, #e0f2fe, #bae6fd)', border: '#7dd3fc', avatarBg: 'linear-gradient(145deg, #0ea5e9, #075985)', avatarShadow: '0 2px 5px rgba(7,89,133,0.35)', text: '#082f49', countBg: '#ffffff', countText: '#075985' },
};

function RightSidebar({ families, persons, selectedFamilyId, onSelectFamily, onSelectPerson, onAddFamily, search, setSearch, onAddPerson, selectedTab, setSelectedTab }: {
  families: Family[]; persons: Person[]; selectedFamilyId: string | null;
  onSelectFamily: (id: string | null) => void; onSelectPerson: (id: string) => void; onAddFamily: () => void;
  search: string; setSearch: (s: string) => void; onAddPerson: () => void;
  selectedTab: 'families' | 'persons'; setSelectedTab: (t: 'families' | 'persons') => void;
}) {
  const filteredFamilies = families.filter(f => f.name.includes(search));
  const filteredPersons = persons.filter(p => p.name.includes(search));

  const total = persons.length;

  return (
    <div className="w-[280px] flex flex-col overflow-hidden shrink-0"
      style={{ background: 'linear-gradient(to bottom, #f5f8fc 0%, #eef2f7 100%)', borderLeft: '1px solid #cbd5e1', boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.8)' }}>
      <div className="px-3 py-2.5 flex items-center justify-between shadow-md relative z-10 shrink-0"
        style={{ background: 'linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%)', borderBottom: '1px solid #1d4ed8' }}>
        <button className="w-7 h-7 rounded-md flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition"><ChevronRight size={15} strokeWidth={1.8} /></button>
        <div className="flex items-center gap-1.5">
          <h2 className="text-white font-bold text-[13px]">العائلات والأشخاص</h2>
          <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center"><Users size={13} strokeWidth={2} className="text-white" /></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="rounded-xl p-2.5 flex items-center justify-between"
          style={{ background: 'linear-gradient(145deg, #dbeafe, #bfdbfe)', border: '1px solid #93c5fd', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-sm"><Network size={15} strokeWidth={1.8} /></div>
            <div>
              <div className="text-[10px] text-blue-800 font-semibold">إجمالي العائلات</div>
              <div className="text-[16px] font-black text-blue-900 leading-none mt-0.5">{families.length} <span className="text-[10px] font-bold text-blue-700">عائلة</span></div>
            </div>
          </div>
          <div className="text-left">
            <div className="text-[10px] text-blue-800 font-semibold">الأفراد</div>
            <div className="text-[16px] font-black text-blue-900 leading-none mt-0.5">{total}</div>
          </div>
        </div>

        <div className="flex items-center p-1 rounded-xl" style={{ background: '#e2e8f0', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)' }}>
          <button onClick={() => setSelectedTab('families')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition ${selectedTab === 'families' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
            style={selectedTab === 'families' ? { boxShadow: '0 1px 3px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)' } : {}}>
            <Home size={12} strokeWidth={2} /> العائلات
          </button>
          <button onClick={() => setSelectedTab('persons')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${selectedTab === 'persons' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
            style={selectedTab === 'persons' ? { boxShadow: '0 1px 3px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)' } : {}}>
            <User size={12} strokeWidth={2} /> الأشخاص
          </button>
        </div>

        <div className="relative">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={selectedTab === 'families' ? 'ابحث عن اسم العائلة...' : 'ابحث عن شخص...'}
            className="w-full rounded-xl py-2.5 pr-9 pl-3 text-[11.5px] text-slate-700 placeholder:text-slate-400 focus:outline-none transition-all"
            style={{ background: 'linear-gradient(145deg, #ffffff, #f8fafc)', border: '1px solid #cbd5e1', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)' }} />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center"><Search size={12} strokeWidth={2.2} className="text-blue-600" /></div>
          {search && <button onClick={() => setSearch('')} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"><X size={10} /></button>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1 pt-1">
            <span className="text-[10.5px] font-bold text-slate-500 uppercase">{selectedTab === 'families' ? 'قائمة العائلات' : 'قائمة الأشخاص'}</span>
            <span className="text-[9.5px] text-slate-400 font-medium">{selectedTab === 'families' ? `${filteredFamilies.length} عائلة` : `${filteredPersons.length} شخص`}</span>
          </div>

          {selectedTab === 'families' ? (
            <>
              <button onClick={() => onSelectFamily(null)}
                className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-right transition-all duration-150 group hover:-translate-y-0.5 ${!selectedFamilyId ? 'ring-2 ring-blue-300' : ''}`}
                style={{ background: !selectedFamilyId ? 'linear-gradient(145deg, #eff6ff, #dbeafe)' : 'linear-gradient(145deg, #ffffff, #f8fafc)', border: !selectedFamilyId ? '1.5px solid #93c5fd' : '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(145deg, #475569, #1e293b)', border: '1.5px solid rgba(255,255,255,0.8)', boxShadow: '0 2px 4px rgba(0,0,0,0.12)' }}>
                  <Crown size={18} />
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <div className="text-[12px] font-bold truncate leading-tight text-slate-800">كل العائلات</div>
                  <div className="text-[10px] text-slate-500 font-medium">عرض الجميع • {total} فرد</div>
                </div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:bg-white group-hover:shadow-sm"><ChevronLeft size={14} strokeWidth={2.5} /></div>
              </button>
              {filteredFamilies.map(f => {
                const memberCount = persons.filter(p => p.familyId === f.id).length;
                return <FamilyRow key={f.id} family={f} count={memberCount} active={selectedFamilyId === f.id} onClick={() => onSelectFamily(f.id)} />;
              })}
            </>
          ) : (
            <div className="space-y-1">
              {filteredPersons.map(p => (
                <button key={p.id} onClick={() => { onSelectFamily(p.familyId); onSelectPerson(p.id); }}
                  className="w-full flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition text-right">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: p.gender === 'male' ? 'linear-gradient(145deg, #60a5fa, #2563eb)' : 'linear-gradient(145deg, #f472b6, #be185d)' }}>
                    {p.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-[11px] font-bold text-slate-800 truncate">{p.name}</div>
                    <div className="text-[9.5px] text-slate-500">{p.birthYear} • {p.job}</div>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${p.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>{p.generation}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-3 border-t border-slate-200 space-y-2" style={{ background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)' }}>
        <button onClick={onAddFamily}
          className="action-btn w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-[12px] font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(to bottom, #3b82f6 0%, #1d4ed8 100%)', border: '1px solid #1e40af', boxShadow: '0 4px 10px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.25)' }}>
          <Plus size={15} strokeWidth={2.2} />إضافة عائلة جديدة
        </button>
        <button onClick={onAddPerson}
          className="action-btn w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-slate-700 text-[11px] font-bold bg-white border border-slate-300 shadow-sm hover:bg-slate-50">
          <UserPlus size={13} /> إضافة شخص للعائلة المحددة
        </button>
      </div>
    </div>
  );
}

function FamilyRow({ family, count, active, onClick }: { family: Family; count: number; active: boolean; onClick: () => void }) {
  const c = colorMap[family.color] || colorMap.blue;
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-right transition-all duration-150 group hover:-translate-y-0.5"
      style={{
        background: active ? c.bg : 'linear-gradient(145deg, #ffffff, #f8fafc)',
        border: active ? `1.5px solid ${c.border}` : '1px solid #e2e8f0',
        boxShadow: active ? `0 3px 8px ${c.avatarShadow}, inset 0 1px 0 rgba(255,255,255,0.8)` : '0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
      }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
        style={{ background: c.avatarBg, border: '1.5px solid rgba(255,255,255,0.8)', boxShadow: active ? c.avatarShadow : '0 2px 4px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)' }}>
        <Users size={18} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0 text-right">
        <div className="text-[12px] font-bold truncate leading-tight" style={{ color: active ? c.text : '#1e293b' }}>{family.name}</div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[10px] font-semibold flex items-center gap-0.5" style={{ color: active ? c.countText : '#64748b' }}><User size={9} strokeWidth={2.4} />{count} فرد</span>
          {active && <span className="text-[9px] font-bold px-1.5 py-px rounded-full text-white" style={{ background: c.avatarBg }}>نشط</span>}
        </div>
      </div>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-white group-hover:shadow-sm" style={{ color: active ? c.countText : '#94a3b8' }}>
        <ChevronLeft size={14} strokeWidth={2.5} />
      </div>
    </button>
  );
}

// ==================== STATUS BAR ====================
function StatusBar({ stats, lastAction, isSaved }: { stats: { total: number; males: number; females: number; families: number; generations: number }; lastAction: string; isSaved: boolean }) {
  const SW = 1.8;
  return (
    <div className="h-9 flex items-center justify-between px-0 shrink-0" style={{ background: 'linear-gradient(to bottom, #e2e8f0 0%, #cbd5e1 100%)', borderTop: '1px solid #94a3b8', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}>
      <div className="flex items-center h-full divide-x divide-slate-300/80">
        <div className="h-full flex items-center px-3 gap-2">
          <span className="text-[10px] font-black text-green-700 px-1.5 py-0.5 rounded font-mono" style={{ background: 'linear-gradient(to bottom, #dcfce7, #bbf7d0)', border: '1px solid #86efac' }}>v2.5.0</span>
          <span className={`w-2 h-2 rounded-full ${isSaved ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></span>
        </div>
        <div className="h-full flex items-center px-3 gap-2">
          <StatusPill value="3" color="blue" /><span className="text-[11px] font-medium text-slate-700">تنبيهات</span>
        </div>
        <div className="h-full hidden lg:flex items-center px-3 gap-1.5 text-slate-700">
          <Clock size={13} strokeWidth={SW} className="text-slate-500" /><span className="text-[11px]">الوقت:</span><span className="text-[11px] font-bold tabular-nums text-slate-800">{new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="h-full hidden md:flex items-center px-3 gap-1.5 text-slate-700">
          <HardDrive size={13} strokeWidth={SW} className="text-slate-500" /><span className="text-[11px]">حجم:</span><span className="text-[11px] font-bold text-slate-800">{(JSON.stringify(stats).length * 2 / 1024).toFixed(1)} KB</span>
        </div>
        <div className="h-full flex items-center px-3 gap-1.5 text-slate-700">
          <Save size={13} strokeWidth={SW} className={isSaved ? 'text-green-600' : 'text-amber-600'} /><span className="text-[11px]">آخر حفظ:</span><span className={`text-[11px] font-bold ${isSaved ? 'text-green-700' : 'text-amber-700'}`}>{isSaved ? 'محفوظ' : 'غير محفوظ'}</span>
        </div>
      </div>
      <div className="flex items-center h-full divide-x divide-slate-300/80">
        <div className="h-full hidden lg:flex items-center px-3 gap-1.5 text-slate-700">
          <Database size={13} strokeWidth={SW} className="text-slate-500" /><span className="text-[11px]">الذاكرة:</span>
          <div className="w-20 h-2.5 rounded-full overflow-hidden" style={{ background: '#94a3b8', border: '1px solid #64748b', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)' }}>
            <div className="h-full rounded-full" style={{ width: `${Math.min(100, 20 + stats.total)}%`, background: 'linear-gradient(to left, #2563eb, #60a5fa)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }}></div>
          </div>
          <span className="text-[10px] font-bold text-slate-700 tabular-nums">{Math.min(100, 20 + stats.total)}%</span>
        </div>
        <div className="h-full hidden md:flex items-center px-3 gap-1.5" style={{ background: 'rgba(34,197,94,0.12)' }}>
          <ShieldCheck size={13} strokeWidth={SW} className="text-green-600" /><span className="text-[11px] text-slate-700">النسخ الاحتياطي:</span><span className="text-[11px] font-bold text-green-700">مُفعّل</span>
        </div>
        <div className="h-full flex items-center px-3 gap-1.5" style={{ background: 'rgba(59,130,246,0.10)' }}>
          <MousePointer2 size={13} strokeWidth={SW} className="text-blue-600" /><span className="text-[11px] text-slate-700">آخر عملية:</span><span className="text-[11px] font-bold text-blue-700">{lastAction}</span>
        </div>
        <div className="h-full flex items-center px-2.5"><StatPill icon={<GitBranch size={12} strokeWidth={SW} style={{ transform: 'scaleX(-1)' }} />} value={String(stats.generations)} label="أجيال" color="amber" /></div>
        <div className="h-full flex items-center px-2.5"><StatPill icon={<Home size={12} strokeWidth={SW} />} value={String(stats.families)} label="عائلات" color="emerald" /></div>
        <div className="h-full hidden md:flex items-center px-2.5"><StatPill icon={<User size={12} strokeWidth={SW} />} value={String(stats.females)} label="إناث" color="pink" /></div>
        <div className="h-full hidden md:flex items-center px-2.5"><StatPill icon={<User size={12} strokeWidth={SW} />} value={String(stats.males)} label="ذكور" color="blue" /></div>
        <div className="h-full flex items-center px-3 pr-2"><StatPill icon={<Users size={12} strokeWidth={SW} />} value={String(stats.total)} label="الأشخاص" color="slate" strong /></div>
      </div>
    </div>
  );
}
function StatPill({ icon, value, label, color, strong = false }: { icon: React.ReactNode; value: string; label: string; color: 'blue' | 'pink' | 'amber' | 'emerald' | 'slate'; strong?: boolean; }) {
  const schemes: Record<string, { bg: string; text: string; border: string; iconBg: string; iconColor: string }> = {
    blue: { bg: '#eff6ff', text: '#1e3a8a', border: '#bfdbfe', iconBg: '#3b82f6', iconColor: '#fff' },
    pink: { bg: '#fdf2f8', text: '#831843', border: '#fbcfe8', iconBg: '#ec4899', iconColor: '#fff' },
    amber: { bg: '#fffbeb', text: '#78350f', border: '#fde68a', iconBg: '#f59e0b', iconColor: '#fff' },
    emerald: { bg: '#ecfdf5', text: '#064e3b', border: '#a7f3d0', iconBg: '#10b981', iconColor: '#fff' },
    slate: { bg: '#f1f5f9', text: '#0f172a', border: '#cbd5e1', iconBg: '#475569', iconColor: '#fff' },
  };
  const s = schemes[color];
  return (
    <div className="flex items-center gap-1.5 h-6 px-1.5 pr-1 rounded-md" style={{ background: s.bg, border: `1px solid ${s.border}`, boxShadow: strong ? '0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)' : 'inset 0 1px 0 rgba(255,255,255,0.6)' }}>
      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: s.iconBg, color: s.iconColor, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}>{icon}</div>
      <span className={`text-[10px] ${strong ? 'font-black' : 'font-bold'} tabular-nums leading-none`} style={{ color: s.text }}>{value}</span>
      <span className="text-[10px] font-medium text-slate-600 leading-none">{label}</span>
    </div>
  );
}
function StatusPill({ value, color }: { value: string; color: 'blue' | 'red' | 'green' | 'amber' }) {
  const bg = { blue: 'linear-gradient(to bottom, #3b82f6, #2563eb)', red: 'linear-gradient(to bottom, #ef4444, #dc2626)', green: 'linear-gradient(to bottom, #22c55e, #16a34a)', amber: 'linear-gradient(to bottom, #f59e0b, #d97706)' }[color];
  return <span className="min-w-[20px] h-[18px] rounded-full text-[9px] font-black text-white flex items-center justify-center px-1" style={{ background: bg, boxShadow: '0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)' }}>{value}</span>;
}

// ==================== MODALS ====================
function PersonModal({
  isOpen, onClose, onSave, families, initialData, title, mode
}: {
  isOpen: boolean; onClose: () => void;
  onSave: (data: PersonFormData) => void;
  families: Family[]; initialData?: PersonFormData;
  title: string; mode: 'add' | 'edit' | 'spouse' | 'child';
}) {
  const [form, setForm] = useState<PersonFormData>(initialData || {
    name: '', gender: 'male' as Gender, birthYear: String(new Date().getFullYear() - 25),
    birthDate: '01/01/2000', birthPlace: 'الرياض، السعودية', job: '', nationality: 'سعودي',
    generation: 1, isDeceased: false, familyId: families[0]?.id || 'fam-1',
    phone: '', email: '', city: 'الرياض', neighborhood: '', postalCode: '', photoUrl: null
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else if (isOpen) setForm({
      name: '', gender: 'male' as Gender, birthYear: String(new Date().getFullYear() - 25),
      birthDate: '01/01/2000', birthPlace: 'الرياض، السعودية', job: '', nationality: 'سعودي',
      generation: 1, isDeceased: false, familyId: families[0]?.id || 'fam-1',
      phone: '', email: '', city: 'الرياض', neighborhood: '', postalCode: '', photoUrl: null
    });
  }, [initialData, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2_000_000) { alert('الصورة كبيرة جداً - الحد 2MB'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({ ...f, photoUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[560px] rounded-2xl overflow-hidden shadow-2xl animate-[scaleIn_0.2s_ease] border border-white/20"
        style={{ background: 'linear-gradient(145deg, #ffffff, #f8fafc)' }}>
        <div className="px-5 py-3 flex items-center justify-between text-white"
          style={{ background: mode === 'add' ? 'linear-gradient(to bottom, #3b82f6, #1d4ed8)' : mode === 'edit' ? 'linear-gradient(to bottom, #8b5cf6, #6d28d9)' : mode === 'spouse' ? 'linear-gradient(to bottom, #ec4899, #be185d)' : 'linear-gradient(to bottom, #10b981, #047857)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              {mode === 'add' ? <UserPlus size={16} /> : mode === 'edit' ? <UserPen size={16} /> : mode === 'spouse' ? <Heart size={16} /> : <Baby size={16} />}
            </div>
            <div>
              <h2 className="font-bold text-[13px]">{title}</h2>
              <p className="text-[10px] text-white/80">
                {mode === 'add' ? 'أضف فردًا جديدًا لعائلتك' : mode === 'edit' ? 'تعديل بيانات الشخص' : mode === 'spouse' ? 'إضافة زوج/زوجة وربطهم' : 'إضافة ابن وربط النسب'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Photo upload */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200">
            <div className="w-[64px] h-[64px] rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center shrink-0">
              {form.photoUrl ? <img src={form.photoUrl} alt="preview" className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-400" />}
            </div>
            <div className="flex-1">
              <label className="text-[11px] font-bold text-slate-700 mb-1 block flex items-center gap-1"><ImageIcon size={11} /> صورة الشخص (اختياري)</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-[11px] file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-slate-200 file:bg-white file:text-[11px] file:font-bold hover:file:bg-slate-50" />
              <div className="flex gap-2 mt-1.5">
                <input value={form.photoUrl || ''} onChange={e => setForm({ ...form, photoUrl: e.target.value || null })} placeholder="أو رابط صورة https://..." className="flex-1 px-2 py-1 rounded-lg border border-slate-200 text-[10px]" />
                {form.photoUrl && <button type="button" onClick={() => setForm({ ...form, photoUrl: null })} className="px-2 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold">حذف</button>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">الاسم الكامل *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[13px] font-medium focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                placeholder="مثال: محمد أحمد الأحمدي" required />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">الجنس</label>
              <div className="flex gap-2 p-1 rounded-xl bg-slate-100">
                <button type="button" onClick={() => setForm({ ...form, gender: 'male' })}
                  className={`flex-1 py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition ${form.gender === 'male' ? 'bg-white shadow text-blue-700 border border-blue-200' : 'text-slate-600'}`}>
                  <User size={12} /> ذكر
                </button>
                <button type="button" onClick={() => setForm({ ...form, gender: 'female' })}
                  className={`flex-1 py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition ${form.gender === 'female' ? 'bg-white shadow text-pink-700 border border-pink-200' : 'text-slate-600'}`}>
                  <User size={12} /> أنثى
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">سنة الميلاد</label>
              <input value={form.birthYear} onChange={e => setForm({ ...form, birthYear: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[12px] focus:outline-none focus:border-blue-400"
                placeholder="1960" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">تاريخ الميلاد</label>
              <input value={form.birthDate} onChange={e => setForm({ ...form, birthDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-[12px] focus:outline-none focus:border-blue-400" placeholder="15/03/1960" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">الجيل</label>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setForm({ ...form, generation: Math.max(1, form.generation - 1) })}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center">-</button>
                <div className="flex-1 py-2 rounded-xl bg-amber-50 border border-amber-200 text-center text-[13px] font-black text-amber-800">{form.generation}</div>
                <button type="button" onClick={() => setForm({ ...form, generation: form.generation + 1 })}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center">+</button>
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">المهنة</label>
              <input value={form.job} onChange={e => setForm({ ...form, job: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[12px] focus:outline-none focus:border-blue-400" placeholder="مهندس، طبيب..." />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">العائلة</label>
              <select value={form.familyId} onChange={e => setForm({ ...form, familyId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[12px] focus:outline-none focus:border-blue-400">
                {families.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">المدينة</label>
              <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[12px] focus:outline-none focus:border-blue-400" placeholder="الرياض" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">الهاتف</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[12px] focus:outline-none focus:border-blue-400 ltr" placeholder="+966 ..." />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">البريد</label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[12px] focus:outline-none focus:border-blue-400" placeholder="mail@example.com" />
            </div>

            <div className="col-span-2">
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">مكان الميلاد</label>
              <input value={form.birthPlace} onChange={e => setForm({ ...form, birthPlace: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[12px] focus:outline-none focus:border-blue-400" />
            </div>

            <div className="col-span-2 flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <input type="checkbox" id="deceased" checked={form.isDeceased} onChange={e => setForm({ ...form, isDeceased: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300" />
              <label htmlFor="deceased" className="text-[11px] font-bold text-slate-700 flex items-center gap-1"><AlertCircle size={12} /> متوفى</label>
              <span className="text-[10px] text-slate-500 mr-auto">سيتم تمييزه في الشجرة باللون الرمادي</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
            <button type="submit"
              className="flex-1 py-3 rounded-xl text-white font-bold text-[12px] shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              style={{ background: mode === 'spouse' ? 'linear-gradient(to bottom, #ec4899, #be185d)' : mode === 'child' ? 'linear-gradient(to bottom, #10b981, #059669)' : 'linear-gradient(to bottom, #3b82f6, #1d4ed8)' }}>
              <Check size={14} strokeWidth={2.5} /> {mode === 'edit' ? 'حفظ التعديلات' : mode === 'spouse' ? 'إضافة الزوج/ة' : mode === 'child' ? 'إضافة الابن' : 'إضافة الشخص'}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-[12px] hover:bg-slate-50">إلغاء</button>
          </div>
        </form>
      </div>
      <style>{`@keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } } @keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}

function FamilyModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (name: string, color: string) => void }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('blue');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[420px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white">
        <div className="px-5 py-3 flex items-center justify-between text-white" style={{ background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8)' }}>
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><Home size={16} /></div><h2 className="font-bold text-[13px]">إضافة عائلة جديدة</h2></div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-700 mb-1 block">اسم العائلة</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:border-blue-400" placeholder="مثال: عائلة الأحمدي" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-700 mb-2 block">لون العائلة</label>
            <div className="grid grid-cols-6 gap-2">
              {familyColors.map(c => {
                const cm = colorMap[c];
                return (
                  <button key={c} onClick={() => setColor(c)} className={`w-full h-10 rounded-xl border-2 transition ${color === c ? 'ring-2 ring-offset-1 ring-blue-400 border-blue-400 scale-105' : 'border-white'}`} style={{ background: cm.avatarBg }} title={c}></button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={() => { if (name.trim()) { onSave(name.trim(), color); setName(''); } }}
              className="flex-1 py-2.5 rounded-xl text-white font-bold text-[12px] shadow-md" style={{ background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8)' }}>إضافة العائلة</button>
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-[12px]">إلغاء</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-[380px] rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3"><AlertTriangle size={20} /></div>
          <h3 className="font-bold text-[14px] text-slate-800">{title}</h3>
          <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-2 p-3 bg-slate-50 border-t border-slate-200">
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-[12px]">تأكيد الحذف</button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-[12px]">إلغاء</button>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  // Load from storage
  const [persons, setPersons] = useState<Person[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.persons && Array.isArray(parsed.persons) && parsed.persons.length > 0) return parsed.persons;
      }
    } catch {}
    return initialPersons;
  });
  const [families, setFamilies] = useState<Family[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.families && Array.isArray(parsed.families) && parsed.families.length > 0) return parsed.families;
      }
    } catch {}
    return initialFamilies;
  });

  const [selectedPersonId, setSelectedPersonId] = useState<string | null>('p3');
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>('fam-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [familySearch, setFamilySearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [zoom, setZoom] = useState(100);
  const [filter, setFilter] = useState('all');
  const [lastAction, setLastAction] = useState('بدء التشغيل');
  const [isSaved, setIsSaved] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [rightTab, setRightTab] = useState<'families' | 'persons'>('families');

  // Modals
  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isFamilyOpen, setFamilyOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'spouse' | 'child'>('add');
  const [modalContextId, setModalContextId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast helpers
  const showToast = (msg: string, type: ToastType = 'success') => {
    const id = genId();
    setToasts(t => [...t, { id, message: msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };
  const removeToast = (id: string) => setToasts(t => t.filter(x => x.id !== id));

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ persons, families, savedAt: Date.now() }));
      setIsSaved(true);
    } catch { setIsSaved(false); }
  }, [persons, families]);

  // Mark unsaved on pending action (simulate delay)
  const markAction = (action: string) => {
    setLastAction(action);
    setIsSaved(false);
    setTimeout(() => setIsSaved(true), 1200);
  };

  // Stats
  const stats = useMemo(() => {
    const total = persons.length;
    const males = persons.filter(p => p.gender === 'male').length;
    const females = total - males;
    const gens = new Set(persons.map(p => p.generation)).size;
    return { total, males, females, families: families.length, generations: gens || 1 };
  }, [persons, families]);

  const selectedPerson = useMemo(() => persons.find(p => p.id === selectedPersonId) || null, [persons, selectedPersonId]);
  const selectedFamily = useMemo(() => families.find(f => f.id === selectedFamilyId) || null, [families, selectedFamilyId]);

  const visiblePersons = useMemo(() => {
    if (!selectedFamilyId) return persons;
    // include family members plus their children/spouses maybe? For simplicity filter by familyId OR related to family members
    const famMemberIds = new Set(persons.filter(p => p.familyId === selectedFamilyId).map(p => p.id));
    // include all persons whose family is selected OR they are closely related to someone in that family (spouse/child of member)
    // For now strict family filter for clarity
    return persons.filter(p => p.familyId === selectedFamilyId);
  }, [persons, selectedFamilyId]);

  // Actions
  const handleAddPerson = (data: PersonFormData, mode: 'add' | 'spouse' | 'child', contextId?: string | null) => {
    const newId = `p${genId()}`;
    let newPerson: Person = {
      id: newId,
      name: data.name,
      gender: data.gender,
      birthYear: data.birthYear,
      birthDate: data.birthDate,
      birthPlace: data.birthPlace,
      job: data.job,
      nationality: data.nationality,
      generation: data.generation,
      isDeceased: data.isDeceased,
      fatherId: null,
      motherId: null,
      spouseIds: [],
      childrenIds: [],
      familyId: data.familyId,
      phone: data.phone,
      email: data.email,
      city: data.city,
      neighborhood: data.neighborhood,
      postalCode: data.postalCode,
      photoUrl: data.photoUrl,
      notes: ''
    };

    if (mode === 'spouse' && contextId) {
      const contextPerson = persons.find(p => p.id === contextId);
      if (contextPerson) {
        newPerson.generation = contextPerson.generation;
        newPerson.familyId = contextPerson.familyId;
        // link spouses
        newPerson.spouseIds = [contextId];
        setPersons(prev => {
          const updated = prev.map(p => p.id === contextId ? { ...p, spouseIds: [...new Set([...p.spouseIds, newId])] } : p);
          return [...updated, newPerson];
        });
        setFamilies(prev => prev.map(f => f.id === newPerson.familyId ? { ...f, memberIds: [...new Set([...f.memberIds, newId])] } : f));
        showToast(`تمت إضافة ${data.name} كزوج/زوجة`);
        markAction(`إضافة زوج: ${data.name}`);
        setSelectedPersonId(newId);
        return;
      }
    }

    if (mode === 'child' && contextId) {
      const parent = persons.find(p => p.id === contextId);
      if (parent) {
        const spouse = parent.spouseIds.map(id => persons.find(pp => pp.id === id)).find(Boolean);
        newPerson.generation = parent.generation + 1;
        newPerson.familyId = parent.familyId;
        if (parent.gender === 'male') {
          newPerson.fatherId = parent.id;
          if (spouse && spouse.gender === 'female') newPerson.motherId = spouse.id;
        } else {
          newPerson.motherId = parent.id;
          if (spouse && spouse.gender === 'male') newPerson.fatherId = spouse.id;
        }

        setPersons(prev => {
          let updated = prev.map(p => {
            if (p.id === contextId) return { ...p, childrenIds: [...new Set([...p.childrenIds, newId])] };
            if (spouse && p.id === spouse.id) return { ...p, childrenIds: [...new Set([...p.childrenIds, newId])] };
            return p;
          });
          return [...updated, newPerson];
        });
        setFamilies(prev => prev.map(f => f.id === newPerson.familyId ? { ...f, memberIds: [...new Set([...f.memberIds, newId])] } : f));
        showToast(`تمت إضافة ${data.name} كابن`);
        markAction(`إضافة ابن: ${data.name}`);
        setSelectedPersonId(newId);
        return;
      }
    }

    // default add
    setPersons(p => [...p, newPerson]);
    setFamilies(prev => prev.map(f => f.id === newPerson.familyId ? { ...f, memberIds: [...f.memberIds, newPerson.id] } : f));
    setSelectedPersonId(newPerson.id);
    setSelectedFamilyId(newPerson.familyId);
    showToast(`تمت إضافة ${data.name} بنجاح`);
    markAction(`إضافة شخص: ${data.name}`);
  };

  const handleEditPerson = (id: string, data: PersonFormData) => {
    const oldPerson = persons.find(p => p.id === id);
    setPersons(prev => prev.map(p => p.id === id ? {
      ...p,
      name: data.name, gender: data.gender, birthYear: data.birthYear, birthDate: data.birthDate,
      birthPlace: data.birthPlace, job: data.job, nationality: data.nationality,
      generation: data.generation, isDeceased: data.isDeceased, familyId: data.familyId,
      phone: data.phone, email: data.email, city: data.city, neighborhood: data.neighborhood,
      postalCode: data.postalCode, photoUrl: data.photoUrl
    } : p));

    // if family changed, move memberIds
    if (oldPerson && oldPerson.familyId !== data.familyId) {
      setFamilies(prev => prev.map(f => {
        if (f.id === oldPerson.familyId) return { ...f, memberIds: f.memberIds.filter(mid => mid !== id) };
        if (f.id === data.familyId) return { ...f, memberIds: [...new Set([...f.memberIds, id])] };
        return f;
      }));
      setSelectedFamilyId(data.familyId);
    }

    showToast('تم تحديث البيانات بنجاح');
    markAction(`تعديل: ${data.name}`);
  };

  const handleDeletePerson = (id: string) => {
    const person = persons.find(p => p.id === id);
    if (!person) return;
    // remove from relations
    setPersons(prev => {
      let filtered = prev.filter(p => p.id !== id);
      filtered = filtered.map(p => ({
        ...p,
        fatherId: p.fatherId === id ? null : p.fatherId,
        motherId: p.motherId === id ? null : p.motherId,
        spouseIds: p.spouseIds.filter(sid => sid !== id),
        childrenIds: p.childrenIds.filter(cid => cid !== id)
      }));
      return filtered;
    });
    setFamilies(prev => prev.map(f => ({ ...f, memberIds: f.memberIds.filter(mid => mid !== id) })));
    if (selectedPersonId === id) setSelectedPersonId(persons.find(p => p.id !== id)?.id || null);
    showToast(`تم حذف ${person.name}`, 'info');
    markAction(`حذف: ${person.name}`);
    setConfirmDeleteId(null);
  };

  const handleNewProject = () => {
    if (!confirm('هل أنت متأكد من إنشاء مشروع جديد؟ سيتم مسح البيانات الحالية (يمكن استعادتها من النسخ الاحتياطي للمتصفح إذا أردت).')) return;
    setPersons([]);
    setFamilies([{ id: 'fam-1', name: 'عائلتي', color: 'blue', memberIds: [] }]);
    setSelectedFamilyId('fam-1');
    setSelectedPersonId(null);
    showToast('تم إنشاء مشروع جديد', 'info');
    markAction('مشروع جديد');
  };

  const handleSave = () => {
    const data = { persons, families, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedFamily?.name || 'family'}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('تم تحميل ملف الحفظ');
    markAction('حفظ الملف');
  };

  const handleExport = handleSave;

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed.persons && parsed.families) {
          setPersons(parsed.persons);
          setFamilies(parsed.families);
          setSelectedFamilyId(parsed.families[0]?.id || null);
          setSelectedPersonId(parsed.persons[0]?.id || null);
          showToast('تم استيراد البيانات بنجاح');
          markAction('استيراد ملف');
        } else {
          showToast('ملف غير صالح', 'error');
        }
      } catch {
        showToast('فشل قراءة الملف', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAddFamily = (name: string, color: string) => {
    const newFam: Family = { id: `fam-${genId()}`, name, color, memberIds: [] };
    setFamilies(f => [...f, newFam]);
    setSelectedFamilyId(newFam.id);
    showToast(`تمت إضافة ${name}`);
    markAction(`إضافة عائلة: ${name}`);
    setFamilyOpen(false);
  };

  const getEditFormData = (p: Person): PersonFormData => ({
    name: p.name, gender: p.gender, birthYear: p.birthYear, birthDate: p.birthDate,
    birthPlace: p.birthPlace, job: p.job, nationality: p.nationality, generation: p.generation,
    isDeceased: p.isDeceased, familyId: p.familyId, phone: p.phone, email: p.email,
    city: p.city, neighborhood: p.neighborhood, postalCode: p.postalCode, photoUrl: p.photoUrl
  });

  return (
    <div className="h-screen w-screen flex flex-col bg-[#c9d6e8] overflow-hidden font-sans select-none" dir="rtl">
      <TitleBar fileName={selectedFamily?.name || 'عائلة الأحمدي'} isSaved={isSaved} onAction={(m) => showToast(m, 'info')} />
      <TopInfoBar stats={stats} />
      <MenuBar onExport={handleExport} onImport={handleImport} fileInputRef={fileInputRef} />
      <Toolbar
        onNew={handleNewProject}
        onOpen={() => fileInputRef.current?.click()}
        onSave={handleSave}
        onPrint={() => { window.print(); showToast('جاري الطباعة...', 'info'); }}
        onExport={handleExport}
        onAddPerson={() => { setModalMode('add'); setModalContextId(null); setAddOpen(true); }}
        onSearch={() => setSearchQuery(s => s ? '' : 'أحمد')}
        onFilterChange={(f) => setFilter(f === filter ? 'all' : f)}
        activeFilter={filter}
        onAutoLayout={() => { setZoom(100); showToast('تم إعادة ترتيب الشجرة'); }}
        onDownload={handleExport}
      />

      <div className="flex-1 flex overflow-hidden">
        <RightSidebar
          families={families}
          persons={persons}
          selectedFamilyId={selectedFamilyId}
          onSelectFamily={(id) => { setSelectedFamilyId(id); markAction(`اختيار ${id ? families.find(f => f.id === id)?.name : 'كل العائلات'}`); }}
          onSelectPerson={(id) => { setSelectedPersonId(id); markAction(`اختيار ${persons.find(p => p.id === id)?.name}`); }}
          onAddFamily={() => setFamilyOpen(true)}
          search={familySearch}
          setSearch={setFamilySearch}
          onAddPerson={() => { setModalMode('add'); setAddOpen(true); }}
          selectedTab={rightTab}
          setSelectedTab={setRightTab}
        />

        <TreeCanvas
          persons={visiblePersons}
          allPersons={persons}
          selectedId={selectedPersonId}
          onSelect={(id) => { setSelectedPersonId(id); markAction(`اختيار ${persons.find(p => p.id === id)?.name}`); }}
          onEdit={(id) => { setSelectedPersonId(id); setEditOpen(true); }}
          onDelete={(id) => setConfirmDeleteId(id)}
          onAddChild={(id) => { setModalMode('child'); setModalContextId(id); setAddOpen(true); }}
          onAddSpouse={(id) => { setModalMode('spouse'); setModalContextId(id); setAddOpen(true); }}
          zoom={zoom}
          setZoom={setZoom}
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFamily={selectedFamily}
          onAddPerson={() => { setModalMode('add'); setAddOpen(true); }}
          filter={filter}
        />

        <LeftSidebar
          person={selectedPerson}
          allPersons={persons}
          onEdit={() => setEditOpen(true)}
          onDelete={() => selectedPersonId && setConfirmDeleteId(selectedPersonId)}
          onSelect={(id) => setSelectedPersonId(id)}
          onAddChild={() => { if (selectedPersonId) { setModalMode('child'); setModalContextId(selectedPersonId); setAddOpen(true); } }}
          onAddSpouse={() => { if (selectedPersonId) { setModalMode('spouse'); setModalContextId(selectedPersonId); setAddOpen(true); } }}
          onEditPhoto={() => showToast('رفع الصورة قريبًا - يمكنك إضافة رابط صورة في التعديل', 'info')}
        />
      </div>

      <StatusBar stats={stats} lastAction={lastAction} isSaved={isSaved} />

      {/* Modals */}
      <PersonModal
        isOpen={isAddOpen}
        onClose={() => setAddOpen(false)}
        onSave={(data) => { handleAddPerson(data, modalMode, modalContextId); setAddOpen(false); }}
        families={families}
        title={
          modalMode === 'add' ? 'إضافة شخص جديد' :
            modalMode === 'spouse' ? `إضافة زوج/ة لـ ${persons.find(p => p.id === modalContextId)?.name || ''}` :
              `إضافة ابن لـ ${persons.find(p => p.id === modalContextId)?.name || ''}`
        }
        mode={modalMode}
        initialData={
          modalMode === 'child' && modalContextId ? {
            name: '', gender: 'male', birthYear: String(new Date().getFullYear() - 5),
            birthDate: '01/01/2020', birthPlace: 'الرياض، السعودية', job: '', nationality: 'سعودي',
            generation: (persons.find(p => p.id === modalContextId)?.generation || 1) + 1,
            isDeceased: false, familyId: persons.find(p => p.id === modalContextId)?.familyId || 'fam-1',
            phone: '', email: '', city: 'الرياض', neighborhood: '', postalCode: '', photoUrl: null
          } : modalMode === 'spouse' && modalContextId ? {
            name: '', gender: (persons.find(p => p.id === modalContextId)?.gender === 'male' ? 'female' : 'male') as Gender,
            birthYear: String(new Date().getFullYear() - 30), birthDate: '01/01/1995',
            birthPlace: 'الرياض، السعودية', job: '', nationality: 'سعودي',
            generation: persons.find(p => p.id === modalContextId)?.generation || 2,
            isDeceased: false, familyId: persons.find(p => p.id === modalContextId)?.familyId || 'fam-1',
            phone: '', email: '', city: 'الرياض', neighborhood: '', postalCode: '', photoUrl: null
          } : undefined
        }
      />

      <PersonModal
        isOpen={isEditOpen && !!selectedPerson}
        onClose={() => setEditOpen(false)}
        onSave={(data) => { if (selectedPerson) { handleEditPerson(selectedPerson.id, data); setEditOpen(false); } }}
        families={families}
        initialData={selectedPerson ? getEditFormData(selectedPerson) : undefined}
        title={`تعديل ${selectedPerson?.name || ''}`}
        mode="edit"
      />

      <FamilyModal isOpen={isFamilyOpen} onClose={() => setFamilyOpen(false)} onSave={handleAddFamily} />

      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => confirmDeleteId && handleDeletePerson(confirmDeleteId)}
        title="تأكيد الحذف"
        message={`هل أنت متأكد من حذف ${persons.find(p => p.id === confirmDeleteId)?.name || 'هذا الشخص'}؟ سيتم إزالة جميع روابطه العائلية ولا يمكن التراجع.`}
      />

      <ToastContainer toasts={toasts} remove={removeToast} />

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept=".json,.familytree" className="hidden" onChange={handleImport} />

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
