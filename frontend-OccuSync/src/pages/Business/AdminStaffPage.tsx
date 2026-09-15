import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Mail,
  X,
  UserPlus,
  Briefcase,
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

  const staffMembers = staffList.filter(
    (member) => member.role === "STAFF"
  );

  const filteredStaff = staffMembers.filter((member) => {
    const fullName =
      `${member.first_name} ${member.last_name}`.toLowerCase();

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

  const handleDragStart = (jobId: number) => {
    setDraggedJobId(jobId);
  };

  const handleDragEnd = () => {
    setDraggedJobId(null);
  };

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
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Team</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your staff and their assigned tasks.
          </p>
        </div>

        <div className="relative" ref={inviteRef}>
          <button
            onClick={openInvite}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition"
          >
            <Plus size={17} />
            Invite Staff
          </button>

          {renderInvite && (
            <div
              className={`absolute right-0 top-12 z-50 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 transition-all duration-200 ${
                showInvite
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">
                    Invite Staff
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Send an invitation to a new staff member.
                  </p>
                </div>

                <button
                  onClick={closeInvite}
                  className="text-slate-500 hover:text-slate-300"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative mb-3">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@email.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-200 outline-none focus:border-rose-500"
                />
              </div>

              {message && (
                <p className="text-xs text-slate-400 mb-3">
                  {message}
                </p>
              )}

              <button
                onClick={handleInvite}
                disabled={loading || !email.trim()}
                className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-2.5 text-sm font-semibold transition"
              >
                <UserPlus size={16} />
                {loading ? "Sending..." : "Send Invitation"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
            Staff Members
          </p>
          <p className="text-2xl font-bold text-white">
            {totalStaff}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
            Active Tasks
          </p>
          <p className="text-2xl font-bold text-white">
            {totalTasks}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
            Available Staff
          </p>
          <p className="text-2xl font-bold text-white">
            {availableStaff}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search staff..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-slate-700"
        />
      </div>

      {/* Unassigned Tasks */}
      {unassignedTasks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={15} className="text-slate-500" />

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Unassigned Tasks
            </span>

            <span className="text-xs text-slate-600">
              {unassignedTasks.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {unassignedTasks.map((task) => (
              <div
                key={task.job_id}
                draggable
                onDragStart={() => handleDragStart(task.job_id)}
                onDragEnd={handleDragEnd}
                className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-4 cursor-grab active:cursor-grabbing hover:border-rose-500/50 transition"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-300 truncate">
                    {task.service}
                  </p>

                  <span className="text-[10px] text-slate-600">
                    #{task.job_id}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  {formatDate(task.date)}
                </p>

                <p className="text-[10px] text-slate-600 mt-3">
                  Drag to assign staff
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff */}
      {filteredStaff.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <UserPlus
            size={30}
            className="mx-auto text-slate-600 mb-3"
          />

          <h3 className="text-sm font-semibold text-slate-300">
            No staff members found
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Invite staff members to start building your team.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredStaff.map((member) => {
            const fullName = `${member.first_name} ${member.last_name}`;

            const initials =
              `${member.first_name[0] || ""}${member.last_name[0] || ""}`.toUpperCase();

            return (
              <div
                key={member.member_id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(member.member_id)}
                className={`bg-slate-900 border rounded-2xl p-5 transition ${
                  draggedJobId
                    ? "border-rose-500/50 bg-rose-500/5"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Staff Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-sm font-bold text-rose-400">
                      {initials}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {fullName}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">
                    Staff
                  </span>
                </div>

                {/* Tasks */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase
                        size={15}
                        className="text-slate-500"
                      />

                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Assigned Tasks
                      </span>
                    </div>

                    <span className="text-xs text-slate-400">
                      {member.assigned_tasks.length}
                    </span>
                  </div>

                  {member.assigned_tasks.length === 0 ? (
                    <div className="border border-dashed border-slate-800 rounded-xl p-5 text-center">
                      <p className="text-xs text-slate-600">
                        No active tasks
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {member.assigned_tasks.map((task) => (
                        <div
                          key={task.job_id}
                          draggable
                          onDragStart={() => handleDragStart(task.job_id)}
                          onDragEnd={handleDragEnd}
                          className="bg-slate-950 border border-slate-800 rounded-xl p-3 cursor-grab active:cursor-grabbing"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-medium text-slate-300 truncate">
                              {task.service}
                            </p>

                            <span className="text-[10px] text-slate-600">
                              #{task.job_id}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-600 mt-1">
                            {formatDate(task.date)}
                          </p>
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
  );
}