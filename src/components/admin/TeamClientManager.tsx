"use client";

import React, { useState } from "react";
import {
  createTeamUserAction,
  updateTeamUserAction,
  resetTeamUserPasswordAction,
  deleteTeamUserAction,
} from "@/app/actions/admin";
import {
  UserPlus,
  Edit2,
  Key,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { ADMIN_ROLE_BADGES, getRoleBadge } from "@/constants/admin";

interface TeamUserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string | Date;
}

interface TeamClientManagerProps {
  currentUserRole: string;
  currentUserEmail: string;
  teamUsers: TeamUserItem[];
}

export default function TeamClientManager({
  currentUserRole,
  currentUserEmail,
  teamUsers,
}: TeamClientManagerProps) {
  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<TeamUserItem | null>(null);
  const [resettingUser, setResettingUser] = useState<TeamUserItem | null>(null);
  const [deletingUser, setDeletingUser] = useState<TeamUserItem | null>(null);

  // Form Processing States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusNotice, setStatusNotice] = useState<{ success: boolean; text: string } | null>(null);

  // Create Form State
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createRole, setCreateRole] = useState("SUPERVISOR_1");
  const [createPassword, setCreatePassword] = useState("");

  // Edit Form State
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("SUPERVISOR_1");
  const [editIsActive, setEditIsActive] = useState(true);

  // Reset Password State
  const [resetPasswordVal, setResetPasswordVal] = useState("");

  // Handle Create User
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusNotice(null);

    const formData = new FormData();
    formData.append("name", createName);
    formData.append("email", createEmail);
    formData.append("role", createRole);
    formData.append("password", createPassword);

    try {
      const res = await createTeamUserAction(null, formData);
      if (res.success) {
        setStatusNotice({ success: true, text: res.message || "Team user created successfully." });
        setShowCreateModal(false);
        setCreateName("");
        setCreateEmail("");
        setCreatePassword("");
      } else {
        setStatusNotice({ success: false, text: res.message || "Failed to create user." });
      }
    } catch (err) {
      setStatusNotice({ success: false, text: "An error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Edit User
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsSubmitting(true);
    setStatusNotice(null);

    const formData = new FormData();
    formData.append("id", editingUser.id);
    formData.append("name", editName);
    formData.append("role", editRole);
    formData.append("isActive", String(editIsActive));

    try {
      const res = await updateTeamUserAction(null, formData);
      if (res.success) {
        setStatusNotice({ success: true, text: res.message || "Team user updated successfully." });
        setEditingUser(null);
      } else {
        setStatusNotice({ success: false, text: res.message || "Failed to update user." });
      }
    } catch (err) {
      setStatusNotice({ success: false, text: "An error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Password Reset
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resettingUser) return;
    setIsSubmitting(true);
    setStatusNotice(null);

    const formData = new FormData();
    formData.append("id", resettingUser.id);
    formData.append("newPassword", resetPasswordVal);

    try {
      const res = await resetTeamUserPasswordAction(null, formData);
      if (res.success) {
        setStatusNotice({ success: true, text: res.message || "Password reset successfully." });
        setResettingUser(null);
        setResetPasswordVal("");
      } else {
        setStatusNotice({ success: false, text: res.message || "Failed to reset password." });
      }
    } catch (err) {
      setStatusNotice({ success: false, text: "An error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete User
  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("id", deletingUser.id);

    try {
      await deleteTeamUserAction(formData);
      setStatusNotice({ success: true, text: `User ${deletingUser.name} deleted successfully.` });
      setDeletingUser(null);
    } catch (err) {
      setStatusNotice({ success: false, text: "Failed to delete user." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* STATUS NOTICE ALERT */}
      {statusNotice && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-2 ${
            statusNotice.success
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusNotice.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusNotice.text}</span>
          </div>
          <button onClick={() => setStatusNotice(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP HEADER CONTROLS */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-500">
          Showing <strong>{teamUsers.length}</strong> active team accounts
        </div>

        <button
          onClick={() => {
            setShowCreateModal(true);
            setStatusNotice(null);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-navy text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      {/* TEAM MEMBERS TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Team Member</th>
                <th className="px-6 py-4">Assigned Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teamUsers.map((user) => {
                const badge = getRoleBadge(user.role);
                const isSuperAdmin = user.role === "SUPER_ADMIN";

                return (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-navy text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .substring(0, 2)}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-brand-navy truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {user.isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Active 🟢
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                          Inactive 🔴
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* EDIT BUTTON */}
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setEditName(user.name);
                            setEditRole(user.role);
                            setEditIsActive(user.isActive);
                          }}
                          className="p-2 rounded-xl text-slate-500 hover:text-brand-navy hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit Member Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* RESET PASSWORD BUTTON */}
                        <button
                          onClick={() => {
                            setResettingUser(user);
                            setResetPasswordVal("");
                          }}
                          className="p-2 rounded-xl text-slate-500 hover:text-brand-navy hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Reset Member Password"
                        >
                          <Key className="w-4 h-4" />
                        </button>

                        {/* DELETE BUTTON (PREVENT SELF DELETION) */}
                        {user.email.toLowerCase() !== currentUserEmail.toLowerCase() &&
                          (!isSuperAdmin || currentUserRole === "SUPER_ADMIN") && (
                            <button
                              onClick={() => setDeletingUser(user)}
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. CREATE TEAM MEMBER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-brand-navy" /> Add New Team Member
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 text-slate-900 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                  placeholder="s.jenkins@newerasupport.co.uk"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 text-slate-900 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Assigned Role</label>
                <select
                  value={createRole}
                  onChange={(e) => setCreateRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 text-slate-900 bg-white"
                >
                  {currentUserRole === "SUPER_ADMIN" && (
                    <option value="SUPER_ADMIN">Super Admin (Full Control)</option>
                  )}
                  <option value="ADMIN">Admin (Operations Manager)</option>
                  <option value="SUPERVISOR_1">Supervisor 1 (Shift Rota Lead)</option>
                  <option value="SUPERVISOR_2">Supervisor 2 (Applications Inspector)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Initial Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 text-slate-900 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-brand-navy text-white font-bold hover:bg-slate-800 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT TEAM MEMBER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-brand-navy" /> Edit {editingUser.name}
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 text-slate-900 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Assigned Role</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 text-slate-900 bg-white"
                >
                  {currentUserRole === "SUPER_ADMIN" && (
                    <option value="SUPER_ADMIN">Super Admin</option>
                  )}
                  <option value="ADMIN">Admin</option>
                  <option value="SUPERVISOR_1">Supervisor 1</option>
                  <option value="SUPERVISOR_2">Supervisor 2</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Account Status</label>
                <select
                  value={String(editIsActive)}
                  onChange={(e) => setEditIsActive(e.target.value === "true")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 text-slate-900 bg-white"
                >
                  <option value="true">Active 🟢</option>
                  <option value="false">Inactive / Suspended 🔴</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-brand-navy text-white font-bold hover:bg-slate-800 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. RESET PASSWORD MODAL */}
      {resettingUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                <Key className="w-4 h-4 text-brand-navy" /> Reset Password for {resettingUser.name}
              </h3>
              <button onClick={() => setResettingUser(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={resetPasswordVal}
                  onChange={(e) => setResetPasswordVal(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 text-slate-900 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setResettingUser(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-brand-navy text-white font-bold hover:bg-slate-800 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. DELETE USER CONFIRMATION MODAL */}
      {deletingUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-navy">Delete Team Member?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete <strong>{deletingUser.name}</strong> ({deletingUser.email})? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 disabled:opacity-50 flex items-center gap-1.5"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
