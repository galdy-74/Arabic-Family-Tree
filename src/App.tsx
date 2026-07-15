import {
  X, Minus, Square, Settings, FileText, BarChart3, Search, Baby, Heart,
  Trash2, UserPen, UserPlus, Printer, Save, FolderOpen, FilePlus,
  ZoomIn, ZoomOut, Move, RotateCcw, ChevronUp, ChevronLeft, ChevronRight,
  User, Phone, Mail, MapPin, Calendar, Home, Briefcase, HeartHandshake,
  Users, Pencil, Plus, Filter, LayoutGrid, Share2, Database, Eye, Clock,
  HardDrive, MousePointer, AlertCircle, Network, Check, List,
  Copy, ArrowUpDown, Download, FileType, GitBranch, File, Shield, Flag,
  Maximize2, ShieldCheck, MousePointer2
} from 'lucide-react';

// ==================== TITLE BAR ====================
function TitleBar() {
  return (
    <div className="relative h-[28px] flex items-center select-none overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #4a8ec4 0%, #3d7db3 45%, #3570a5 100%)',
        borderBottom: '1px solid #264f7a',
      }}
    >
      {/* Top gloss highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30 pointer-events-none" />

      {/* ════════ RIGHT SIDE (in RTL: App brand & info) ════════ */}
      <div className="flex items-center h-full px-2.5 gap-2">
        {/* App Icon / Logo */}
        <div className="relative w-[22px] h-[22px] rounded-[5px] flex items-center justify-center shadow-sm"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #e0eaf5)',
            border: '1px solid #2a5f8f',
            boxShadow: '0 1px 2px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,1)',
          }}
        >
          <GitBranch size={13} className="text-[#2563eb]" strokeWidth={2.5} style={{transform: 'scaleX(-1)'}} />
          <div className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(to bottom, #ef4444, #b91c1c)',
              border: '1px solid white',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            <Shield size={6.5} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* App Name + Version */}
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-white font-bold text-[12px] tracking-tight"
            style={{textShadow: '0 1px 1.5px rgba(0,0,0,0.4)'}}>
            شجرة العائلة
          </span>
          {/* Version badge */}
          <div className="flex items-center gap-0.5 px-1 py-0 rounded-[3px] text-[8.5px] font-black text-white"
            style={{
              background: 'linear-gradient(to bottom, #f59e0b, #d97706)',
              border: '1px solid #b45309',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <span>PRO</span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-3.5 w-px bg-white/20 mx-0.5" />

      {/* Document indicator */}
      <div className="flex items-center gap-1.5 text-white/85 text-[11px] h-full">
        <File size={11} strokeWidth={1.8} className="text-white/70" />
        <span className="font-medium" style={{textShadow: '0 1px 1px rgba(0,0,0,0.3)'}}>
          عائلة الأحمدي
        </span>
        <span className="text-white/50 text-[9.5px]">.familytree</span>
        <span className="flex items-center gap-1 text-green-300 text-[9.5px] mr-1 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_3px_#4ade80]"></span>
          محفوظ
        </span>
      </div>

      {/* ════════ CENTER ════════ */}
      <div className="flex-1" />

      {/* ════════ LEFT SIDE (in RTL: Window controls) ════════ */}
      <div className="flex items-center h-full">
        <TitleBarButton title="تصغير">
          <Minus size={11} strokeWidth={1.8} />
        </TitleBarButton>
        <TitleBarButton title="تكبير">
          <Square size={9} strokeWidth={1.8} />
        </TitleBarButton>
        <TitleBarButton title="إغلاق" close>
          <X size={11} strokeWidth={1.8} />
        </TitleBarButton>
      </div>
    </div>
  );
}

// Helper button for title bar controls
function TitleBarButton({ children, title, close = false }: { children: React.ReactNode; title: string; close?: boolean }) {
  return (
    <button
      title={title}
      className={`h-[28px] w-[40px] flex items-center justify-center transition-all duration-100
        ${close ? 'hover:bg-[#e81123]' : 'hover:bg-white/20 active:bg-white/10'}`}
      style={{color: 'white'}}
    >
      {children}
    </button>
  );
}

// ==================== TOP INFO BAR ====================
function TopInfoBar() {
  return (
    <div
      className="relative h-[62px] flex items-center px-4 shadow-md"
      style={{
        background: 'linear-gradient(to bottom, #7ab0dc 0%, #63a0cf 50%, #5090c1 100%)',
        borderBottom: '1px solid #3a74a4',
      }}
    >
      {/* Top gloss */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

      {/* ════════ STAT CARDS (right side in RTL) ════════ */}
      <div className="flex items-center gap-2 relative z-10">
        <StatCard
          value="248"
          label="عدد الأشخاص"
          icon={<Users size={16} strokeWidth={1.8} />}
          accent="blue"
        />
        <StatCard
          value="12"
          label="عدد العائلات"
          icon={<Home size={16} strokeWidth={1.8} />}
          accent="emerald"
        />
        <StatCard
          value="6"
          label="عدد الأجيال"
          icon={<GitBranch size={16} strokeWidth={1.8} style={{transform: 'scaleX(-1)'}} />}
          accent="amber"
        />
      </div>

      {/* ════════ SPACER ════════ */}
      <div className="flex-1" />

      {/* ════════ APP BRANDING (left side in RTL) ════════ */}
      <div className="flex items-center gap-2.5 relative z-10">
        <div className="text-left leading-tight" dir="rtl">
          <h1
            className="text-[22px] font-black leading-none text-white tracking-tight"
            style={{textShadow: '0 2px 4px rgba(0,0,0,0.25)'}}
          >
            شجرة العائلة
          </h1>
          <p className="text-[9.5px] text-white/90 font-medium" style={{textShadow: '0 1px 2px rgba(0,0,0,0.2)'}}>
            نظام إدارة الأنساب والعائلات
          </p>
        </div>
        <div
          className="w-[44px] h-[44px] rounded-xl flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #dce9f5 100%)',
            boxShadow: '0 3px 8px rgba(0,0,0,0.18), inset 0 1.5px 3px rgba(255,255,255,1), inset 0 -1.5px 3px rgba(59,130,246,0.15)',
            border: '1.5px solid rgba(255,255,255,0.8)',
          }}
        >
          <Network size={22} className="text-[#2563eb]" strokeWidth={1.8} />
          <div
            className="absolute -bottom-0.5 -left-0.5 w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(to bottom, #f59e0b, #d97706)',
              border: '1.5px solid white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            }}
          >
            <Shield size={8} className="text-white" strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  value, label, icon, accent
}: {
  value: string; label: string; icon: React.ReactNode;
  accent: 'blue' | 'emerald' | 'amber';
}) {
  const accentStyles = {
    blue: {
      iconBg: 'linear-gradient(145deg, #3b82f6, #2563eb)',
      iconColor: 'white',
      numberColor: '#1e40af',
      dot: '#3b82f6',
    },
    emerald: {
      iconBg: 'linear-gradient(145deg, #10b981, #059669)',
      iconColor: 'white',
      numberColor: '#065f46',
      dot: '#10b981',
    },
    amber: {
      iconBg: 'linear-gradient(145deg, #f59e0b, #d97706)',
      iconColor: 'white',
      numberColor: '#92400e',
      dot: '#f59e0b',
    },
  }[accent];

  return (
    <div
      className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg relative cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #f0f6fc 100%)',
        border: '1px solid rgba(255,255,255,0.9)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(255,255,255,0.3)',
        minWidth: '120px',
      }}
    >
      {/* Colored icon wrapper */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md flex-shrink-0"
        style={{
          background: accentStyles.iconBg,
          color: accentStyles.iconColor,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
        }}
      >
        {icon}
      </div>

      {/* Text content */}
      <div className="flex flex-col">
        <div
          className="text-[22px] font-black leading-none tabular-nums"
          style={{color: accentStyles.numberColor, lineHeight: 1}}
        >
          {value}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span
            className="w-1 h-1 rounded-full"
            style={{background: accentStyles.dot, boxShadow: `0 0 3px ${accentStyles.dot}`}}
          />
          <span className="text-[10px] font-semibold text-slate-600 leading-none">{label}</span>
        </div>
      </div>
    </div>
  );
}

// ==================== MENU BAR ====================
function MenuBar() {
  const menus = ['ملف', 'تحرير', 'عرض', 'الأشخاص', 'العائلة', 'التقارير', 'الإعدادات', 'المساعدة'];
  return (
    <div className="h-8 bg-gradient-to-b from-slate-100 to-slate-200 border-b border-slate-300 flex items-center justify-between px-2">
      <div className="text-[11px] text-slate-600 flex items-center gap-1.5 px-2">
        <FileType size={11} strokeWidth={2} className="text-blue-600" />
        <span>متصل بقاعدة البيانات</span>
      </div>
      <div className="flex items-center gap-0 h-full">
        {menus.map((m, i) => (
          <button
            key={i}
            className="menu-item h-full px-3 text-[12px] font-medium text-slate-700 flex items-center"
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== TOOLBAR ====================
function Toolbar() {
  // Office-style groups (RTL order: right→left)
  const ip = { size: 20, strokeWidth: 1.8 } as const;

  type ToolItem = { icon: React.ReactNode; label: string; variant?: 'primary' | 'danger' | 'default' };

  const groups: { title: string; items: ToolItem[] }[] = [
    {
      title: 'ملف',
      items: [
        { icon: <FilePlus {...ip} />, label: 'مشروع جديد' },
        { icon: <FolderOpen {...ip} />, label: 'فتح' },
        { icon: <Save {...ip} />, label: 'حفظ' },
        { icon: <Printer {...ip} />, label: 'طباعة' },
      ],
    },
    {
      title: 'الأشخاص',
      items: [
        { icon: <UserPlus {...ip} />, label: 'إضافة شخص', variant: 'primary' },
        { icon: <UserPen {...ip} />, label: 'تعديل شخص' },
        { icon: <Trash2 {...ip} />, label: 'حذف', variant: 'danger' },
      ],
    },
    {
      title: 'العلاقات',
      items: [
        { icon: <Heart {...ip} />, label: 'إضافة زوج' },
        { icon: <Baby {...ip} />, label: 'إضافة ابن' },
      ],
    },
    {
      title: 'التقارير',
      items: [
        { icon: <Search {...ip} />, label: 'بحث' },
        { icon: <BarChart3 {...ip} />, label: 'التقارير' },
        { icon: <FileText {...ip} />, label: 'تصدير PDF' },
      ],
    },
    {
      title: 'النظام',
      items: [
        { icon: <Settings {...ip} />, label: 'الإعدادات' },
      ],
    },
  ];

  return (
    <div
      className="relative px-2 py-1 flex items-stretch gap-0 overflow-x-auto"
      style={{
        background: 'linear-gradient(to bottom, #f8fafc 0%, #eef2f7 55%, #e4ebf3 100%)',
        borderBottom: '1px solid #cbd5e1',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {groups.map((group, gi) => (
        <div key={gi} className="flex items-stretch">
          {gi > 0 && (
            <div
              className="mx-1 self-stretch flex items-center"
              aria-hidden
            >
              <div className="h-[70%] w-px bg-gradient-to-b from-transparent via-slate-400/60 to-transparent"></div>
            </div>
          )}
          <div className="flex flex-col items-stretch">
            {/* Row of buttons */}
            <div className="flex items-start gap-0.5 px-1 pt-0.5">
              {group.items.map((btn, bi) => (
                <ToolButton key={bi} icon={btn.icon} label={btn.label} variant={btn.variant} />
              ))}
            </div>
            {/* Group label (Office-style) */}
            <div className="text-center text-[9px] font-semibold text-slate-500 pb-0.5 pt-0 leading-none">
              {group.title}
            </div>
          </div>
        </div>
      ))}
      <div className="flex-1" />
    </div>
  );
}

function ToolButton({
  icon, label, variant = 'default'
}: {
  icon: React.ReactNode; label: string; variant?: 'primary' | 'danger' | 'default';
}) {
  const iconColor =
    variant === 'primary' ? 'text-white' :
    variant === 'danger' ? 'text-white' : 'text-slate-700';

  const iconBg =
    variant === 'primary' ? 'linear-gradient(145deg, #3b82f6, #2563eb)' :
    variant === 'danger' ? 'linear-gradient(145deg, #ef4444, #dc2626)' :
    'linear-gradient(145deg, #ffffff, #e2e8f0)';

  const iconBorder =
    variant === 'primary' ? '1px solid #1d4ed8' :
    variant === 'danger' ? '1px solid #b91c1c' :
    '1px solid #cbd5e1';

  const iconShadow =
    variant === 'primary' ? '0 2px 5px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.25)' :
    variant === 'danger' ? '0 2px 5px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.25)' :
    '0 1px 2px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)';

  return (
    <button
      className="group flex flex-col items-center justify-center gap-1 px-1.5 py-0.5 rounded-lg transition-all duration-150 cursor-pointer border border-transparent hover:border-slate-300 hover:bg-white/80 hover:-translate-y-0.5"
      style={{minWidth: '54px'}}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 group-hover:shadow-md ${iconColor}`}
        style={{
          background: iconBg,
          border: iconBorder,
          boxShadow: iconShadow,
        }}
      >
        {icon}
      </div>
      <span className="text-[9.5px] font-semibold text-slate-700 leading-none text-center whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

// ==================== FAMILY TREE NODE ====================
function PersonNode({
  name, year, gender, gen, selected, isDeceased = false
}: {
  name: string; year: string; gender: 'male' | 'female'; gen: number;
  selected?: boolean; isDeceased?: boolean;
}) {
  const isMale = gender === 'male';
  const accent = isMale
    ? { border: '#3b82f6', bgGrad: 'linear-gradient(145deg, #60a5fa, #1d4ed8)', ring: 'rgba(37,99,235,0.5)', badge: 'linear-gradient(145deg, #3b82f6, #1d4ed8)' }
    : { border: '#ec4899', bgGrad: 'linear-gradient(145deg, #f472b6, #be185d)', ring: 'rgba(219,39,119,0.5)', badge: 'linear-gradient(145deg, #ec4899, #be185d)' };

  return (
    <div className="flex flex-col items-center relative">
      <div
        className={`tree-node relative w-[120px] rounded-2xl px-2.5 py-2.5 flex flex-col items-center transition-all duration-200
          ${selected ? 'selected' : ''}
        `}
        style={{
          background: isDeceased
            ? 'linear-gradient(145deg, #f1f5f9, #e2e8f0)'
            : 'linear-gradient(145deg, #ffffff, #f8fafc)',
          border: selected ? `2.5px solid ${accent.border}` : `2px solid ${isMale ? '#93c5fd' : '#f9a8d4'}`,
          boxShadow: selected
            ? `0 0 0 3px ${accent.ring}, 0 10px 25px -5px ${accent.ring}, inset 0 1px 0 rgba(255,255,255,1)`
            : '0 4px 10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        {/* Generation badge - top right */}
        <div
          className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-black"
          style={{
            background: accent.badge,
            border: '2px solid white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
          }}
        >
          {gen}
        </div>

        {/* Deceased indicator - top left */}
        {isDeceased && (
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-600 border-2 border-white flex items-center justify-center shadow-md">
            <AlertCircle size={11} strokeWidth={2} className="text-white" />
          </div>
        )}

        {/* Avatar */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 relative ${isDeceased ? 'grayscale opacity-70' : ''}`}
          style={{
            background: accent.bgGrad,
            border: '3px solid white',
            boxShadow: `0 4px 10px ${accent.ring}, inset 0 2px 4px rgba(255,255,255,0.3)`,
          }}
        >
          {isMale ? (
            <User size={28} className="text-white" strokeWidth={1.8} />
          ) : (
            <User size={28} className="text-white" strokeWidth={1.8} />
          )}
        </div>

        {/* Name */}
        <div
          className={`text-[12px] font-extrabold text-center leading-tight ${isDeceased ? 'text-slate-500' : 'text-slate-800'}`}
          style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}
        >
          {name}
        </div>

        {/* Year with pill */}
        <div
          className="mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"
          style={{
            background: isMale ? '#dbeafe' : '#fce7f3',
            color: isMale ? '#1e40af' : '#9d174d',
          }}
        >
          <Calendar size={9} strokeWidth={2.2} />
          {year}
        </div>
      </div>
    </div>
  );
}



// ==================== TREE CANVAS ====================
function TreeCanvas() {
  return (
    <div
      className="flex-1 relative overflow-auto"
      style={{
        background: `
          radial-gradient(circle at 25% 25%, rgba(147,197,253,0.15) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(236,72,153,0.08) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #eff6ff 40%, #f1f5f9 100%)
        `,
      }}
    >
      {/* ═══ TOP TOOLBAR ═══ */}
      <div
        className="sticky top-0 z-30 px-3 py-2 flex items-center justify-between backdrop-blur-md"
        style={{
          background: 'linear-gradient(to bottom, rgba(248,250,252,0.95), rgba(241,245,249,0.9))',
          borderBottom: '1px solid #cbd5e1',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* Right: Add + view modes */}
        <div className="flex items-center gap-2">
          <button
            className="action-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[11px] font-bold shadow-md"
            style={{
              background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8)',
              border: '1px solid #1e40af',
              boxShadow: '0 2px 6px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <Plus size={13} strokeWidth={2.2} /> إضافة شخص
          </button>
          <div className="h-6 w-px bg-slate-300 mx-1" />
          <div className="flex items-center rounded-lg p-0.5" style={{background: '#e2e8f0'}}>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-white text-blue-700 shadow-sm">
              <Network size={11} strokeWidth={2} /> شجرة
            </button>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-medium text-slate-600 hover:bg-white/70">
              <LayoutGrid size={11} strokeWidth={2} /> شبكة
            </button>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10.5px] font-medium text-slate-600 hover:bg-white/70">
              <List size={11} strokeWidth={2} /> قائمة
            </button>
          </div>
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10.5px] font-medium text-slate-700 hover:bg-white border border-slate-200 bg-white/60">
            <Filter size={11} strokeWidth={2} /> تصفية
          </button>
        </div>

        {/* Center: navigation tools */}
        <div className="flex items-center gap-1">
          <ToolIconBtn><ChevronUp size={13} strokeWidth={2} /></ToolIconBtn>
          <ToolIconBtn><ArrowUpDown size={13} strokeWidth={2} /></ToolIconBtn>
          <ToolIconBtn active><Move size={13} strokeWidth={2} /></ToolIconBtn>
          <ToolIconBtn><RotateCcw size={13} strokeWidth={2} /></ToolIconBtn>
        </div>

        {/* Left: search + zoom */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm">
            <Search size={13} strokeWidth={2} />
          </button>
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)',
              border: '1px solid #cbd5e1',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)',
            }}
          >
            <button className="w-8 h-8 flex items-center justify-center hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition">
              <ZoomIn size={14} strokeWidth={2} />
            </button>
            <div className="px-2 text-[11px] font-bold text-slate-700 border-x border-slate-200 min-w-[48px] text-center tabular-nums">
              100%
            </div>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition">
              <ZoomOut size={14} strokeWidth={2} />
            </button>
          </div>
          <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm" title="ملاءمة للشاشة">
            <Maximize2 size={13} strokeWidth={2} />
          </button>
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold text-white"
            style={{
              background: 'linear-gradient(to bottom, #22c55e, #16a34a)',
              border: '1px solid #15803d',
              boxShadow: '0 1px 3px rgba(22,163,74,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <Check size={11} strokeWidth={2.5} /> محفوظ
          </div>
        </div>
      </div>

      {/* ═══ BREADCRUMBS ═══ */}
      <div
        className="px-4 py-1.5 flex items-center justify-between"
        style={{background: 'rgba(255,255,255,0.75)', borderBottom: '1px solid #e2e8f0'}}
      >
        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          <span className="flex items-center gap-1 font-semibold">
            <Users size={12} strokeWidth={2} className="text-blue-600" /> 9 أشخاص
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 font-semibold">
            <Home size={12} strokeWidth={2} className="text-emerald-600" /> 3 عائلات
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 font-semibold">
            <GitBranch size={12} strokeWidth={2} className="text-amber-600" style={{transform: 'scaleX(-1)'}} /> 3 أجيال
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11.5px]" dir="rtl">
          <span className="font-bold text-blue-700">محمد الأحمدي</span>
          <ChevronLeft size={11} strokeWidth={2} className="text-slate-400" />
          <span>الأحمدي</span>
          <ChevronLeft size={11} strokeWidth={2} className="text-slate-400" />
          <span className="text-slate-500">العائلات</span>
        </div>
      </div>

      {/* ═══ MINI MAP ═══ */}
      <div
        className="absolute top-[60px] left-4 z-20 w-[132px] rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #ffffff, #f1f5f9)',
          border: '1px solid #cbd5e1',
          boxShadow: '0 6px 18px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
          <List size={10} strokeWidth={2.2} className="text-slate-600" />
          <span className="text-[10px] font-bold text-slate-700">الخريطة المصغرة</span>
        </div>
        <div className="relative h-[100px] m-2 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
          <div className="absolute top-2 right-3 left-3 h-1 bg-gradient-to-r from-blue-300 via-pink-300 to-blue-300 rounded opacity-60"></div>
          <div className="absolute top-8 right-1 left-1 h-1 bg-gradient-to-r from-pink-300 via-blue-400 to-blue-300 rounded opacity-50"></div>
          <div className="absolute top-14 right-0 left-0 h-1 bg-gradient-to-r from-blue-300 via-pink-300 to-blue-300 rounded opacity-40"></div>
          <div
            className="absolute border-2 border-blue-500 bg-blue-400/20 top-3 right-3 w-[60%] h-[50%] rounded-sm"
            style={{boxShadow: '0 0 0 1px rgba(255,255,255,0.8)'}}
          ></div>
        </div>
      </div>

      {/* ═══ GENERATION BADGES ═══ */}
      <div className="absolute top-[80px] right-4 z-20 flex flex-col gap-[134px]">
        {[
          {label: 'الجيل الأول', sub: 'المؤسسون'},
          {label: 'الجيل الثاني', sub: 'الأبناء'},
          {label: 'الجيل الثالث', sub: 'الأحفاد'},
        ].map((g, i) => (
          <div key={i} className="flex flex-col items-end">
            <div
              className="px-2.5 py-1 rounded-lg text-white text-[10px] font-black shadow-md"
              style={{
                background: 'linear-gradient(to bottom, #3b82f6, #2563eb)',
                border: '1px solid #1d4ed8',
                boxShadow: '0 2px 6px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}
            >
              {g.label}
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5 font-semibold">{g.sub}</div>
          </div>
        ))}
      </div>

      {/* ═══ LEGEND ═══ */}
      <div
        className="absolute bottom-16 left-4 z-20 rounded-xl p-2.5"
        style={{
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="text-[10px] font-bold text-slate-700 mb-1.5">دليل الألوان</div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full" style={{background: 'linear-gradient(145deg, #60a5fa, #1d4ed8)'}}></div>
            <span className="text-[9.5px] text-slate-600 font-medium">ذكر</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full" style={{background: 'linear-gradient(145deg, #f472b6, #be185d)'}}></div>
            <span className="text-[9.5px] text-slate-600 font-medium">أنثى</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-0 border-t-2 border-dashed border-pink-400"></div>
            <span className="text-[9.5px] text-slate-600 font-medium">زواج</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-0 border-t-2 border-blue-500"></div>
            <span className="text-[9.5px] text-slate-600 font-medium">نسب</span>
          </div>
        </div>
      </div>

      {/* ═══ TREE DRAWING AREA ═══ */}
      <div className="min-w-[1050px] min-h-[680px] px-16 py-14 flex flex-col items-center">
        {/* GEN 1 */}
        <div className="flex items-start gap-0 relative">
          <PersonNode name="مريم سالم" year="1930" gender="female" gen={1} isDeceased />
          <div className="flex items-center" style={{marginTop: '62px'}}>
            <div className="w-6 h-0 border-t-2 border-dashed border-pink-400"></div>
            <Heart size={14} strokeWidth={1.8} className="text-pink-500 fill-pink-100 mx-0.5" />
            <div className="w-6 h-0 border-t-2 border-dashed border-pink-400"></div>
          </div>
          <PersonNode name="أحمد الأحمدي" year="1925" gender="male" gen={1} isDeceased />
        </div>

        {/* Trunk */}
        <div className="w-1 h-10" style={{background: 'linear-gradient(to bottom, #3b82f6, #60a5fa)'}}></div>

        {/* Horizontal sibling line */}
        <div className="relative w-full max-w-3xl">
          <div
            className="absolute top-0 right-[18%] left-[22%] h-0.5"
            style={{background: '#3b82f6', boxShadow: '0 1px 2px rgba(59,130,246,0.3)'}}
          ></div>
        </div>

        {/* Vertical drops */}
        <div className="relative w-full max-w-3xl h-8">
          <div className="absolute top-0 right-[28%] w-0.5 h-full bg-blue-500"></div>
          <div className="absolute top-0 left-[30%] w-0.5 h-full bg-blue-500"></div>
        </div>

        {/* GEN 2 */}
        <div className="flex items-start justify-between relative w-full max-w-3xl" style={{padding: '0 48px'}}>
          <div className="flex flex-col items-center">
            <div className="flex items-start gap-0">
              <PersonNode name="نورة الفاهمي" year="1963" gender="female" gen={2} />
              <div className="flex items-center" style={{marginTop: '62px'}}>
                <div className="w-5 h-0 border-t-2 border-dashed border-pink-400"></div>
                <Heart size={12} strokeWidth={1.8} className="text-pink-500 fill-pink-100 mx-0.5" />
                <div className="w-5 h-0 border-t-2 border-dashed border-pink-400"></div>
              </div>
              <PersonNode name="محمد الأحمدي" year="1960" gender="male" gen={2} selected />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-start gap-0">
              <PersonNode name="هند السالم" year="1965" gender="female" gen={2} />
              <div className="flex items-center" style={{marginTop: '62px'}}>
                <div className="w-5 h-0 border-t-2 border-dashed border-pink-400"></div>
                <Heart size={12} strokeWidth={1.8} className="text-pink-500 fill-pink-100 mx-0.5" />
                <div className="w-5 h-0 border-t-2 border-dashed border-pink-400"></div>
              </div>
              <PersonNode name="علي الأحمدي" year="1963" gender="male" gen={2} />
            </div>
          </div>
        </div>

        {/* Vertical drops to Gen 3 */}
        <div className="relative w-full max-w-4xl h-8">
          <div className="absolute top-0 right-[15%] w-0.5 h-full bg-blue-500"></div>
          <div className="absolute top-0 right-[32%] w-0.5 h-full bg-blue-500"></div>
          <div className="absolute top-0 right-[50%] w-0.5 h-full bg-blue-500"></div>
          <div className="absolute top-0 left-[18%] w-0.5 h-full bg-blue-500"></div>
        </div>

        {/* Horizontal connector Gen 3 */}
        <div className="relative w-full max-w-4xl">
          <div
            className="absolute top-0 right-[12%] left-[15%] h-0.5"
            style={{background: '#3b82f6', boxShadow: '0 1px 2px rgba(59,130,246,0.3)'}}
          ></div>
        </div>

        {/* GEN 3 */}
        <div className="flex items-start justify-between gap-4 w-full max-w-4xl" style={{padding: '0 24px'}}>
          <PersonNode name="أحمد محمد" year="1985" gender="male" gen={3} />
          <PersonNode name="سارة محمد" year="1988" gender="female" gen={3} />
          <PersonNode name="عمر محمد" year="1991" gender="male" gen={3} />
          <PersonNode name="يوسف علي" year="1990" gender="male" gen={3} />
        </div>
      </div>

      {/* ═══ BOTTOM HINT ═══ */}
      <div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[11px] font-medium flex items-center gap-1.5"
        style={{
          background: 'rgba(255,255,255,0.95)',
          color: '#475569',
          border: '1px solid #cbd5e1',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <MousePointer size={12} strokeWidth={2} className="text-blue-600" />
        استخدم عجلة الفأرة للتكبير والتصغير • اسحب للتنقل في الشجرة
      </div>

      {/* ═══ BOTTOM ACTION BAR ═══ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 px-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
          borderTop: '1px solid #cbd5e1',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <button
            className="action-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-[11px] font-bold shadow-sm"
            style={{
              background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8)',
              border: '1px solid #1e40af',
              boxShadow: '0 2px 5px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <Plus size={13} strokeWidth={2.2} /> إضافة شخص
          </button>
          <button className="action-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-[11px] font-medium hover:bg-slate-50 shadow-sm">
            <Share2 size={12} strokeWidth={2} /> ترتيب تلقائي
          </button>
          <button className="action-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-[11px] font-medium hover:bg-slate-50 shadow-sm">
            <Download size={12} strokeWidth={2} /> تصدير
          </button>
          <button className="action-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-[11px] font-medium hover:bg-slate-50 shadow-sm">
            <Printer size={12} strokeWidth={2} /> طباعة
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            className="action-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-700 shadow-sm"
            style={{background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)', border: '1px solid #cbd5e1'}}
          >
            <Copy size={12} strokeWidth={2} /> نسخ
          </button>
          <button
            className="action-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium shadow-sm"
            style={{background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)', border: '1px solid #cbd5e1', color: '#dc2626'}}
          >
            <Trash2 size={12} strokeWidth={2} /> حذف المحدد
          </button>
        </div>
      </div>
    </div>
  );
}

function ToolIconBtn({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
        active
          ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
          : 'text-slate-500 hover:bg-white/70 hover:text-slate-700 border border-transparent'
      }`}
    >
      {children}
    </button>
  );
}

// ==================== PROFILE HEADER (in left sidebar) ====================
function ProfileHeader({
  name, gender, id, job, gen, spouses, children, age, photoUrl,
}: {
  name: string; gender: 'ذكر' | 'أنثى' | string;
  id: string; job: string; gen: number;
  spouses: number; children: number; age: number;
  photoUrl?: string | null;
}) {
  const isMale = gender === 'ذكر';
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #f0f6fd 100%)',
        border: '1px solid rgba(59,130,246,0.25)',
        boxShadow: '0 4px 14px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)',
      }}
    >
      {/* ═══ Cover / top banner ═══ */}
      <div
        className="relative h-[64px]"
        style={{
          background: isMale
            ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)'
            : 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #fbcfe8 100%)',
        }}
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        />
      </div>

      {/* ═══ Content ═══ */}
      <div className="px-4 pb-4">
        {/* ═══ Avatar frame (overlaps the cover) ═══ */}
        <div className="relative -mt-[44px] flex items-end justify-between">
          <div className="relative">
            {/* Circular frame with photo or icon */}
            <div
              className="w-[88px] h-[88px] rounded-full flex items-center justify-center relative overflow-hidden"
              style={{
                border: '3.5px solid #ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(59,130,246,0.15)',
                background: photoUrl
                  ? '#f1f5f9'
                  : (isMale
                      ? 'linear-gradient(145deg, #60a5fa, #1d4ed8)'
                      : 'linear-gradient(145deg, #f472b6, #be185d)'),
              }}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                  style={{filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'}}
                />
              ) : (
                <User size={42} className="text-white" strokeWidth={1.6} />
              )}
            </div>

            {/* Generation badge (top-left) */}
            <div
              className="absolute -top-0.5 -left-0.5 w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-black"
              style={{
                background: 'linear-gradient(145deg, #f59e0b, #d97706)',
                border: '2.5px solid #ffffff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              }}
            >
              {gen}
            </div>

            {/* Active / verified indicator (bottom-right) */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #22c55e, #16a34a)',
                border: '2.5px solid #ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              }}
            >
              <Check size={13} className="text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Quick edit icon in top-right of card (over cover) */}
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center mt-1"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid #e2e8f0',
              color: '#64748b',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
            title="تغيير الصورة"
          >
            <Pencil size={12} strokeWidth={2} />
          </button>
        </div>

        {/* ═══ Name & meta ═══ */}
        <div className="mt-2.5">
          <h3 className="text-[15px] font-extrabold text-slate-800 leading-tight text-center">
            {name}
          </h3>
          <div className="flex items-center justify-center gap-1.5 mt-1.5 flex-wrap">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{
                background: isMale
                  ? 'linear-gradient(to bottom, #dbeafe, #bfdbfe)'
                  : 'linear-gradient(to bottom, #fce7f3, #fbcfe8)',
                color: isMale ? '#1e40af' : '#9d174d',
                border: `1px solid ${isMale ? '#93c5fd' : '#f9a8d4'}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{background: isMale ? '#3b82f6' : '#ec4899'}}
              />
              {gender}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {id} • {job}
            </span>
          </div>
        </div>

        {/* ═══ Divider ═══ */}
        <div
          className="my-3 h-px"
          style={{
            background: 'linear-gradient(to left, transparent, #cbd5e1, transparent)',
          }}
        />

        {/* ═══ Stat mini-cards ═══ */}
        <div className="grid grid-cols-3 gap-2">
          <PersonStat icon={<Heart size={14} strokeWidth={2} />} value={String(spouses)} label="الزوجات" color={isMale ? 'pink' : 'blue'} />
          <PersonStat icon={<Users size={14} strokeWidth={2} />} value={String(children)} label="الأبناء" color="blue" />
          <PersonStat icon={<Calendar size={14} strokeWidth={2} />} value={String(age)} label="العمر" color="amber" />
        </div>
      </div>
    </div>
  );
}

// ==================== LEFT SIDEBAR: PERSON DETAILS ====================
function LeftSidebar() {
  return (
    <div
      className="w-[272px] flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #f5f8fc 0%, #eef2f7 100%)',
        borderRight: '1px solid #cbd5e1',
        boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.8)',
      }}
    >
      {/* ═══ HEADER ═══ */}
      <div
        className="px-3 py-2.5 flex items-center justify-between shadow-md relative z-10"
        style={{
          background: 'linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%)',
          borderBottom: '1px solid #1d4ed8',
        }}
      >
        <button className="w-7 h-7 rounded-md flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition">
          <ChevronLeft size={15} strokeWidth={1.8} />
        </button>
        <div className="flex items-center gap-1.5">
          <h2 className="text-white font-bold text-[13px]">بطاقة الشخص</h2>
          <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
            <User size={13} strokeWidth={2} className="text-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* ═══ PROFILE HEADER CARD ═══ */}
        <ProfileHeader
          name="محمد بن أحمد الأحمدي"
          gender="ذكر"
          id="#24"
          job="مهندس مدني"
          gen={2}
          spouses={1}
          children={5}
          age={64}
          photoUrl={null}
        />

        {/* ═══ BASIC INFO CARD ═══ */}
        <InfoCard title="البيانات الأساسية" icon={<User size={13} strokeWidth={2} />} iconColor="#2563eb">
          <InfoRow icon={<Calendar size={14} strokeWidth={1.8} className="text-blue-500" />} label="تاريخ الميلاد" value="15/03/1960 (64 سنة)" />
          <InfoRow icon={<Home size={14} strokeWidth={1.8} className="text-emerald-600" />} label="مكان الميلاد" value="الرياض، السعودية" />
          <InfoRow icon={<Briefcase size={14} strokeWidth={1.8} className="text-amber-600" />} label="المهنة" value="مهندس مدني" />
          <InfoRow icon={<Flag size={14} strokeWidth={1.8} className="text-red-500" />} label="الجنسية" value="سعودي" />
        </InfoCard>

        {/* ═══ CONTACT CARD ═══ */}
        <InfoCard title="بيانات الاتصال" icon={<Phone size={13} strokeWidth={2} />} iconColor="#2563eb">
          <InfoRow icon={<Phone size={14} strokeWidth={1.8} className="text-blue-500" />} label="الهاتف" value="+966 50 123 4567" />
          <InfoRow icon={<Mail size={14} strokeWidth={1.8} className="text-red-500" />} label="البريد الإلكتروني" value="m.ahmadi@mail.com" />
        </InfoCard>

        {/* ═══ ADDRESS CARD ═══ */}
        <InfoCard title="العنوان" icon={<MapPin size={13} strokeWidth={2} />} iconColor="#2563eb">
          <InfoRow icon={<MapPin size={14} strokeWidth={1.8} className="text-purple-500" />} label="المدينة" value="الرياض" />
          <InfoRow icon={<Home size={14} strokeWidth={1.8} className="text-emerald-600" />} label="الحي" value="حي النخيل" />
          <InfoRow icon={<FileText size={14} strokeWidth={1.8} className="text-slate-600" />} label="الرمز البريدي" value="12345" />
        </InfoCard>

        {/* ═══ FAMILY LINKS CARD ═══ */}
        <InfoCard title="الروابط العائلية" icon={<HeartHandshake size={13} strokeWidth={2} />} iconColor="#ec4899">
          <RelationRow label="الأب" name="أحمد الأحمدي" gender="male" />
          <RelationRow label="الأم" name="نورة الفاهمي" gender="female" />
          <RelationRow label="الزوجة" name="سارة محمد" gender="female" />
          <RelationRow label="الابن الأكبر" name="أحمد محمد" gender="male" />
        </InfoCard>

        {/* ═══ ACTION BUTTONS ═══ */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            className="action-btn flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-[12px] font-bold shadow-md"
            style={{
              background: 'linear-gradient(to bottom, #3b82f6 0%, #1d4ed8 100%)',
              border: '1px solid #1e40af',
              boxShadow: '0 3px 8px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <Pencil size={14} strokeWidth={2} />
            تعديل البيانات
          </button>
          <button
            className="action-btn flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-red-700 text-[12px] font-bold"
            style={{
              background: 'linear-gradient(to bottom, #fef2f2, #fee2e2)',
              border: '1px solid #fca5a5',
              boxShadow: '0 2px 4px rgba(239,68,68,0.12), inset 0 1px 0 rgba(255,255,255,1)',
            }}
          >
            <Trash2 size={14} strokeWidth={2} />
            حذف
          </button>
        </div>
        <button
          className="action-btn w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-slate-700 text-[12px] font-bold"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #f1f5f9)',
            border: '1px solid #cbd5e1',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
          }}
        >
          <Eye size={14} strokeWidth={2} className="text-blue-600" />
          عرض التفاصيل الكاملة
        </button>
      </div>
    </div>
  );
}

function PersonStat({
  icon, value, label, color
}: {
  icon: React.ReactNode; value: string; label: string;
  color: 'blue' | 'pink' | 'amber';
}) {
  const colors = {
    blue:  { bg: 'linear-gradient(145deg, #dbeafe, #bfdbfe)', text: '#1e40af', icon: 'text-blue-600', dot: '#3b82f6' },
    pink:  { bg: 'linear-gradient(145deg, #fce7f3, #fbcfe8)', text: '#9d174d', icon: 'text-pink-600', dot: '#ec4899' },
    amber: { bg: 'linear-gradient(145deg, #fef3c7, #fde68a)', text: '#92400e', icon: 'text-amber-600', dot: '#f59e0b' },
  }[color];
  return (
    <div
      className="flex flex-col items-center gap-0.5 py-2 rounded-lg"
      style={{
        background: colors.bg,
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <div className={`${colors.icon}`}>{icon}</div>
      <div className="text-[17px] font-black leading-none" style={{color: colors.text}}>{value}</div>
      <div className="text-[9.5px] font-semibold text-slate-600 flex items-center gap-0.5">
        <span className="w-1 h-1 rounded-full" style={{background: colors.dot}}></span>
        {label}
      </div>
    </div>
  );
}

function InfoCard({
  title, icon, iconColor, children
}: {
  title: string; icon: React.ReactNode; iconColor: string; children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)',
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{
          background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
          borderColor: '#e2e8f0',
        }}
      >
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{
            background: `${iconColor}15`,
            color: iconColor,
            border: `1px solid ${iconColor}30`,
          }}
        >
          {icon}
        </div>
        <h3 className="text-[12px] font-bold text-slate-700">{title}</h3>
      </div>
      {/* Card body */}
      <div className="p-2.5 space-y-1.5">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors hover:bg-blue-50/50"
      style={{
        background: '#f8fafc',
        border: '1px solid #f1f5f9',
      }}
    >
      <div className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[9.5px] text-slate-500 leading-tight font-medium">{label}</div>
        <div className="text-[11.5px] text-slate-800 font-bold leading-tight truncate">{value}</div>
      </div>
    </div>
  );
}

function RelationRow({ label, name, gender }: { label: string; name: string; gender: 'male' | 'female' }) {
  const isMale = gender === 'male';
  return (
    <div
      className="flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-all hover:bg-blue-50/70 hover:border-blue-200"
      style={{
        background: '#f8fafc',
        border: '1px solid #f1f5f9',
      }}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-sm`}
        style={{
          background: isMale
            ? 'linear-gradient(145deg, #60a5fa, #2563eb)'
            : 'linear-gradient(145deg, #f472b6, #db2777)',
          border: '2px solid white',
        }}
      >
        <User size={13} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11.5px] font-bold text-slate-800 truncate leading-tight">{name}</div>
      </div>
      <span
        className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full"
        style={{
          background: isMale ? '#dbeafe' : '#fce7f3',
          color: isMale ? '#1e40af' : '#9d174d',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ==================== RIGHT SIDEBAR: FAMILIES PANEL ====================
function RightSidebar() {
  // Active tab state (demo only — static rendering, "العائلات" is active)
  const families = [
    { name: 'عائلة الأحمدي', count: 48, color: 'blue', active: true },
    { name: 'عائلة الزهراني', count: 62, color: 'emerald' },
    { name: 'عائلة القحطاني', count: 35, color: 'amber' },
    { name: 'عائلة العتيبي', count: 51, color: 'purple' },
    { name: 'عائلة الغامدي', count: 29, color: 'rose' },
    { name: 'عائلة الحربي', count: 23, color: 'cyan' },
    { name: 'عائلة المطيري', count: 44, color: 'indigo' },
    { name: 'عائلة السبيعي', count: 18, color: 'teal' },
    { name: 'عائلة الرشيدي', count: 32, color: 'orange' },
    { name: 'عائلة الشمري', count: 27, color: 'fuchsia' },
    { name: 'عائلة العنزي', count: 19, color: 'lime' },
    { name: 'عائلة الدوسري', count: 38, color: 'sky' },
  ];

  const total = families.reduce((s, f) => s + f.count, 0);

  return (
    <div
      className="w-[280px] flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #f5f8fc 0%, #eef2f7 100%)',
        borderLeft: '1px solid #cbd5e1',
        boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.8)',
      }}
    >
      {/* ═══ HEADER ═══ */}
      <div
        className="px-3 py-2.5 flex items-center justify-between shadow-md relative z-10"
        style={{
          background: 'linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%)',
          borderBottom: '1px solid #1d4ed8',
        }}
      >
        <button className="w-7 h-7 rounded-md flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition">
          <ChevronRight size={15} strokeWidth={1.8} />
        </button>
        <div className="flex items-center gap-1.5">
          <h2 className="text-white font-bold text-[13px]">العائلات والأشخاص</h2>
          <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
            <Users size={13} strokeWidth={2} className="text-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* ═══ SUMMARY PILL ═══ */}
        <div
          className="rounded-xl p-2.5 flex items-center justify-between"
          style={{
            background: 'linear-gradient(145deg, #dbeafe, #bfdbfe)',
            border: '1px solid #93c5fd',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-sm">
              <Network size={15} strokeWidth={1.8} />
            </div>
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

        {/* ═══ TABS ═══ */}
        <div
          className="flex items-center p-1 rounded-xl"
          style={{
            background: '#e2e8f0',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)',
          }}
        >
          <button
            className="flex-1 py-1.5 rounded-lg text-[11px] font-bold bg-white text-blue-700 shadow-sm flex items-center justify-center gap-1"
            style={{boxShadow: '0 1px 3px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)'}}
          >
            <Home size={12} strokeWidth={2} /> العائلات
          </button>
          <button className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-slate-600 flex items-center justify-center gap-1 hover:text-slate-800 transition">
            <User size={12} strokeWidth={2} /> الأشخاص
          </button>
        </div>

        {/* ═══ SEARCH BOX ═══ */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن اسم العائلة..."
            className="w-full rounded-xl py-2.5 pr-9 pl-3 text-[11.5px] text-slate-700 placeholder:text-slate-400 focus:outline-none transition-all"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
              border: '1px solid #cbd5e1',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
            }}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
            <Search size={12} strokeWidth={2.2} className="text-blue-600" />
          </div>
        </div>

        {/* ═══ FAMILIES LIST ═══ */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1 pt-1">
            <span className="text-[10.5px] font-bold text-slate-500 uppercase">قائمة العائلات</span>
            <span className="text-[9.5px] text-slate-400 font-medium">{families.length} عائلة</span>
          </div>

          {families.map((f, i) => (
            <FamilyRow key={i} {...f} />
          ))}
        </div>
      </div>

      {/* ═══ BOTTOM ADD BUTTON ═══ */}
      <div className="p-3 border-t border-slate-200" style={{background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)'}}>
        <button
          className="action-btn w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-[12px] font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(to bottom, #3b82f6 0%, #1d4ed8 100%)',
            border: '1px solid #1e40af',
            boxShadow: '0 4px 10px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          <Plus size={15} strokeWidth={2.2} />
          إضافة عائلة جديدة
        </button>
      </div>
    </div>
  );
}

const colorMap: Record<string, { bg: string; border: string; avatarBg: string; avatarShadow: string; text: string; countBg: string; countText: string }> = {
  blue:    { bg: 'linear-gradient(145deg, #dbeafe, #bfdbfe)', border: '#93c5fd', avatarBg: 'linear-gradient(145deg, #3b82f6, #1d4ed8)', avatarShadow: '0 2px 5px rgba(37,99,235,0.35)', text: '#1e3a8a', countBg: '#ffffff', countText: '#1e40af' },
  emerald: { bg: 'linear-gradient(145deg, #d1fae5, #a7f3d0)', border: '#6ee7b7', avatarBg: 'linear-gradient(145deg, #10b981, #047857)', avatarShadow: '0 2px 5px rgba(5,150,105,0.35)', text: '#064e3b', countBg: '#ffffff', countText: '#065f46' },
  amber:   { bg: 'linear-gradient(145deg, #fef3c7, #fde68a)', border: '#fcd34d', avatarBg: 'linear-gradient(145deg, #f59e0b, #b45309)', avatarShadow: '0 2px 5px rgba(180,83,9,0.35)', text: '#78350f', countBg: '#ffffff', countText: '#92400e' },
  purple:  { bg: 'linear-gradient(145deg, #e9d5ff, #d8b4fe)', border: '#c4b5fd', avatarBg: 'linear-gradient(145deg, #a855f7, #6d28d9)', avatarShadow: '0 2px 5px rgba(109,40,217,0.35)', text: '#4c1d95', countBg: '#ffffff', countText: '#6d28d9' },
  rose:    { bg: 'linear-gradient(145deg, #ffe4e6, #fecdd3)', border: '#fda4af', avatarBg: 'linear-gradient(145deg, #f43f5e, #9f1239)', avatarShadow: '0 2px 5px rgba(159,18,57,0.35)', text: '#881337', countBg: '#ffffff', countText: '#9f1239' },
  cyan:    { bg: 'linear-gradient(145deg, #cffafe, #a5f3fc)', border: '#67e8f9', avatarBg: 'linear-gradient(145deg, #06b6d4, #0e7490)', avatarShadow: '0 2px 5px rgba(14,116,144,0.35)', text: '#083344', countBg: '#ffffff', countText: '#0e7490' },
  indigo:  { bg: 'linear-gradient(145deg, #e0e7ff, #c7d2fe)', border: '#a5b4fc', avatarBg: 'linear-gradient(145deg, #6366f1, #3730a3)', avatarShadow: '0 2px 5px rgba(55,48,163,0.35)', text: '#312e81', countBg: '#ffffff', countText: '#3730a3' },
  teal:    { bg: 'linear-gradient(145deg, #ccfbf1, #99f6e4)', border: '#5eead4', avatarBg: 'linear-gradient(145deg, #14b8a6, #0f766e)', avatarShadow: '0 2px 5px rgba(15,118,110,0.35)', text: '#042f2e', countBg: '#ffffff', countText: '#0f766e' },
  orange:  { bg: 'linear-gradient(145deg, #ffedd5, #fed7aa)', border: '#fdba74', avatarBg: 'linear-gradient(145deg, #f97316, #9a3412)', avatarShadow: '0 2px 5px rgba(154,52,18,0.35)', text: '#7c2d12', countBg: '#ffffff', countText: '#9a3412' },
  fuchsia: { bg: 'linear-gradient(145deg, #fae8ff, #f5d0fe)', border: '#f0abfc', avatarBg: 'linear-gradient(145deg, #d946ef, #86198f)', avatarShadow: '0 2px 5px rgba(134,25,143,0.35)', text: '#701a75', countBg: '#ffffff', countText: '#86198f' },
  lime:    { bg: 'linear-gradient(145deg, #ecfccb, #d9f99d)', border: '#bef264', avatarBg: 'linear-gradient(145deg, #84cc16, #3f6212)', avatarShadow: '0 2px 5px rgba(63,98,18,0.35)', text: '#365314', countBg: '#ffffff', countText: '#3f6212' },
  sky:     { bg: 'linear-gradient(145deg, #e0f2fe, #bae6fd)', border: '#7dd3fc', avatarBg: 'linear-gradient(145deg, #0ea5e9, #075985)', avatarShadow: '0 2px 5px rgba(7,89,133,0.35)', text: '#082f49', countBg: '#ffffff', countText: '#075985' },
};

function FamilyRow({
  name, count, color, active = false
}: {
  name: string; count: number; color: string; active?: boolean;
}) {
  const c = colorMap[color] || colorMap.blue;
  return (
    <button
      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-right transition-all duration-150 group hover:-translate-y-0.5"
      style={{
        background: active ? c.bg : 'linear-gradient(145deg, #ffffff, #f8fafc)',
        border: active ? `1.5px solid ${c.border}` : '1px solid #e2e8f0',
        boxShadow: active
          ? `0 3px 8px ${c.avatarShadow}, inset 0 1px 0 rgba(255,255,255,0.8)`
          : '0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
      }}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
        style={{
          background: c.avatarBg,
          border: '1.5px solid rgba(255,255,255,0.8)',
          boxShadow: active ? c.avatarShadow : '0 2px 4px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
        }}
      >
        <Users size={18} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-right">
        <div
          className="text-[12px] font-bold truncate leading-tight"
          style={{color: active ? c.text : '#1e293b'}}
        >
          {name}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span
            className="text-[10px] font-semibold flex items-center gap-0.5"
            style={{color: active ? c.countText : '#64748b'}}
          >
            <User size={9} strokeWidth={2.4} />
            {count} فرد
          </span>
          {active && (
            <span className="text-[9px] font-bold px-1.5 py-px rounded-full text-white" style={{background: c.avatarBg}}>
              نشط
            </span>
          )}
        </div>
      </div>

      {/* Open/Chevron button */}
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-white group-hover:shadow-sm"
        style={{color: active ? c.countText : '#94a3b8'}}
      >
        <ChevronLeft size={14} strokeWidth={2.5} />
      </div>
    </button>
  );
}

// ==================== STATUS BAR ====================
function StatusBar() {
  const SW = 1.8; // standard strokeWidth for status bar icons
  return (
    <div
      className="h-9 flex items-center justify-between px-0"
      style={{
        background: 'linear-gradient(to bottom, #e2e8f0 0%, #cbd5e1 100%)',
        borderTop: '1px solid #94a3b8',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
    >
      {/* ═══ RIGHT SIDE ═══ */}
      <div className="flex items-center h-full divide-x divide-slate-300/80">
        {/* Version */}
        <div className="h-full flex items-center px-3 gap-2">
          <span
            className="text-[10px] font-black text-green-700 px-1.5 py-0.5 rounded font-mono"
            style={{
              background: 'linear-gradient(to bottom, #dcfce7, #bbf7d0)',
              border: '1px solid #86efac',
            }}
          >
            v2.0.1
          </span>
        </div>

        {/* Notifications */}
        <div className="h-full flex items-center px-3 gap-2">
          <StatusPill value="3" color="blue" />
          <span className="text-[11px] font-medium text-slate-700">تنبيهات</span>
        </div>

        {/* Current time */}
        <div className="h-full flex items-center px-3 gap-1.5 text-slate-700">
          <Clock size={13} strokeWidth={SW} className="text-slate-500" />
          <span className="text-[11px]">الوقت:</span>
          <span className="text-[11px] font-bold tabular-nums text-slate-800">١٤:٤٨</span>
        </div>

        {/* File size */}
        <div className="h-full flex items-center px-3 gap-1.5 text-slate-700">
          <HardDrive size={13} strokeWidth={SW} className="text-slate-500" />
          <span className="text-[11px]">حجم الملف:</span>
          <span className="text-[11px] font-bold text-slate-800">48.2 KB</span>
        </div>

        {/* Last save */}
        <div className="h-full flex items-center px-3 gap-1.5 text-slate-700">
          <Save size={13} strokeWidth={SW} className="text-green-600" />
          <span className="text-[11px]">آخر حفظ:</span>
          <span className="text-[11px] font-bold text-green-700">قبل دقيقتين</span>
        </div>
      </div>

      {/* ═══ LEFT SIDE ═══ */}
      <div className="flex items-center h-full divide-x divide-slate-300/80">
        {/* Memory */}
        <div className="h-full flex items-center px-3 gap-1.5 text-slate-700">
          <Database size={13} strokeWidth={SW} className="text-slate-500" />
          <span className="text-[11px]">الذاكرة:</span>
          <div
            className="w-20 h-2.5 rounded-full overflow-hidden"
            style={{
              background: '#94a3b8',
              border: '1px solid #64748b',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)',
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: '34%',
                background: 'linear-gradient(to left, #2563eb, #60a5fa)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            ></div>
          </div>
          <span className="text-[10px] font-bold text-slate-700 tabular-nums">34%</span>
        </div>

        {/* Backup status */}
        <div
          className="h-full flex items-center px-3 gap-1.5"
          style={{background: 'rgba(34,197,94,0.12)'}}
        >
          <ShieldCheck size={13} strokeWidth={SW} className="text-green-600" />
          <span className="text-[11px] text-slate-700">النسخ الاحتياطي:</span>
          <span className="text-[11px] font-bold text-green-700">مُفعّل</span>
        </div>

        {/* Last operation */}
        <div
          className="h-full flex items-center px-3 gap-1.5"
          style={{background: 'rgba(59,130,246,0.10)'}}
        >
          <MousePointer2 size={13} strokeWidth={SW} className="text-blue-600" />
          <span className="text-[11px] text-slate-700">آخر عملية:</span>
          <span className="text-[11px] font-bold text-blue-700">إضافة شخص</span>
        </div>

        {/* ═══ STAT PILLS ═══ */}
        {/* Generations */}
        <div className="h-full flex items-center px-2.5">
          <StatPill
            icon={<GitBranch size={12} strokeWidth={SW} style={{transform: 'scaleX(-1)'}} />}
            value="6"
            label="أجيال"
            color="amber"
          />
        </div>
        {/* Families */}
        <div className="h-full flex items-center px-2.5">
          <StatPill
            icon={<Home size={12} strokeWidth={SW} />}
            value="12"
            label="عائلات"
            color="emerald"
          />
        </div>
        {/* Females */}
        <div className="h-full flex items-center px-2.5">
          <StatPill
            icon={<User size={12} strokeWidth={SW} />}
            value="106"
            label="إناث"
            color="pink"
          />
        </div>
        {/* Males */}
        <div className="h-full flex items-center px-2.5">
          <StatPill
            icon={<User size={12} strokeWidth={SW} />}
            value="142"
            label="ذكور"
            color="blue"
          />
        </div>
        {/* Total persons */}
        <div className="h-full flex items-center px-3 pr-2">
          <StatPill
            icon={<Users size={12} strokeWidth={SW} />}
            value="248"
            label="الأشخاص"
            color="slate"
            strong
          />
        </div>
      </div>
    </div>
  );
}

// Small status pill (for males/females/etc.)
function StatPill({
  icon, value, label, color, strong = false,
}: {
  icon: React.ReactNode; value: string; label: string;
  color: 'blue' | 'pink' | 'amber' | 'emerald' | 'slate'; strong?: boolean;
}) {
  const schemes: Record<string, { bg: string; text: string; border: string; iconBg: string; iconColor: string }> = {
    blue:    { bg: '#eff6ff', text: '#1e3a8a', border: '#bfdbfe', iconBg: '#3b82f6', iconColor: '#fff' },
    pink:    { bg: '#fdf2f8', text: '#831843', border: '#fbcfe8', iconBg: '#ec4899', iconColor: '#fff' },
    amber:   { bg: '#fffbeb', text: '#78350f', border: '#fde68a', iconBg: '#f59e0b', iconColor: '#fff' },
    emerald: { bg: '#ecfdf5', text: '#064e3b', border: '#a7f3d0', iconBg: '#10b981', iconColor: '#fff' },
    slate:   { bg: '#f1f5f9', text: '#0f172a', border: '#cbd5e1', iconBg: '#475569', iconColor: '#fff' },
  };
  const s = schemes[color];
  return (
    <div
      className="flex items-center gap-1.5 h-6 px-1.5 pr-1 rounded-md"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        boxShadow: strong ? '0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)' : 'inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
    >
      <div
        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
        style={{background: s.iconBg, color: s.iconColor, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'}}
      >
        {icon}
      </div>
      <span
        className={`text-[10px] ${strong ? 'font-black' : 'font-bold'} tabular-nums leading-none`}
        style={{color: s.text}}
      >
        {value}
      </span>
      <span className="text-[10px] font-medium text-slate-600 leading-none">{label}</span>
    </div>
  );
}

function StatusPill({
  value, color,
}: { value: string; color: 'blue' | 'red' | 'green' | 'amber' }) {
  const bg = {
    blue: 'linear-gradient(to bottom, #3b82f6, #2563eb)',
    red: 'linear-gradient(to bottom, #ef4444, #dc2626)',
    green: 'linear-gradient(to bottom, #22c55e, #16a34a)',
    amber: 'linear-gradient(to bottom, #f59e0b, #d97706)',
  }[color];
  return (
    <span
      className="min-w-[20px] h-[18px] rounded-full text-[9px] font-black text-white flex items-center justify-center px-1"
      style={{background: bg, boxShadow: '0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)'}}
    >
      {value}
    </span>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#c9d6e8] overflow-hidden font-sans" dir="rtl">
      <TitleBar />
      <TopInfoBar />
      <MenuBar />
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <RightSidebar />
        <TreeCanvas />
        <LeftSidebar />
      </div>
      <StatusBar />
    </div>
  );
}
