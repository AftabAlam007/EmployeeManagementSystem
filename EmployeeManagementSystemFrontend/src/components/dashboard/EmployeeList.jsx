import React from "react";

const EmployeeList = ({ employees, onView, onEdit, onDelete }) => {
  const safeEmployees = Array.isArray(employees) ? employees : [];

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Emp Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Company Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Manager</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Current Project</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-slate-200">
          {safeEmployees.length > 0 ? (
            safeEmployees.map((emp) => (
              <tr key={emp?.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {emp?.employmentCode || emp?.professionalDetails?.employmentCode || "N/A"}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {emp?.name || emp?.personalDetails?.fullName || "N/A"}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {emp?.email || emp?.professionalDetails?.companyEmail || "N/A"}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {emp?.manager || emp?.managerName || "N/A"}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {emp?.project || emp?.currentProjectName || "-"}
                </td>

                <td className="px-6 py-4 text-sm text-right space-x-4">
                  <button onClick={() => onView(emp)} className="text-blue-600">View</button>
                  <button onClick={() => onEdit(emp)} className="text-purple-600">Edit</button>
                  <button onClick={() => onDelete(emp?.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;