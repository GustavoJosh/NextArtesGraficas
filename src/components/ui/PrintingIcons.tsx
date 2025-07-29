// src/components/ui/PrintingIcons.tsx
"use client";

export function PrinterIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Printer body */}
      <rect x="15" y="35" width="70" height="40" rx="4" fill="currentColor" opacity="0.8"/>
      {/* Paper tray */}
      <rect x="20" y="30" width="60" height="8" rx="2" fill="currentColor" opacity="0.6"/>
      {/* Screen */}
      <rect x="65" y="40" width="15" height="10" rx="2" fill="#3B82F6" className="animate-pulse"/>
      {/* Paper output */}
      <rect x="25" y="75" width="50" height="3" rx="1" fill="white" opacity="0.9"/>
      <rect x="30" y="78" width="40" height="3" rx="1" fill="white" opacity="0.7"/>
      {/* Buttons */}
      <circle cx="25" cy="45" r="2" fill="#10B981"/>
      <circle cx="32" cy="45" r="2" fill="#EF4444"/>
    </svg>
  );
}

export function LaserIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Laser machine body */}
      <rect x="10" y="40" width="80" height="35" rx="4" fill="currentColor" opacity="0.8"/>
      {/* Laser head */}
      <rect x="40" y="25" width="20" height="15" rx="2" fill="currentColor"/>
      {/* Laser beam */}
      <line x1="50" y1="40" x2="50" y2="65" stroke="#EF4444" strokeWidth="2" className="animate-pulse"/>
      <circle cx="50" cy="65" r="3" fill="#EF4444" opacity="0.6" className="animate-pulse"/>
      {/* Material */}
      <rect x="20" y="60" width="60" height="8" rx="1" fill="#8B5CF6" opacity="0.4"/>
      {/* Control panel */}
      <rect x="70" y="45" width="15" height="10" rx="2" fill="#3B82F6" className="animate-pulse"/>
    </svg>
  );
}

export function PaperIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stack of papers */}
      <rect x="25" y="20" width="50" height="60" rx="3" fill="white" opacity="0.9"/>
      <rect x="23" y="22" width="50" height="60" rx="3" fill="white" opacity="0.7"/>
      <rect x="21" y="24" width="50" height="60" rx="3" fill="white" opacity="0.5"/>
      {/* Text lines */}
      <line x1="30" y1="35" x2="65" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <line x1="30" y1="42" x2="60" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <line x1="30" y1="49" x2="68" y2="49" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <line x1="30" y1="56" x2="55" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      {/* Corner fold */}
      <path d="M65 20 L75 20 L75 30 Z" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

export function InkDropIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2C12 2 8 6 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 6 12 2 12 2Z" 
        fill="currentColor"
        className="animate-pulse"
      />
      <circle cx="12" cy="18" r="3" fill="currentColor" opacity="0.6"/>
      <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

export function MenuIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Menu card */}
      <rect x="20" y="15" width="60" height="70" rx="4" fill="white" stroke="currentColor" strokeWidth="2"/>
      {/* Header */}
      <rect x="25" y="20" width="50" height="8" rx="2" fill="currentColor" opacity="0.8"/>
      {/* Menu items */}
      <circle cx="30" cy="35" r="2" fill="#10B981"/>
      <line x1="35" y1="35" x2="65" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <circle cx="30" cy="45" r="2" fill="#EF4444"/>
      <line x1="35" y1="45" x2="65" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <circle cx="30" cy="55" r="2" fill="#3B82F6"/>
      <line x1="35" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <circle cx="30" cy="65" r="2" fill="#8B5CF6"/>
      <line x1="35" y1="65" x2="65" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      {/* Price column */}
      <line x1="70" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

export function WebsiteIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Browser window */}
      <rect x="10" y="20" width="80" height="60" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2"/>
      {/* Browser header */}
      <rect x="10" y="20" width="80" height="12" rx="4" fill="currentColor" opacity="0.8"/>
      {/* Browser buttons */}
      <circle cx="18" cy="26" r="2" fill="#EF4444"/>
      <circle cx="26" cy="26" r="2" fill="#F59E0B"/>
      <circle cx="34" cy="26" r="2" fill="#10B981"/>
      {/* Content blocks */}
      <rect x="15" y="38" width="70" height="8" rx="2" fill="currentColor" opacity="0.6"/>
      <rect x="15" y="50" width="30" height="20" rx="2" fill="currentColor" opacity="0.4"/>
      <rect x="50" y="50" width="35" height="20" rx="2" fill="currentColor" opacity="0.4"/>
      {/* Responsive indicator */}
      <rect x="75" y="35" width="8" height="12" rx="2" fill="#3B82F6" opacity="0.8"/>
    </svg>
  );
}