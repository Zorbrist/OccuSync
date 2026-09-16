import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Mail,
  X,
  UserPlus,
} from "lucide-react";
import { inviteStaff } from "../../services/authService";
import {
  assignJobToStaff,
  getStaffWithTasks,
} from "../../services/businessService";

interface AssignedTask {
  job_id: number;
  service: string;
  date: string;
}

interface UnassignedTask {
  job_id: number;
  service: string;
  date: string;
}

interface StaffMember {
  member_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  assigned_tasks: AssignedTask[];
}

export default function StaffPage() {
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [renderInvite, setRenderInvite] = useState(false);
  const [loading, setLoading] = useState(false);

  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [unassignedTasks, setUnassignedTasks] = useState<UnassignedTask[]>([]);

  const [draggedJobId, setDraggedJobId] = useState<number | null>(null);
  const [assigningJob, setAssigningJob] = useState(false);

  const inviteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getStaffWithTasks();
        setStaffList(data.staff);
        setUnassignedTasks(data.unassigned_tasks);
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      }
    };
    fetchStaff();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inviteRef.current &&
        !inviteRef.current.contains(event.target as Node)
      ) {
        closeInvite();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeInvite();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const openInvite = () => {
    setRenderInvite(true);
    setTimeout(() => {
      setShowInvite(true);
    }, 10);
  };

  const closeInvite = () => {
    setShowInvite(false);
    setTimeout(() => {
      setRenderInvite(false);
    }, 200);
  };

  const handleInvite = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setMessage("");

    try {
      await inviteStaff({ email });
      setMessage("Invitation sent successfully.");
      setEmail("");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to send invitation."
      );
    } finally {
      setLoading(false);
    }
  };

  const staffMembers = staffList.filter((member) => member.role === "STAFF");
  const filteredStaff = staffMembers.filter((member) => {
    const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalStaff = staffMembers.length;
  const totalTasks = staffMembers.reduce(
    (total, member) => total + member.assigned_tasks.length,
    0
  );
  const availableStaff = staffMembers.filter(
    (member) => member.assigned_tasks.length === 0
  ).length;

  const formatDate = (date: string) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDragStart = (jobId: number) => setDraggedJobId(jobId);
  const handleDragEnd = () => setDraggedJobId(null);

  const handleDrop = async (memberId: string) => {
    if (!draggedJobId) return;
    try {
      setAssigningJob(true);
      await assignJobToStaff(draggedJobId, memberId);
      const data = await getStaffWithTasks();
      setStaffList(data.staff);
      setUnassignedTasks(data.unassigned_tasks);
    } catch (error) {
      console.error("Failed to assign job:", error);
    } finally {
      setAssigningJob(false);
      setDraggedJobId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8EDF2] p-6 lg:p-10 font-sans [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="max-w-7xl mx-auto bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7)] p-6 md:p-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-xl font-semibold text-[#1E293B]">Team Overview</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your staff and assign ongoing tasks.
            </p>
          </div>

          <div className="relative" ref={inviteRef}>
            <button
              onClick={openInvite}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[1rem] bg-black text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.2)]"
            >
              <Plus size={16} />
              Invite Staff
            </button>

            {renderInvite && (
              <div
                className={`absolute right-0 top-14 z-50 w-80 bg-white border border-slate-100 rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.15)] p-6 transition-all duration-200 ${
                  showInvite ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1E293B]">Invite Staff</h3>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
                      Send an invitation
                    </p>
                  </div>
                  <button onClick={closeInvite} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-black transition-colors border border-slate-100">
                    <X size={14} />
                  </button>
                </div>

                <div className="relative mb-4">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@email.com"
                    className="w-full bg-[#F1F5F9] border-none rounded-[1rem] pl-11 pr-4 py-3 text-sm text-[#1E293B] outline-none shadow-inner placeholder:text-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                {message && <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-4">{message}</p>}

                <button
                  onClick={handleInvite}
                  disabled={loading || !email.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-black hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-[1rem] py-3 text-sm font-medium transition-all"
                >
                  <UserPlus size={16} />
                  {loading ? "Sending..." : "Send Invitation"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-6 border border-slate-50">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Staff Members</p>
            <p className="text-xl font-semibold text-[#1E293B]">{totalStaff}</p>
          </div>
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-6 border border-slate-50">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Active Tasks</p>
            <p className="text-xl font-semibold text-[#1E293B]">{totalTasks}</p>
          </div>
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] p-6 border border-slate-50">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Available Staff</p>
            <p className="text-xl font-semibold text-[#1E293B]">{availableStaff}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search staff directory..."
            className="w-full bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 pl-11 pr-4 py-3.5 text-sm text-[#1E293B] placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-100 transition-all"
          />
        </div>

        {/* Unassigned Tasks */}
        {unassignedTasks.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Unassigned Pool
              </span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-500 text-[10px] font-bold">
                {unassignedTasks.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {unassignedTasks.map((task) => (
                <div
                  key={task.job_id}
                  draggable
                  onDragStart={() => handleDragStart(task.job_id)}
                  onDragEnd={handleDragEnd}
                  className="bg-white border border-dashed border-slate-300 rounded-[1.5rem] p-5 cursor-grab active:cursor-grabbing hover:border-slate-400 hover:shadow-[0_8px_24px_rgba(149,157,165,0.05)] transition-all"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#1E293B] truncate">{task.service}</p>
                    <span className="text-[11px] font-semibold text-slate-400">#{task.job_id}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{formatDate(task.date)}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-4 text-center bg-[#F1F5F9] py-1.5 rounded-lg shadow-inner">
                    Drag to assign
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Staff */}
        {filteredStaff.length === 0 ? (
          <div className="bg-white border border-slate-50 shadow-[0_8px_24px_rgba(149,157,165,0.05)] rounded-[1.5rem] p-12 text-center">
            <UserPlus size={32} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-[#1E293B] font-semibold">No staff found</h3>
            <p className="text-sm text-slate-500 mt-2">Invite staff members to start delegating tasks.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredStaff.map((member) => {
              const fullName = `${member.first_name} ${member.last_name}`;
              const initials = `${member.first_name[0] || ""}${member.last_name[0] || ""}`.toUpperCase();

              return (
                <div
                  key={member.member_id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(member.member_id)}
                  className={`bg-white rounded-[1.5rem] shadow-[0_8px_24px_rgba(149,157,165,0.1)] border border-slate-50 p-6 transition-all duration-300 ${
                    draggedJobId ? "ring-2 ring-slate-200 shadow-xl scale-[1.02]" : "hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(149,157,165,0.15)]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center text-sm font-semibold text-[#1E293B]">
                        {initials}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#1E293B]">{fullName}</h3>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">{member.email}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Assigned Work</span>
                      <div className="w-5 h-5 rounded-full bg-[#F1F5F9] shadow-inner flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {member.assigned_tasks.length}
                      </div>
                    </div>

                    {member.assigned_tasks.length === 0 ? (
                      <div className="bg-[#F1F5F9] shadow-inner rounded-[1rem] p-4 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Available</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {member.assigned_tasks.map((task) => (
                          <div
                            key={task.job_id}
                            draggable
                            onDragStart={() => handleDragStart(task.job_id)}
                            onDragEnd={handleDragEnd}
                            className="bg-white border border-slate-100 rounded-[1rem] p-4 cursor-grab active:cursor-grabbing shadow-sm"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-medium text-[#1E293B] truncate">{task.service}</p>
                              <span className="text-[11px] font-semibold text-slate-400">#{task.job_id}</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">{formatDate(task.date)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}