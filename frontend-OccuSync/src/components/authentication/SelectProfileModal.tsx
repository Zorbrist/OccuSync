import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  User,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface SelectProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectProfileModal: React.FC<SelectProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* =========================================================
          BACKDROP
      ========================================================= */}
      <div
        className="absolute inset-0 bg-[#030208]/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/[0.10] blur-[140px]" />

        <div className="absolute -right-32 top-10 h-[300px] w-[300px] rounded-full bg-fuchsia-700/[0.08] blur-[120px]" />

        <div className="absolute -bottom-32 -left-20 h-[350px] w-[350px] rounded-full bg-purple-700/[0.08] blur-[130px]" />
      </div>

      {/* =========================================================
          MODAL
      ========================================================= */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#090711]/95 shadow-2xl shadow-purple-950/50 backdrop-blur-2xl animate-in fade-in zoom-in duration-200">

        {/* Top accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-violet-500 to-fuchsia-500" />

        {/* =====================================================
            CLOSE BUTTON
        ===================================================== */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-slate-500 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="px-7 pb-5 pt-8 text-center sm:px-9">

          <div className="mb-4 flex justify-center">
            <Sparkles className="h-5 w-5 text-violet-300" />
          </div>

          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
            JOIN OCCUSYNC
          </p>

          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Choose your account
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Select how you would like to use OccuSync.
          </p>
        </div>

        {/* =====================================================
            PROFILE OPTIONS
        ===================================================== */}
        <div className="space-y-3 px-7 pb-8 sm:px-9">

          {/* =================================================
              CUSTOMER
          ================================================= */}
          <Link
            to="/register/customer"
            onClick={onClose}
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-500/[0.06] hover:shadow-[0_10px_40px_rgba(139,92,246,0.12)]"
          >
            {/* Hover glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/[0.10] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Icon */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/[0.12] bg-violet-500/[0.08] text-violet-300 transition-all duration-300 group-hover:border-violet-400/30 group-hover:bg-violet-500/15">
              <User className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="relative min-w-0 flex-1 text-left">
              <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-violet-200">
                Customer Account
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Find services, book providers and track your requests.
              </p>
            </div>

            {/* Arrow */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-600 transition-all duration-300 group-hover:bg-violet-500/10 group-hover:text-violet-300">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* =================================================
              BUSINESS
          ================================================= */}
          <Link
            to="/register/business"
            onClick={onClose}
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:bg-fuchsia-500/[0.05] hover:shadow-[0_10px_40px_rgba(217,70,239,0.10)]"
          >
            {/* Hover glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-fuchsia-500/[0.10] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Icon */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/[0.12] bg-fuchsia-500/[0.08] text-fuchsia-300 transition-all duration-300 group-hover:border-fuchsia-400/30 group-hover:bg-fuchsia-500/15">
              <Building2 className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="relative min-w-0 flex-1 text-left">
              <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-fuchsia-200">
                Business Account
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Offer services, manage customers, teams and operations.
              </p>
            </div>

            {/* Arrow */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-600 transition-all duration-300 group-hover:bg-fuchsia-500/10 group-hover:text-fuchsia-300">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* =================================================
              DIVIDER
          ================================================= */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px flex-1 bg-white/[0.06]" />

            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-700">
              OccuSync
            </span>

            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* =================================================
              BACK TO HOME
          ================================================= */}
          <div className="pt-1 text-center">
            <Link
              to="/"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 transition-colors duration-300 hover:text-violet-300"
            >
              <span>←</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectProfileModal;