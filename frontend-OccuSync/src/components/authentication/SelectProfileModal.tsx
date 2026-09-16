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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">

      {/* =========================================================
          BACKDROP (UPDATED TO NEW LIGHT UI)
      ========================================================= */}
      <div
        className="absolute inset-0 bg-[#E8EDF2]/70 backdrop-blur-md transition-all"
        onClick={onClose}
      />

      {/* =========================================================
          MODAL PARENT PANEL (PILLOWY UI)
      ========================================================= */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white bg-[#F1F5F9] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),0_20px_40px_rgba(149,157,165,0.15)] p-6 md:p-8 animate-in fade-in zoom-in duration-200">

        {/* =====================================================
            CLOSE BUTTON
        ===================================================== */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-50 bg-white text-slate-400 shadow-sm transition-all hover:text-black hover:shadow-md"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="px-4 pb-6 pt-4 text-center">

          <div className="mb-3 flex justify-center text-slate-400">
            <Sparkles className="h-5 w-5" />
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Join OccuSync
          </p>

          <h2 className="text-xl font-semibold text-[#1E293B] mt-1">
            Choose your account
          </h2>

          <p className="mx-auto mt-1 max-w-xs text-sm text-slate-500">
            Select how you would like to use OccuSync.
          </p>
        </div>

        {/* =====================================================
            PROFILE OPTIONS (ELEVATED CHILD CARDS)
        ===================================================== */}
        <div className="space-y-4 px-2 pb-2">

          {/* =================================================
              CUSTOMER
          ================================================= */}
          <Link
            to="/register/customer"
            onClick={onClose}
            className="group relative flex items-center gap-4 overflow-hidden rounded-[1.5rem] border border-slate-50 bg-white p-5 shadow-[0_8px_24px_rgba(149,157,165,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(149,157,165,0.15)]"
          >
            {/* Icon */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B]">
              <User className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="relative min-w-0 flex-1 text-left">
              <h3 className="text-sm font-semibold text-[#1E293B]">
                Customer Account
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Find services, book providers and track your requests.
              </p>
            </div>

            {/* Action Icon */}
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-black border border-slate-50 transition-all shrink-0">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* =================================================
              BUSINESS
          ================================================= */}
          <Link
            to="/register/business"
            onClick={onClose}
            className="group relative flex items-center gap-4 overflow-hidden rounded-[1.5rem] border border-slate-50 bg-white p-5 shadow-[0_8px_24px_rgba(149,157,165,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(149,157,165,0.15)]"
          >
            {/* Icon */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] shadow-inner text-[#1E293B]">
              <Building2 className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="relative min-w-0 flex-1 text-left">
              <h3 className="text-sm font-semibold text-[#1E293B]">
                Business Account
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Offer services, manage customers, teams and operations.
              </p>
            </div>

            {/* Action Icon */}
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-black border border-slate-50 transition-all shrink-0">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* =================================================
              DIVIDER
          ================================================= */}
          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              OccuSync
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* =================================================
              BACK TO HOME
          ================================================= */}
          <div className="text-center pb-2">
            <Link
              to="/"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-black"
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